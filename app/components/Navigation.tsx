'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Settings } from 'lucide-react';
import Image from 'next/image';

export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check admin status for the current user
  const checkAdminStatus = useCallback(async (userId: string) => {
    try {
      console.log('Checking admin status for user:', userId);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', userId)
        .single();

      if (error) throw error;
      
      const isUserAdmin = profile?.user_type === 'admin';
      console.log('Admin status from DB:', isUserAdmin);
      return isUserAdmin;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }, []);

  // Handle auth state changes
  useEffect(() => {
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        const isUserAuthenticated = !!session?.user;
        
        if (mounted) {
          setIsAuthenticated(isUserAuthenticated);
          setUser(session?.user || null);
          
          if (isUserAuthenticated && session?.user) {
            const adminStatus = await checkAdminStatus(session.user.id);
            if (mounted) setIsAdmin(adminStatus);
          } else {
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
        if (mounted) {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        if (!mounted) return;
        
        const isUserAuthenticated = !!session?.user;
        setIsAuthenticated(isUserAuthenticated);
        setUser(session?.user || null);
        
        if (isUserAuthenticated && session?.user) {
          const adminStatus = await checkAdminStatus(session.user.id);
          if (mounted) setIsAdmin(adminStatus);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // Initialize auth state
    initializeAuth();

    // Cleanup
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [checkAdminStatus]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Debug info (visible in development only)
  const debugInfo = process.env.NODE_ENV === 'development' && (
    <div className="fixed top-24 left-0 p-2 bg-black/50 text-xs text-white z-10 rounded-br-md">
      <div>Auth: {isAuthenticated ? '✅' : '❌'}</div>
      <div>Admin: {isAdmin ? '👑' : '👤'}</div>
      <div className="text-xxs opacity-80">{user?.id?.substring(0, 8)}...</div>
    </div>
  );

  return (
    <>
      <nav className="bg-gradient-to-r from-pink-500 to-blue-600 text-white p-4 shadow-lg relative">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <Image 
                src="/images/logo.png" 
                alt="BAA Logo" 
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl md:text-3xl font-bold">baa</span>
              <span className="text-xs md:text-sm text-white/80">business analysis academy</span>
            </div>
          </Link>
          <div className="space-x-6 flex items-center">
            {isLoading ? (
              <div className="h-8 w-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : isAuthenticated && isAdmin ? (
              /* Admin Settings Cog - Only show for admins */
              <Link 
                href="/admin" 
                className="p-2 rounded-full transition-colors hover:bg-white/20"
                title="Admin Settings"
                onClick={(e) => {
                  // Prevent default navigation
                  e.preventDefault();
                  // Use window.location for direct navigation
                  window.location.href = '/admin';
                }}
              >
                <Settings className="h-5 w-5" />
              </Link>
            ) : null}
            
            {pathname !== '/' && (
              <Link href="/" className="hover:underline hover:text-pink-200 transition-colors">Home</Link>
            )}
            {!pathname.startsWith('/courses') && (
              <Link href="/courses" className="hover:underline hover:text-pink-200 transition-colors">Courses</Link>
            )}
            {!pathname.startsWith('/resources') && (
              <Link href="/resources" className="hover:underline hover:text-pink-200 transition-colors">Resources</Link>
            )}
            {!pathname.startsWith('/bleat') && (
              <Link href="/bleat" className="hover:underline hover:text-pink-200 transition-colors">Bleat</Link>
            )}
            {!pathname.startsWith('/flock') && (
              <Link href="/flock" className="hover:underline hover:text-pink-200 transition-colors">The Flock</Link>
            )}
            {isAuthenticated && !pathname.startsWith('/profile') && (
              <Link href="/profile" className="hover:underline hover:text-pink-200 transition-colors">Profile</Link>
            )}
            {isLoading ? null : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleSignOut}
                  className="bg-white text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                href="/auth" 
                className="bg-white text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
        {debugInfo}
      </nav>
      
      {/* Debug info in console */}
      {process.env.NODE_ENV === 'development' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log('Navigation State:', {
                isAuthenticated: ${isAuthenticated},
                isAdmin: ${isAdmin},
                userId: '${user?.id || 'none'}',
                timestamp: new Date().toISOString()
              });
            `,
          }}
        />
      )}
    </>
  );
}
