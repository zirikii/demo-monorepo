import { AllocationChart } from "@/components/portal/AllocationChart";
import { PanelCard } from "@/components/portal/PanelCard";
import { PerformanceChart } from "@/components/portal/PerformanceChart";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { INVESTOR_NAV } from "@/components/portal/nav";
import { DataTable } from "@/components/ui/DataTable";
import { PERFORMANCE, PRACTICE } from "@/data/platform";
import { usePortfolio } from "@/hooks/usePortfolio";
import {
  formatCurrency,
  formatCurrencyWhole,
  formatSignedCurrency,
  formatSignedPercent,
} from "@/lib/format";
import { accountValue, allocationBreakdown, valueHoldings } from "@/lib/portfolio";
import { cn } from "@/lib/cn";

export default function InvestorReportsPage() {
  const { accounts, holdings, transactions } = usePortfolio();

  const income = transactions
    .filter((transaction) => ["Dividend", "Distribution", "Interest"].includes(transaction.type))
    .reduce((total, transaction) => total + transaction.amount, 0);
  const fees = transactions
    .filter((transaction) => transaction.type === "Fee")
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  const byKind = valueHoldings(holdings).reduce<Record<string, { value: number; gain: number }>>(
    (accumulator, holding) => {
      const current = accumulator[holding.kind] ?? { value: 0, gain: 0 };
      accumulator[holding.kind] = {
        value: current.value + holding.value,
        gain: current.gain + holding.gain,
      };
      return accumulator;
    },
    {},
  );

  const kindRows = Object.entries(byKind)
    .map(([kind, totals]) => ({ kind, ...totals }))
    .sort((a, b) => b.value - a.value);

  return (
    <PortalLayout
      portal="InvestorHUB"
      nav={INVESTOR_NAV}
      contextLabel="Adviser"
      contextValue={PRACTICE.name}
      contextNote={PRACTICE.afsl}
      title="Reports"
      description="Valuation, income, fees and allocation reporting"
    >
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <PanelCard title="Valuation history" description="Month-end portfolio value across all accounts">
          <PerformanceChart points={PERFORMANCE} />
        </PanelCard>
        <PanelCard title="Asset allocation">
          <AllocationChart slices={allocationBreakdown(accounts, holdings)} />
        </PanelCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <PanelCard title="Income and fees" description="Across the transactions on record">
          <dl className="flex flex-col divide-y divide-line-soft">
            <div className="flex items-center justify-between gap-4 py-3 first:pt-0">
              <dt className="text-sm text-ink-soft">Investment income received</dt>
              <dd className="font-semibold tabular-nums text-positive">{formatCurrency(income)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="text-sm text-ink-soft">Fees and premiums charged</dt>
              <dd className="font-semibold tabular-nums text-ink-strong">{formatCurrency(fees)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3 last:pb-0">
              <dt className="text-sm text-ink-soft">Net of income and fees</dt>
              <dd
                className={cn(
                  "font-semibold tabular-nums",
                  income - fees >= 0 ? "text-positive" : "text-critical",
                )}
              >
                {formatSignedCurrency(income - fees)}
              </dd>
            </div>
          </dl>
        </PanelCard>

        <PanelCard title="Value by account">
          <ul className="flex flex-col divide-y divide-line-soft">
            {accounts.map((account) => (
              <li key={account.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink-strong">{account.name}</p>
                  <p className="text-xs text-ink-faint">{account.type}</p>
                </div>
                <span className="font-semibold tabular-nums text-ink-strong">
                  {formatCurrencyWhole(accountValue(account, holdings))}
                </span>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>

      <PanelCard className="mt-6" title="Holdings by investment type" bodyClassName="p-0">
        <DataTable
          className="rounded-none border-0"
          caption="Holdings grouped by investment type"
          rowKey={(row) => row.kind}
          rows={kindRows}
          columns={[
            {
              key: "kind",
              header: "Investment type",
              render: (row) => <span className="font-semibold text-ink-strong">{row.kind}</span>,
            },
            {
              key: "value",
              header: "Value",
              align: "right",
              render: (row) => formatCurrencyWhole(row.value),
            },
            {
              key: "gain",
              header: "Unrealised gain",
              align: "right",
              render: (row) => (
                <span className={cn("font-semibold", row.gain >= 0 ? "text-positive" : "text-critical")}>
                  {formatSignedCurrency(row.gain)}
                </span>
              ),
            },
            {
              key: "share",
              header: "Share of holdings",
              align: "right",
              render: (row) => {
                const total = kindRows.reduce((sum, entry) => sum + entry.value, 0);
                return formatSignedPercent(total === 0 ? 0 : (row.value / total) * 100, 1).replace("+", "");
              },
            },
          ]}
        />
      </PanelCard>
    </PortalLayout>
  );
}
