import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  const error = 'Missing Supabase environment variables. Please check your .env.* files.';
  console.error(error);
  throw new Error(error);
}

// Log which environment we're using
console.log(`[Supabase] Initializing client for: ${process.env.NODE_ENV} environment`);
console.log(`[Supabase] URL: ${supabaseUrl}`);

// Create a single supabase client for interacting with your database
export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      debug: process.env.NODE_ENV === 'development',
    },
  }
);

// Helper to get the current session
export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    console.log('[Supabase] Current session:', session ? 'Found' : 'Not found');
    return session;
  } catch (error) {
    console.error('[Supabase] Error getting session:', error);
    return null;
  }
};

// Helper to sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log('[Supabase] Successfully signed out');
  } catch (error) {
    console.error('[Supabase] Error signing out:', error);
    throw error;
  }
};

// Helper to get the current user
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('[Supabase] Error getting user:', error);
    return null;
  }
};

// Helper to get the current user's profile
export const getCurrentUserProfile = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) return null;
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (error) throw error;
    return profile;
  } catch (error) {
    console.error('[Supabase] Error getting user profile:', error);
    return null;
  }
};
