import { useState, useRef } from 'react';
import { Trash2, GripVertical, RefreshCw } from 'lucide-react';
import { Photo } from '@/hooks/usePhotos';
import { cn } from '@/lib/utils';
import RevealSection from '@/components/landing/RevealSection';

interface PhotoGridProps {
  photos: Photo[];
  onDelete: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onReplace: (id: string, file: File, aspectRatio: '1:1' | '4:5') => Promise<void>;
  isEditing: boolean;
}

const PhotoGrid = ({ photos, onDelete, onReorder, onReplace, isEditing }: PhotoGridProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [replacingId, setReplacingId] = useState<string | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      onReorder(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleReplaceClick = (id: string) => {
    setReplacingId(id);
    replaceInputRef.current?.click();
  };

  const handleReplaceChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && replacingId) {
      const photo = photos.find(p => p.id === replacingId);
      if (photo) {
        await onReplace(replacingId, file, photo.aspect_ratio);
      }
    }
    setReplacingId(null);
    if (replaceInputRef.current) {
      replaceInputRef.current.value = '';
    }
  };

  if (photos.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">No photos yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {photos.map((photo, index) => (
          <RevealSection 
            key={photo.id} 
            delay={100 + index * 60} 
            duration={800}
            direction="fade"
          >
            <div
              draggable={isEditing}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={cn(
                "relative overflow-hidden rounded-xl bg-secondary group",
                photo.aspect_ratio === '1:1' ? 'aspect-square' : 'aspect-[4/5]',
                draggedIndex === index && "opacity-50",
                dragOverIndex === index && "ring-2 ring-foreground",
                isEditing && "cursor-grab active:cursor-grabbing"
              )}
            >
              <img
                src={photo.url}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Edit Overlay */}
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleReplaceClick(photo.id)}
                    className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                    title="Replace"
                  >
                    <RefreshCw className="w-4 h-4 text-foreground" />
                  </button>
                  <button
                    onClick={() => onDelete(photo.id)}
                    className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-foreground" />
                  </button>
                </div>
              )}

              {/* Drag Handle */}
              {isEditing && (
                <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-4 h-4 text-foreground" />
                </div>
              )}
            </div>
          </RevealSection>
        ))}
      </div>

      <input
        ref={replaceInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleReplaceChange}
        className="hidden"
      />
    </>
  );
};

export default PhotoGrid;
