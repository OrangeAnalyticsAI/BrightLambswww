-- Create and populate categories table
DO $$
BEGIN
  -- Check if categories table exists
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'categories') THEN
    -- Check if slug column exists
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = 'categories' 
        AND column_name = 'slug'
    ) THEN
      -- Add slug column if it doesn't exist
      ALTER TABLE public.categories ADD COLUMN slug TEXT;
      -- Make it unique
      ALTER TABLE public.categories ADD CONSTRAINT categories_slug_unique UNIQUE (slug);
    END IF;
    
    -- Check for other columns and add them if they don't exist
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = 'categories' 
        AND column_name = 'description'
    ) THEN
      ALTER TABLE public.categories ADD COLUMN description TEXT;
    END IF;
    
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = 'categories' 
        AND column_name = 'icon'
    ) THEN
      ALTER TABLE public.categories ADD COLUMN icon TEXT;
    END IF;
    
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = 'categories' 
        AND column_name = 'color'
    ) THEN
      ALTER TABLE public.categories ADD COLUMN color TEXT;
    END IF;
    
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = 'categories' 
        AND column_name = 'parent_id'
    ) THEN
      ALTER TABLE public.categories ADD COLUMN parent_id UUID REFERENCES public.categories(id);
    END IF;
    
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = 'categories' 
        AND column_name = 'order_index'
    ) THEN
      ALTER TABLE public.categories ADD COLUMN order_index INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = 'categories' 
        AND column_name = 'is_active'
    ) THEN
      ALTER TABLE public.categories ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
  ELSE
    -- Create categories table if it doesn't exist
    CREATE TABLE public.categories (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      icon TEXT,
      color TEXT,
      parent_id UUID REFERENCES public.categories(id),
      order_index INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
    
    -- Add RLS policies
    ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
    
    -- Everyone can view categories
    CREATE POLICY "Everyone can view categories" 
      ON public.categories 
      FOR SELECT 
      USING (true);
      
    -- Only contributors and admins can insert categories
    CREATE POLICY "Contributors and admins can insert categories" 
      ON public.categories 
      FOR INSERT 
      WITH CHECK (
        auth.uid() IN (
          SELECT id FROM public.profiles 
          WHERE user_type IN ('contributor', 'admin')
        )
      );
      
    -- Only contributors and admins can update categories
    CREATE POLICY "Contributors and admins can update categories" 
      ON public.categories 
      FOR UPDATE 
      USING (
        auth.uid() IN (
          SELECT id FROM public.profiles 
          WHERE user_type IN ('contributor', 'admin')
        )
      );
      
    -- Only contributors and admins can delete categories
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
  
  -- Update existing slugs or create them if they don't exist
  -- First, make sure all categories have slugs
  UPDATE public.categories
  SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]', '-', 'g'))
  WHERE slug IS NULL;
  
  -- Insert main categories
  INSERT INTO public.categories (name, slug, description, icon, color, order_index)
  VALUES
    ('Business Analysis', 'business-analysis', 'Core business analysis concepts and methodologies', '📊', '#3B82F6', 1),
    ('Requirements Engineering', 'requirements', 'Gathering, documenting, and validating requirements', '📝', '#10B981', 2),
    ('Process Modeling', 'process-modeling', 'Business process modeling and improvement', '🔄', '#F59E0B', 3),
    ('Data Analysis', 'data-analysis', 'Analyzing and interpreting data for business decisions', '📈', '#8B5CF6', 4),
    ('Agile & Scrum', 'agile', 'Agile methodologies and Scrum framework', '🏃', '#EC4899', 5),
    ('Business Architecture', 'business-architecture', 'Enterprise and business architecture principles', '🏛️', '#6366F1', 6),
    ('Digital Transformation', 'digital-transformation', 'Leading and implementing digital change', '💻', '#14B8A6', 7),
    ('Project Management', 'project-management', 'Project planning, execution, and control', '📅', '#F97316', 8)
  ON CONFLICT (name) DO UPDATE
  SET 
    slug = EXCLUDED.slug,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    order_index = EXCLUDED.order_index,
    updated_at = now();
    
  -- Insert subcategories
  WITH parent_categories AS (
    SELECT id, slug, name FROM public.categories
    WHERE slug IN ('business-analysis', 'requirements', 'process-modeling', 'data-analysis', 'agile', 
                  'business-architecture', 'digital-transformation', 'project-management')
  )
  INSERT INTO public.categories (name, slug, description, icon, color, parent_id, order_index)
  VALUES
    ('BABOK Guide', 'babok-guide', 'Business Analysis Body of Knowledge guide and standards', '📘', '#3B82F6', 
     (SELECT id FROM parent_categories WHERE name = 'Business Analysis' OR slug = 'business-analysis' LIMIT 1), 1),
    ('Business Case Development', 'business-case', 'Creating and presenting business cases', '💼', '#3B82F6', 
     (SELECT id FROM parent_categories WHERE name = 'Business Analysis' OR slug = 'business-analysis' LIMIT 1), 2),
    ('Stakeholder Analysis', 'stakeholder-analysis', 'Identifying and managing stakeholders', '👥', '#3B82F6', 
     (SELECT id FROM parent_categories WHERE name = 'Business Analysis' OR slug = 'business-analysis' LIMIT 1), 3),
     
    ('User Stories', 'user-stories', 'Writing effective user stories', '📖', '#10B981', 
     (SELECT id FROM parent_categories WHERE name = 'Requirements Engineering' OR slug = 'requirements' LIMIT 1), 1),
    ('Use Cases', 'use-cases', 'Creating detailed use cases', '🔍', '#10B981', 
     (SELECT id FROM parent_categories WHERE name = 'Requirements Engineering' OR slug = 'requirements' LIMIT 1), 2),
    ('Requirements Elicitation', 'requirements-elicitation', 'Techniques for gathering requirements', '🎯', '#10B981', 
     (SELECT id FROM parent_categories WHERE name = 'Requirements Engineering' OR slug = 'requirements' LIMIT 1), 3),
     
    ('BPMN', 'bpmn', 'Business Process Model and Notation', '📊', '#F59E0B', 
     (SELECT id FROM parent_categories WHERE name = 'Process Modeling' OR slug = 'process-modeling' LIMIT 1), 1),
    ('Process Improvement', 'process-improvement', 'Techniques for optimizing business processes', '⚙️', '#F59E0B', 
     (SELECT id FROM parent_categories WHERE name = 'Process Modeling' OR slug = 'process-modeling' LIMIT 1), 2),
    ('Value Stream Mapping', 'value-stream-mapping', 'Analyzing and improving value streams', '🔗', '#F59E0B', 
     (SELECT id FROM parent_categories WHERE name = 'Process Modeling' OR slug = 'process-modeling' LIMIT 1), 3),
     
    ('SQL Fundamentals', 'sql-fundamentals', 'Basic SQL for business analysts', '🗃️', '#8B5CF6', 
     (SELECT id FROM parent_categories WHERE name = 'Data Analysis' OR slug = 'data-analysis' LIMIT 1), 1),
    ('Data Visualization', 'data-visualization', 'Creating effective data visualizations', '📊', '#8B5CF6', 
     (SELECT id FROM parent_categories WHERE name = 'Data Analysis' OR slug = 'data-analysis' LIMIT 1), 2),
    ('Business Intelligence', 'business-intelligence', 'BI tools and techniques', '🧠', '#8B5CF6', 
     (SELECT id FROM parent_categories WHERE name = 'Data Analysis' OR slug = 'data-analysis' LIMIT 1), 3),
     
    ('Scrum Framework', 'scrum-framework', 'Understanding and implementing Scrum', '🔄', '#EC4899', 
     (SELECT id FROM parent_categories WHERE name = 'Agile & Scrum' OR slug = 'agile' LIMIT 1), 1),
    ('Agile BA Role', 'agile-ba-role', 'The business analyst role in Agile teams', '👤', '#EC4899', 
     (SELECT id FROM parent_categories WHERE name = 'Agile & Scrum' OR slug = 'agile' LIMIT 1), 2),
    ('Kanban', 'kanban', 'Kanban principles and practices', '📋', '#EC4899', 
     (SELECT id FROM parent_categories WHERE name = 'Agile & Scrum' OR slug = 'agile' LIMIT 1), 3)
  ON CONFLICT (name) DO UPDATE
  SET 
    slug = EXCLUDED.slug,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    parent_id = EXCLUDED.parent_id,
    order_index = EXCLUDED.order_index,
    updated_at = now();
END $$;
