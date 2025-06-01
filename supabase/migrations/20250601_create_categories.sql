-- Create and populate categories table
DO $$
BEGIN
  -- Create categories table if it doesn't exist
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'categories') THEN
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
  ON CONFLICT (slug) DO UPDATE
  SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    order_index = EXCLUDED.order_index,
    updated_at = now();
    
  -- Insert subcategories
  WITH parent_categories AS (
    SELECT id, slug FROM public.categories
  )
  INSERT INTO public.categories (name, slug, description, icon, color, parent_id, order_index)
  VALUES
    ('BABOK Guide', 'babok-guide', 'Business Analysis Body of Knowledge guide and standards', '📘', '#3B82F6', 
     (SELECT id FROM parent_categories WHERE slug = 'business-analysis'), 1),
    ('Business Case Development', 'business-case', 'Creating and presenting business cases', '💼', '#3B82F6', 
     (SELECT id FROM parent_categories WHERE slug = 'business-analysis'), 2),
    ('Stakeholder Analysis', 'stakeholder-analysis', 'Identifying and managing stakeholders', '👥', '#3B82F6', 
     (SELECT id FROM parent_categories WHERE slug = 'business-analysis'), 3),
     
    ('User Stories', 'user-stories', 'Writing effective user stories', '📖', '#10B981', 
     (SELECT id FROM parent_categories WHERE slug = 'requirements'), 1),
    ('Use Cases', 'use-cases', 'Creating detailed use cases', '🔍', '#10B981', 
     (SELECT id FROM parent_categories WHERE slug = 'requirements'), 2),
    ('Requirements Elicitation', 'requirements-elicitation', 'Techniques for gathering requirements', '🎯', '#10B981', 
     (SELECT id FROM parent_categories WHERE slug = 'requirements'), 3),
     
    ('BPMN', 'bpmn', 'Business Process Model and Notation', '📊', '#F59E0B', 
     (SELECT id FROM parent_categories WHERE slug = 'process-modeling'), 1),
    ('Process Improvement', 'process-improvement', 'Techniques for optimizing business processes', '⚙️', '#F59E0B', 
     (SELECT id FROM parent_categories WHERE slug = 'process-modeling'), 2),
    ('Value Stream Mapping', 'value-stream-mapping', 'Analyzing and improving value streams', '🔗', '#F59E0B', 
     (SELECT id FROM parent_categories WHERE slug = 'process-modeling'), 3),
     
    ('SQL Fundamentals', 'sql-fundamentals', 'Basic SQL for business analysts', '🗃️', '#8B5CF6', 
     (SELECT id FROM parent_categories WHERE slug = 'data-analysis'), 1),
    ('Data Visualization', 'data-visualization', 'Creating effective data visualizations', '📊', '#8B5CF6', 
     (SELECT id FROM parent_categories WHERE slug = 'data-analysis'), 2),
    ('Business Intelligence', 'business-intelligence', 'BI tools and techniques', '🧠', '#8B5CF6', 
     (SELECT id FROM parent_categories WHERE slug = 'data-analysis'), 3),
     
    ('Scrum Framework', 'scrum-framework', 'Understanding and implementing Scrum', '🔄', '#EC4899', 
     (SELECT id FROM parent_categories WHERE slug = 'agile'), 1),
    ('Agile BA Role', 'agile-ba-role', 'The business analyst role in Agile teams', '👤', '#EC4899', 
     (SELECT id FROM parent_categories WHERE slug = 'agile'), 2),
    ('Kanban', 'kanban', 'Kanban principles and practices', '📋', '#EC4899', 
     (SELECT id FROM parent_categories WHERE slug = 'agile'), 3)
  ON CONFLICT (slug) DO UPDATE
  SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    parent_id = EXCLUDED.parent_id,
    order_index = EXCLUDED.order_index,
    updated_at = now();
END $$;
