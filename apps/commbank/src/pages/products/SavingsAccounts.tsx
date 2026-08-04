import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/Card";
import { SavingsGoalCalculator } from "@/components/tools/SavingsGoalCalculator";
import { HelpSection } from "@/components/marketing/HelpSection";
import { FeedbackBar } from "@/components/marketing/FeedbackBar";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { savingsAccounts, termDepositRates } from "@/data/accounts";
import { formatRate } from "@/lib/format";

export function SavingsAccountsPage() {
  useDocumentTitle("Savings accounts");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Banking", to: "/banking" }, { label: "Savings accounts" }]} />
      <PageHero
        eyebrow="Savings accounts"
        title="Compare savings accounts and interest rates"
        description="Whether you want instant access, bonus interest for steady saving, or a fixed return, there's an account for it."
      />

      <section className="py-16">
        <div className="container-page">
          <SectionHeading title="Compare savings accounts" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {savingsAccounts.map((account) => (
              <ProductCard
                key={account.id}
                id={account.id}
                name={account.name}
                tagline={account.tagline}
                headline={account.headlineRate}
                headlineLabel={account.headlineLabel}
                features={account.features}
                badge={account.badge}
                ctaLabel="Open an account"
                ctaTo="/register"
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="term-deposits"
        className="scroll-mt-28 border-y border-line bg-surface-tint py-16"
      >
        <div className="container-page">
          <SectionHeading
            eyebrow="Term Deposits"
            title="Fixed rates by term"
            description="Interest rates for balances from $5,000, with interest paid at maturity."
          />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-surface">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-tint text-xs uppercase tracking-wide text-ink-muted">
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Term
                  </th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold">
                    Interest rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {termDepositRates.map((row) => (
                  <tr key={row.term}>
                    <th scope="row" className="px-5 py-3.5 font-medium text-ink">
                      {row.term}
                    </th>
                    <td className="px-5 py-3.5 text-right font-bold text-black tabular-nums">
                      {formatRate(row.rate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="savings-goal" className="scroll-mt-28 py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Savings goal calculator"
            title="See how your savings could grow"
            description="Adjust your starting balance, monthly deposit and time frame to see the difference compounding makes."
            className="mb-10"
          />
          <SavingsGoalCalculator />
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Introductory and bonus interest rates depend on meeting the account conditions each month.
          Rates shown are demo content and are not live.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
