import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { compressImage } from '@/lib/imageCompression';
import { useToast } from '@/hooks/use-toast';

export interface Photo {
  id: string;
  storage_path: string;
  aspect_ratio: '1:1' | '4:5';
  display_order: number;
  url: string;
}

const MAX_PHOTOS = 12;

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;

      const photosWithUrls = await Promise.all(
        (data || []).map(async (photo) => {
          const { data: urlData } = supabase.storage
            .from('photos')
            .getPublicUrl(photo.storage_path);
          
          return {
            ...photo,
            aspect_ratio: photo.aspect_ratio as '1:1' | '4:5',
            url: urlData.publicUrl,
          };
        })
      );

      setPhotos(photosWithUrls);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast({
        title: 'Error',
        description: 'Failed to load photos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const uploadPhoto = async (file: File, aspectRatio: '1:1' | '4:5') => {
    if (photos.length >= MAX_PHOTOS) {
      toast({
        title: 'Limit reached',
        description: `Maximum ${MAX_PHOTOS} photos allowed`,
        variant: 'destructive',
      });
      return null;
    }

    setUploading(true);

    try {
      // Compress the image
      const compressedBlob = await compressImage(file, {
        maxWidth: 1200,
        maxHeight: aspectRatio === '1:1' ? 1200 : 1500,
        quality: 0.85,
        aspectRatio,
      });

      // Generate unique filename
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, compressedBlob, {
          contentType: 'image/jpeg',
          cacheControl: '31536000',
        });

      if (uploadError) throw uploadError;

      // Get next display order
      const nextOrder = photos.length > 0 
        ? Math.max(...photos.map(p => p.display_order)) + 1 
        : 0;

      // Insert into database
      const { data: insertData, error: insertError } = await supabase
        .from('photos')
        .insert({
          storage_path: fileName,
          aspect_ratio: aspectRatio,
          display_order: nextOrder,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName);

      const newPhoto: Photo = {
        ...insertData,
        aspect_ratio: insertData.aspect_ratio as '1:1' | '4:5',
        url: urlData.publicUrl,
      };

      setPhotos(prev => [...prev, newPhoto]);

      toast({
        title: 'Uploaded',
        description: 'Photo added successfully',
      });

      return newPhoto;
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: 'Upload failed',
        description: 'Could not upload photo',
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deletePhoto = async (id: string) => {
    const photo = photos.find(p => p.id === id);
    if (!photo) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('photos')
        .remove([photo.storage_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('photos')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      setPhotos(prev => prev.filter(p => p.id !== id));

      toast({
        title: 'Deleted',
        description: 'Photo removed',
      });
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: 'Error',
        description: 'Could not delete photo',
        variant: 'destructive',
      });
    }
  };

  const reorderPhotos = async (fromIndex: number, toIndex: number) => {
    const newPhotos = [...photos];
    const [moved] = newPhotos.splice(fromIndex, 1);
    newPhotos.splice(toIndex, 0, moved);

    // Update display order
    const updatedPhotos = newPhotos.map((photo, index) => ({
      ...photo,
      display_order: index,
    }));

    setPhotos(updatedPhotos);

    try {
      // Update all orders in database
      for (const photo of updatedPhotos) {
        await supabase
          .from('photos')
          .update({ display_order: photo.display_order })
          .eq('id', photo.id);
      }
    } catch (error) {
      console.error('Error reordering photos:', error);
      fetchPhotos(); // Revert on error
    }
  };

  const replacePhoto = async (id: string, file: File, aspectRatio: '1:1' | '4:5') => {
    const photo = photos.find(p => p.id === id);
    if (!photo) return null;

    setUploading(true);

    try {
      // Compress the new image
      const compressedBlob = await compressImage(file, {
        maxWidth: 1200,
        maxHeight: aspectRatio === '1:1' ? 1200 : 1500,
        quality: 0.85,
        aspectRatio,
      });

      // Delete old file from storage
      await supabase.storage
        .from('photos')
        .remove([photo.storage_path]);

      // Generate new filename
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;

      // Upload new file
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, compressedBlob, {
          contentType: 'image/jpeg',
          cacheControl: '31536000',
        });

      if (uploadError) throw uploadError;

      // Update database
      const { error: updateError } = await supabase
        .from('photos')
        .update({
          storage_path: fileName,
          aspect_ratio: aspectRatio,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      // Get new public URL
      const { data: urlData } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName);

      const updatedPhoto: Photo = {
        ...photo,
        storage_path: fileName,
        aspect_ratio: aspectRatio,
        url: urlData.publicUrl,
      };

      setPhotos(prev => prev.map(p => p.id === id ? updatedPhoto : p));

      toast({
        title: 'Replaced',
        description: 'Photo updated successfully',
      });

      return updatedPhoto;
    } catch (error) {
      console.error('Error replacing photo:', error);
      toast({
        title: 'Error',
        description: 'Could not replace photo',
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    photos,
    loading,
    uploading,
    uploadPhoto,
    deletePhoto,
    reorderPhotos,
    replacePhoto,
    maxPhotos: MAX_PHOTOS,
    canUpload: photos.length < MAX_PHOTOS,
  };
};
