import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PillarGrid } from "@/components/marketing/PillarGrid";
import { StatBand } from "@/components/marketing/StatBand";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { CardBody, CardHeading, LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { findAudience } from "@/data/audiences";
import { findFaqs } from "@/data/awards";
import { PRODUCTS } from "@/data/products";
import type { AudienceSlug } from "@/data/types";

export function AudiencePage({ slug }: { slug: AudienceSlug }) {
  const audience = findAudience(slug);

  if (!audience) return null;

  const faqs = findFaqs(audience.faqIds);
  const products = PRODUCTS.filter((product) => product.audience.includes(slug)).slice(0, 6);

  return (
    <PageLayout title={audience.title}>
      <PageHero
        eyebrow={audience.eyebrow}
        title={audience.title}
        body={audience.intro}
        crumbs={[{ label: "Home", to: "/" }, { label: audience.navLabel }]}
        actions={
          <>
            <ButtonLink to="/contact-us/" size="lg">
              Talk to us
            </ButtonLink>
            <ButtonLink to="/features-benefits/" variant="outline" size="lg">
              Platform features
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-h24-xl border border-white/12 bg-white/8 p-7">
            <p className="text-xs font-bold tracking-[0.16em] text-h24-aqua uppercase">
              What you get
            </p>
            <CheckList items={audience.heroPoints} tone="dark" className="mt-4" />
          </div>
        }
      />

      <Section tone="tint">
        <StatBand items={audience.proofPoints} columns={3} />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Why HUB24"
          title="Built around how you actually work"
          body="Capability that removes administration rather than adding features nobody asked for."
        />
        <PillarGrid pillars={audience.pillars} className="mt-10" />
      </Section>

      {products.length > 0 ? (
        <Section tone="tint">
          <SectionHeading eyebrow="Products" title="Relevant products and solutions" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <LinkCard
                key={product.slug}
                to={`/product/${product.slug}/`}
                className="flex h-full flex-col gap-3"
              >
                <span className="text-xs font-bold tracking-[0.16em] text-h24-teal-dark uppercase">
                  {product.category}
                </span>
                <CardHeading>{product.name}</CardHeading>
                <CardBody className="flex-1">{product.tagline}</CardBody>
              </LinkCard>
            ))}
          </div>
        </Section>
      ) : null}

      {faqs.length > 0 ? (
        <Section>
          <SectionHeading eyebrow="Questions" title="Frequently asked" />
          <Accordion
            className="mt-8"
            items={faqs.map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }))}
          />
        </Section>
      ) : null}

      <CtaBand title={audience.ctaTitle} body={audience.ctaBody} />
    </PageLayout>
  );
}
