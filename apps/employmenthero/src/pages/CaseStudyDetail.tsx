import { Quote } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Card, LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stat } from "@/components/ui/Stat";
import { CASE_STUDIES, getCaseStudy } from "@/data/caseStudies";
import { getProduct } from "@/data/products";

export default function CaseStudyDetailPage() {
  const { slug = "" } = useParams();
  const study = getCaseStudy(slug);

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  const products = study.products
    .map((productSlug) => getProduct(productSlug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  const more = CASE_STUDIES.filter((candidate) => candidate.slug !== study.slug).slice(0, 3);

  return (
    <PageLayout title={study.company}>
      <PageHero
        eyebrow={`${study.industry} · ${study.location}`}
        title={study.company}
        body={study.summary}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Customer stories", to: "/case-studies" },
          { label: study.company },
        ]}
        aside={
          <Card className="border-white/15 bg-white/5">
            <p className="text-xs font-extrabold tracking-[0.14em] text-eh-violet-soft uppercase">
              Results
            </p>
            <div className="mt-5 flex flex-col gap-5">
              {study.results.map((result) => (
                <Stat key={result.label} value={result.value} label={result.label} tone="dark" />
              ))}
            </div>
          </Card>
        }
      />

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold text-ink-faint">{study.headcount}</p>
          <div className="mt-6 flex flex-col gap-6">
            {study.body.map((paragraph, index) => (
              <p key={index} className="text-[1.08rem] leading-[1.75] text-ink">
                {paragraph}
              </p>
            ))}
          </div>

          <figure className="mt-10 rounded-eh-xl border border-line bg-surface-tint p-8">
            <Quote aria-hidden className="h-7 w-7 text-eh-violet-soft" />
            <blockquote className="mt-4 text-xl leading-relaxed font-bold text-ink-strong">
              “{study.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-ink-faint">
              {study.quoteAuthor}, {study.quoteRole} at {study.company}
            </figcaption>
          </figure>
        </div>
      </Section>

      {products.length ? (
        <Section tone="tint">
          <SectionHeading eyebrow="Products used" title="What they run" className="mb-10" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <LinkCard key={product.slug} to={`/products/${product.slug}`} className="flex flex-col gap-2">
                <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">{product.name}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{product.tagline}</p>
              </LinkCard>
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="white">
        <SectionHeading eyebrow="More stories" title="Other businesses like yours" className="mb-10" />
        <div className="grid gap-5 md:grid-cols-3">
          {more.map((item) => (
            <LinkCard key={item.slug} to={`/case-studies/${item.slug}`} className="flex flex-col gap-2">
              <span className="text-xs font-extrabold tracking-[0.12em] text-eh-purple uppercase">
                {item.industry}
              </span>
              <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">{item.company}</h3>
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">{item.summary}</p>
            </LinkCard>
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
