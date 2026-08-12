import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Card, CardBody, CardTitle } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const commitments = [
  {
    title: "A person makes every employment decision",
    body: "Agents draft, prepare and rank. Hiring, termination, pay and performance outcomes are always confirmed by a named human.",
  },
  {
    title: "Rubrics are yours to read and change",
    body: "Screening criteria are written in plain language, visible to your team, and editable at any time. Nothing is hidden in a model.",
  },
  {
    title: "We test for bias, and publish what we find",
    body: "Scoring distributions are reviewed across cohorts. Criteria that correlate with something other than capability get rewritten.",
  },
  {
    title: "Your data does not train anyone else's model",
    body: "Customer employment data is not used to train shared models, and is never sold or shared with third parties for marketing.",
  },
  {
    title: "Every AI action is logged",
    body: "You can see what an agent did, when, on whose behalf, and what evidence it used. Actions are reversible.",
  },
  {
    title: "We say what AI is bad at",
    body: "Career changes, unusual paths and candidates whose strengths do not appear in text. Those go to a human, not a filter.",
  },
];

export function AiPage() {
  useDocumentTitle("Our AI commitment");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Responsible AI"
        title="AI that acts, with a person who decides."
        blurb="Hero AI reviews more than 600,000 job applications a month. That scale is only defensible if the boundaries are explicit, so here they are."
        tone="purple"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "AI commitment" }]}
      />

      <Section>
        <SectionHeading
          eyebrow="Our commitments"
          title="Six rules we hold ourselves to"
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {commitments.map((item) => (
            <Card key={item.title}>
              <CardTitle>{item.title}</CardTitle>
              <CardBody>{item.body}</CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="What it changes"
          title="Measured against the manual process it replaced"
          align="center"
        />
        <dl className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          <Stat value="92%" label="less time contacting candidates" />
          <Stat value="87%" label="fewer applicants screened by hand" />
          <Stat value="70%" label="fewer profiles reviewed manually" />
          <Stat value="600k+" label="applications reviewed monthly" />
        </dl>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Being honest"
          title="Where we think AI should not be used"
          blurb="Automating a bad process at speed is worse than leaving it alone. These are the places we deliberately keep a person in front."
        />
        <ul className="mt-8 space-y-4">
          {[
            "Final rejection of a candidate — a person reviews every decline before it is sent.",
            "Termination, redundancy or disciplinary outcomes — never drafted or recommended by an agent.",
            "Performance ratings — agents can summarise evidence, but the rating is set by a manager.",
            "Pay decisions — anomalies are flagged, amounts are never adjusted automatically.",
          ].map((item) => (
            <li
              key={item}
              className="rounded-eh-md border border-eh-line bg-white px-5 py-4 text-sm leading-relaxed text-eh-ink-soft"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Want to see the agents work?"
        blurb="We will walk you through a real screening run, including the parts it gets wrong."
        primaryLabel="Request a demo"
        primaryTo="/request-a-demo"
        secondaryLabel="Read the blog"
        secondaryTo="/blog"
      />
    </SiteLayout>
  );
}
