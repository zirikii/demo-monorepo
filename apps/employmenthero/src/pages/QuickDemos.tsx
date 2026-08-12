import { useState } from "react";
import { Play } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const DEMOS = [
  {
    id: "onboarding",
    title: "Onboard a new starter in four minutes",
    module: "HR",
    duration: "4 min",
    steps: [
      "Create the employee and send the contract for e-signature",
      "Collect super choice, TFN declaration and bank details",
      "Assign the induction and mandatory training",
      "Invite them to the Employment Hero Work app",
    ],
  },
  {
    id: "pay-run",
    title: "Run a fortnightly pay cycle",
    module: "Payroll",
    duration: "6 min",
    steps: [
      "Import approved timesheets into award interpretation",
      "Review the exceptions the Payroll Agent raised",
      "Approve the run and produce payslips",
      "Lodge STP Phase 2 to the ATO",
    ],
  },
  {
    id: "hiring",
    title: "Fill a role without a job ad",
    module: "Hiring",
    duration: "5 min",
    steps: [
      "Create the role and set the screening criteria",
      "Review SmartMatch candidates from the talent pool",
      "Read Recruitment Agent scores and shortlist",
      "Send the offer and convert it to onboarding",
    ],
  },
  {
    id: "rostering",
    title: "Cost a roster before you publish it",
    module: "Rostering",
    duration: "3 min",
    steps: [
      "Build the week against award rules",
      "Watch labour cost update against your target",
      "Publish to the Work app for shift claims",
      "Track clock-ins and variance live",
    ],
  },
  {
    id: "leave",
    title: "Approve leave with roster context",
    module: "HR",
    duration: "2 min",
    steps: [
      "See the balance and any pending requests",
      "Check the roster impact for that week",
      "Approve or decline with a reason",
      "Watch the roster and pay run update",
    ],
  },
  {
    id: "reporting",
    title: "Answer a board question in one screen",
    module: "Reporting",
    duration: "4 min",
    steps: [
      "Open the workforce dashboard",
      "Segment turnover by site and tenure",
      "Compare labour cost to the prior quarter",
      "Export the view for the board pack",
    ],
  },
];

export default function QuickDemosPage() {
  const [active, setActive] = useState(DEMOS[0]!.id);
  const demo = DEMOS.find((item) => item.id === active) ?? DEMOS[0]!;

  return (
    <PageLayout title="Quick demos">
      <PageHero
        eyebrow="Quick demos"
        title="See it working before you talk to anyone"
        body="Short, self-guided walkthroughs of the flows people ask about most."
        crumbs={[{ label: "Home", to: "/" }, { label: "Quick demos" }]}
      />

      <Section tone="white">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <ul className="flex flex-col gap-3">
            {DEMOS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActive(item.id)}
                  aria-pressed={item.id === active}
                  className={cn(
                    "focus-eh flex w-full items-start gap-3 rounded-eh-lg border p-5 text-left transition",
                    item.id === active
                      ? "border-eh-purple bg-eh-tint"
                      : "border-line bg-white hover:border-eh-violet-soft",
                  )}
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-eh-purple text-white">
                    <Play aria-hidden className="h-3.5 w-3.5 fill-current" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[1.02rem] font-bold text-ink-strong">{item.title}</span>
                    <span className="text-sm text-ink-faint">
                      {item.module} · {item.duration}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <Card className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-3">
              <Badge>{demo.module}</Badge>
              <span className="text-sm text-ink-faint">{demo.duration}</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-strong md:text-3xl">
              {demo.title}
            </h2>
            <div className="aspect-video rounded-eh-lg bg-eh-purple-deep">
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-white">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                  <Play aria-hidden className="h-6 w-6 fill-current" />
                </span>
                <p className="text-sm text-eh-violet-soft">
                  Walkthrough player — simulated in this demo build
                </p>
              </div>
            </div>
            <ol className="flex flex-col gap-3">
              {demo.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-eh-tint text-xs font-extrabold text-eh-purple">
                    {index + 1}
                  </span>
                  <span className="text-[0.98rem] leading-relaxed text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="Prefer a person?"
          title="A live demo runs on your own award and roster"
          body="Thirty minutes, your data patterns, and a written summary with pricing at the end."
          align="center"
          className="mx-auto items-center"
        />
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
