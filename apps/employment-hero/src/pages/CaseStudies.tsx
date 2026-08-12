import { Navigate, useParams } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CaseStudyCard } from "@/components/marketing/CaseStudyCard";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProductGrid } from "@/components/marketing/ProductGrid";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import { getProduct } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function CaseStudiesPage() {
  useDocumentTitle("Case studies");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Case studies"
        title="What changed for teams like yours."
        blurb="Six businesses, six different problems, and the specific numbers that moved once employment admin stopped being manual."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Case studies" }]}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}

export function CaseStudyDetailPage() {
  const { slug = "" } = useParams();
  const study = getCaseStudy(slug);

  useDocumentTitle(study?.company ?? "Case studies");

  if (!study) return <Navigate to="/case-studies" replace />;

  const products = study.products
    .map((productSlug) => getProduct(productSlug))
    .filter((product) => product !== undefined);

  const others = caseStudies.filter((item) => item.slug !== study.slug).slice(0, 3);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={study.industry}
        title={study.company}
        blurb={study.challenge}
        tone="purple"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Case studies", to: "/case-studies" },
          { label: study.company },
        ]}
      >
        <dl className="flex flex-wrap gap-8">
          <div>
            <dt className="text-xs tracking-wide text-white/60 uppercase">Location</dt>
            <dd className="mt-1 font-semibold text-white">{study.location}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-wide text-white/60 uppercase">Size</dt>
            <dd className="mt-1 font-semibold text-white">{study.headcount}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-wide text-white/60 uppercase">Industry</dt>
            <dd className="mt-1 font-semibold text-white">{study.industry}</dd>
          </div>
        </dl>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-eh-ink">The challenge</h2>
              <p className="mt-3 text-lg leading-relaxed text-eh-ink-soft">{study.challenge}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-eh-ink">What they did</h2>
              <p className="mt-3 text-lg leading-relaxed text-eh-ink-soft">{study.solution}</p>
            </div>
            <figure className="rounded-eh-xl bg-eh-purple-wash p-8">
              <blockquote className="font-display text-2xl leading-snug font-semibold text-eh-ink">
                “{study.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm text-eh-ink-faint">
                {study.quoteAuthor}, {study.quoteRole}
              </figcaption>
            </figure>
          </div>

          <aside className="rounded-eh-xl border border-eh-line bg-white p-8">
            <p className="text-xs font-bold tracking-[0.14em] text-eh-ink-faint uppercase">
              Results
            </p>
            <dl className="mt-6 space-y-7">
              {study.results.map((result) => (
                <Stat key={result.label} value={result.value} label={result.label} />
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      {products.length ? (
        <Section tone="tint">
          <SectionHeading eyebrow="Products used" title="What they run on" />
          <ProductGrid items={products} />
        </Section>
      ) : null}

      <Section>
        <SectionHeading eyebrow="More stories" title="Other customers" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {others.map((item) => (
            <CaseStudyCard key={item.slug} study={item} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}
