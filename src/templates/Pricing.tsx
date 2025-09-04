import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { PricingInformation } from '@/features/billing/PricingInformation';
import { Section } from '@/features/landing/Section';
import { PLAN_ID } from '@/utils/AppConfig';

export const Pricing = () => {
  const t = useTranslations('Pricing');

  return (
    <>
      <Section
        subtitle={t('section_subtitle')}
        title={t('section_title')}
        description={t('section_description')}
      >
        <PricingInformation
          buttonList={{
            [PLAN_ID.FREE]: (
              <Link
                className={buttonVariants({
                  size: 'sm',
                  className: 'mt-5 w-full',
                })}
                href="/sign-up"
              >
                {t('button_text')}
              </Link>
            ),
            [PLAN_ID.PREMIUM]: (
              <Link
                className={buttonVariants({
                  size: 'sm',
                  className: 'mt-5 w-full',
                })}
                href="/sign-up"
              >
                {t('button_text')}
              </Link>
            ),
            [PLAN_ID.ENTERPRISE]: (
              <Link
                className={buttonVariants({
                  size: 'sm',
                  className: 'mt-5 w-full',
                })}
                href="/sign-up"
              >
                {t('button_text')}
              </Link>
            ),
          }}
        />
      </Section>

      {/* FAQ CTA Section */}
      <Section className="py-16">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">
            Questions about pricing?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Check out our frequently asked questions or get in touch with our sales team for custom enterprise solutions.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/faq"
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              View FAQ
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({ size: 'lg' })}
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
};
