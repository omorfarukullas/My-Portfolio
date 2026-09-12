import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import BlogPreview from './components/BlogPreview';
import ContactSection from './components/ContactSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
