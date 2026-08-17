import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { StatBand } from "@/components/marketing/StatBand";
import { Card, CardBody, CardHeading } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FOCUS_AREAS = [
  {
    title: "Accessible advice",
    body: "Enabling the delivery of accessible professional advice to more Australians through productivity gains for financial professionals.",
    points: [
      "Investment menus priced to suit lower balances",
      "SMSF Access reducing the cost of a self-managed structure",
      "CPD-accredited education for the adviser community",
    ],
  },
  {
    title: "Our people",
    body: "Engagement, capability and retention across a growing workforce of more than a thousand people.",
    points: [
      "People engagement of 78%, up from 76% the prior year",
      "Graduate and early-careers pathways into technology roles",
      "Flexible and hybrid working across every state",
    ],
  },
  {
    title: "Trust and resilience",
    body: "Security, privacy and operational resilience for a platform administering client money.",
    points: [
      "Mandatory multi-factor authentication across Group products",
      "Continuous security monitoring and independent assurance",
      "Business continuity testing against APRA prudential standards",
    ],
  },
  {
    title: "Environment",
    body: "Measuring and reducing operational emissions across offices and the technology estate.",
    points: [
      "Scope 1 and 2 emissions measured annually",
      "Cloud workload efficiency targets",
      "Waste and energy programs across the office footprint",
    ],
  },
];

const PROGRESS = [
  { label: "People engagement", value: 78 },
  { label: "Gender balance across the Group", value: 47 },
  { label: "Women in leadership roles", value: 39 },
  { label: "Employees completing security training", value: 96 },
];

export default function SustainabilityPage() {
  return (
    <PageLayout title="Sustainability">
      <PageHero
        eyebrow="About HUB24"
        title="Sustainability at HUB24"
        body="Our values underpin everything we do, are embedded in our sustainability strategy, and are aligned to our ESG key focus areas."
        crumbs={[
          { label: "Home", to: "/" },
          { label: "About us", to: "/about-us/" },
          { label: "Sustainability" },
        ]}
      />

      <Section tone="tint">
        <StatBand
          items={[
            { value: "78%", label: "People engagement", note: "FY26" },
            { value: "1,010", label: "Employees (FTE)" },
            { value: "4", label: "ESG focus areas" },
            { value: "Annual", label: "Sustainability reporting", note: "Published with the annual report" },
          ]}
        />
      </Section>

      <Section>
        <SectionHeading eyebrow="Focus areas" title="Where we concentrate effort" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {FOCUS_AREAS.map((area) => (
            <Card key={area.title} className="flex flex-col gap-4">
              <CardHeading>{area.title}</CardHeading>
              <CardBody>{area.body}</CardBody>
              <CheckList items={area.points} />
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Measures" title="How we track" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PROGRESS.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[0.95rem] font-semibold text-ink-strong">{item.label}</span>
                <span className="font-display text-lg font-semibold text-h24-navy">{item.value}%</span>
              </div>
              <ProgressBar value={item.value} label={item.label} />
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-faint">
          Figures on this page are illustrative for a demonstration build.
        </p>
      </Section>

      <CtaBand
        eyebrow="Shareholders"
        title="Read the full reporting"
        body="Sustainability reporting is published alongside the annual report in the Shareholder Centre."
        primary={{ label: "Financial results", to: "/shareholder-centre/financial-results/" }}
        secondary={{ label: "Corporate governance", to: "/shareholder-centre/corporate-governance/" }}
      />
    </PageLayout>
  );
}
