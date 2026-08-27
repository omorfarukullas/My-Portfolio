import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Check if path is in the /admin scope
    if (pathname.startsWith('/admin')) {
        const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
        const isValid = token ? await verifyAdminToken(token) : false;

        // If visiting /admin/login while already logged in -> redirect to /admin
        if (pathname === '/admin/login') {
            if (isValid) {
                return NextResponse.redirect(new URL('/admin', req.url));
            }
            return NextResponse.next();
        }

        // For all other /admin routes, require valid token
        if (!isValid) {
            const loginUrl = new URL('/admin/login', req.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
