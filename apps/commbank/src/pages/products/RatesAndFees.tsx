import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SectionHeading } from "@/components/ui/Card";
import { RateTable } from "@/components/ui/RateTable";
import { HelpSection } from "@/components/marketing/HelpSection";
import { FeedbackBar } from "@/components/marketing/FeedbackBar";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { everydayAccounts, savingsAccounts, termDepositRates } from "@/data/accounts";
import { creditCards } from "@/data/cards";
import { ownerOccupiedVariableRates } from "@/data/homeLoans";
import { businessProducts, personalLoans } from "@/data/lending";
import { formatRate } from "@/lib/format";

function SimpleTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[560px] text-left text-sm">
        <caption className="border-b border-line bg-surface-tint px-5 py-3 text-left text-sm font-bold text-black">
          {caption}
        </caption>
        <thead>
          <tr className="border-b border-line bg-surface-tint text-xs uppercase tracking-wide text-ink-muted">
            {columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={index === 0 ? "px-5 py-3 font-semibold" : "px-5 py-3 font-semibold"}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line bg-surface">
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={cell} scope="row" className="px-5 py-3.5 font-semibold text-black">
                    {cell}
                  </th>
                ) : (
                  <td key={`${row[0]}-${index}`} className="px-5 py-3.5 text-ink-soft">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RatesAndFeesPage() {
  useDocumentTitle("Interest rates and fees");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Interest rates and fees" }]} />
      <PageHero
        eyebrow="Rates & fees"
        title="Interest rates and fees"
        description="Current rates and fees across bank accounts, savings, credit cards, personal loans, home loans and business products."
        tone="light"
      />

      <section className="space-y-12 py-14">
        <div className="container-page space-y-12">
          <div>
            <SectionHeading title="Bank accounts" className="mb-6" />
            <SimpleTable
              caption="Transaction accounts"
              columns={["Account", "Monthly account fee", "Interest rate"]}
              rows={everydayAccounts.map((account) => [
                account.name,
                account.highlights[0]?.value ?? account.monthlyFee,
                account.highlights[2]?.value ?? "—",
              ])}
            />
          </div>

          <div>
            <SectionHeading title="Savings accounts" className="mb-6" />
            <SimpleTable
              caption="Savings accounts"
              columns={["Account", "Headline rate", "Standard variable rate"]}
              rows={savingsAccounts.map((account) => [
                account.name,
                account.headlineRate ?? "—",
                account.highlights[1]?.value ?? "—",
              ])}
            />
          </div>

          <div>
            <SectionHeading title="Term Deposits" className="mb-6" />
            <SimpleTable
              caption="Term Deposit rates"
              columns={["Term", "Interest rate"]}
              rows={termDepositRates.map((row) => [row.term, formatRate(row.rate)])}
            />
          </div>

          <div>
            <SectionHeading title="Credit cards" className="mb-6" />
            <SimpleTable
              caption="Credit card rates and fees"
              columns={["Card", "Interest on purchases", "Annual or monthly fee"]}
              rows={creditCards.map((card) => [card.name, card.purchaseRate, card.annualFee])}
            />
          </div>

          <div>
            <SectionHeading title="Personal loans" className="mb-6" />
            <SimpleTable
              caption="Personal loan rates"
              columns={["Loan", "Interest rate from", "Comparison rate"]}
              rows={personalLoans.map((loan) => [
                loan.name,
                formatRate(loan.rateFrom),
                formatRate(loan.comparisonRate),
              ])}
            />
          </div>

          <div>
            <SectionHeading title="Home loans" className="mb-6" />
            <RateTable
              caption="Owner Occupied variable rates for new borrowings"
              rows={ownerOccupiedVariableRates}
            />
          </div>

          <div>
            <SectionHeading title="Business" className="mb-6" />
            <SimpleTable
              caption="Business products"
              columns={["Product", "Category", "Price"]}
              rows={businessProducts.map((product) => [
                product.name,
                product.category,
                product.priceLabel,
              ])}
            />
          </div>
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Every rate and fee on this page is fabricated for the demo. Information, including
          interest rates and fees, would be subject to change in the real world.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
