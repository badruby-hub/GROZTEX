import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/users-control', '/blocked-users', '/statistics'];

export function middleware(request: NextRequest) {
  const chatId = request.cookies.get('chatId')?.value;
  const isAdmin = request.cookies.get('isAdmin')?.value;

  // Защищаем только конкретные пути
  if (protectedRoutes.some(path => request.nextUrl.pathname.startsWith(path))) {
    if (!chatId || isAdmin !== 'true') {
      return NextResponse.redirect(new URL('/not-authorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/users-control', '/blocked-users', '/statistics'], // Применяем только к этим маршрутам
};
