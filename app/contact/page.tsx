import { generatePageMetadata, generateWebPageSchema } from '@/lib/seo';
import { seoConfig } from '@/config/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ContactSection from '@/app/components/ContactSection';

export const metadata = generatePageMetadata({
  title: 'Contact — Omor Faruk Ullas',
  description: 'Initiate a dialogue with Omor Faruk Ullas for research collaborations, engineering roles, or consulting.',
  canonical: `${seoConfig.siteUrl}/contact`,
});

const webPageSchema = generateWebPageSchema(
  'Contact — Omor Faruk Ullas',
  'Initiate a dialogue with Omor Faruk Ullas for research collaborations or engineering roles.',
  `${seoConfig.siteUrl}/contact`,
);

export default function ContactPage() {
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <main className="pt-24 pb-12 min-h-screen bg-[#ffffeb]">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
