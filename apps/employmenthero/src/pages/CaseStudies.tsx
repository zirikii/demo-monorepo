import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { LinkCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tabs } from "@/components/ui/Tabs";
import { CASE_STUDIES, CASE_STUDY_INDUSTRIES } from "@/data/caseStudies";

const TABS = ["All", ...CASE_STUDY_INDUSTRIES] as const;
type Tab = (typeof TABS)[number];

export default function CaseStudiesPage() {
  const [industry, setIndustry] = useState<Tab>("All");

  const studies = useMemo(
    () =>
      industry === "All"
        ? CASE_STUDIES
        : CASE_STUDIES.filter((study) => study.industry === industry),
    [industry],
  );

  return (
    <PageLayout title="Customer stories">
      <PageHero
        eyebrow="Customer stories"
        title="Australian businesses running ahead"
        body="Real numbers from operators in hospitality, healthcare, retail, construction and community services."
        crumbs={[{ label: "Home", to: "/" }, { label: "Customer stories" }]}
      />

      <Section tone="white">
        <Tabs tabs={TABS} active={industry} onChange={setIndustry} label="Industry" className="mb-10" />

        {studies.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {studies.map((study) => (
              <LinkCard
                key={study.slug}
                to={`/case-studies/${study.slug}`}
                className="flex flex-col gap-4"
              >
                <span className="text-xs font-extrabold tracking-[0.12em] text-eh-purple uppercase">
                  {study.industry} · {study.location}
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong">
                  {study.company}
                </h2>
                <p className="text-sm text-ink-faint">{study.headcount}</p>
                <p className="flex-1 text-[0.98rem] leading-relaxed text-ink-soft">{study.summary}</p>
                <div className="grid grid-cols-3 gap-3 border-t border-line-soft pt-4">
                  {study.results.map((result) => (
                    <div key={result.label}>
                      <p className="text-xl font-extrabold text-ink-strong">{result.value}</p>
                      <p className="text-xs text-ink-faint">{result.label}</p>
                    </div>
                  ))}
                </div>
              </LinkCard>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No stories in that industry yet"
            body="Switch the filter back to All to see every customer story."
          />
        )}
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
