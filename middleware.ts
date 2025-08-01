import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/users-control', '/blocked-users', '/statistics'];

export function middleware(request: NextRequest) {
  const chatId = request.cookies.get('chatId')?.value;
  const isAdmin = request.cookies.get('isAdmin')?.value;

  if (protectedRoutes.some(path => request.nextUrl.pathname.startsWith(path))) {
    if (!chatId || isAdmin !== 'true') {
        console.log('Redirecting to /not-authorized');
      return NextResponse.redirect(new URL('/not-authorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/users-control/:path*', '/blocked-users/:path*', '/statistics/:path*'], 
};
