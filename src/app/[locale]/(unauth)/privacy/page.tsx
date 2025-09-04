import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Section } from '@/features/landing/Section';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Privacy',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const PrivacyPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <Navbar />

      <Section className="py-36">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Last updated: September 4, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Morning AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We may collect personal information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Account credentials and profile information</li>
              <li>Payment and billing information</li>
              <li>Communications with us (support requests, feedback)</li>
            </ul>

            <h3>2.2 Usage Information</h3>
            <p>We automatically collect information about how you use our services:</p>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage patterns and preferences</li>
              <li>Log files and analytics data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3>2.3 Design Data</h3>
            <p>When you use our design tools, we may collect:</p>
            <ul>
              <li>Design files and projects you create</li>
              <li>Collaboration and sharing activities</li>
              <li>AI interaction data (prompts, generated content)</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>Providing and maintaining our services</li>
              <li>Processing transactions and billing</li>
              <li>Improving our AI models and features</li>
              <li>Communicating with you about our services</li>
              <li>Ensuring security and preventing fraud</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2>4. Information Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
            <ul>
              <li>
                <strong>Service Providers:</strong>
                {' '}
                With trusted third-party vendors who assist in operating our services
              </li>
              <li>
                <strong>Legal Requirements:</strong>
                {' '}
                When required by law or to protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong>
                {' '}
                In connection with mergers, acquisitions, or asset sales
              </li>
              <li>
                <strong>Consent:</strong>
                {' '}
                With your explicit consent for specific purposes
              </li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. This includes:
            </p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and audits</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>
              We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you delete your account, we will delete your personal information within 30 days, except where retention is required by law.
            </p>

            <h2>7. Your Rights and Choices</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li>
                <strong>Access:</strong>
                {' '}
                Request access to your personal information
              </li>
              <li>
                <strong>Correction:</strong>
                {' '}
                Request correction of inaccurate information
              </li>
              <li>
                <strong>Deletion:</strong>
                {' '}
                Request deletion of your personal information
              </li>
              <li>
                <strong>Portability:</strong>
                {' '}
                Request a copy of your data in a portable format
              </li>
              <li>
                <strong>Opt-out:</strong>
                {' '}
                Opt-out of certain data processing activities
              </li>
            </ul>

            <h2>8. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie preferences through your browser settings.
            </p>

            <h2>9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information during such transfers.
            </p>

            <h2>10. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@morningai.me</li>
              <li>Address: 123 Innovation Drive, San Francisco, CA 94105</li>
            </ul>
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
};

export default PrivacyPage;
