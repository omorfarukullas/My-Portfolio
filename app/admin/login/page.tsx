'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { TealBadge } from '@/app/components/WisprPrimitives';

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

      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Incorrect password. Access denied.');
    }
  };

  return (
    <div
      className="card-cream max-w-md mx-auto p-8 sm:p-10"
      style={{ fontFamily: 'var(--font-figtree)' }}
    >
      <div className="text-center mb-8 flex flex-col items-center gap-2">
        <TealBadge>Master Access</TealBadge>
        <h1
          className="text-3xl text-[#1a1a1a] mt-1"
          style={{ fontFamily: 'var(--font-eb-garamond)' }}
        >
          Author Authentication
        </h1>
        <p className="text-xs sm:text-sm text-[#8a8a80]">
          Enter master passcode to access dashboard and publishing tools.
        </p>
      </div>

      {status === 'error' && (
        <div className="bg-[#fee2e2] border border-[#dc2626] text-[#b91c1c] text-sm rounded-xl p-3 mb-6">
          ✕ {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="password"
            className="block text-xs uppercase font-semibold tracking-wider text-[#8a8a80] mb-2"
          >
            Passcode
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            className="input-wispr"
            autoFocus
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full mt-2"
        >
          {status === 'loading' ? 'Authenticating…' : 'Access System →'}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20 min-h-screen bg-[#ffffeb] flex items-center justify-center px-4">
        <div className="w-full">
          <Suspense fallback={<div className="text-center text-[#8a8a80]">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
