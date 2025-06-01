-- Add missing columns to the categories table
ALTER TABLE public.categories 
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS icon TEXT,
  ADD COLUMN IF NOT EXISTS color TEXT,
  ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES public.categories(id),
  ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Add unique constraint on slug (if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'categories_slug_unique' AND conrelid = 'public.categories'::regclass
  ) THEN
    ALTER TABLE public.categories ADD CONSTRAINT categories_slug_unique UNIQUE (slug);
  END IF;
END $$;

-- Generate slugs for existing categories that don't have them
UPDATE public.categories
SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]', '-', 'g'))
WHERE slug IS NULL;

-- Add RLS policies if they don't exist
DO $$
BEGIN
  -- Enable RLS if not already enabled
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'categories' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
  END IF;
  
  -- Add policies if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'categories' 
    AND policyname = 'Everyone can view categories'
  ) THEN
    CREATE POLICY "Everyone can view categories" 
      ON public.categories 
      FOR SELECT 
      USING (true);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'categories' 
    AND policyname = 'Contributors and admins can insert categories'
  ) THEN
    CREATE POLICY "Contributors and admins can insert categories" 
      ON public.categories 
      FOR INSERT 
      WITH CHECK (
        auth.uid() IN (
          SELECT id FROM public.profiles 
          WHERE user_type IN ('contributor', 'admin')
        )
      );
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'categories' 
    AND policyname = 'Contributors and admins can update categories'
  ) THEN
    CREATE POLICY "Contributors and admins can update categories" 
      ON public.categories 
      FOR UPDATE 
      USING (
        auth.uid() IN (
          SELECT id FROM public.profiles 
          WHERE user_type IN ('contributor', 'admin')
        )
      );
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'categories' 
    AND policyname = 'Contributors and admins can delete categories'
  ) THEN
    CREATE POLICY "Contributors and admins can delete categories" 
      ON public.categories 
      FOR DELETE 
      USING (
        auth.uid() IN (
          SELECT id FROM public.profiles 
          WHERE user_type IN ('contributor', 'admin')
        )
      );
  END IF;
END $$;
