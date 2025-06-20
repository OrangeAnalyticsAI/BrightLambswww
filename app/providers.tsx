'use client';

import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type MaybeSession = Session | null;

type SupabaseContext = {
  session: MaybeSession;
  loading: boolean;
  refreshSession: () => Promise<Session | null>;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
  session: serverSession,
}: {
  children: React.ReactNode;
  session: MaybeSession;
}) {
  const [supabase] = useState(() => createClientComponentClient());
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<MaybeSession>(serverSession);
  const [loading, setLoading] = useState(true);

  // Function to refresh the session
  const refreshSession = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { session: newSession },
      } = await supabase.auth.getSession();
      console.log('[Auth] Session refreshed:', newSession ? 'Authenticated' : 'No session');
      setSession(newSession);
      return newSession;
    } catch (error) {
      console.error('[Auth] Error refreshing session:', error);
      setSession(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Handle auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('[Auth] State changed:', event, {
        hasSession: !!currentSession,
        currentPath: pathname,
      });

      // Update the session state
      setSession(currentSession);

      // Handle specific auth events
      switch (event) {
        case 'SIGNED_IN':
          console.log('[Auth] User signed in, refreshing router');
          // Force a refresh to update the UI
          router.refresh();
          break;

        case 'SIGNED_OUT':
          console.log('[Auth] User signed out, refreshing router');
          setSession(null);
          router.refresh();
          break;

        case 'TOKEN_REFRESHED':
          console.log('[Auth] Token refreshed');
          break;

        case 'USER_UPDATED':
          console.log('[Auth] User updated');
          break;

        default:
          console.log(`[Auth] Unhandled auth event: ${event}`);
      }
    });

    // Initial session check
    const initializeAuth = async () => {
      try {
        await refreshSession();
      } catch (error) {
        console.error('[Auth] Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription?.unsubscribe();
    };
  }, [router, supabase, pathname, refreshSession]);

  // Provide the session and loading state to children
  const value = {
    session,
    loading,
    refreshSession,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useSession = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSession must be used inside SupabaseProvider');
  }
  return context;
};
