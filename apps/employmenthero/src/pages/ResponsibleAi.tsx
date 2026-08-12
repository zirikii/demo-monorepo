import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Card } from "@/components/ui/Card";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FeatureIcon as FeatureIconName } from "@/data/types";

const PRINCIPLES: { title: string; body: string; icon: FeatureIconName }[] = [
  {
    title: "Human in the loop",
    body: "Agents draft, score and recommend. Progressing a candidate, sending a letter or approving a pay run always requires a person.",
    icon: "shield",
  },
  {
    title: "Explainable by default",
    body: "Every score and finding cites the input and the criterion behind it, so a decision can be challenged or overridden.",
    icon: "search",
  },
  {
    title: "Fairness we can measure",
    body: "Hiring funnels are reportable by demographic, and blind screening can hide identifying fields on a first pass.",
    icon: "chart",
  },
  {
    title: "Data stays yours",
    body: "Customer employment data is not used to train third-party foundation models. Retention follows your account settings.",
    icon: "wallet",
  },
  {
    title: "Disclosed to the people affected",
    body: "Candidates are told when an AI system is assessing them, what it assesses against, and how to reach a human.",
    icon: "message",
  },
  {
    title: "Reviewed, not set and forgotten",
    body: "Agents are evaluated against held-out cases before release and monitored for drift once live.",
    icon: "workflow",
  },
];

const AGENTS = [
  {
    name: "Recruitment Agent",
    scope: "Scores applications, runs structured first-round interviews, recommends a shortlist.",
    limits: "Cannot progress, reject or offer without a person approving.",
  },
  {
    name: "HR Agent",
    scope: "Drafts letters, offers and policy rollouts; assigns the tasks a change implies.",
    limits: "Nothing sends to an employee until approved.",
  },
  {
    name: "Payroll Agent",
    scope: "Validates a draft pay run against twenty-two rules and reports findings with dollar impact.",
    limits: "Never edits a pay line or submits a lodgement on its own.",
  },
];

export default function ResponsibleAiPage() {
  return (
    <PageLayout title="Responsible AI">
      <PageHero
        eyebrow="Responsible AI"
        title="How we build Hero AI"
        body="Hero AI is the intelligence layer powering agentic features across the employment lifecycle, including our Recruitment, HR and Payroll agents. These are the commitments we hold it to."
        crumbs={[{ label: "Home", to: "/" }, { label: "Responsible AI" }]}
      />

      <Section tone="white">
        <SectionHeading eyebrow="Our principles" title="Six commitments" className="mb-10" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <Card key={principle.title} className="flex flex-col gap-3">
              <FeatureIcon name={principle.icon} />
              <h2 className="text-lg font-extrabold tracking-tight text-ink-strong">
                {principle.title}
              </h2>
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">{principle.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="What each agent can do" title="Scope and limits" className="mb-10" />
        <div className="overflow-x-auto rounded-eh-lg border border-line bg-white">
          <table className="w-full min-w-2xl border-collapse text-sm">
            <caption className="sr-only">Scope and limits of each Hero AI agent</caption>
            <thead>
              <tr className="border-b border-line bg-surface-tint">
                {["Agent", "What it does", "What it cannot do"].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-5 py-4 text-left text-xs font-bold tracking-wide text-ink-faint uppercase"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {AGENTS.map((agent) => (
                <tr key={agent.name}>
                  <th scope="row" className="px-5 py-4 text-left font-bold text-ink-strong">
                    {agent.name}
                  </th>
                  <td className="px-5 py-4 text-ink-soft">{agent.scope}</td>
                  <td className="px-5 py-4 text-ink-soft">{agent.limits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <CtaBand
        title="Questions about how we use AI?"
        body="Our team can walk your risk, legal or works council stakeholders through the controls in detail."
        primaryLabel="Contact us"
        primaryTo="/contact"
        secondaryLabel="See Hero AI in the product"
        secondaryTo="/products/recruitment-agent"
      />
    </PageLayout>
  );
}
