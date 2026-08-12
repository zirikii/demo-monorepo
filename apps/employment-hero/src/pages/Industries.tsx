import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { CaseStudyCard } from "@/components/marketing/CaseStudyCard";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import { getIndustry, industries } from "@/data/industries";
import { caseStudies } from "@/data/caseStudies";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function IndustriesPage() {
  useDocumentTitle("Industry solutions");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Industries"
        title="Built for the awards your team actually works under."
        blurb="Penalty rates, broken shifts, screening checks and site allowances. The difficult parts of Australian employment are industry-specific, so the configuration is too."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Industries" }]}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              to={`/industry/${industry.slug}`}
              className="focus-eh group flex flex-col rounded-eh-lg border border-eh-line bg-white p-6 transition hover:-translate-y-1 hover:border-eh-purple hover:shadow-eh-lift"
            >
              <h2 className="font-display text-xl font-bold text-eh-ink group-hover:text-eh-purple">
                {industry.name}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-eh-ink-soft">
                {industry.blurb}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-eh-purple">
                Explore
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

export function IndustryDetailPage() {
  const { slug = "" } = useParams();
  const industry = getIndustry(slug);

  useDocumentTitle(industry?.name ?? "Industries");

  if (!industry) return <Navigate to="/industry" replace />;

  const related = caseStudies.slice(0, 3);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Industry"
        title={`Employment software for ${industry.name.toLowerCase()}`}
        blurb={industry.blurb}
        tone="purple"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Industries", to: "/industry" },
          { label: industry.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink to="/request-a-demo" variant="inverse">
            Request a demo
          </ButtonLink>
          <Badge tone="lime">{industry.award}</Badge>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading eyebrow="The hard parts" title="What makes this industry different" />
            <ul className="mt-8 space-y-4">
              {industry.challenges.map((challenge) => (
                <li
                  key={challenge}
                  className="rounded-eh-md border border-eh-line bg-white px-5 py-4 text-sm leading-relaxed text-eh-ink-soft"
                >
                  {challenge}
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-eh-xl bg-eh-purple-wash p-8">
            <p className="text-xs font-bold tracking-[0.14em] text-eh-ink-faint uppercase">
              Typical outcomes
            </p>
            <dl className="mt-6 space-y-6">
              {industry.outcomes.map((outcome) => (
                <Stat key={outcome.label} value={outcome.value} label={outcome.label} />
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Proof" title="Teams already running on it" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {related.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}
