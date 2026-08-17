import { Award as AwardIcon } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { StatBand } from "@/components/marketing/StatBand";
import { Card, CardBody, CardHeading } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AWARDS } from "@/data/awards";
import { GROUP_METRICS } from "@/data/site";

export default function AwardsPage() {
  const years = Array.from(new Set(AWARDS.map((award) => award.year))).sort((a, b) => b - a);

  return (
    <PageLayout title="Awards & ratings">
      <PageHero
        eyebrow="Recognition"
        title="Australia's best platform, rated by advisers"
        body="HUB24 leads the wealth industry as the best provider of integrated platform, technology and data solutions — and we're not done yet."
        crumbs={[{ label: "Home", to: "/" }, { label: "Awards & ratings" }]}
      />

      <Section tone="tint">
        <StatBand
          items={[
            { value: "10", label: "Consecutive quarters ranked #1", note: "For net inflows" },
            { value: `${GROUP_METRICS.marketSharePercent}%`, label: "Platform market share", note: `${GROUP_METRICS.marketRank}th largest by FUA` },
            { value: "#1", label: "Net Promoter Score", note: "Among platform providers" },
            { value: "ASX 100", label: "Index membership", note: "Since September 2024" },
          ]}
        />
      </Section>

      {years.map((year) => (
        <Section key={year} tone={year === years[0] ? "white" : "tint"}>
          <SectionHeading eyebrow={`${year}`} title={`${year} recognition`} />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {AWARDS.filter((award) => award.year === year).map((award) => (
              <Card key={award.title} className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-h24-tint text-h24-teal-dark">
                  <AwardIcon aria-hidden className="h-5 w-5" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <CardHeading className="text-base">{award.title}</CardHeading>
                  <p className="text-xs font-semibold text-h24-teal-dark">{award.awarder}</p>
                  <CardBody className="text-sm">{award.detail}</CardBody>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      ))}

      <Section>
        <p className="max-w-3xl text-sm leading-relaxed text-ink-faint">
          Award and rating references on this page paraphrase publicly reported recognition for the
          HUB24 platform. This is a demonstration build and is not affiliated with HUB24 Limited,
          Investment Trends, Plan for Life or Adviser Ratings.
        </p>
      </Section>

      <CtaBand
        title="See why advisers rate the platform"
        body="Book a walkthrough of the managed portfolio functionality that keeps winning the category."
      />
    </PageLayout>
  );
}
