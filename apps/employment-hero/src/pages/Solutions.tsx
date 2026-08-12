import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProductGrid } from "@/components/marketing/ProductGrid";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getSolution, solutions } from "@/data/industries";
import { getProduct } from "@/data/products";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function SolutionsPage() {
  useDocumentTitle("Solutions");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Solutions"
        title="Start with the problem, not the product."
        blurb="Most teams arrive with one thing that hurts. These are the five we hear about most, and what changes when they are solved."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Solutions" }]}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              to={`/solutions/${solution.slug}`}
              className="focus-eh group flex flex-col rounded-eh-lg border border-eh-line bg-white p-7 transition hover:-translate-y-1 hover:border-eh-purple hover:shadow-eh-lift"
            >
              <h2 className="font-display text-2xl font-bold text-eh-ink group-hover:text-eh-purple">
                {solution.name}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-eh-ink-soft">
                {solution.blurb}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-eh-purple">
                See how it works
                <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}

export function SolutionDetailPage() {
  const { slug = "" } = useParams();
  const solution = getSolution(slug);

  useDocumentTitle(solution?.name ?? "Solutions");

  if (!solution) return <Navigate to="/solutions" replace />;

  const related = solution.relatedProducts
    .map((productSlug) => getProduct(productSlug))
    .filter((product) => product !== undefined);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Solution"
        title={solution.name}
        blurb={solution.blurb}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Solutions", to: "/solutions" },
          { label: solution.name },
        ]}
      />

      <Section>
        <SectionHeading eyebrow="How it works" title="Four steps end to end" />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {solution.steps.map((step, index) => (
            <li key={step.title} className="rounded-eh-lg border border-eh-line bg-white p-6">
              <span className="grid size-9 place-items-center rounded-full bg-eh-purple font-display text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-eh-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-eh-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {related.length ? (
        <Section tone="tint">
          <SectionHeading eyebrow="Products" title="What powers it" />
          <ProductGrid items={related} />
        </Section>
      ) : null}

      <CtaBand />
    </SiteLayout>
  );
}
