import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { FeatureRows } from "@/components/marketing/FeatureRows";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardTitle } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const agents = [
  {
    name: "Recruitment agent",
    status: "Available",
    body: "Screens applicants, runs structured interviews and returns a ranked shortlist with transcripts.",
  },
  {
    name: "HR agent",
    status: "Available",
    body: "Drafts contracts and variations, chases policy acknowledgements and prepares review packs.",
  },
  {
    name: "Payroll agent",
    status: "Coming soon",
    body: "Reconciles timesheets against rosters and flags anomalies before the run is submitted.",
  },
];

export function EmploymentOsPage() {
  useDocumentTitle("Employment OS");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Employment OS"
        title="One system for the whole employment lifecycle."
        blurb="Most HR software is a filing cabinet with a good search box. An employment operating system is expected to act: to draft, to prepare, to flag, and to hand a decision to a person who can make it."
        tone="purple"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          { label: "Employment OS" },
        ]}
      >
        <ButtonLink to="/request-a-demo" variant="inverse">
          Request a demo
        </ButtonLink>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="The difference"
          title="A system of record knows. A system of action does."
          blurb="Your employee record already knows a probation period ends on Thursday. The question is whether anything happens because of it."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.name}>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>{agent.name}</CardTitle>
                <span
                  className={
                    agent.status === "Available"
                      ? "rounded-full bg-eh-positive/12 px-2.5 py-1 text-[11px] font-bold text-eh-positive"
                      : "rounded-full bg-eh-surface-deep px-2.5 py-1 text-[11px] font-bold text-eh-ink-faint"
                  }
                >
                  {agent.status}
                </span>
              </div>
              <CardBody>{agent.body}</CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <FeatureRows
          rows={[
            {
              eyebrow: "Unified record",
              title: "One employee record, read by everything",
              body: "A pay event can trigger an HR workflow because both read the same record. There is no nightly sync and no reconciliation step.",
              points: [
                "Hiring hands a candidate straight to onboarding",
                "Onboarding writes the payroll record",
                "Payroll writes back leave accruals and pay history",
              ],
            },
            {
              eyebrow: "Configurable automation",
              title: "Automations owned by the people who own the process",
              body: "Workflows are built by the person responsible for the outcome, not by a developer with a ticket.",
              points: [
                "Trigger on any employment event",
                "Branch on team, location or employment type",
                "Every action is logged and reversible",
              ],
            },
            {
              eyebrow: "Human in the loop",
              title: "Agents draft. People decide.",
              body: "Anything that affects someone's employment is prepared by an agent and approved by a person. That boundary does not move.",
              points: [
                "Every AI action has a named approver",
                "Rubrics are written and edited by your team",
                "Decisions are logged with the reasoning attached",
              ],
            },
          ]}
        />
      </Section>

      <Section tone="purple">
        <SectionHeading
          title="What consolidation is worth"
          blurb="Replacing four subscriptions with one platform saves more than licence fees."
          align="center"
          tone="light"
        />
        <dl className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          <Stat value="$45k" label="saved per year on average" tone="light" />
          <Stat value="2 wks" label="cut from time-to-hire" tone="light" />
          <Stat value="80%" label="less administrative burden" tone="light" />
          <Stat value="1" label="record for every employee" tone="light" />
        </dl>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}
