-- Create storage buckets for profile images with updated names and size limit
-- One public bucket for default avatars, one private bucket for user uploads

-- First, check if the buckets already exist
DO $$
DECLARE
  default_bucket_exists BOOLEAN;
  user_bucket_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'default-avatars'
  ) INTO default_bucket_exists;
  
  SELECT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'user-avatars'
  ) INTO user_bucket_exists;
  
  -- Create default-avatars bucket if it doesn't exist
  IF NOT default_bucket_exists THEN
    INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit)
    VALUES ('default-avatars', 'default-avatars', true, false, 304128);
  ELSE
    -- Update file size limit if bucket exists
    UPDATE storage.buckets 
    SET file_size_limit = 304128
    WHERE id = 'default-avatars';
  END IF;
  
  -- Create user-avatars bucket if it doesn't exist
  IF NOT user_bucket_exists THEN
    INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit)
    VALUES ('user-avatars', 'user-avatars', false, false, 304128);
  ELSE
    -- Update file size limit if bucket exists
    UPDATE storage.buckets 
    SET file_size_limit = 304128
    WHERE id = 'user-avatars';
  END IF;
END $$;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Default Avatars Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Users Can View Own Avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users Can Upload Own Avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users Can Update Own Avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users Can Delete Own Avatars" ON storage.objects;

-- Create policy for public read access to default avatars
CREATE POLICY "Default Avatars Public Access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'default-avatars');

-- Create policy for users to view their own avatars
CREATE POLICY "Users Can View Own Avatars"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'user-avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Create policy for users to upload their own avatars with size limit
CREATE POLICY "Users Can Upload Own Avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'user-avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Create policy for users to update their own avatars with size limit
CREATE POLICY "Users Can Update Own Avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'user-avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Create policy for users to delete their own avatars
CREATE POLICY "Users Can Delete Own Avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'user-avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Note: The file size limit is enforced at the bucket level (297 KB = 304,128 bytes)
-- We've set this in the bucket configuration above

-- To verify the bucket configuration, you can run:
-- SELECT id, name, public, file_size_limit FROM storage.buckets WHERE id IN ('default-avatars', 'user-avatars');
