import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { SiFacebook, SiInstagram, SiX, SiLinkedin, SiGithub, SiKaggle } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { MisregisteredHeading, RisoTape } from './WisprPrimitives';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-[hsl(212,100%,45%)] text-white pt-16 pb-12 mt-16 border-t-3 border-[hsl(230,30%,14%)] relative overflow-hidden"
    >
      <div className="container mx-auto">
        
        {/* Top Zine Header Plate */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b-2 border-white/20">
          <RisoTape rotate={-1}>
            COLOPHON // SPECIFICATION 2026
          </RisoTape>
          <span className="font-space text-xs font-bold uppercase tracking-wider text-white/90">
            PRINTED IN DHAKA, BANGLADESH • 2-COLOR SEPARATION
          </span>
        </div>

        {/* Giant Misregistered Wordmark Banner */}
        <div className="py-8 border-b-2 border-white/20 overflow-hidden">
          <MisregisteredHeading
            as="div"
            ghostColor="yellow"
            offset={4}
            className="text-4xl sm:text-7xl lg:text-9xl font-archivo uppercase tracking-tighter text-white select-none leading-none"
          >
            {siteConfig.name}
          </MisregisteredHeading>
        </div>

        {/* Main Grid: Description + Nav + Social Channels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pt-10 pb-8 items-start">
          
          {/* Studio Bio */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <p className="font-space text-sm sm:text-base text-white/90 max-w-md leading-relaxed">
              {siteConfig.tagline}. Undergraduate researcher investigating low-resource NLP pipelines and architecting resilient software systems.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[hsl(52,100%,55%)] border-2 border-[hsl(230,30%,14%)] text-[hsl(230,30%,14%)] font-space text-xs font-bold uppercase riso-shadow-ink-sm">
                <span className="w-2 h-2 bg-[hsl(330,100%,60%)] border border-[hsl(230,30%,14%)] animate-pulse" />
                AVAILABLE FOR RESEARCH &amp; SOFTWARE WORK
              </span>
            </div>
          </div>

          {/* Quick Nav in Space Mono */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-space text-xs font-bold uppercase tracking-widest text-[hsl(52,100%,55%)]">
              // DIRECTORY
            </span>
            <nav className="flex flex-col gap-2 font-space text-sm font-bold uppercase">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-[hsl(52,100%,55%)] transition-colors w-fit"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="text-white hover:text-[hsl(52,100%,55%)] transition-colors w-fit"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Presence in Tactile Square Buttons */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-space text-xs font-bold uppercase tracking-widest text-[hsl(52,100%,55%)]">
              // TRANSMISSION CHANNELS
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
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
                  className="flex items-center justify-center w-10 h-10 border-2 border-[hsl(230,30%,14%)] bg-white text-[hsl(230,30%,14%)] hover:bg-[hsl(52,100%,55%)] hover:translate-x-0.5 hover:translate-y-0.5 riso-shadow-ink-sm transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Metadata & Print Shop Colophon */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t-2 border-white/20 font-space text-xs text-white/80">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p className="flex items-center gap-2 uppercase tracking-wider text-[11px]">
            <span>OFFSET CLUB RISOGRAPH PALETTE: PINK &amp; BLUE ON CREAM</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
