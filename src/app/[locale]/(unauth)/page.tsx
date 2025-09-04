import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { CTA } from '@/templates/CTA';
import { DemoBanner } from '@/templates/DemoBanner';
import { FAQ } from '@/templates/FAQ';
import { Features } from '@/templates/Features';
import { Footer } from '@/templates/Footer';
import { Hero } from '@/templates/Hero';
import { Navbar } from '@/templates/Navbar';
import { Pricing } from '@/templates/Pricing';
import { Sponsors } from '@/templates/Sponsors';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.morningai.me';
  const currentLocale = props.params.locale;

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: currentLocale === 'en' ? `${baseUrl}/en` : `${baseUrl}/${currentLocale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'zh-TW': `${baseUrl}/zh-TW`,
        'zh-CN': `${baseUrl}/zh-CN`,
        'x-default': `${baseUrl}/en`, // 英文作為預設
      },
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url: currentLocale === 'en' ? `${baseUrl}/en` : `${baseUrl}/${currentLocale}`,
      siteName: 'Morning AI',
      locale: currentLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta_title'),
      description: t('meta_description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'index': true,
        'follow': true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      // 添加hreflang標籤到head
      'hreflang-en': `${baseUrl}/en`,
      'hreflang-zh-TW': `${baseUrl}/zh-TW`,
      'hreflang-zh-CN': `${baseUrl}/zh-CN`,
      'hreflang-x-default': `${baseUrl}/en`,
    },
  };
}

const IndexPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <DemoBanner />
      <Navbar />
      <Hero />
      <Sponsors />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
};

export default IndexPage;
