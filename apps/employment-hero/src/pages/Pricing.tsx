import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { PricingCards } from "@/components/marketing/PricingCards";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { pricingFaqs } from "@/data/faqs";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PricingPage() {
  useDocumentTitle("Pricing");
  return (
    <PageLayout>
      <PageHero
        eyebrow="Pricing"
        title="Plans to suit your business"
        description="Start with HR Essentials or go all-in with Employment Unlimited — payroll, hiring and benefits included."
        actions={<ButtonLink to="/request-demo">Talk to sales</ButtonLink>}
      />
      <Section>
        <div className="container-eh">
          <PricingCards />
          <h2 className="mt-16 text-2xl font-bold">Pricing FAQs</h2>
          <div className="mt-6 max-w-3xl"><Accordion items={pricingFaqs} /></div>
        </div>
      </Section>
    </PageLayout>
  );
}
