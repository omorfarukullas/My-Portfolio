import { generatePageMetadata, generateWebPageSchema } from '@/lib/seo';
import { seoConfig } from '@/config/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProjectsSection from '@/app/components/ProjectsSection';

export const metadata = generatePageMetadata({
  title: 'Projects — Omor Faruk Ullas',
  description: 'Portfolio of software architectures and research prototypes built by Omor Faruk Ullas.',
  canonical: `${seoConfig.siteUrl}/projects`,
});

const webPageSchema = generateWebPageSchema(
  'Projects — Omor Faruk Ullas',
  'Explore engineering projects built by Omor Faruk Ullas including healthcare queues and NLP pipelines.',
  `${seoConfig.siteUrl}/projects`,
);

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <main className="pt-20 pb-12 min-h-screen bg-[#ffffeb]">
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
