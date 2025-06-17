-- Check if avatar_url column exists in profiles table
-- If not, add it

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
    
    -- Log the change
    RAISE NOTICE 'Added avatar_url column to profiles table';
  ELSE
    RAISE NOTICE 'avatar_url column already exists in profiles table';
  END IF;
END $$;
