import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ContactForm } from '@/components/ContactForm';
import { Section } from '@/features/landing/Section';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Contact',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const ContactPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <Navbar />

      <Section className="py-36">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Have questions about Morning AI? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
            <ContactForm />
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-bold">Other ways to reach us</h2>

            <div className="space-y-8">
              <div>
                <h3 className="mb-2 flex items-center text-lg font-semibold">
                  <svg className="mr-2 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Support
                </h3>
                <p className="mb-2 text-muted-foreground">
                  For general inquiries and support questions
                </p>
                <a href="mailto:support@morningai.me" className="text-primary hover:underline">
                  support@morningai.me
                </a>
              </div>

              <div>
                <h3 className="mb-2 flex items-center text-lg font-semibold">
                  <svg className="mr-2 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
                  </svg>
                  Sales Inquiries
                </h3>
                <p className="mb-2 text-muted-foreground">
                  Interested in Enterprise plans or custom solutions?
                </p>
                <a href="mailto:sales@morningai.me" className="text-primary hover:underline">
                  sales@morningai.me
                </a>
              </div>

              <div>
                <h3 className="mb-2 flex items-center text-lg font-semibold">
                  <svg className="mr-2 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Office Address
                </h3>
                <p className="text-muted-foreground">
                  123 Innovation Drive
                  <br />
                  San Francisco, CA 94105
                  <br />
                  United States
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center text-lg font-semibold">
                  <svg className="mr-2 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Phone Support
                </h3>
                <p className="mb-2 text-muted-foreground">
                  Available Monday-Friday, 9AM-6PM PST
                </p>
                <a href="tel:+1-555-0123" className="text-primary hover:underline">
                  +1 (555) 012-3456
                </a>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-muted p-6">
              <h3 className="mb-2 text-lg font-semibold">💬 Live Chat Support</h3>
              <p className="mb-4 text-muted-foreground">
                Need immediate help? Our AI-powered chat support is available 24/7 to answer your questions.
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
};

export default ContactPage;
