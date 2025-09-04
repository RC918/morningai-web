'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

import { analytics, GA_TRACKING_ID } from '@/libs/analytics';

type AnalyticsProps = {
  locale: string;
};

export function Analytics({ locale }: AnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view when pathname or locale changes
    if (GA_TRACKING_ID) {
      analytics.trackPageView(pathname, locale);
    }
  }, [pathname, locale]);

  // Don't render in development or if GA_TRACKING_ID is not set
  if (process.env.NODE_ENV === 'development' || !GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              custom_map: {
                'custom_dimension_1': 'language'
              }
            });
            gtag('event', 'page_view', {
              language: '${locale}',
              custom_dimension_1: '${locale}'
            });
          `,
        }}
      />
    </>
  );
}

export default Analytics;
