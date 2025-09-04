import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { StickyBanner } from '@/features/landing/StickyBanner';

export const DemoBanner = () => {
  const t = useTranslations('DemoBanner');

  return (
    <StickyBanner>
      <div className="flex items-center gap-4">
        <span className="text-white">{t('title')}</span>
        <Link
          href="/"
          className={buttonVariants({ variant: 'cta-secondary', size: 'sm' })}
        >
          {t('description')}
        </Link>
      </div>
    </StickyBanner>
  );
};
