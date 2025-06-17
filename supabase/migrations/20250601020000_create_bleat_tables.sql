-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create threads table
CREATE TABLE IF NOT EXISTS public.threads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0
);

-- Create comments table (for replies to threads)
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content TEXT NOT NULL,
  thread_id UUID REFERENCES public.threads(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES public.comments(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create votes table (for thread and comment voting)
CREATE TABLE IF NOT EXISTS public.votes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  thread_id UUID REFERENCES public.threads(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  vote_value INTEGER NOT NULL CHECK (vote_value = 1 OR vote_value = -1),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- Ensure a user can only vote once per thread or comment
  CONSTRAINT chk_vote_target CHECK (
    (thread_id IS NOT NULL AND comment_id IS NULL) OR 
    (thread_id IS NULL AND comment_id IS NOT NULL)
  )
);

-- Create partial unique indexes for thread and comment votes
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_thread_vote 
ON public.votes (user_id, thread_id) 
WHERE thread_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_comment_vote 
ON public.votes (user_id, comment_id) 
WHERE comment_id IS NOT NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_threads_author_id ON public.threads(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_thread_id ON public.comments(thread_id);
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON public.comments(author_id);
CREATE INDEX IF NOT EXISTS idx_votes_user_id ON public.votes(user_id);
CREATE INDEX IF NOT EXISTS idx_votes_thread_id ON public.votes(thread_id) WHERE thread_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_votes_comment_id ON public.votes(comment_id) WHERE comment_id IS NOT NULL;

-- Set up Row Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create RLS policies for threads
DROP POLICY IF EXISTS "Threads are viewable by everyone" ON public.threads;
CREATE POLICY "Threads are viewable by everyone"
  ON public.threads FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can create threads" ON public.threads;
CREATE POLICY "Users can create threads"
  ON public.threads FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update their own threads" ON public.threads;
CREATE POLICY "Users can update their own threads"
  ON public.threads FOR UPDATE
  USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can delete their own threads" ON public.threads;
CREATE POLICY "Users can delete their own threads"
  ON public.threads FOR DELETE
  USING (auth.uid() = author_id);

-- Create RLS policies for comments
DROP POLICY IF EXISTS "Comments are viewable by everyone" ON public.comments;
CREATE POLICY "Comments are viewable by everyone"
  ON public.comments FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can create comments" ON public.comments;
CREATE POLICY "Users can create comments"
  ON public.comments FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update their own comments" ON public.comments;
CREATE POLICY "Users can update their own comments"
  ON public.comments FOR UPDATE
  USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can delete their own comments" ON public.comments;
CREATE POLICY "Users can delete their own comments"
  ON public.comments FOR DELETE
  USING (auth.uid() = author_id);

-- Create RLS policies for votes
DROP POLICY IF EXISTS "Users can view their own votes" ON public.votes;
CREATE POLICY "Users can view their own votes"
  ON public.votes
  FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own votes" ON public.votes;
CREATE POLICY "Users can create their own votes"
  ON public.votes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own votes" ON public.votes;
CREATE POLICY "Users can update their own votes"
  ON public.votes
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own votes" ON public.votes;
CREATE POLICY "Users can delete their own votes"
  ON public.votes
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers to update updated_at
CREATE OR REPLACE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_threads_updated_at
BEFORE UPDATE ON public.threads
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_comments_updated_at
BEFORE UPDATE ON public.comments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create a function to handle vote operations
CREATE OR REPLACE FUNCTION public.handle_vote()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle INSERT or UPDATE
    IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.vote_value != NEW.vote_value) THEN
        IF NEW.thread_id IS NOT NULL THEN
            -- Remove old vote if updating
            IF TG_OP = 'UPDATE' AND OLD.vote_value IS NOT NULL THEN
                IF OLD.vote_value = 1 THEN
                    UPDATE public.threads 
                    SET upvotes = GREATEST(0, upvotes - 1)
                    WHERE id = NEW.thread_id;
                ELSE
                    UPDATE public.threads 
                    SET downvotes = GREATEST(0, downvotes - 1)
                    WHERE id = NEW.thread_id;
                END IF;
            END IF;
            
            -- Add new vote
            IF NEW.vote_value = 1 THEN
                UPDATE public.threads 
                SET upvotes = upvotes + 1
                WHERE id = NEW.thread_id;
            ELSIF NEW.vote_value = -1 THEN
                UPDATE public.threads 
                SET downvotes = downvotes + 1
                WHERE id = NEW.thread_id;
            END IF;
        END IF;
    -- Handle DELETE
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.thread_id IS NOT NULL THEN
            IF OLD.vote_value = 1 THEN
                UPDATE public.threads 
                SET upvotes = GREATEST(0, upvotes - 1)
                WHERE id = OLD.thread_id;
            ELSIF OLD.vote_value = -1 THEN
                UPDATE public.threads 
                SET downvotes = GREATEST(0, downvotes - 1)
                WHERE id = OLD.thread_id;
            END IF;
        END IF;
        RETURN OLD;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for votes
CREATE OR REPLACE TRIGGER on_vote_changed
AFTER INSERT OR UPDATE OR DELETE ON public.votes
FOR EACH ROW EXECUTE FUNCTION public.handle_vote();

-- Function to get a user's vote on a thread or comment
CREATE OR REPLACE FUNCTION public.get_user_vote(
  p_user_id uuid,
  p_thread_id uuid DEFAULT NULL,
  p_comment_id uuid DEFAULT NULL
) RETURNS TABLE (vote_value integer) AS $$
BEGIN
  RETURN QUERY
  SELECT v.vote_value::integer
  FROM public.votes v
  WHERE v.user_id = p_user_id
    AND ((p_thread_id IS NOT NULL AND v.thread_id = p_thread_id) 
         OR (p_comment_id IS NOT NULL AND v.comment_id = p_comment_id))
  LIMIT 1;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_vote(uuid, uuid, uuid) TO authenticated;

-- Create a function to create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username' || substr(md5(random()::text), 1, 8),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger for new users
CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to get vote count for a thread or comment
CREATE OR REPLACE FUNCTION public.get_vote_count(item_id UUID, item_type TEXT)
RETURNS TABLE(upvotes BIGINT, downvotes BIGINT) AS $$
BEGIN
    IF item_type = 'thread' THEN
        RETURN QUERY
        SELECT 
            COUNT(*) FILTER (WHERE v.vote_value = 1) AS upvotes,
            COUNT(*) FILTER (WHERE v.vote_value = -1) AS downvotes
        FROM public.votes v
        WHERE v.thread_id = item_id;
    ELSIF item_type = 'comment' THEN
        RETURN QUERY
        SELECT 
            COUNT(*) FILTER (WHERE v.vote_value = 1) AS upvotes,
            COUNT(*) FILTER (WHERE v.vote_value = -1) AS downvotes
        FROM public.votes v
        WHERE v.comment_id = item_id;
    END IF;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
