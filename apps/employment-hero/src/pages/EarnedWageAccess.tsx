import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardTitle } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const faqs = [
  {
    question: "Is this a loan?",
    answer:
      "No. You are reaching wages you have already earned in the current pay cycle. There is no interest and no credit check, and repayment happens automatically as a post-tax deduction on your next payslip.",
  },
  {
    question: "How much can I access?",
    answer:
      "Up to 50% of the wages you have earned so far this cycle, capped at $1,000 a week. The available amount updates as you work.",
  },
  {
    question: "What does it cost?",
    answer:
      "A flat 1.3% fee if the money goes to a Swag Spend account, or 1.5% to an external bank account. There are no other fees.",
  },
  {
    question: "Does my employer see it?",
    answer:
      "Your employer sees the deduction on the payroll report because it has to reconcile, but they do not see why you accessed it or how often.",
  },
  {
    question: "How quickly does it arrive?",
    answer:
      "Usually within minutes to a Swag Spend account, and within one business day to an external account.",
  },
];

export function EarnedWageAccessPage() {
  useDocumentTitle("Earned wage access");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Employee experience"
        title="Payday, when you need it."
        blurb="Earned wage access lets your team reach up to 50% of the wages they have already earned, without waiting for the pay cycle to close and without turning to a payday lender."
        tone="purple"
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          { label: "Swag Spend", to: "/products/swag-spend-account" },
          { label: "Earned wage access" },
        ]}
      >
        <ButtonLink to="/work" variant="inverse">
          Explore the Work app
        </ButtonLink>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="How it works"
          title="Four steps, no paperwork"
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {[
            {
              step: "1",
              title: "Work the shift",
              body: "Earned wages accrue as your timesheets are approved through the cycle.",
            },
            {
              step: "2",
              title: "See what is available",
              body: "The Work app shows the amount you can reach right now, updated daily.",
            },
            {
              step: "3",
              title: "Transfer it",
              body: "Choose a Swag Spend account or your own bank, and confirm the flat fee.",
            },
            {
              step: "4",
              title: "Repay automatically",
              body: "The amount is deducted post-tax from your next payslip. Nothing to remember.",
            },
          ].map((item) => (
            <Card key={item.step}>
              <span className="grid size-9 place-items-center rounded-full bg-eh-purple font-display text-sm font-bold text-white">
                {item.step}
              </span>
              <CardTitle className="mt-4">{item.title}</CardTitle>
              <CardBody>{item.body}</CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="The numbers"
            title="Transparent by design"
            blurb="One flat fee, disclosed before you confirm. No interest, no rollover, no compounding, and no effect on your credit file."
          />
          <dl className="grid grid-cols-2 gap-4">
            {[
              { value: "50%", label: "of earned wages available" },
              { value: "$1,000", label: "weekly cap" },
              { value: "1.3%", label: "to a Swag Spend account" },
              { value: "1.5%", label: "to an external bank" },
            ].map((item) => (
              <div key={item.label} className="rounded-eh-lg bg-white p-6 text-center">
                <dd className="font-display text-3xl font-bold text-eh-purple">{item.value}</dd>
                <dt className="mt-1 text-sm text-eh-ink-faint">{item.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Questions people actually ask" align="center" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </Section>

      <CtaBand
        title="Give your team access to their own pay."
        blurb="Earned wage access is included at no cost to the employer."
        primaryLabel="Talk to us"
        primaryTo="/contact"
      />
    </SiteLayout>
  );
}
