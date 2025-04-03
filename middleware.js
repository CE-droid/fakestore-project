import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check for authentication - parse the cookie to get auth state
  const authCookie = request.cookies.get('auth-storage')?.value;
  const isAuthenticated = authCookie ? JSON.parse(decodeURIComponent(authCookie)).state.isAuthenticated : false;
  
  // Check if the current route is auth-required
  const isAuthRoute = request.nextUrl.pathname.startsWith('/products');
  const isLoginPage = request.nextUrl.pathname === '/login';
  
  // Handle authentication redirects
  if (isAuthRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('returnUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Redirect authenticated users away from login
  if (isLoginPage && isAuthenticated) {
    const returnUrl = request.nextUrl.searchParams.get('returnUrl') || '/products';
    return NextResponse.redirect(new URL(returnUrl, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/products/:path*',
    '/login'
  ]
};