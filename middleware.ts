import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect root path to /services
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/services', request.url));
  }
  
  return NextResponse.next();
}

// Only run the middleware on the root path
export const config = {
  matcher: '/',
};
