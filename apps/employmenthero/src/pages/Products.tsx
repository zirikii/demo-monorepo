import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/data/products";

const CATEGORY_BLURB: Record<string, string> = {
  Hiring: "Reach candidates, screen them fairly, and turn an accepted offer into an onboarded employee.",
  HR: "The employment record and the workflows that act on it.",
  Payroll: "Award interpretation, lodgement and validation on every cycle.",
  Benefits: "The reasons people join and the reasons they stay.",
  Managed: "Hand the employment relationship over entirely.",
};

export default function ProductsPage() {
  return (
    <PageLayout title="Products">
      <PageHero
        eyebrow="Employment OS"
        title="Every part of employment, in one platform"
        body="The world's first Employment Operating System, bringing hiring, HR, payroll and benefits under one roof."
        crumbs={[{ label: "Home", to: "/" }, { label: "Products" }]}
        actions={
          <>
            <ButtonLink to="/request-a-demo" variant="inverse" size="lg">
              Request a demo
            </ButtonLink>
            <ButtonLink
              to="/pricing"
              variant="secondary"
              size="lg"
              className="border-white/40 bg-transparent text-white hover:border-white hover:text-white"
            >
              See pricing
            </ButtonLink>
          </>
        }
      />

      {PRODUCT_CATEGORIES.map((category, index) => {
        const products = PRODUCTS.filter((product) => product.category === category);
        return (
          <Section key={category} tone={index % 2 === 0 ? "white" : "tint"}>
            <SectionHeading
              eyebrow={category}
              title={CATEGORY_BLURB[category] ?? category}
              className="mb-10"
            />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <LinkCard
                  key={product.slug}
                  to={`/products/${product.slug}`}
                  className="flex flex-col gap-3"
                >
                  <h3 className="text-xl font-extrabold tracking-tight text-ink-strong">
                    {product.name}
                  </h3>
                  <p className="text-sm font-semibold text-eh-purple">{product.tagline}</p>
                  <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                    {product.summary}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-eh-purple">
                    Learn more
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </span>
                </LinkCard>
              ))}
            </div>
          </Section>
        );
      })}

      <CtaBand />
    </PageLayout>
  );
}
