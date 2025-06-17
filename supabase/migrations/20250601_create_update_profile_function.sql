-- Create a stored procedure to update profile fields
-- This bypasses the schema cache issue by directly updating the table

CREATE OR REPLACE FUNCTION public.update_profile(
  user_id UUID,
  full_name_val TEXT DEFAULT NULL,
  avatar_url_val TEXT DEFAULT NULL,
  job_title_val TEXT DEFAULT NULL,
  mailing_list_opt_in_val BOOLEAN DEFAULT FALSE,
  updated_at_val TIMESTAMPTZ DEFAULT NOW()
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
  
  -- Same for job_title
  PERFORM column_name 
  FROM information_schema.columns 
  WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'job_title';
    
  IF NOT FOUND THEN
    EXECUTE 'ALTER TABLE public.profiles ADD COLUMN job_title TEXT DEFAULT NULL';
  END IF;
  
  -- Same for mailing_list_opt_in
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
    full_name = COALESCE(full_name_val, full_name),
    avatar_url = COALESCE(avatar_url_val, avatar_url),
    job_title = COALESCE(job_title_val, job_title),
    mailing_list_opt_in = COALESCE(mailing_list_opt_in_val, mailing_list_opt_in),
    updated_at = updated_at_val
  WHERE id = user_id;
  
  -- Return the updated profile
  SELECT row_to_json(p)::jsonb INTO updated_profile
  FROM public.profiles p
  WHERE p.id = user_id;
  
  -- Refresh the schema cache
  PERFORM pg_notify('pgrst', 'reload schema');
  
  result := jsonb_build_object(
    'success', true,
    'profile', updated_profile
  );
  
  RETURN result;
END;
$$;
