import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { StickyBanner } from '@/features/landing/StickyBanner';

export const DemoBanner = () => {
  const t = useTranslations('DemoBanner');
  
  return (
    <StickyBanner>
      {t('title')}
      {' '}
      <Link href="/">{t('description')}</Link>
    </StickyBanner>
  );
};
