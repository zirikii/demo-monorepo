import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { Disclosures } from "@/components/marketing/Disclosures";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { BorrowingPowerCalculator } from "@/components/calculators/BorrowingPowerCalculator";
import { ForeignExchangeCalculator } from "@/components/calculators/ForeignExchangeCalculator";
import { RepaymentsCalculator } from "@/components/calculators/RepaymentsCalculator";
import { SavingsGoalCalculator } from "@/components/calculators/SavingsGoalCalculator";
import { ButtonLink } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const jumpLinks = [
  { to: "#repayments", label: "Home loan repayments" },
  { to: "#borrowing-power", label: "Borrowing power" },
  { to: "#savings", label: "Savings goal" },
  { to: "#foreign-exchange", label: "Foreign exchange" },
];

export function ToolsAndCalculatorsPage() {
  useDocumentTitle("Tools & calculators");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Tools & calculators" }]} />
      <PageHero
        eyebrow="Rates & calculators"
        title="Tools & calculators"
        intro="Work out what a home loan could cost you, how much you might borrow, how your savings could grow, and what your money is worth overseas."
      >
        <ButtonLink to="/rates-and-fees" variant="dark">
          Rates & fees
        </ButtonLink>
        <ButtonLink to="/home-loans" variant="secondary">
          Home loans
        </ButtonLink>
      </PageHero>

      <nav aria-label="Calculators" className="border-b border-line-soft bg-surface-tint">
        <ul className="container-cba flex flex-wrap gap-2 py-4">
          {jumpLinks.map((link) => (
            <li key={link.to}>
              <a
                href={link.to}
                className="focus-cba inline-block rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-bold text-ink hover:bg-surface-deep"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section
        id="repayments"
        title="Home loan repayments calculator"
        intro="Estimate what your repayments could be, and see how the loan term and repayment frequency change the total interest you pay."
      >
        <RepaymentsCalculator />
      </Section>

      <Section
        id="borrowing-power"
        tone="tint"
        title="Borrowing power calculator"
        intro="A rough guide to how much you might be able to borrow, assessed with a serviceability buffer above the rate you enter."
      >
        <BorrowingPowerCalculator />
      </Section>

      <Section
        id="savings"
        title="Savings goal calculator"
        intro="See how a starting balance plus regular monthly deposits could grow with compound interest."
      >
        <SavingsGoalCalculator />
      </Section>

      <Section
        id="foreign-exchange"
        tone="tint"
        title="Foreign exchange calculator"
        intro="Convert Australian dollars into one of 16 currencies at our indicative board rates."
      >
        <ForeignExchangeCalculator />
      </Section>

      <HelpBlock />

      <Disclosures
        items={[
          "Calculations are estimates provided as a guide only. They assume interest rates do not change over the life of the loan.",
          "Calculations do not take into account fees, charges or other amounts that may be charged to your loan, such as establishment or monthly service fees, or stamp duty.",
          "Lenders' Mortgage Insurance or a Low Deposit Premium may apply depending on the size of your deposit and other loan attributes.",
          "Calculations are not a loan approval. Applications are subject to credit approval, satisfactory security and minimum deposit requirements.",
        ]}
      />
    </PageLayout>
  );
}
