-- Enable Row Level Security on all tables if not already enabled
DO $$
BEGIN
  -- Check and enable RLS if not already enabled
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'categories' AND rowsecurity) THEN
    ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'content' AND rowsecurity) THEN
    ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'content_categories' AND rowsecurity) THEN
    ALTER TABLE public.content_categories ENABLE ROW LEVEL SECURITY;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'profiles' AND rowsecurity) THEN
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Drop existing policies if they exist
DO $$
BEGIN
  -- Drop policies for categories
  DROP POLICY IF EXISTS "Enable read access for all users" ON public.categories;
  DROP POLICY IF EXISTS "Enable insert for admins and contributors" ON public.categories;
  DROP POLICY IF EXISTS "Enable update for admins and contributors" ON public.categories;
  DROP POLICY IF EXISTS "Enable delete for admins" ON public.categories;
  
  -- Drop policies for content
  DROP POLICY IF EXISTS "Enable read access for all users" ON public.content;
  DROP POLICY IF EXISTS "Enable insert for admins and contributors" ON public.content;
  DROP POLICY IF EXISTS "Enable update for admins and contributors" ON public.content;
  DROP POLICY IF EXISTS "Enable delete for admins" ON public.content;
  
  -- Drop policies for content_categories
  DROP POLICY IF EXISTS "Enable read access for all users" ON public.content_categories;
  DROP POLICY IF EXISTS "Enable insert for admins and contributors" ON public.content_categories;
  DROP POLICY IF EXISTS "Enable update for admins and contributors" ON public.content_categories;
  DROP POLICY IF EXISTS "Enable delete for admins" ON public.content_categories;
  
  -- Drop policies for profiles
  DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
  DROP POLICY IF EXISTS "Enable update for own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Enable update for admins" ON public.profiles;
END $$;

-- Create a function to check if current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND user_type = 'admin'::public.user_role_type
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Create a function to check if current user is a contributor or admin
CREATE OR REPLACE FUNCTION public.is_contributor_or_above()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND user_type IN ('contributor'::public.user_role_type, 'admin'::public.user_role_type)
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Categories policies
-- Read: All users can read categories
CREATE POLICY "Enable read access for all users" 
ON public.categories FOR SELECT 
TO authenticated, anon 
USING (true);

-- Insert/Update: Only contributors and admins
CREATE POLICY "Enable insert for admins and contributors" 
ON public.categories FOR INSERT 
TO authenticated 
WITH CHECK (public.is_contributor_or_above());

CREATE POLICY "Enable update for admins and contributors" 
ON public.categories FOR UPDATE 
TO authenticated 
USING (public.is_contributor_or_above())
WITH CHECK (public.is_contributor_or_above());

-- Delete: Only admins
CREATE POLICY "Enable delete for admins" 
ON public.categories FOR DELETE 
TO authenticated 
USING (public.is_admin());

-- Content policies
-- Read: All users can read content
CREATE POLICY "Enable read access for all users" 
ON public.content FOR SELECT 
TO authenticated, anon 
USING (true);

-- Insert/Update: Only contributors and admins
CREATE POLICY "Enable insert for admins and contributors" 
ON public.content FOR INSERT 
TO authenticated 
WITH CHECK (public.is_contributor_or_above());

CREATE POLICY "Enable update for admins and contributors" 
ON public.content FOR UPDATE 
TO authenticated 
USING (public.is_contributor_or_above())
WITH CHECK (public.is_contributor_or_above());

-- Delete: Only admins
CREATE POLICY "Enable delete for admins" 
ON public.content FOR DELETE 
TO authenticated 
USING (public.is_admin());

-- Content Categories policies (junction table)
CREATE POLICY "Enable read access for all users" 
ON public.content_categories FOR SELECT 
TO authenticated, anon 
USING (true);

CREATE POLICY "Enable insert for admins and contributors" 
ON public.content_categories FOR INSERT 
TO authenticated 
WITH CHECK (public.is_contributor_or_above());

CREATE POLICY "Enable update for admins and contributors" 
ON public.content_categories FOR UPDATE 
TO authenticated 
USING (public.is_contributor_or_above())
WITH CHECK (public.is_contributor_or_above());

CREATE POLICY "Enable delete for admins" 
ON public.content_categories FOR DELETE 
TO authenticated 
USING (public.is_admin());

-- Profiles policies
-- Read: Users can see basic profile info of others
CREATE POLICY "Enable read access for all users" 
ON public.profiles FOR SELECT 
TO authenticated, anon 
USING (true);

-- Users can update their own profile
CREATE POLICY "Enable update for own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Admins can update any profile
CREATE POLICY "Enable update for admins" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create RPC functions for role management
CREATE OR REPLACE FUNCTION public.promote_to_contributor(target_user_id UUID)
RETURNS VOID AS $$
BEGIN
  IF public.is_admin() THEN
    UPDATE public.profiles 
    SET user_type = 'contributor'::public.user_role_type
    WHERE id = target_user_id;
  ELSE
    RAISE EXCEPTION 'Only admins can promote users to contributor';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.promote_to_admin(target_user_id UUID)
RETURNS VOID AS $$
BEGIN
  IF public.is_admin() THEN
    UPDATE public.profiles 
    SET user_type = 'admin'::public.user_role_type
    WHERE id = target_user_id;
  ELSE
    RAISE EXCEPTION 'Only admins can create other admins';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Keep the existing demote_to_user function for backward compatibility
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
