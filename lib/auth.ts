import { SignJWT, jwtVerify } from 'jose';

const COOKIE_NAME = 'admin_session_token';
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.ADMIN_PASSWORD || 'portfolio-secure-default-secret-key-32chars!';

const getEncodedSecret = () => new TextEncoder().encode(JWT_SECRET.padEnd(32, '!'));

export async function signAdminToken(): Promise<string> {
    return await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(getEncodedSecret());
}

export async function verifyAdminToken(token: string): Promise<boolean> {
    try {
        const { payload } = await jwtVerify(token, getEncodedSecret());
        return payload.role === 'admin';
    } catch {
        return false;
    }
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;
