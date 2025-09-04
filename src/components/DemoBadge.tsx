import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const DemoBadge = () => {
  const t = useTranslations('DemoBadge');

  return (
    <div className="fixed bottom-0 right-20 z-10">
      <Link href="/contact">
        <div className="rounded-md bg-gray-900 px-3 py-2 font-semibold text-gray-100 transition-colors hover:bg-gray-800">
          {t('title')}
        </div>
      </Link>
    </div>
  );
};
