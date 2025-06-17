-- Update the stored procedure to include job_title and mailing_list_opt_in fields
CREATE OR REPLACE FUNCTION public.update_profile_fields(
  p_user_id UUID,
  p_full_name TEXT DEFAULT NULL,
  p_avatar_url TEXT DEFAULT NULL,
  p_job_title TEXT DEFAULT NULL,
  p_mailing_list_opt_in BOOLEAN DEFAULT NULL,
  p_updated_at TIMESTAMPTZ DEFAULT NOW()
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
  updated_profile JSONB;
BEGIN
  -- First check if avatar_url column exists, if not add it
  PERFORM column_name 
  FROM information_schema.columns 
  WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'avatar_url';
    
  IF NOT FOUND THEN
    EXECUTE 'ALTER TABLE public.profiles ADD COLUMN avatar_url TEXT DEFAULT NULL';
  END IF;
  
  -- Check if job_title column exists, if not add it
  PERFORM column_name 
  FROM information_schema.columns 
  WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'job_title';
    
  IF NOT FOUND THEN
    EXECUTE 'ALTER TABLE public.profiles ADD COLUMN job_title TEXT DEFAULT NULL';
  END IF;
  
  -- Check if mailing_list_opt_in column exists, if not add it
  PERFORM column_name 
  FROM information_schema.columns 
  WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'mailing_list_opt_in';
    
  IF NOT FOUND THEN
    EXECUTE 'ALTER TABLE public.profiles ADD COLUMN mailing_list_opt_in BOOLEAN DEFAULT FALSE';
  END IF;
  
  -- Update the profile
  UPDATE public.profiles
  SET 
    full_name = COALESCE(p_full_name, full_name),
    avatar_url = p_avatar_url, -- Allow NULL to clear the avatar
    job_title = COALESCE(p_job_title, job_title),
    mailing_list_opt_in = COALESCE(p_mailing_list_opt_in, mailing_list_opt_in),
    updated_at = p_updated_at
  WHERE id = p_user_id;
  
  -- Return the updated profile
  SELECT row_to_json(p)::jsonb INTO updated_profile
  FROM public.profiles p
  WHERE p.id = p_user_id;
  
  -- Refresh the schema cache
  PERFORM pg_notify('pgrst', 'reload schema');
  
  RETURN updated_profile;
END;
$$;
