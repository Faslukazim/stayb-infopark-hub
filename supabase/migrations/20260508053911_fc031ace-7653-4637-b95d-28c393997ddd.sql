
-- Drop permissive write policies on photos table
DROP POLICY IF EXISTS "Anyone can insert photos" ON public.photos;
DROP POLICY IF EXISTS "Anyone can update photos" ON public.photos;
DROP POLICY IF EXISTS "Anyone can delete photos" ON public.photos;

-- SELECT remains public (intentional)

-- Drop permissive write policies on storage.objects for photos bucket
DROP POLICY IF EXISTS "Anyone can upload photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete photos" ON storage.objects;

-- Public read of photos bucket remains (storage object SELECT policy is unchanged)
