-- Create storage buckets for profile images with updated names
-- One public bucket for default avatars, one private bucket for user uploads

-- Create public bucket for default avatars with file size limit (297 KB = 304,128 bytes)
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit)
VALUES ('default-avatars', 'default-avatars', true, false, 304128)
ON CONFLICT (id) DO UPDATE 
SET file_size_limit = 304128;

-- Set up security policies for default avatars (public read access)
DROP POLICY IF EXISTS "Default Avatars Public Access" ON storage.objects;
CREATE POLICY "Default Avatars Public Access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'default-avatars');

-- Create private bucket for user avatars with file size limit (297 KB = 304,128 bytes)
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit)
VALUES ('user-avatars', 'user-avatars', false, false, 304128)
ON CONFLICT (id) DO UPDATE 
SET file_size_limit = 304128;

-- Set up security policies for user avatars
-- Users can view their own avatars
DROP POLICY IF EXISTS "Users Can View Own Avatars" ON storage.objects;
CREATE POLICY "Users Can View Own Avatars"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'user-avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can upload their own avatars
DROP POLICY IF EXISTS "Users Can Upload Own Avatars" ON storage.objects;
CREATE POLICY "Users Can Upload Own Avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'user-avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can update their own avatars
DROP POLICY IF EXISTS "Users Can Update Own Avatars" ON storage.objects;
CREATE POLICY "Users Can Update Own Avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'user-avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can delete their own avatars
DROP POLICY IF EXISTS "Users Can Delete Own Avatars" ON storage.objects;
CREATE POLICY "Users Can Delete Own Avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'user-avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
