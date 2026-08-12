import { Link } from "react-router-dom";
import { BookOpen, LifeBuoy, MessageCircle, Wrench } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { homeFaqs } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const channels = [
  {
    icon: BookOpen,
    title: "Help centre",
    body: "Step-by-step articles for every module, updated with each release.",
    to: "/resources",
  },
  {
    icon: MessageCircle,
    title: "Talk to support",
    body: "Reach a support specialist by phone or email during business hours.",
    to: "/contact",
  },
  {
    icon: Wrench,
    title: "Implementation hub",
    body: "Migration checklists, data templates and parallel-run guidance.",
    to: "/implementation-hub",
  },
  {
    icon: LifeBuoy,
    title: "Service status",
    body: "Live platform status and a history of incidents and maintenance windows.",
    to: "/support",
  },
];

export function SupportPage() {
  useDocumentTitle("Service centre");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Support"
        title="Service centre."
        blurb="Documentation, migration help and a real support team. Start wherever suits the question."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Support" }]}
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel) => (
            <Link
              key={channel.title}
              to={channel.to}
              className="focus-eh rounded-eh-lg border border-eh-line bg-white p-6 transition hover:border-eh-purple hover:shadow-eh"
            >
              <span className="grid size-11 place-items-center rounded-full bg-eh-purple-tint text-eh-purple">
                <channel.icon size={19} />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-eh-ink">{channel.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-eh-ink-soft">{channel.body}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading title="Common questions" align="center" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion items={homeFaqs} />
        </div>
      </Section>

      <CtaBand
        title="Still stuck?"
        blurb="Send us the details and a specialist will pick it up."
        primaryLabel="Contact support"
        primaryTo="/contact"
        secondaryLabel="Browse resources"
        secondaryTo="/resources"
      />
    </SiteLayout>
  );
}

export function ImplementationHubPage() {
  useDocumentTitle("Implementation hub");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Implementation"
        title="Migrations, without the horror stories."
        blurb="Moving payroll is the part everyone dreads. Here is exactly what happens, in order, and what we need from you at each step."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Implementation hub" }]}
      />

      <Section>
        <SectionHeading eyebrow="The plan" title="Six stages from kickoff to cutover" />
        <ol className="mt-10 space-y-4">
          {[
            {
              title: "Kickoff and scoping",
              body: "Confirm entities, awards, pay cycles and the calendar date you want to cut over on.",
            },
            {
              title: "Data extract",
              body: "Pull employee records, pay history, leave balances and superannuation details from your current system.",
            },
            {
              title: "Configuration",
              body: "Map awards, allowances, cost centres and approval chains to your structure.",
            },
            {
              title: "Validation",
              body: "Reconcile imported balances against your last finalised pay run, line by line.",
            },
            {
              title: "Parallel run",
              body: "Run one full cycle in both systems and compare every employee's net pay before committing.",
            },
            {
              title: "Cutover and support",
              body: "Go live with hands-on support through the first two cycles, then hand over to your team.",
            },
          ].map((stage, index) => (
            <li
              key={stage.title}
              className="flex gap-5 rounded-eh-lg border border-eh-line bg-white p-6"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-eh-purple font-display text-sm font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-eh-ink">{stage.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-eh-ink-soft">{stage.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        title="Planning a migration?"
        blurb="Tell us what you are moving from and we will scope the effort honestly."
        primaryLabel="Talk to us"
        primaryTo="/contact"
        secondaryLabel="Read a case study"
        secondaryTo="/case-studies/blue-rock"
      />
    </SiteLayout>
  );
}
