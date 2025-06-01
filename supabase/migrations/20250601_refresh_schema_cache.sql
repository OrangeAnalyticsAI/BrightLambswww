-- First, ensure the avatar_url column exists in the profiles table
DO $$
DECLARE
  column_exists BOOLEAN;
BEGIN
  -- Check if the column exists
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'profiles'
      AND column_name = 'avatar_url'
  ) INTO column_exists;
  
  -- If column doesn't exist, add it
  IF NOT column_exists THEN
    EXECUTE 'ALTER TABLE public.profiles ADD COLUMN avatar_url TEXT DEFAULT NULL';
    RAISE NOTICE 'Added avatar_url column to profiles table';
  ELSE
    RAISE NOTICE 'avatar_url column already exists in profiles table';
  END IF;
END $$;

-- Then refresh the PostgREST schema cache to make the column available
-- This is needed when columns are added but not showing up in the API
SELECT pg_notify('pgrst', 'reload schema');
