-- Add job_title and mailing_list_opt_in fields to profiles table

-- Check if the columns already exist before adding them
DO $$
BEGIN
  -- Add job_title column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'profiles' 
      AND column_name = 'job_title'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN job_title TEXT;
  END IF;

  -- Add mailing_list_opt_in column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'profiles' 
      AND column_name = 'mailing_list_opt_in'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN mailing_list_opt_in BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- Add comments for documentation
COMMENT ON COLUMN public.profiles.job_title IS 'User job title or position';
COMMENT ON COLUMN public.profiles.mailing_list_opt_in IS 'Whether the user has opted in to receive marketing emails';
