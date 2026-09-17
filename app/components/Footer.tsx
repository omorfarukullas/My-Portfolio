'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { SiFacebook, SiInstagram, SiX, SiLinkedin, SiGithub, SiKaggle } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { TealBadge } from './WisprPrimitives';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-[#1a1a1a] text-[#ffffeb] pt-20 pb-12 mt-20 border-t-2 border-[#1a1a1a]"
      style={{ fontFamily: 'var(--font-figtree)' }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Brand & Editorial Bio */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span
                className="text-3xl sm:text-4xl text-[#ffffeb]"
                style={{ fontFamily: 'var(--font-eb-garamond)', letterSpacing: '-1px' }}
              >
                {siteConfig.name}
              </span>
            </div>
            <p className="text-[#8a8a80] text-base sm:text-lg max-w-md leading-relaxed">
              {siteConfig.tagline}. Researching low-resource NLP and crafting resilient full-stack systems.
            </p>
            <div className="pt-2">
              <TealBadge
                icon={<span className="w-2 h-2 rounded-full bg-[#ffa946] animate-pulse" />}
              >
                Available for research & collaborations
              </TealBadge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span
              className="text-xl text-[#ffffeb]"
              style={{ fontFamily: 'var(--font-eb-garamond)' }}
            >
              Navigation
            </span>
            <nav className="flex flex-col gap-2">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[#8a8a80] hover:text-[#f0d7ff] text-base transition-colors w-fit"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="text-[#8a8a80] hover:text-[#f0d7ff] text-base transition-colors w-fit"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Presence */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span
              className="text-xl text-[#ffffeb]"
              style={{ fontFamily: 'var(--font-eb-garamond)' }}
            >
              Channels
            </span>
            <div className="flex flex-wrap gap-2.5">
              {[
                { icon: <SiGithub size={16} />, href: siteConfig.social.github, label: 'GitHub' },
                { icon: <SiLinkedin size={16} />, href: siteConfig.social.linkedin, label: 'LinkedIn' },
                { icon: <SiKaggle size={16} />, href: siteConfig.social.kaggle, label: 'Kaggle' },
                { icon: <SiX size={16} />, href: siteConfig.social.twitter, label: 'X' },
                { icon: <SiFacebook size={16} />, href: siteConfig.social.facebook, label: 'Facebook' },
                { icon: <SiInstagram size={16} />, href: siteConfig.social.instagram, label: 'Instagram' },
                { icon: <MdEmail size={18} />, href: `mailto:${siteConfig.social.email}`, label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-[#ffffeb] hover:text-[#1a1a1a] hover:bg-[#f0d7ff] hover:border-[#f0d7ff] transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-16 pt-8 border-t border-white/10 text-sm text-[#8a8a80]">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Built on Lumen Cream &amp; Vast Ink</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
