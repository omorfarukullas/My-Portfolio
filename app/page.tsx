import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import BlogPreview from './components/BlogPreview';
import ContactSection from './components/ContactSection';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Alternating Rhythm: Cream -> Dark -> Cream -> Dark -> Cream -> Dark */}
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceTimeline />
        <BlogPreview />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
