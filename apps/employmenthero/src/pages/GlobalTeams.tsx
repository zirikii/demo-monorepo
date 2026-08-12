import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GLOBAL_TEAMS_PRICE } from "@/data/pricing";

const COMPARISON = [
  {
    approach: "Set up your own entity",
    setup: "3–6 months",
    cost: "$40,000+ upfront",
    risk: "You carry every local obligation",
  },
  {
    approach: "Engage a contractor",
    setup: "Days",
    cost: "Variable",
    risk: "Misclassification exposure",
  },
  {
    approach: "HeroForce Employer of Record",
    setup: "Under 2 weeks",
    cost: `${GLOBAL_TEAMS_PRICE} per employee / month`,
    risk: "We are the legal employer",
  },
];

const FAQS = [
  {
    question: "Which countries do you cover?",
    answer:
      "More than 180, including every OECD market. Coverage in a specific country is confirmed before you sign.",
  },
  {
    question: "Who owns the employment relationship?",
    answer:
      "We are the legal employer on paper and carry the statutory obligations. You direct the day-to-day work.",
  },
  {
    question: "How are employees paid?",
    answer:
      "In local currency, on the local pay cycle, with locally compliant payslips and statutory remittances.",
  },
  {
    question: "Can I bring an employee onto my own entity later?",
    answer:
      "Yes. Conversion transfers the record, entitlements and history into your own Employment OS account.",
  },
];

export default function GlobalTeamsPage() {
  return (
    <PageLayout title="Global teams pricing">
      <PageHero
        eyebrow="Global teams"
        title="Hire anywhere for one flat price"
        body={`Employ people in 180+ countries with locally compliant contracts, local-currency payroll and statutory benefits — all for ${GLOBAL_TEAMS_PRICE} per employee, per month.`}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Pricing", to: "/pricing" },
          { label: "Global teams" },
        ]}
        actions={
          <ButtonLink to="/request-a-demo" variant="inverse" size="lg">
            Talk to a specialist
          </ButtonLink>
        }
        aside={
          <Card className="border-white/15 bg-white/5 text-white">
            <p className="text-xs font-extrabold tracking-[0.14em] text-eh-violet-soft uppercase">
              All for
            </p>
            <p className="mt-3 text-5xl font-extrabold tracking-tight">{GLOBAL_TEAMS_PRICE}</p>
            <p className="mt-1 text-sm text-eh-violet-soft">per employee, per month</p>
            <CheckList
              tone="dark"
              className="mt-6 border-t border-white/10 pt-5"
              items={[
                "Locally compliant employment contract",
                "Local-currency payroll and payslips",
                "Statutory benefits and remittances",
                "HR advisory in-country",
              ]}
            />
          </Card>
        }
      />

      <Section tone="white">
        <SectionHeading
          eyebrow="Compare the options"
          title="Three ways to hire in a new market"
          className="mb-10"
        />
        <div className="overflow-x-auto rounded-eh-lg border border-line">
          <table className="w-full min-w-2xl border-collapse text-sm">
            <caption className="sr-only">Comparison of ways to employ people in a new market</caption>
            <thead>
              <tr className="border-b border-line bg-surface-tint">
                {["Approach", "Time to first hire", "Cost", "Who carries the risk"].map((heading) => (
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
              {COMPARISON.map((row) => (
                <tr key={row.approach}>
                  <th scope="row" className="px-5 py-4 text-left font-bold text-ink-strong">
                    {row.approach}
                  </th>
                  <td className="px-5 py-4 text-ink-soft">{row.setup}</td>
                  <td className="px-5 py-4 text-ink-soft">{row.cost}</td>
                  <td className="px-5 py-4 text-ink-soft">{row.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Global teams FAQs" title="What people ask before they sign" />
          <Accordion items={FAQS} />
        </div>
      </Section>

      <CtaBand
        title="Ready to hire beyond Australia?"
        body="Tell us the country and the role, and we'll confirm coverage, timing and the total cost of employment."
      />
    </PageLayout>
  );
}
