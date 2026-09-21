import { generatePageMetadata, generateWebPageSchema } from '@/lib/seo';
import { seoConfig } from '@/config/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ContactSection from '@/app/components/ContactSection';

export const metadata = generatePageMetadata({
    title: 'Contact Omor Faruck Ullas — Research & Collaboration | UIU',
    description: 'Get in touch with Omor Faruck Ullas (Omor Faruk Ullas), CSE student at United International University (UIU), Dhaka, for research collaborations, software projects, or academic discussions.',
    canonical: `${seoConfig.siteUrl}/contact`,
});

const webPageSchema = generateWebPageSchema(
    'Contact Omor Faruck Ullas — Research & Collaboration | UIU',
    'Get in touch with Omor Faruck Ullas (Omor Faruk Ullas), CSE student at United International University (UIU), Dhaka, for research collaborations, software projects, or academic discussions.',
    `${seoConfig.siteUrl}/contact`,
);

export default function ContactPage() {
    return (
        <>
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <main style={{ paddingTop: '80px' }}>
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
