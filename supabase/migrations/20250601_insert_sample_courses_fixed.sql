-- Insert sample courses
-- This script only inserts data and creates new tables if needed, without recreating existing policies

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

  -- Insert sample courses
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
    true,
    29.99
  ),
  (
    'Process Modeling with BPMN',
    'Learn how to create effective business process models using the Business Process Model and Notation standard.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    contributor_user_id,
    ARRAY['process-modeling', 'business-analysis'],
    true,
    24.99
  ),
  (
    'Data Analysis for Business Analysts',
    'Develop skills to analyze and interpret data to make informed business decisions.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    contributor_user_id,
    ARRAY['data-analysis', 'business-analysis'],
    false,
    0
  ),
  (
    'Agile Business Analysis',
    'Apply business analysis techniques in an Agile environment to deliver value faster.',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12',
    contributor_user_id,
    ARRAY['agile', 'business-analysis'],
    true,
    34.99
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
      duration INTEGER, -- in seconds
      order_index INTEGER NOT NULL,
      is_free BOOLEAN DEFAULT false,
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
        EXISTS (
          SELECT 1 FROM public.courses c
          WHERE c.id = course_id AND (
            c.contributor_id = auth.uid() OR
            auth.uid() IN (
              SELECT id FROM public.profiles 
              WHERE user_type IN ('contributor', 'admin')
            )
          )
        )
      );
      
    -- Only course creators, contributors, or admins can update lessons
    CREATE POLICY "Course creators, contributors, and admins can update lessons" 
      ON public.lessons 
      FOR UPDATE 
      USING (
        EXISTS (
          SELECT 1 FROM public.courses c
          WHERE c.id = course_id AND (
            c.contributor_id = auth.uid() OR
            auth.uid() IN (
              SELECT id FROM public.profiles 
              WHERE user_type IN ('contributor', 'admin')
            )
          )
        )
      );
      
    -- Only course creators, contributors, or admins can delete lessons
    CREATE POLICY "Course creators, contributors, and admins can delete lessons" 
      ON public.lessons 
      FOR DELETE 
      USING (
        EXISTS (
          SELECT 1 FROM public.courses c
          WHERE c.id = course_id AND (
            c.contributor_id = auth.uid() OR
            auth.uid() IN (
              SELECT id FROM public.profiles 
              WHERE user_type IN ('contributor', 'admin')
            )
          )
        )
      );
  END IF;
  
  -- Insert sample lessons for the first course
  INSERT INTO public.lessons (
    course_id,
    title,
    description,
    content_type,
    content_url,
    duration,
    order_index,
    is_free
  )
  SELECT
    c.id,
    'Introduction to the Course',
    'An overview of what you will learn in this course.',
    'youtube',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', -- Replace with actual YouTube URL
    300, -- 5 minutes
    1,
    true
  FROM public.courses c
  WHERE c.title = 'Introduction to Business Analysis'
  UNION ALL
  SELECT
    c.id,
    'What is Business Analysis?',
    'Understanding the core concepts and role of business analysis.',
    'youtube',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', -- Replace with actual YouTube URL
    900, -- 15 minutes
    2,
    false
  FROM public.courses c
  WHERE c.title = 'Introduction to Business Analysis'
  UNION ALL
  SELECT
    c.id,
    'Business Analysis Techniques',
    'Essential techniques every business analyst should know.',
    'url',
    'https://www.businessanalysisexperts.com/techniques', -- Replace with actual URL
    1200, -- 20 minutes
    3,
    false
  FROM public.courses c
  WHERE c.title = 'Introduction to Business Analysis';
  
  -- Create user_progress table if it doesn't exist
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_progress') THEN
    CREATE TABLE public.user_progress (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
      completed_lessons UUID[] DEFAULT '{}',
      last_viewed_lesson UUID,
      progress_percentage INTEGER DEFAULT 0,
      started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      UNIQUE(user_id, course_id)
    );
    
    -- Add RLS policies
    ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
    
    -- Users can only view their own progress
    CREATE POLICY "Users can view their own progress" 
      ON public.user_progress 
      FOR SELECT 
      USING (auth.uid() = user_id);
      
    -- Users can only insert their own progress
    CREATE POLICY "Users can insert their own progress" 
      ON public.user_progress 
      FOR INSERT 
      WITH CHECK (auth.uid() = user_id);
      
    -- Users can only update their own progress
    CREATE POLICY "Users can update their own progress" 
      ON public.user_progress 
      FOR UPDATE 
      USING (auth.uid() = user_id);
      
    -- Users can only delete their own progress
    CREATE POLICY "Users can delete their own progress" 
      ON public.user_progress 
      FOR DELETE 
      USING (auth.uid() = user_id);
      
    -- Admins can view all progress
    CREATE POLICY "Admins can view all progress" 
      ON public.user_progress 
      FOR SELECT 
      USING (
        auth.uid() IN (
          SELECT id FROM public.profiles 
          WHERE user_type = 'admin'
        )
      );
  END IF;
END $$;
