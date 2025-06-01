-- Create storage buckets for profile images
-- One public bucket for default avatars, one private bucket for user uploads

-- Create public bucket for default avatars
INSERT INTO storage.buckets (id, name, public, avif_autodetection)
VALUES ('default_avatars', 'default_avatars', true, false)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for default avatars (public read access)
CREATE POLICY IF NOT EXISTS "Default Avatars Public Access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'default_avatars');

-- Create private bucket for user avatars
INSERT INTO storage.buckets (id, name, public, avif_autodetection)
VALUES ('user_avatars', 'user_avatars', false, false)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for user avatars
-- Users can view their own avatars
CREATE POLICY IF NOT EXISTS "Users Can View Own Avatars"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'user_avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can upload their own avatars
CREATE POLICY IF NOT EXISTS "Users Can Upload Own Avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'user_avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can update their own avatars
CREATE POLICY IF NOT EXISTS "Users Can Update Own Avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'user_avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can delete their own avatars
CREATE POLICY IF NOT EXISTS "Users Can Delete Own Avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'user_avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Create function to get avatar URL
CREATE OR REPLACE FUNCTION public.get_avatar_url(avatar_path TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  bucket_name TEXT;
  file_path TEXT;
  url TEXT;
BEGIN
  -- Check if avatar_path is null or empty
  IF avatar_path IS NULL OR avatar_path = '' THEN
    RETURN NULL;
  END IF;

  -- Check if it's a default avatar or user avatar
  IF avatar_path LIKE 'default:%' THEN
    bucket_name := 'default_avatars';
    file_path := SUBSTRING(avatar_path FROM 9); -- Remove 'default:' prefix
  ELSE
    bucket_name := 'user_avatars';
    file_path := avatar_path;
  END IF;

  -- Get the URL
  SELECT storage.get_object_url(bucket_name, file_path) INTO url;
  RETURN url;
END;
$$;
