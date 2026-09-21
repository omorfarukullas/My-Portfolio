import type { Metadata } from 'next';
import { Kalam, Patrick_Hand, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { generatePersonSchema, generateWebSiteSchema, generateProfilePageSchema } from '@/lib/seo';
import { seoConfig } from '@/config/seo';

const kalam = Kalam({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

const patrickHand = Patrick_Hand({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Omor Faruck Ullas — AI/ML, NLP & Software Engineer | UIU',
    template: '%s | Omor Faruck Ullas',
  },
  description: seoConfig.siteDescription,
  keywords: seoConfig.keywords,
  authors: [{ name: 'Omor Faruck Ullas' }],
  creator: 'Omor Faruck Ullas',
  publisher: 'Omor Faruck Ullas',
  metadataBase: new URL(seoConfig.siteUrl),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: seoConfig.locale,
    url: seoConfig.siteUrl,
    siteName: 'Omor Faruck Ullas Portfolio',
    title: 'Omor Faruck Ullas — AI/ML, NLP & Software Engineer | UIU',
    description: seoConfig.siteDescription,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Omor Faruck Ullas — AI/ML, NLP & Software Engineer | UIU' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omor Faruck Ullas — AI/ML, NLP & Software Engineer | UIU',
    description: seoConfig.siteDescription,
    images: ['/opengraph-image'],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProfilePageSchema()) }} />

        {/* Hand-drawn paper theme color */}
        <meta name="theme-color" content="#fdfbf7" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${kalam.variable} ${patrickHand.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

