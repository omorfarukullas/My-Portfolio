'use client';

import React from 'react';

export const RADIUS = {
    wobbly: '255px 15px 225px 15px / 15px 225px 15px 255px',
    wobblyMd: '20px 255px 20px 255px / 255px 20px 255px 20px',
    wobblySm: '15px 225px 15px 255px / 255px 15px 225px 15px',
    wobblyPill: '255px 25px 225px 25px / 25px 225px 25px 255px',
    wobblyAlt: '15px 255px 15px 255px / 255px 15px 255px 15px',
};

/* Tape strip decorative element */
export function TapeStrip({ className = '', rotate = -1.5 }: { className?: string; rotate?: number }) {
    return (
        <div
            className={`tape-strip ${className}`}
            style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: `translateX(-50%) rotate(${rotate}deg)`,
                width: '84px',
                height: '24px',
                backgroundColor: 'rgba(230, 222, 206, 0.85)',
                border: '1px dashed rgba(45, 45, 45, 0.35)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                zIndex: 5,
                pointerEvents: 'none',
            }}
        />
    );
}

/* Thumbtack pin decorative element */
export function Thumbtack({ color = '#ff4d4d' }: { color?: string }) {
    return (
        <div
            style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '18px',
                height: '18px',
                backgroundColor: color,
                border: '2px solid #2d2d2d',
                borderRadius: '50%',
                boxShadow: '2px 2px 0px #2d2d2d',
                zIndex: 5,
                pointerEvents: 'none',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '3px',
                    left: '3px',
                    width: '4px',
                    height: '4px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                }}
            />
        </div>
    );
}

/* Wobbly Card Container */
interface WobblyCardProps extends React.HTMLAttributes<HTMLDivElement> {
    decoration?: 'tape' | 'tack' | 'none';
    variant?: 'paper' | 'postit' | 'postit-green' | 'postit-blue' | 'postit-orange' | 'elevated';
    rotate?: number;
    hoverLift?: boolean;
    children: React.ReactNode;
}

export function WobblyCard({
    decoration = 'none',
    variant = 'paper',
    rotate = 0,
    hoverLift = true,
    style = {},
    className = '',
    children,
    ...props
}: WobblyCardProps) {
    const bgColors: Record<string, string> = {
        paper: '#ffffff',
        elevated: 'var(--bg-elevated)',
        postit: 'var(--bg-postit)',
        'postit-green': 'var(--bg-postit-green)',
        'postit-blue': 'var(--bg-postit-blue)',
        'postit-orange': 'var(--bg-postit-orange)',
    };

    return (
        <div
            className={`wobbly-card ${className}`}
            style={{
                position: 'relative',
                background: bgColors[variant] || '#ffffff',
                border: '2.5px solid #2d2d2d',
                borderRadius: RADIUS.wobbly,
                boxShadow: '4px 4px 0px 0px #2d2d2d',
                transform: rotate ? `rotate(${rotate}deg)` : 'none',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                ...style,
            }}
            onMouseEnter={
                hoverLift
                    ? (e) => {
                          e.currentTarget.style.transform = `translateY(-3px) ${rotate ? `rotate(${rotate + (rotate > 0 ? 0.5 : -0.5)}deg)` : 'rotate(-0.5deg)'}`;
                          e.currentTarget.style.boxShadow = '8px 8px 0px 0px #2d2d2d';
                      }
                    : undefined
            }
            onMouseLeave={
                hoverLift
                    ? (e) => {
                          e.currentTarget.style.transform = rotate ? `rotate(${rotate}deg)` : 'none';
                          e.currentTarget.style.boxShadow = '4px 4px 0px 0px #2d2d2d';
                      }
                    : undefined
            }
            {...props}
        >
            {decoration === 'tape' && <TapeStrip />}
            {decoration === 'tack' && <Thumbtack />}
            {children}
        </div>
    );
}

/* Sticky Note Tag / Pill */
export function StickyTag({
    color = 'yellow',
    rotate = -1,
    children,
    className = '',
    style = {},
}: {
    color?: 'yellow' | 'green' | 'blue' | 'orange' | 'coral' | 'white';
    rotate?: number;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}) {
    const colorMap: Record<string, string> = {
        yellow: 'var(--bg-postit)',
        green: 'var(--bg-postit-green)',
        blue: 'var(--bg-postit-blue)',
        orange: 'var(--bg-postit-orange)',
        coral: '#ffe4e6',
        white: '#ffffff',
    };

    return (
        <span
            className={`sticky-tag ${className}`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.85rem',
                backgroundColor: colorMap[color] || 'var(--bg-postit)',
                color: '#2d2d2d',
                border: '2px solid #2d2d2d',
                borderRadius: RADIUS.wobblySm,
                boxShadow: '2px 2px 0px #2d2d2d',
                fontFamily: 'Patrick Hand, cursive, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 600,
                transform: `rotate(${rotate}deg)`,
                transition: 'transform 0.15s ease',
                ...style,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = `rotate(${rotate > 0 ? rotate + 1 : rotate - 1}deg) scale(1.05)`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${rotate}deg)`;
            }}
        >
            {children}
        </span>
    );
}

/* Hand-Drawn SVG Squiggle / Divider */
export function HandDrawnDivider({ className = '' }: { className?: string }) {
    return (
        <div className={`flex justify-center my-8 ${className}`} style={{ overflow: 'hidden', padding: '0.5rem 0' }}>
            <svg
                width="240"
                height="16"
                viewBox="0 0 240 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ stroke: '#2d2d2d', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}
            >
                <path d="M4 8C20 3 40 13 60 8C80 3 100 13 120 8C140 3 160 13 180 8C200 3 220 13 236 8" />
            </svg>
        </div>
    );
}

/* Hand-Drawn Arrow */
export function HandDrawnArrow({
    direction = 'right',
    className = '',
    style = {},
}: {
    direction?: 'right' | 'down-right' | 'left' | 'curved';
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <svg
            width="50"
            height="40"
            viewBox="0 0 50 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{
                stroke: 'var(--accent)',
                strokeWidth: 2.5,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeDasharray: '4 4',
                ...style,
            }}
        >
            {direction === 'curved' ? (
                <>
                    <path d="M6 32 C 16 12, 34 8, 44 14" />
                    <path d="M36 6 L 45 14 L 38 22" />
                </>
            ) : (
                <>
                    <path d="M4 20 C 18 16, 32 24, 44 20" />
                    <path d="M36 12 L 45 20 L 37 28" />
                </>
            )}
        </svg>
    );
}

/* Hand-Drawn Star / Sparkle */
export function HandDrawnSparkle({ size = 20, color = '#2d2d2d' }: { size?: number; color?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ stroke: color, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}
        >
            <path d="M12 2 L 12 22 M 2 12 L 22 12 M 5 5 L 19 19 M 19 5 L 5 19" />
        </svg>
    );
}
