import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { LinkCard } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BUSINESS_SIZES, INDUSTRIES } from "@/data/solutions";

export default function SolutionsPage() {
  return (
    <PageLayout title="Solutions">
      <PageHero
        eyebrow="Solutions"
        title="Built for the way Australian businesses actually employ"
        body="Award interpretation, compliance obligations and hiring patterns differ by industry and by size. Start from where you are."
        crumbs={[{ label: "Home", to: "/" }, { label: "Solutions" }]}
      />

      <Section tone="white">
        <SectionHeading
          eyebrow="By industry"
          title="Your award, already interpreted"
          body="Pre-built award templates maintained as the Fair Work Commission changes them."
          className="mb-10"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <LinkCard
              key={industry.slug}
              to={`/industry/${industry.slug}`}
              className="flex flex-col gap-3"
            >
              <h3 className="text-xl font-extrabold tracking-tight text-ink-strong">{industry.name}</h3>
              <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{industry.headline}</p>
              <p className="text-sm font-semibold text-eh-purple">
                {industry.stat.value} · {industry.stat.label}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-eh-purple">
                See the solution
                <ArrowRight aria-hidden className="h-4 w-4" />
              </span>
            </LinkCard>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="By business size"
          title="From your first hire to your five hundredth"
          className="mb-10"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {BUSINESS_SIZES.map((size) => (
            <LinkCard
              key={size.slug}
              to={`/business-size/${size.slug}`}
              className="flex flex-col gap-3"
            >
              <span className="text-xs font-extrabold tracking-[0.12em] text-eh-purple uppercase">
                {size.range}
              </span>
              <h3 className="text-xl font-extrabold tracking-tight text-ink-strong">{size.name}</h3>
              <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{size.headline}</p>
              <span className="text-sm font-semibold text-ink-faint">
                Recommended: {size.recommendedPlan}
              </span>
            </LinkCard>
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
