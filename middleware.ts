import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Define public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/auth',
  '/api/auth/callback',
  '/_next',
  '/favicon.ico',
  '/images',
  '/logo'
];

// Define routes that require authentication
const PROTECTED_ROUTES = [
  '/profile',
  '/dashboard'
];

// Check if the current path is public
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => 
    pathname === route || 
    pathname.startsWith(`${route}/`)
  );
}

// Check if the current path is protected
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => 
    pathname === route || 
    pathname.startsWith(`${route}/`)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`[Middleware] Processing: ${pathname}`);

  // Skip middleware for public routes
  if (isPublicRoute(pathname)) {
    console.log(`[Middleware] Public route, skipping: ${pathname}`);
    return NextResponse.next();
  }

  // Create a response object
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    // Create Supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({
              request: { headers: request.headers },
            });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            request.cookies.set({ 
              name, 
              value: '', 
              ...options, 
              maxAge: 0 
            });
            response = NextResponse.next({
              request: { headers: request.headers },
            });
            response.cookies.set({ 
              name, 
              value: '', 
              ...options, 
              maxAge: 0 
            });
          },
        },
      }
    );

    // Get the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('[Middleware] Session check:', { 
      hasSession: !!session,
      path: pathname,
      error: sessionError?.message
    });

    // Handle unauthenticated users trying to access protected routes
    if (!session && isProtectedRoute(pathname)) {
      console.log('[Middleware] Unauthenticated access to protected route, redirecting to login');
      const redirectUrl = new URL('/auth', request.url);
      redirectUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Handle authenticated users trying to access auth pages
    if (session && pathname.startsWith('/auth')) {
      const redirectTo = request.nextUrl.searchParams.get('redirectedFrom') || '/';
      console.log(`[Middleware] Already authenticated, redirecting to: ${redirectTo}`);
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    // For authenticated users, verify they have a profile
    if (session) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', session.user.id)
        .single();

      if (profileError || !profile) {
        console.error('[Middleware] Profile check failed:', profileError);
        // If no profile exists, create one
        const { error: createError } = await supabase
          .from('profiles')
          .upsert({
            id: session.user.id,
            username: session.user.email?.split('@')[0] || 'user',
            user_type: 'user',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (createError) {
          console.error('[Middleware] Failed to create profile:', createError);
          throw createError;
        }
        console.log('[Middleware] Created new user profile');
      }
    }

    return response;
  } catch (error) {
    console.error('[Middleware] Error:', error);
    // On error, redirect to home with error message
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('error', 'An error occurred. Please try again.');
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
