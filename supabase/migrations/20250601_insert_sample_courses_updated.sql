-- Insert sample courses
-- This script only inserts data and creates new tables if needed, without recreating existing policies
-- All courses are set to free (is_premium = false, price = 0)

DO $$
DECLARE
  contributor_user_id UUID;
BEGIN
  -- Try to get a contributor or admin user ID
  SELECT id INTO contributor_user_id FROM profiles 
  WHERE user_type IN ('contributor', 'admin')
  LIMIT 1;
  
  -- If no contributor/admin found, use any user
  IF contributor_user_id IS NULL THEN
    SELECT id INTO contributor_user_id FROM profiles LIMIT 1;
  END IF;

  -- Insert sample courses - all set to free
  INSERT INTO public.courses (
    title, 
    description, 
    image_url, 
    contributor_id, 
    categories, 
    is_premium, 
    price
  ) VALUES 
  (
    'Introduction to Business Analysis',
    'Learn the fundamentals of business analysis and how to apply them in real-world scenarios.',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    contributor_user_id,
    ARRAY['business-analysis', 'requirements'],
    false,
    0
  ),
  (
    'Advanced Requirements Engineering',
    'Master the art of gathering, documenting, and validating requirements for complex projects.',
    'https://images.unsplash.com/photo-1552664730-d307ca884978',
    contributor_user_id,
    ARRAY['requirements', 'business-analysis'],
    false,
    0
  ),
  (
    'Process Modeling with BPMN',
    'Learn how to create effective business process models using the Business Process Model and Notation standard.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    contributor_user_id,
    ARRAY['process-modeling', 'business-analysis'],
    false,
    0
  ),
  (
    'Data Analysis for Business Analysts',
    'Develop essential data analysis skills to make data-driven decisions in your organization.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    contributor_user_id,
    ARRAY['data-analysis', 'business-analysis'],
    false,
    0
  ),
  (
    'Agile Business Analysis',
    'Learn how to apply business analysis techniques in an Agile environment.',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12',
    contributor_user_id,
    ARRAY['agile', 'business-analysis'],
    false,
    0
  );

  -- Create lessons table if it doesn't exist
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'lessons') THEN
    CREATE TABLE public.lessons (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT,
      content_type TEXT NOT NULL, -- 'video', 'youtube', 'url', 'text'
      content_url TEXT,
      content_text TEXT,
      order_index INTEGER DEFAULT 0,
      is_free BOOLEAN DEFAULT true,
      duration INTEGER, -- in seconds
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
    
    -- Add RLS policies
    ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
    
    -- Everyone can view lessons
    CREATE POLICY "Everyone can view lessons" 
      ON public.lessons 
      FOR SELECT 
      USING (true);
      
    -- Only contributors and admins can insert lessons
    CREATE POLICY "Contributors and admins can insert lessons" 
      ON public.lessons 
      FOR INSERT 
      WITH CHECK (
        auth.uid() IN (
          SELECT id FROM public.profiles 
          WHERE user_type IN ('contributor', 'admin')
        )
      );
      
    -- Only contributors and admins can update lessons
    CREATE POLICY "Contributors and admins can update lessons" 
      ON public.lessons 
      FOR UPDATE 
      USING (
        auth.uid() IN (
          SELECT id FROM public.profiles 
          WHERE user_type IN ('contributor', 'admin')
        )
      );
      
    -- Only contributors and admins can delete lessons
    CREATE POLICY "Contributors and admins can delete lessons" 
      ON public.lessons 
      FOR DELETE 
      USING (
        auth.uid() IN (
          SELECT id FROM public.profiles 
          WHERE user_type IN ('contributor', 'admin')
        )
      );
  END IF;
  
  -- Create user_progress table if it doesn't exist
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_progress') THEN
    CREATE TABLE public.user_progress (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
      is_completed BOOLEAN DEFAULT false,
      progress_percent INTEGER DEFAULT 0,
      last_position INTEGER DEFAULT 0, -- for videos, position in seconds
      notes TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      UNIQUE(user_id, lesson_id)
    );
    
    -- Add RLS policies
    ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
    
    -- Users can only view their own progress
    CREATE POLICY "Users can view own progress" 
      ON public.user_progress 
      FOR SELECT 
      USING (auth.uid() = user_id);
      
    -- Users can only insert their own progress
    CREATE POLICY "Users can insert own progress" 
      ON public.user_progress 
      FOR INSERT 
      WITH CHECK (auth.uid() = user_id);
      
    -- Users can only update their own progress
    CREATE POLICY "Users can update own progress" 
      ON public.user_progress 
      FOR UPDATE 
      USING (auth.uid() = user_id);
      
    -- Users can only delete their own progress
    CREATE POLICY "Users can delete own progress" 
      ON public.user_progress 
      FOR DELETE 
      USING (auth.uid() = user_id);
  END IF;
  
  -- Insert sample lessons for the first course
  WITH first_course AS (
    SELECT id FROM public.courses 
    WHERE title = 'Introduction to Business Analysis'
    LIMIT 1
  )
  INSERT INTO public.lessons (
    course_id,
    title,
    description,
    content_type,
    content_url,
    order_index,
    is_free,
    duration
  )
  SELECT
    c.id,
    'Introduction to the Course',
    'An overview of what you will learn in this course.',
    'youtube',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    1,
    true,
    300
  FROM first_course c
  UNION ALL
  SELECT
    c.id,
    'What is Business Analysis?',
    'Understanding the core concepts and value of business analysis.',
    'youtube',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    2,
    true,
    600
  FROM first_course c
  UNION ALL
  SELECT
    c.id,
    'The Business Analysis Process',
    'A step-by-step guide to the business analysis process.',
    'youtube',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    3,
    true,
    900
  FROM first_course c
  UNION ALL
  SELECT
    c.id,
    'Stakeholder Analysis',
    'Identifying and managing stakeholders effectively.',
    'youtube',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    4,
    true,
    750
  FROM first_course c
  UNION ALL
  SELECT
    c.id,
    'Requirements Gathering Techniques',
    'Effective methods for gathering and documenting requirements.',
    'youtube',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    5,
    true,
    1200
  FROM first_course c;
END $$;
