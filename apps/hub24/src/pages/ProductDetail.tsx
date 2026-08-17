import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeading, LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AUDIENCES } from "@/data/audiences";
import { PRODUCT_DOCUMENTS } from "@/data/documents";
import { findProduct, PRODUCTS } from "@/data/products";
import { formatDate } from "@/lib/format";

export default function ProductDetailPage() {
  const { slug = "" } = useParams();
  const product = findProduct(slug);

  if (!product) {
    return <Navigate to="/products-solutions/" replace />;
  }

  const related = product.relatedSlugs
    .map((related) => PRODUCTS.find((candidate) => candidate.slug === related))
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate));

  const documents = PRODUCT_DOCUMENTS.filter((document) =>
    document.name.toLowerCase().includes(product.name.toLowerCase()),
  ).slice(0, 5);

  const audiences = AUDIENCES.filter((audience) => product.audience.includes(audience.slug));

  return (
    <PageLayout title={product.name}>
      <PageHero
        eyebrow={product.category}
        title={product.name}
        body={product.summary}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Products & solutions", to: "/products-solutions/" },
          { label: product.name },
        ]}
        actions={
          <>
            <ButtonLink to="/contact-us/" size="lg">
              Talk to us
            </ButtonLink>
            <ButtonLink to="/product-documents/" variant="outline" size="lg">
              Product documents
            </ButtonLink>
          </>
        }
        aside={
          <Card className="bg-white/95">
            <p className="text-xs font-bold tracking-[0.16em] text-ink-ghost uppercase">
              At a glance
            </p>
            <dl className="mt-4 flex flex-col divide-y divide-line-soft">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 py-2.5 text-sm">
                  <dt className="text-ink-faint">{spec.label}</dt>
                  <dd className="text-right font-semibold text-ink-strong">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        }
      />

      <Section>
        <SectionHeading eyebrow="Highlights" title={product.tagline} />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {product.highlights.map((highlight) => (
            <Card key={highlight.title} className="flex flex-col gap-3">
              <CardHeading>{highlight.title}</CardHeading>
              <CardBody>{highlight.body}</CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {audiences.length > 0 ? (
        <Section tone="tint">
          <SectionHeading eyebrow="Who it's for" title="Relevant audiences" />
          <div className="mt-8 flex flex-wrap gap-3">
            {audiences.map((audience) => (
              <ButtonLink key={audience.slug} to={audience.path} variant="secondary" size="sm">
                {audience.navLabel}
              </ButtonLink>
            ))}
          </div>
        </Section>
      ) : null}

      {documents.length > 0 ? (
        <Section>
          <SectionHeading eyebrow="Disclosure" title="Documents for this product" />
          <ul className="mt-8 divide-y divide-line rounded-h24-lg border border-line bg-white">
            {documents.map((document) => (
              <li key={document.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
                <Badge tone="neutral">{document.type}</Badge>
                <span className="flex-1 text-[0.95rem] font-medium text-ink">{document.name}</span>
                <span className="text-xs text-ink-faint">Updated {formatDate(document.updated)}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section tone="tint">
          <SectionHeading eyebrow="Related" title="You might also look at" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((candidate) => (
              <LinkCard
                key={candidate.slug}
                to={`/product/${candidate.slug}/`}
                className="flex h-full flex-col gap-2"
              >
                <span className="text-xs font-bold tracking-[0.16em] text-h24-teal-dark uppercase">
                  {candidate.category}
                </span>
                <CardHeading>{candidate.name}</CardHeading>
                <CardBody>{candidate.tagline}</CardBody>
              </LinkCard>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title={`Talk to us about ${product.name}`}
        body="Your Business Development Manager can walk through how it works with the clients you service."
      />
    </PageLayout>
  );
}
