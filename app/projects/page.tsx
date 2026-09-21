import { generatePageMetadata, generateWebPageSchema } from '@/lib/seo';
import { seoConfig } from '@/config/seo';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ProjectsSection from '@/app/components/ProjectsSection';

export const metadata = generatePageMetadata({
    title: 'Projects by Omor Faruck Ullas — AI/NLP, Full Stack & IoT',
    description: 'Explore software and engineering projects developed by Omor Faruck Ullas (Omor Faruk Ullas), including MediSheba BD, KaajerBazar, HelioSense solar tracker, and Bangla NLP tools.',
    canonical: `${seoConfig.siteUrl}/projects`,
});

const webPageSchema = generateWebPageSchema(
    'Projects by Omor Faruck Ullas — AI/NLP, Full Stack & IoT',
    'Explore software and engineering projects developed by Omor Faruck Ullas (Omor Faruk Ullas), including MediSheba BD, KaajerBazar, HelioSense solar tracker, and Bangla NLP tools.',
    `${seoConfig.siteUrl}/projects`,
);

export default function ProjectsPage() {
    return (
        <>
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <main style={{ paddingTop: '80px' }}>
                <ProjectsSection />
            </main>
            <Footer />
        </>
    );
}
