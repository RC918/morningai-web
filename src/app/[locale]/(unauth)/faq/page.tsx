import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import { Section } from '@/features/landing/Section';
import { FAQAccordion } from '@/components/FAQAccordion';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'FAQ',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const FAQPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  const faqs = [
    {
      question: "What is Morning AI and how does it work?",
      answer: "Morning AI is an intelligent design platform that combines AI-powered tools with design systems to help teams create beautiful products faster. It uses machine learning to automate repetitive design tasks, generate variations, and maintain consistency across your design system."
    },
    {
      question: "How much does Morning AI cost?",
      answer: "We offer three pricing tiers: Basic (free), Professional ($79/month), and Enterprise ($199/month). The Basic plan includes core components and limited AI features, while Professional and Enterprise plans offer full AI access, advanced features, and priority support."
    },
    {
      question: "Can I integrate Morning AI with my existing design tools?",
      answer: "Yes! Morning AI integrates seamlessly with popular design tools like Figma, Sketch, and Adobe XD. We also provide APIs and plugins to connect with your development workflow, including React, Vue, and Angular components."
    },
    {
      question: "Is my design data secure with Morning AI?",
      answer: "Absolutely. We take security seriously with enterprise-grade encryption, SOC 2 compliance, and GDPR compliance. Your design files and data are encrypted in transit and at rest, and we never use your proprietary designs to train our AI models."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes! Our Basic plan is completely free and includes access to core components, basic AI features, and community support. You can upgrade to Professional or Enterprise plans anytime to unlock advanced features."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer multiple support channels: community forums for Basic users, email support for Professional users, and dedicated account management for Enterprise customers. We also provide comprehensive documentation, video tutorials, and live training sessions."
    },
    {
      question: "Can Morning AI help with accessibility compliance?",
      answer: "Yes! Morning AI includes built-in accessibility features that help ensure your designs meet WCAG 2.1 AA standards. Our AI automatically checks color contrast, suggests accessible alternatives, and provides accessibility annotations for your development team."
    },
    {
      question: "How does the AI learn and improve over time?",
      answer: "Our AI continuously learns from design patterns and best practices across the industry (without accessing your proprietary data). We regularly update our models to improve accuracy, add new features, and support emerging design trends."
    },
    {
      question: "Can I use Morning AI for mobile app design?",
      answer: "Absolutely! Morning AI supports responsive design across all platforms - web, mobile, tablet, and desktop. Our component library includes mobile-specific patterns and our AI understands platform-specific design guidelines for iOS and Android."
    },
    {
      question: "What file formats does Morning AI support?",
      answer: "Morning AI supports all major design file formats including .fig (Figma), .sketch (Sketch), .xd (Adobe XD), .psd (Photoshop), and standard formats like PNG, JPG, SVG. We also export to code in React, Vue, Angular, and HTML/CSS."
    },
    {
      question: "How do I migrate my existing design system to Morning AI?",
      answer: "We provide migration tools and dedicated support to help you import your existing design system. Our team can assist with component mapping, style guide conversion, and ensuring your brand guidelines are properly implemented in Morning AI."
    },
    {
      question: "Can multiple team members collaborate in Morning AI?",
      answer: "Yes! Morning AI is built for collaboration. Teams can work together in real-time, share components, maintain version control, and use our commenting and review features. Different permission levels ensure the right people have access to the right features."
    },
    {
      question: "Do you offer custom enterprise features?",
      answer: "Yes! Our Enterprise plan includes custom integrations, white-label options, dedicated infrastructure, advanced security features, and custom AI model training. Contact our sales team to discuss your specific enterprise requirements."
    },
    {
      question: "How often do you release new features?",
      answer: "We release new features and improvements every 2-3 weeks. Major feature releases happen quarterly. All users receive automatic updates, and we maintain backward compatibility to ensure your existing projects continue to work seamlessly."
    },
    {
      question: "What happens if I need to cancel my subscription?",
      answer: "You can cancel your subscription anytime from your account settings. You'll continue to have access to paid features until the end of your billing period, after which you'll be moved to the Basic plan. You can export all your work before canceling."
    }
  ];

  return (
    <>
      <Navbar />
      
      <Section className="py-36">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Find answers to common questions about Morning AI. Can't find what you're looking for? Contact our support team.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <FAQAccordion faqs={faqs} />
        </div>
      </Section>

      <Section className="py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our support team is here to help you get the most out of Morning AI.
          </p>
          <Link
            href="/contact"
            className={buttonVariants({ size: 'lg' })}
          >
            Contact Support
          </Link>
        </div>
      </Section>

      <Footer />
    </>
  );
};

export default FAQPage;

