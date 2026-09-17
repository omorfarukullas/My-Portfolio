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
      {/* Floating Cream Navigation Pill */}
      <header
        className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div
          className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 bg-[#ffffeb] border-2 border-[#1a1a1a] rounded-full px-4 sm:px-6 py-2 sm:py-2.5 w-full max-w-[1020px] transition-all duration-200"
          style={{ fontFamily: 'var(--font-figtree)' }}
        >
          {/* Brand Mark & Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[#1a1a1a] no-underline group"
          >
            {/* Bar-chart mark */}
            <div className="flex items-end gap-[3px] h-4">
              <span className="w-[3px] h-2.5 bg-[#1a1a1a] rounded-full group-hover:h-3.5 transition-all duration-200" />
              <span className="w-[3px] h-4 bg-[#1a1a1a] rounded-full" />
              <span className="w-[3px] h-3 bg-[#1a1a1a] rounded-full group-hover:h-4 transition-all duration-200" />
            </div>
            <span className="font-semibold text-base sm:text-lg tracking-tight text-[#1a1a1a]">
              {siteConfig.initials}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {siteConfig.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    active
                      ? 'text-[#1a1a1a] font-semibold bg-[#e4e4d0]'
                      : 'text-[#222222] hover:text-[#1a1a1a] hover:bg-[#ffffeb]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Pinned Right CTA + Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center bg-[#f0d7ff] text-[#1a1a1a] border-2 border-[#1a1a1a] rounded-[12px] px-4 py-1.5 text-sm font-medium hover:bg-[#e6c2fd] transition-colors"
            >
              Get in Touch
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border-2 border-[#1a1a1a] bg-[#ffffeb] text-[#1a1a1a] cursor-pointer"
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[#1a1a1a]/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-4 right-4 z-50 bg-[#ffffeb] border-2 border-[#1a1a1a] rounded-[32px] p-6 md:hidden flex flex-col gap-3"
              style={{ fontFamily: 'var(--font-figtree)' }}
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-[#8a8a80] pb-2 border-b border-[#e4e4d0]">
                Navigation
              </div>
              <div className="flex flex-col gap-1.5">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-[#e4e4d0] text-[#1a1a1a] font-semibold'
                        : 'text-[#222222] hover:bg-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-[#e4e4d0] mt-1">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-full bg-[#f0d7ff] text-[#1a1a1a] border-2 border-[#1a1a1a] rounded-[12px] py-3 text-base font-medium"
                >
                  Get in Touch →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
