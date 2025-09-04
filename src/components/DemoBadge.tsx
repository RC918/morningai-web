import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/buttonVariants';

export const DemoBadge = () => {
  const t = useTranslations('DemoBadge');

  return (
    <div className="fixed bottom-0 right-20 z-10">
      <Link
        href="/contact"
        className={buttonVariants({ variant: 'cta-primary', size: 'sm' })}
      >
        {t('title')}
      </Link>
    </div>
  );
};
