import { ArrowDownRight, ArrowUpRight, PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { AllocationChart } from "@/components/portal/AllocationChart";
import { PanelCard } from "@/components/portal/PanelCard";
import { PerformanceChart } from "@/components/portal/PerformanceChart";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { INVESTOR_NAV } from "@/components/portal/nav";
import { StatTile } from "@/components/portal/StatTile";
import { Badge } from "@/components/ui/Badge";
import { PERFORMANCE, PRACTICE } from "@/data/platform";
import { useAuth } from "@/hooks/useAuth";
import { usePortfolio } from "@/hooks/usePortfolio";
import {
  formatCurrency,
  formatCurrencyWhole,
  formatDate,
  formatSignedCurrency,
  formatSignedPercent,
} from "@/lib/format";
import {
  accountValue,
  allocationBreakdown,
  dayMovement,
  portfolioValue,
  sortTransactions,
  totalGain,
} from "@/lib/portfolio";
import { cn } from "@/lib/cn";

export default function InvestorOverviewPage() {
  const { user } = useAuth();
  const { accounts, holdings, transactions } = usePortfolio();

  const total = portfolioValue(accounts, holdings);
  const { gain, gainPercent } = totalGain(holdings);
  const day = dayMovement(holdings);
  const cash = accounts.reduce((sum, account) => sum + account.cash, 0);
  const recent = sortTransactions(transactions).slice(0, 6);

  return (
    <PortalLayout
      portal="InvestorHUB"
      nav={INVESTOR_NAV}
      contextLabel="Adviser"
      contextValue={PRACTICE.name}
      contextNote={PRACTICE.afsl}
      title={`Welcome back, ${user?.name.split(" ")[0] ?? "there"}`}
      description="Your portfolio dashboard across every HUB24 account"
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Portfolio value"
          value={formatCurrencyWhole(total)}
          note={`${accounts.length} accounts`}
          icon={Wallet}
        />
        <StatTile
          label="Today"
          value={formatSignedCurrency(day)}
          note={day >= 0 ? "Markets up on the day" : "Markets down on the day"}
          tone={day >= 0 ? "positive" : "critical"}
          icon={day >= 0 ? ArrowUpRight : ArrowDownRight}
        />
        <StatTile
          label="Unrealised gain"
          value={formatSignedCurrency(gain)}
          note={`${formatSignedPercent(gainPercent)} on cost`}
          tone={gain >= 0 ? "positive" : "critical"}
          icon={TrendingUp}
        />
        <StatTile label="Cash available" value={formatCurrencyWhole(cash)} note="Across all accounts" icon={PiggyBank} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <PanelCard
          title="Portfolio value over twelve months"
          description="Month-end valuations across all accounts"
        >
          <PerformanceChart points={PERFORMANCE} />
        </PanelCard>

        <PanelCard title="Asset allocation" action={{ label: "Portfolio", to: "/investorhub/portfolio" }}>
          <AllocationChart slices={allocationBreakdown(accounts, holdings)} />
        </PanelCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <PanelCard title="Your accounts" action={{ label: "View all", to: "/investorhub/portfolio" }}>
          <ul className="flex flex-col divide-y divide-line-soft">
            {accounts.map((account) => (
              <li key={account.id} className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <Link
                    to="/investorhub/portfolio"
                    className="focus-h24 block truncate font-semibold text-ink-strong hover:text-h24-teal-dark"
                  >
                    {account.name}
                  </Link>
                  <p className="text-xs text-ink-faint">
                    {account.type} · {account.menu} menu · opened {formatDate(account.opened)}
                  </p>
                </div>
                <span className="font-semibold tabular-nums text-ink-strong">
                  {formatCurrencyWhole(accountValue(account, holdings))}
                </span>
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard
          title="Recent transactions"
          action={{ label: "All transactions", to: "/investorhub/transactions" }}
        >
          <ul className="flex flex-col divide-y divide-line-soft">
            {recent.map((transaction) => (
              <li key={transaction.id} className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                <Badge tone="neutral">{transaction.type}</Badge>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{transaction.description}</p>
                  <p className="text-xs text-ink-faint">{formatDate(transaction.date)}</p>
                </div>
                <span
                  className={cn(
                    "text-sm font-semibold tabular-nums",
                    transaction.amount >= 0 ? "text-positive" : "text-ink-strong",
                  )}
                >
                  {formatCurrency(transaction.amount)}
                </span>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>

      <p className="mt-8 text-xs text-ink-faint">
        Every account, holding and transaction shown here is invented for a demonstration build.
      </p>
    </PortalLayout>
  );
}
