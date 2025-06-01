-- Convert user_type from TEXT to ENUM

-- 1. Create the ENUM type
CREATE TYPE public.user_role_type AS ENUM (
  'user',
  'contributor',
  'admin'
);

-- 2. Add a new column with the ENUM type
ALTER TABLE public.profiles
ADD COLUMN user_role public.user_role_type;

-- 3. Copy data from old column to new column with validation
-- This will fail if there are values that don't match the ENUM
UPDATE public.profiles
SET user_role = 
  CASE 
    WHEN user_type IN ('user', 'contributor', 'admin') THEN user_type::public.user_role_type
    ELSE 'user'::public.user_role_type  -- default to 'user' for any invalid values
  END;

-- 4. Drop the old column
ALTER TABLE public.profiles DROP COLUMN user_type;

-- 5. Rename the new column to the original name
ALTER TABLE public.profiles RENAME COLUMN user_role TO user_type;

-- 6. Add NOT NULL constraint
ALTER TABLE public.profiles ALTER COLUMN user_type SET NOT NULL;

-- 7. Set default value
ALTER TABLE public.profiles ALTER COLUMN user_type SET DEFAULT 'user'::public.user_role_type;

-- 8. Add a comment for documentation
COMMENT ON COLUMN public.profiles.user_type IS 'Defines the role of the user within the application (user, contributor, admin)';

-- 9. Update the demote_to_user function to use the new ENUM type
-- First, drop the existing function if it exists
DROP FUNCTION IF EXISTS public.demote_to_user(UUID);

-- Then recreate it with the correct type
CREATE OR REPLACE FUNCTION public.demote_to_user(target_user_id UUID)
RETURNS VOID AS $$
BEGIN
  IF public.is_admin() THEN
    UPDATE public.profiles 
    SET user_type = 'user'::public.user_role_type
    WHERE id = target_user_id;
  ELSE
    RAISE EXCEPTION 'Only admins can demote users';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
