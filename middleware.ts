import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "./auth"

// Make this function async to properly await the auth result
export async function middleware(request: NextRequest) {
  // Check if this is the home page
  const pathname = request.nextUrl.pathname;
  if (pathname === '/' || pathname === '/sign-in') {
    return NextResponse.next();
  }

  const session = await auth()

  // If the user is not authenticated
  if (!session) {
    // Redirect to the sign-in page
    const signInUrl = new URL('/api/auth/signin', request.url)
    // Add a "callbackUrl" parameter so the user is redirected back after login
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  // User is authenticated, allow the request to proceed
  return NextResponse.next()
}

// This matcher focuses on routes that require authentication
export const config = {
  matcher: [
    // Protect specific routes
    // '/dashboard/:path*',
    // '/profile/:path*',
    // '/resume/:path*',
    // Add other protected routes here

    // Exclude common public paths
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}
