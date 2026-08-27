'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { RADIUS, TapeStrip, StickyTag } from '@/app/components/HandDrawn';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect') || '/admin';

    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) return;

        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Authentication failed');
            }

            // Redirect to admin dashboard
            router.push(redirectUrl);
            router.refresh();
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || 'Incorrect password. Access denied.');
        }
    };

    return (
        <div
            style={{
                position: 'relative',
                background: '#ffffff',
                border: '3px solid #2d2d2d',
                borderRadius: RADIUS.wobbly,
                padding: '2.5rem 2rem',
                boxShadow: '6px 6px 0px #2d2d2d',
            }}
        >
            <TapeStrip rotate={-1.5} />

            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <StickyTag color="yellow" rotate={1} style={{ marginBottom: '0.6rem' }}>
                    🔒 Secure Vault
                </StickyTag>
                <h1 style={{
                    fontFamily: 'Kalam, cursive',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#2d2d2d',
                    margin: '0.2rem 0',
                }}>
                    Author Authentication
                </h1>
                <p style={{
                    fontFamily: 'Patrick Hand, cursive',
                    fontSize: '1.05rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                }}>
                    Enter master passcode to manage articles, attachments, and visitor comments.
                </p>
            </div>

            {status === 'error' && (
                <div style={{
                    background: '#fee2e2',
                    border: '2px solid #ef4444',
                    borderRadius: RADIUS.wobblySm,
                    padding: '0.65rem 0.85rem',
                    color: '#b91c1c',
                    fontFamily: 'Patrick Hand, cursive',
                    fontSize: '1rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}>
                    <span>⚠️</span>
                    <span>{errorMessage}</span>
                </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                    <label
                        htmlFor="password"
                        style={{
                            display: 'block',
                            fontFamily: 'Patrick Hand, cursive',
                            fontSize: '1.15rem',
                            fontWeight: 700,
                            color: '#2d2d2d',
                            marginBottom: '0.35rem',
                        }}
                    >
                        Master Passcode 🔑
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        autoFocus
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: RADIUS.wobblySm,
                            border: '2.5px solid #2d2d2d',
                            background: 'var(--bg-elevated)',
                            color: '#2d2d2d',
                            fontSize: '1.1rem',
                            fontFamily: 'Patrick Hand, cursive',
                            boxShadow: '2px 2px 0px #2d2d2d',
                            outline: 'none',
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-sketch"
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        fontSize: '1.15rem',
                        marginTop: '0.5rem',
                        cursor: status === 'loading' ? 'wait' : 'pointer',
                    }}
                >
                    {status === 'loading' ? 'Verifying Key...' : 'Unlock Control Panel 🚀'}
                </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', borderTop: '1.5px dashed #2d2d2d', paddingTop: '1rem' }}>
                <p style={{
                    fontFamily: 'Patrick Hand, cursive',
                    fontSize: '0.92rem',
                    color: 'var(--text-muted)',
                    margin: 0,
                }}>
                    Protected by JWT session token &amp; Next.js security middleware.
                </p>
            </div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <>
            <Header />
            <main style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', paddingBottom: '3rem' }}>
                <div className="container" style={{ maxWidth: '440px' }}>
                    <Suspense fallback={<div style={{ textAlign: 'center', fontFamily: 'Patrick Hand, cursive' }}>Loading Secure Login...</div>}>
                        <LoginForm />
                    </Suspense>
                </div>
            </main>
            <Footer />
        </>
    );
}
