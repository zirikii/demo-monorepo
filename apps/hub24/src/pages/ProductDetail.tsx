import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProductCard } from "@/components/marketing/ProductCard";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stat } from "@/components/ui/Stat";
import { PRODUCTS, productBySlug } from "@/data/products";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? productBySlug(slug) : undefined;

  if (!product) {
    return <Navigate to="/products-solutions" replace />;
  }

  const related = product.related
    .map((relatedSlug) => PRODUCTS.find((candidate) => candidate.slug === relatedSlug))
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate));

  return (
    <PageLayout title={product.name}>
      <PageHero
        eyebrow={product.eyebrow}
        title={product.tagline}
        body={product.summary}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Products & solutions", to: "/products-solutions" },
          { label: product.name },
        ]}
        actions={
          <>
            <ButtonLink to="/contact-us#demo" variant="inverse">
              Request a demonstration
            </ButtonLink>
            <ButtonLink
              to="/product-documents"
              variant="ghost"
              className="border border-white/40 text-white hover:bg-white/10"
            >
              Product documents
            </ButtonLink>
          </>
        }
        aside={
          <Card tone="navy" className="border border-white/15">
            <span className="text-xs font-extrabold tracking-[0.16em] text-hub-teal-soft uppercase">
              Who it&rsquo;s for
            </span>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.audience.map((audience) => (
                <li key={audience}>
                  <Badge tone="inverse">{audience}</Badge>
                </li>
              ))}
            </ul>
            {product.stats ? (
              <dl className="mt-6 grid gap-4 border-t border-white/15 pt-6">
                {product.stats.map((stat) => (
                  <div key={stat.label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-white/70">{stat.label}</dt>
                    <dd className="text-lg font-extrabold text-white">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </Card>
        }
      />

      <Section>
        <SectionHeading eyebrow={product.brand} title={`Why practices choose ${product.name}`} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {product.highlights.map((highlight) => (
            <Card key={highlight.title} className="flex h-full flex-col gap-3">
              <h3 className="text-xl font-extrabold tracking-tight text-ink-strong">
                {highlight.title}
              </h3>
              <p className="text-ink-soft">{highlight.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {product.sections.map((section, index) => (
        <Section key={section.heading} tone={index % 2 === 0 ? "tint" : "surface"}>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div className="flex flex-col gap-4">
              <SectionHeading title={section.heading} body={section.body} />
            </div>
            {section.bullets ? (
              <Card className="bg-white">
                <CheckList items={section.bullets} />
              </Card>
            ) : null}
          </div>
        </Section>
      ))}

      {product.stats ? (
        <Section tone="navy">
          <div className="grid gap-8 sm:grid-cols-3">
            {product.stats.map((stat) => (
              <Stat key={stat.label} value={stat.value} label={stat.label} tone="light" />
            ))}
          </div>
        </Section>
      ) : null}

      {product.faqs ? (
        <Section>
          <SectionHeading eyebrow="FAQs" title={`${product.name} questions`} />
          <Accordion className="mt-8" items={product.faqs} />
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section tone="tint">
          <SectionHeading eyebrow="Related" title="Works well with" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((relatedProduct) => (
              <ProductCard key={relatedProduct.slug} product={relatedProduct} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </PageLayout>
  );
}
