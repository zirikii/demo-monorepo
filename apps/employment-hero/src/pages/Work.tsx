import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { FeatureRows } from "@/components/marketing/FeatureRows";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardTitle } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const pillars = [
  {
    name: "Work",
    body: "Rosters, shift swaps, clock-in and leave requests, all from the phone in your pocket.",
  },
  {
    name: "Money",
    body: "Payslips the moment they are issued, earned wage access, and a Swag Spend account.",
  },
  {
    name: "Career",
    body: "Goals, feedback, learning and your next role — matched by SmartMatch when you want it.",
  },
  {
    name: "Benefits",
    body: "Cashback, discounts, novated leasing and a confidential employee assistance program.",
  },
];

export function WorkPage() {
  useDocumentTitle("Employment Hero Work");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="For employees"
        title="Everything work. One app."
        blurb="Employment Hero Work puts payslips, rosters, leave, recognition and benefits in the app your team already checks between shifts."
        tone="purple"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Employment Hero Work" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/start-free" variant="inverse">
            Get started
          </ButtonLink>
          <ButtonLink
            to="/products/employee-experience"
            variant="ghost"
            className="border border-white/40 text-white hover:bg-white/10"
          >
            For employers
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Four pillars"
          title="Built around the four things employees actually open an app for"
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <Card key={pillar.name}>
              <CardTitle>{pillar.name}</CardTitle>
              <CardBody>{pillar.body}</CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <FeatureRows
          rows={[
            {
              eyebrow: "Money",
              title: "See your pay, and reach it earlier",
              body: "Payslips land in the app the moment they are issued, and earned wage access lets you draw on wages you have already worked for.",
              points: [
                "Payslips and year-to-date totals",
                "Up to 50% of earned wages, before payday",
                "Swag Spend budgeting and cashback",
              ],
            },
            {
              eyebrow: "Work",
              title: "Your roster, without the group chat",
              body: "Shifts, swaps and leave requests all happen in one place, and your manager sees them immediately.",
              points: [
                "Clock on and off with geofencing",
                "Bid on open shifts or swap with a teammate",
                "Request leave and see the balance update",
              ],
            },
          ]}
        />
      </Section>

      <CtaBand
        title="Ask your employer about the Work app."
        blurb="It is included for every employee on any Employment Hero plan, at no cost to you."
        primaryLabel="Explore benefits"
        primaryTo="/products/employee-experience"
        secondaryLabel="Employee resources"
        secondaryTo="/resources/employees"
      />
    </SiteLayout>
  );
}
