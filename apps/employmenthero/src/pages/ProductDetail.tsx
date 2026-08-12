import { ArrowRight } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { FeatureRows } from "@/components/marketing/FeatureRows";
import { TestimonialCard } from "@/components/marketing/TestimonialCard";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stat } from "@/components/ui/Stat";
import { getProduct, PRODUCTS } from "@/data/products";
import { TESTIMONIALS } from "@/data/testimonials";

export default function ProductDetailPage() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const related = product.relatedSlugs
    .map((relatedSlug) => PRODUCTS.find((candidate) => candidate.slug === relatedSlug))
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate));

  const testimonial = TESTIMONIALS[PRODUCTS.indexOf(product) % TESTIMONIALS.length]!;

  return (
    <PageLayout title={product.name}>
      <PageHero
        eyebrow={product.category}
        title={product.heroHeadline}
        body={product.heroBody}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          { label: product.name },
        ]}
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
        aside={
          <div className="rounded-eh-xl border border-white/15 bg-white/5 p-8">
            <p className="text-xs font-extrabold tracking-[0.14em] text-eh-violet-soft uppercase">
              What you get
            </p>
            <CheckList items={product.bullets} tone="dark" className="mt-5" />
          </div>
        }
      />

      <Section tone="white" className="py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {product.metrics.map((metric) => (
            <Stat key={metric.label} value={metric.value} label={metric.label} />
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="How it works"
          title={`What ${product.name} does for you`}
          body={product.summary}
          className="mb-12"
        />
        <FeatureRows features={product.features} />
      </Section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <TestimonialCard testimonial={testimonial} />
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Common questions"
              title={`${product.name}, answered`}
            />
            <Accordion items={product.faqs} />
          </div>
        </div>
      </Section>

      {related.length ? (
        <Section tone="tint">
          <SectionHeading eyebrow="Works well with" title="Pairs with" className="mb-10" />
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <LinkCard key={item.slug} to={`/products/${item.slug}`} className="flex flex-col gap-3">
                <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">{item.name}</h3>
                <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{item.summary}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-eh-purple">
                  Learn more
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </span>
              </LinkCard>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </PageLayout>
  );
}
