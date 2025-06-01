-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  contributor_id UUID REFERENCES public.profiles(id),
  categories TEXT[] DEFAULT '{}',
  is_premium BOOLEAN DEFAULT false,
  price DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Everyone can view courses
CREATE POLICY "Everyone can view courses" 
  ON public.courses 
  FOR SELECT 
  USING (true);

-- Only contributors and admins can insert courses
CREATE POLICY "Contributors and admins can insert courses" 
  ON public.courses 
  FOR INSERT 
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM public.profiles 
      WHERE user_type IN ('contributor', 'admin')
    )
  );

-- Only the course creator, contributors, or admins can update courses
CREATE POLICY "Course creators, contributors, and admins can update courses" 
  ON public.courses 
  FOR UPDATE 
  USING (
    auth.uid() = contributor_id OR
    auth.uid() IN (
      SELECT id FROM public.profiles 
      WHERE user_type IN ('contributor', 'admin')
    )
  );

-- Only the course creator, contributors, or admins can delete courses
CREATE POLICY "Course creators, contributors, and admins can delete courses" 
  ON public.courses 
  FOR DELETE 
  USING (
    auth.uid() = contributor_id OR
    auth.uid() IN (
      SELECT id FROM public.profiles 
      WHERE user_type IN ('contributor', 'admin')
    )
  );
