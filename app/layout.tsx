import type { Metadata } from 'next';
import { EB_Garamond, Figtree } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { generatePersonSchema, generateWebSiteSchema } from '@/lib/seo';

const ebGaramond = EB_Garamond({
  variable: '--font-eb-garamond',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const siteUrl = 'https://omorfarukullas.vercel.app';

export const metadata: Metadata = {
  title: {
    default: 'Omor Faruk Ullas — AI/ML, NLP & Software Engineer',
    template: '%s | Omor Faruk Ullas',
  },
  description:
    'CSE undergraduate at United International University (UIU), Bangladesh. Focusing on AI/ML, NLP, low-resource language processing, and high-performance software engineering.',
  keywords: [
    'Omor Faruk Ullas', 'AI/ML Researcher', 'NLP',
    'Low-Resource Language Processing', 'Bangla NLP', 'Full Stack Developer',
    'React Developer', 'Node.js', 'TypeScript', 'CSE Student', 'UIU',
    'Bangladesh Developer', 'Software Engineer',
  ],
  authors: [{ name: 'Omor Faruk Ullas' }],
  creator: 'Omor Faruk Ullas',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Omor Faruk Ullas Portfolio',
    title: 'Omor Faruk Ullas — AI/ML, NLP & Software Engineering',
    description: 'CSE undergraduate at UIU focusing on AI/ML, Low-Resource NLP, and Software Engineering.',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Omor Faruk Ullas Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omor Faruk Ullas — AI/ML, NLP & Software Engineering',
    description: 'CSE undergraduate at UIU focusing on AI/ML, Low-Resource NLP, and Software Engineering.',
    images: ['/images/og-image.png'],
    creator: '@omorfarukullas',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* JSON-LD Schemas */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePersonSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteSchema()) }} />

        {/* Recycled Cream Paper theme color */}
        <meta name="theme-color" content="#f2eee3" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/* Google Fonts: Archivo Black + Space Mono for Offset Club Riso Aesthetic */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${ebGaramond.variable} ${figtree.variable} font-sans`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
