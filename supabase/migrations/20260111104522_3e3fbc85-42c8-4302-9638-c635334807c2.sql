-- Create storage bucket for photos (public access for display)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('photos', 'photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']);

-- Allow anyone to view photos (public bucket)
CREATE POLICY "Anyone can view photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'photos');

-- Allow anyone to upload photos (no auth required)
CREATE POLICY "Anyone can upload photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'photos');

-- Allow anyone to delete photos (for admin management)
CREATE POLICY "Anyone can delete photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'photos');

-- Allow anyone to update photos
CREATE POLICY "Anyone can update photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'photos');

-- Create photos table to track order and metadata
CREATE TABLE public.photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  storage_path TEXT NOT NULL,
  aspect_ratio TEXT NOT NULL DEFAULT '1:1' CHECK (aspect_ratio IN ('1:1', '4:5')),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public access (no auth required)
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Anyone can view photos
CREATE POLICY "Anyone can view photos"
ON public.photos FOR SELECT
USING (true);

-- Anyone can insert photos (limit enforced in code)
CREATE POLICY "Anyone can insert photos"
ON public.photos FOR INSERT
WITH CHECK (true);

-- Anyone can update photos (for reordering)
CREATE POLICY "Anyone can update photos"
ON public.photos FOR UPDATE
USING (true);

-- Anyone can delete photos
CREATE POLICY "Anyone can delete photos"
ON public.photos FOR DELETE
USING (true);