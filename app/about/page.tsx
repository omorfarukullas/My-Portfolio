import { generatePageMetadata, generateWebPageSchema } from '@/lib/seo';
import { seoConfig } from '@/config/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import AboutSection from '@/app/components/AboutSection';

export const metadata = generatePageMetadata({
  title: 'About — Omor Faruk Ullas',
  description: 'Academic background, research motivations, and engineering philosophy of Omor Faruk Ullas.',
  canonical: `${seoConfig.siteUrl}/about`,
});

const webPageSchema = generateWebPageSchema(
  'About — Omor Faruk Ullas',
  'Learn more about Omor Faruk Ullas, AI/ML and low-resource NLP researcher.',
  `${seoConfig.siteUrl}/about`,
);

export default function AboutPage() {
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <main className="pt-24 pb-12 min-h-screen bg-[#ffffeb]">
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
