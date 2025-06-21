import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';

declare global {
  interface Window {
    __supabase?: ReturnType<typeof createBrowserClient<Database>>;
  }
}

export function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined');
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined');
  }

  console.log('Creating Supabase client with URL:', 
    process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Using environment:', process.env.NODE_ENV);

  // Check if we already have a client instance
  if (typeof window !== 'undefined' && window.__supabase) {
    console.log('Using existing Supabase client instance');
    return window.__supabase;
  }

  // Create client with simplified configuration
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        debug: process.env.NODE_ENV === 'development',
        flowType: 'pkce',
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        storageKey: 'sb-auth-token',
      },
      global: {
        headers: {
          'X-Client-Info': 'business-analysis-academy/1.0',
        },
      },
    }
  );

  // Store the client on window for debugging and reuse
  if (typeof window !== 'undefined') {
    window.__supabase = supabase;
  }

  // Add comprehensive auth state logging
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event, session);
    console.log('Current URL:', window.location.href);

    // If we're signed in but no session, try to recover it
    if (event === 'SIGNED_IN' && !session) {
      console.log('Signed in but no session, attempting recovery...');
      supabase.auth.getSession().then(({ data }) => {
        console.log('Recovered session:', data.session);
      });
    }
  });

  // Initial session check
  supabase.auth.getSession().then(({ data: { session } }) => {
    console.log('Initial session check:', session);
  });

  return supabase;
}
