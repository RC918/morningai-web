import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import { Section } from '@/features/landing/Section';
import { TeamMember } from '@/components/TeamMember';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'About',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const AboutPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <Navbar />
      
      <Section className="py-36">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight">
            About Morning AI
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            We're on a mission to democratize intelligent design and empower teams to create beautiful products faster than ever before.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At Morning AI, we believe that great design should be accessible to everyone. Our intelligent design platform combines the power of artificial intelligence with human creativity to help teams build better products, faster.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Founded in 2024, we've already helped thousands of designers, developers, and product teams streamline their workflows and create more consistent, accessible, and beautiful user experiences.
            </p>
            <p className="text-lg text-muted-foreground">
              We're backed by leading investors and trusted by companies ranging from innovative startups to Fortune 500 enterprises.
            </p>
          </div>
          <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🌅</div>
              <p className="text-muted-foreground">Morning AI Vision</p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            These core values guide everything we do at Morning AI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-3">Innovation First</h3>
            <p className="text-muted-foreground">
              We constantly push the boundaries of what's possible with AI and design technology.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-3">Human-Centered</h3>
            <p className="text-muted-foreground">
              Technology should amplify human creativity, not replace it. We build tools that empower people.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold mb-3">Accessible Design</h3>
            <p className="text-muted-foreground">
              Great design should be inclusive and accessible to everyone, regardless of ability or background.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're a diverse team of designers, engineers, and AI researchers passionate about the future of design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember
              name="Alex Chen"
              role="CEO & Co-founder"
              bio="Former design lead at Google. Passionate about AI and human-computer interaction."
              image="/api/placeholder/200/200"
              linkedin="#"
              twitter="#"
            />
            
            <TeamMember
              name="Sarah Johnson"
              role="CTO & Co-founder"
              bio="AI researcher with 10+ years experience in machine learning and computer vision."
              image="/api/placeholder/200/200"
              linkedin="#"
              github="#"
            />
            
            <TeamMember
              name="Marcus Rodriguez"
              role="Head of Design"
              bio="Award-winning designer who believes in the power of systematic design thinking."
              image="/api/placeholder/200/200"
              linkedin="#"
              dribbble="#"
            />
            
            <TeamMember
              name="Emily Zhang"
              role="Head of Engineering"
              bio="Full-stack engineer focused on building scalable, performant design tools."
              image="/api/placeholder/200/200"
              linkedin="#"
              github="#"
            />
        </div>
      </Section>

      <Section className="py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We're always looking for talented individuals who share our passion for design and technology. Check out our open positions and help us shape the future of design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/careers"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              View Open Positions
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
};

export default AboutPage;

