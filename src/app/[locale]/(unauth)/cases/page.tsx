import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { CaseCard } from '@/components/CaseCard';
import { CTA } from '@/templates/CTA';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import { Section } from '@/features/landing/Section';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Cases',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const CasesPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <Navbar />
      
      <Section className="py-36">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            Success Stories
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how leading companies use Morning AI to transform their design workflows and accelerate product development.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <CaseCard
            title="TechCorp Reduces Design Time by 60%"
            description="How TechCorp streamlined their design system and reduced time-to-market using Morning AI's intelligent design tools."
            image="/api/placeholder/400/250"
            category="Enterprise"
            readTime="5 min read"
            href="/cases/techcorp"
          />
          
          <CaseCard
            title="StartupX Scales Design Team 3x"
            description="StartupX leveraged Morning AI's automation to scale their design capabilities without hiring additional designers."
            image="/api/placeholder/400/250"
            category="Startup"
            readTime="4 min read"
            href="/cases/startupx"
          />
          
          <CaseCard
            title="DesignStudio Improves Client Delivery"
            description="A design agency improved client satisfaction and delivery speed using Morning AI's collaborative features."
            image="/api/placeholder/400/250"
            category="Agency"
            readTime="6 min read"
            href="/cases/designstudio"
          />
          
          <CaseCard
            title="E-commerce Giant Optimizes UX"
            description="How a major e-commerce platform used Morning AI to optimize user experience across 50+ product pages."
            image="/api/placeholder/400/250"
            category="E-commerce"
            readTime="7 min read"
            href="/cases/ecommerce"
          />
          
          <CaseCard
            title="FinTech Ensures Design Compliance"
            description="A financial technology company maintains regulatory compliance while innovating with Morning AI's secure design tools."
            image="/api/placeholder/400/250"
            category="FinTech"
            readTime="5 min read"
            href="/cases/fintech"
          />
          
          <CaseCard
            title="Healthcare App Improves Accessibility"
            description="A healthcare application enhanced accessibility and user experience using Morning AI's inclusive design features."
            image="/api/placeholder/400/250"
            category="Healthcare"
            readTime="6 min read"
            href="/cases/healthcare"
          />
        </div>
      </Section>

      <CTA />
      <Footer />
    </>
  );
};

export default CasesPage;

