import { NextRequest, NextResponse } from 'next/server';
import { signAdminToken, verifyAdminToken, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    const isValid = token ? await verifyAdminToken(token) : false;
    return NextResponse.json({ authenticated: isValid });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { password } = body;

        const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

        if (!password || password !== expectedPassword) {
            return NextResponse.json(
                { error: 'Invalid password. Access denied.' },
                { status: 401 }
            );
        }

        const token = await signAdminToken();

        const response = NextResponse.json({
            success: true,
            message: 'Authentication successful',
        });

        response.cookies.set({
            name: AUTH_COOKIE_NAME,
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return response;
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
