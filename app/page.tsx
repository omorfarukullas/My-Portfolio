import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import BlogPreview from './components/BlogPreview';
import ContactSection from './components/ContactSection';

import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  canonical: 'https://omorfarukullas.vercel.app',
});

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BlogPreview />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
