import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import BlogPreview from './components/BlogPreview';
import ContactSection from './components/ContactSection';
import { RisoMarquee } from './components/WisprPrimitives';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-14 sm:pt-16">
        <RisoMarquee />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <RisoMarquee
          items={[
            '★ REPRODUCIBLE RESEARCH',
            '★ DATASET CURATION',
            '★ TRANSFORMER MODELS',
            '★ DISTRIBUTED SYSTEMS',
            '★ BANGLA NLP BENCHMARKS',
            '★ LOW-RESOURCE PROCESSING',
          ]}
        />
        <ExperienceTimeline />
        <BlogPreview />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
