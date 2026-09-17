'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Top Ink Bar Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(44,45%,92%)] border-b-2 border-[hsl(230,30%,14%)] px-4 sm:px-8 py-3 transition-all duration-150">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          
          {/* Studio Brand Mark & Misregistered Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[hsl(230,30%,14%)] no-underline group"
          >
            {/* Tactile ink block */}
            <div className="w-8 h-8 bg-[hsl(330,100%,60%)] border-2 border-[hsl(230,30%,14%)] riso-shadow-ink-sm flex items-center justify-center font-bold text-xs text-[hsl(230,30%,14%)] font-space">
              OF
            </div>
            <div className="flex flex-col">
              <span className="font-archivo text-base sm:text-lg tracking-tight text-[hsl(230,30%,14%)] uppercase flex items-center">
                {siteConfig.name}
                <span className="text-[hsl(330,100%,60%)] text-xl leading-none ml-0.5">.</span>
              </span>
              <span className="font-space text-[10px] uppercase font-bold tracking-widest text-[hsl(230,12%,38%)] hidden sm:block -mt-1">
                NLP • Systems • Riso Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links — Space Mono uppercase */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
            {siteConfig.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-space text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 border-2 transition-all ${
                    active
                      ? 'bg-[hsl(330,100%,60%)] text-[hsl(230,30%,14%)] border-[hsl(230,30%,14%)] riso-shadow-ink-sm'
                      : 'bg-transparent text-[hsl(230,30%,14%)] border-transparent hover:border-[hsl(230,30%,14%)] hover:bg-[hsl(52,100%,55%)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex btn-riso-pink text-xs"
            >
              Get in Touch →
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden flex items-center justify-center w-10 h-10 border-2 border-[hsl(230,30%,14%)] bg-[hsl(44,45%,92%)] text-[hsl(230,30%,14%)] riso-shadow-ink-sm cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer / Overlay with Zine Aesthetic */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[hsl(230,30%,14%)]/75 backdrop-blur-xs md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-3 right-3 z-50 bg-[hsl(44,45%,92%)] border-3 border-[hsl(230,30%,14%)] riso-shadow-pink p-5 md:hidden flex flex-col gap-4"
              style={{ fontFamily: 'var(--font-space)' }}
            >
              <div className="flex items-center justify-between pb-2 border-b-2 border-[hsl(230,30%,14%)]">
                <span className="riso-tape text-[10px]">
                  INDEX // NAVIGATION
                </span>
                <span className="font-space text-xs font-bold text-[hsl(230,12%,38%)]">
                  OFFSET CLUB ED.
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3 border-2 font-space text-sm font-bold uppercase tracking-wider transition-colors min-h-[44px] flex items-center ${
                      isActive(item.href)
                        ? 'bg-[hsl(330,100%,60%)] text-[hsl(230,30%,14%)] border-[hsl(230,30%,14%)] riso-shadow-ink-sm'
                        : 'bg-white text-[hsl(230,30%,14%)] border-[hsl(230,30%,14%)] hover:bg-[hsl(52,100%,55%)]'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t-2 border-[hsl(230,30%,14%)] mt-1">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="btn-riso-pink w-full justify-center min-h-[44px]"
                >
                  Initiate Dialogue →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
