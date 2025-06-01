-- 1. Create the enum type if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_type') THEN
    CREATE TYPE public.user_role_type AS ENUM ('user', 'contributor', 'admin');
  END IF;
END $$;

-- 2. First, drop any views that depend on the column
DROP VIEW IF EXISTS public.user_management CASCADE;

-- 3. Drop any policies that depend on the column
DO $$
BEGIN
  -- Drop all policies on profiles table to avoid dependency issues
  DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
  DROP POLICY IF EXISTS "Enable update for admins" ON public.profiles;
  -- Add any other policies that might reference user_type
END $$;

-- 4. First, drop the default constraint if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'profiles' 
      AND column_name = 'user_type' 
      AND column_default IS NOT NULL
  ) THEN
    EXECUTE 'ALTER TABLE public.profiles ALTER COLUMN user_type DROP DEFAULT';
  END IF;
END $$;

-- 5. Convert the column to text first to remove any type dependencies
ALTER TABLE public.profiles 
ALTER COLUMN user_type 
TYPE TEXT 
USING (user_type::TEXT);

-- 6. Now convert to the enum type with explicit casting
ALTER TABLE public.profiles 
ALTER COLUMN user_type 
TYPE public.user_role_type 
USING (
  CASE 
    WHEN user_type IN ('user', 'contributor', 'admin') 
    THEN user_type::text::public.user_role_type
    ELSE 'user'::public.user_role_type
  END
);

-- 7. Set the default value
ALTER TABLE public.profiles 
ALTER COLUMN user_type 
SET DEFAULT 'user'::public.user_role_type;

-- 8. Make sure the column is NOT NULL
ALTER TABLE public.profiles 
ALTER COLUMN user_type 
SET NOT NULL;

-- 9. Add a comment for documentation
COMMENT ON COLUMN public.profiles.user_type IS 'Defines the role of the user within the application (user, contributor, admin)';

-- 10. Recreate any views or policies that were dropped
-- (These will be recreated in the next migration)

-- Note: The policies will be recreated in the next migration (20250601000745_add_role_based_policies.sql)
