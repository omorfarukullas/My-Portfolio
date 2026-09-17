'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Editorial Border Radii
 */
export const RADIUS = {
  wobbly: '32px',
  wobblyMd: '24px',
  wobblySm: '12px',
  wobblyPill: '9999px',
  wobblyAlt: '16px',
};

/**
 * Lavender Underline Accent
 * Hand-drawn SVG wavy / squiggle line in #f0d7ff positioned beneath key headline words
 */
export function LavenderUnderline({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`} style={{ whiteSpace: 'nowrap' }}>
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute left-0 -bottom-2 w-full h-[10px] pointer-events-none z-0"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M 2 7 Q 25 1 50 7 T 98 7"
          stroke="#f0d7ff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Forest Ink Status Badge
 * Fill: #034f46, Text: #ffffeb, Radius: 9999px
 */
export function TealBadge({
  children,
  icon,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium leading-tight rounded-full ${className}`}
      style={{
        backgroundColor: '#034f46',
        color: '#ffffeb',
        fontFamily: 'var(--font-figtree)',
        ...style,
      }}
    >
      {icon}
      {children}
    </span>
  );
}

/**
 * Platform Pill Badge (for dark chamber backgrounds)
 * Fill: transparent, Border: 1.5px solid #ffffff, Text: #ffffeb
 */
export function PlatformBadge({
  children,
  icon,
  active = false,
  onClick,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${className}`}
      style={{
        backgroundColor: active ? 'rgba(255, 255, 235, 0.15)' : 'transparent',
        border: active ? '1.5px solid #f0d7ff' : '1.5px solid rgba(255, 255, 235, 0.4)',
        color: active ? '#f0d7ff' : '#ffffeb',
        fontFamily: 'var(--font-figtree)',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {icon}
      {children}
    </button>
  );
}

/**
 * Dark Square Badge (Inline tag)
 * Fill: #1a1a1a, Text: #ffffeb, Radius: 8px
 */
export function DarkSquareBadge({
  children,
  variant = 'dark',
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  variant?: 'dark' | 'cream';
  className?: string;
  style?: React.CSSProperties;
}) {
  const isDark = variant === 'dark';
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs sm:text-sm font-medium rounded-md ${className}`}
      style={{
        backgroundColor: isDark ? '#1a1a1a' : '#e4e4d0',
        color: isDark ? '#ffffeb' : '#1a1a1a',
        fontFamily: 'var(--font-figtree)',
        borderRadius: '8px',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/**
 * Waveform Visualizer
 * Container: cream pill with 2px ink border
 * Animated vertical pulsing bars
 */
export function WaveformPill({
  className = '',
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center gap-[3px] px-3 py-1.5 rounded-full ${className}`}
      style={{
        backgroundColor: '#ffffeb',
        border: '2px solid #1a1a1a',
        height: '32px',
        ...style,
      }}
      aria-label="Active speech waveform"
    >
      {[
        { height: 14, delay: '0.1s' },
        { height: 22, delay: '0.3s' },
        { height: 10, delay: '0.2s' },
        { height: 18, delay: '0.4s' },
        { height: 12, delay: '0.15s' },
      ].map((bar, i) => (
        <span
          key={i}
          className="waveform-bar"
          style={{
            height: `${bar.height}px`,
            animationDelay: bar.delay,
            backgroundColor: '#1a1a1a',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Dark Velvet Chamber Section Container -> Styled for Riso Aesthetics
 */
export function DarkChamber({
  children,
  className = '',
  style = {},
  id,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden text-[#f2eee3] bg-[hsl(230,30%,14%)] border-2 border-[hsl(230,30%,14%)] riso-shadow-pink ${className}`}
      style={{
        borderRadius: '0px',
        margin: '40px 16px',
        padding: 'clamp(48px, 6vw, 96px) clamp(20px, 4vw, 56px)',
        ...style,
      }}
    >
      <div className="container mx-auto">{children}</div>
    </section>
  );
}

/**
 * Cream Card Container
 */
export function CreamCard({
  children,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`bg-[hsl(44,45%,92%)] border-2 border-[hsl(230,30%,14%)] riso-shadow-ink ${className}`}
      style={{
        borderRadius: '0px',
        padding: '32px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * ============================================
 * OFFSET CLUB RISOGRAPH PRIMITIVES
 * ============================================
 */

/**
 * MisregisteredHeading
 * Renders bold display typography with deliberate physical print misregistration:
 * A foreground ink layer and an offset fluorescent ghost ink layer with micro-drift animation.
 */
export function MisregisteredHeading({
  children,
  as: Component = 'h2',
  className = '',
  ghostColor = 'pink',
  offset = 3,
  style = {},
}: {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  className?: string;
  ghostColor?: 'pink' | 'blue' | 'yellow';
  offset?: number;
  style?: React.CSSProperties;
}) {
  const shouldReduceMotion = useReducedMotion();
  const ghostColors = {
    pink: 'hsl(330, 100%, 60%)',
    blue: 'hsl(212, 100%, 45%)',
    yellow: 'hsl(52, 100%, 55%)',
  };
  const ghostInk = ghostColors[ghostColor] || ghostColors.pink;

  return (
    <Component
      className={`relative inline-block select-none ${className}`}
      style={{
        fontFamily: 'var(--font-archivo), sans-serif',
        ...style,
      }}
    >
      {/* Misregistered ink ghost layer behind */}
      <motion.span
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none select-none z-0"
        style={{
          color: ghostInk,
        }}
        initial={false}
        animate={
          shouldReduceMotion
            ? { x: offset, y: offset }
            : {
                x: [offset, offset + 1.5, offset - 1, offset],
                y: [offset, offset - 1, offset + 1, offset],
              }
        }
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 3.5,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.span>

      {/* Primary ink layer */}
      <span className="relative z-10 block text-[inherit]">
        {children}
      </span>
    </Component>
  );
}

/**
 * DuotoneCard
 * Wraps media in a risograph two-color print treatment (medium blue + fluorescent pink screen blend)
 */
export function DuotoneCard({
  children,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden border-2 border-[hsl(230,30%,14%)] riso-shadow-pink bg-[hsl(212,100%,45%)] ${className}`}
      style={{
        borderRadius: '0px',
        ...style,
      }}
    >
      <div className="relative w-full h-full riso-duotone-wrapper">
        {children}
      </div>
    </div>
  );
}

/**
 * RisoMarquee
 * Loud yellow warning-style studio tape that loops across the screen
 */
export function RisoMarquee({
  items,
  className = '',
}: {
  items?: string[];
  className?: string;
}) {
  const defaultItems = [
    '★ LOW-RESOURCE NLP',
    '★ PRODUCTION SYSTEMS',
    '★ OFFSET PRINT AESTHETIC',
    '★ RESEARCHER @ UIU',
    '★ DHAKA, BANGLADESH',
    '★ ARCHITECTURE & CODE',
    '★ OPEN FOR COLLABORATION',
  ];
  const list = items || defaultItems;
  const repeated = [...list, ...list, ...list, ...list];

  return (
    <div
      className={`w-full bg-[hsl(52,100%,55%)] text-[hsl(230,30%,14%)] border-y-2 border-[hsl(230,30%,14%)] py-2 overflow-hidden select-none z-30 relative ${className}`}
      style={{ fontFamily: 'var(--font-space), monospace' }}
    >
      <div className="animate-riso-marquee flex items-center gap-8 whitespace-nowrap text-xs sm:text-sm font-bold tracking-widest uppercase">
        {repeated.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-4">
            <span>{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * RisoTape
 * Masking tape label with diagonal tilt
 */
export function RisoTape({
  children,
  className = '',
  rotate = -2,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      className={`riso-tape inline-flex items-center ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {children}
    </span>
  );
}

/**
 * Backward compatibility helpers for seamless transition
 */
export function TapeStrip(_props?: { rotate?: number; className?: string; style?: React.CSSProperties }) {
  return null;
}

export function Thumbtack(_props?: { color?: string; className?: string; style?: React.CSSProperties }) {
  return null;
}

export function StickyTag({
  children,
  color = 'yellow',
  rotate = 0,
  style = {},
  className = '',
}: {
  children: React.ReactNode;
  color?: string;
  rotate?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md ${className}`}
      style={{
        backgroundColor: color === 'coral' ? '#034f46' : '#1a1a1a',
        color: '#ffffeb',
        borderRadius: '8px',
        fontFamily: 'var(--font-figtree)',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function HandDrawnDivider(_props?: { className?: string; style?: React.CSSProperties }) {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: '2px solid #1a1a1a',
        margin: '48px 0',
        opacity: 0.15,
      }}
    />
  );
}

export function HandDrawnArrow(_props?: { direction?: string; className?: string; style?: React.CSSProperties }) {
  return null;
}

export function HandDrawnSparkle(_props?: { size?: number; color?: string; className?: string; style?: React.CSSProperties }) {
  return null;
}
