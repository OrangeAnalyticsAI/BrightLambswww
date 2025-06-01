import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  console.log(`[Middleware] Processing: ${request.nextUrl.pathname}`);
  
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    // Skip middleware for non-protected routes
    const publicRoutes = [
      '/',
      '/auth',
      '/api/auth/callback',
      '/_next/static',
      '/_next/image',
      '/favicon.ico',
    ];

    // Check if the current path is public
    const isPublicRoute = publicRoutes.some(route => 
      request.nextUrl.pathname === route || 
      request.nextUrl.pathname.startsWith(`${route}/`)
    );

    // Skip middleware for public routes
    if (isPublicRoute) {
      return response;
    }

    // Create a Supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            request.cookies.set({
              name,
              value,
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: any) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({
              name,
              value: '',
              ...options,
            });
          },
        },
      }
    );

    // Get the session
    const { data: { session }, error } = await supabase.auth.getSession();
    console.log(`[Middleware] Session exists: ${!!session}`, { error });

    // If there's no session, redirect to login
    if (!session) {
      const redirectUrl = new URL('/auth', request.url);
      redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
      console.log(`[Middleware] No session, redirecting to: ${redirectUrl.toString()}`);
      return NextResponse.redirect(redirectUrl);
    }

    return response;
  } catch (error) {
    console.error('[Middleware] Error:', error);
    // In case of error, redirect to auth page
    const redirectUrl = new URL('/auth', request.url);
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
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
