-- Function to increment vote counts on threads
CREATE OR REPLACE FUNCTION public.increment_vote(
  thread_id uuid,
  vote_value integer
) RETURNS void AS $$
BEGIN
  IF vote_value > 0 THEN
    UPDATE public.threads 
    SET upvotes = upvotes + 1
    WHERE id = thread_id;
  ELSE
    UPDATE public.threads 
    SET downvotes = downvotes + 1
    WHERE id = thread_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement vote counts on threads
CREATE OR REPLACE FUNCTION public.decrement_vote(
  thread_id uuid,
  vote_value integer
) RETURNS void AS $$
BEGIN
  IF vote_value > 0 THEN
    UPDATE public.threads 
    SET upvotes = GREATEST(0, upvotes - 1)
    WHERE id = thread_id;
  ELSE
    UPDATE public.threads 
    SET downvotes = GREATEST(0, downvotes - 1)
    WHERE id = thread_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.increment_vote(uuid, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.decrement_vote(uuid, integer) TO authenticated;
