import { useState } from "react";
import { PanelCard } from "@/components/portal/PanelCard";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { INVESTOR_NAV } from "@/components/portal/nav";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Select } from "@/components/ui/Field";
import { PRACTICE } from "@/data/platform";
import { usePortfolio } from "@/hooks/usePortfolio";
import {
  formatCurrency,
  formatCurrencyWhole,
  formatSignedCurrency,
  formatSignedPercent,
  formatUnits,
} from "@/lib/format";
import { accountValue, valueHoldings } from "@/lib/portfolio";
import { cn } from "@/lib/cn";

export default function InvestorPortfolioPage() {
  const { accounts, holdings } = usePortfolio();
  const [accountId, setAccountId] = useState("all");

  const visible = accountId === "all" ? holdings : holdings.filter((h) => h.accountId === accountId);
  const valued = valueHoldings(visible).sort((a, b) => b.value - a.value);

  return (
    <PortalLayout
      portal="InvestorHUB"
      nav={INVESTOR_NAV}
      contextLabel="Adviser"
      contextValue={PRACTICE.name}
      contextNote={PRACTICE.afsl}
      title="Portfolio"
      description="Holdings across your HUB24 accounts"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {accounts.map((account) => (
          <button
            key={account.id}
            type="button"
            aria-pressed={accountId === account.id}
            onClick={() => setAccountId(accountId === account.id ? "all" : account.id)}
            className={cn(
              "focus-h24 rounded-h24-lg border bg-white p-5 text-left shadow-h24 transition",
              accountId === account.id
                ? "border-h24-teal ring-1 ring-h24-teal/30"
                : "border-line hover:border-h24-tint-strong",
            )}
          >
            <p className="text-xs font-bold tracking-[0.1em] text-ink-ghost uppercase">
              {account.type}
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-ink-strong">{account.name}</p>
            <p className="mt-2 font-display text-xl font-semibold text-h24-navy tabular-nums">
              {formatCurrencyWhole(accountValue(account, holdings))}
            </p>
            <p className="text-xs text-ink-faint">
              {account.menu} menu · cash {formatCurrencyWhole(account.cash)}
            </p>
          </button>
        ))}
      </div>

      <PanelCard
        className="mt-6"
        title="Holdings"
        description={
          accountId === "all"
            ? "All accounts"
            : (accounts.find((account) => account.id === accountId)?.name ?? "")
        }
        bodyClassName="p-0"
      >
        <div className="border-b border-line p-5">
          <Field label="Filter by account" htmlFor="portfolio-account" className="max-w-sm">
            <Select
              id="portfolio-account"
              value={accountId}
              onChange={(event) => setAccountId(event.target.value)}
            >
              <option value="all">All accounts</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <DataTable
          className="rounded-none border-0"
          caption="Holdings across HUB24 accounts"
          rowKey={(holding) => holding.id}
          rows={valued}
          empty={<EmptyState className="m-5" title="No holdings in this account" />}
          columns={[
            {
              key: "name",
              header: "Investment",
              render: (holding) => (
                <div className="flex flex-col">
                  <span className="font-semibold text-ink-strong">{holding.name}</span>
                  <span className="text-xs text-ink-faint">
                    {holding.code} · {holding.kind}
                  </span>
                </div>
              ),
            },
            {
              key: "class",
              header: "Asset class",
              render: (holding) => <Badge tone="neutral">{holding.assetClass}</Badge>,
            },
            {
              key: "units",
              header: "Units",
              align: "right",
              render: (holding) => formatUnits(holding.units),
            },
            {
              key: "price",
              header: "Price",
              align: "right",
              render: (holding) => formatCurrency(holding.unitPrice),
            },
            {
              key: "value",
              header: "Value",
              align: "right",
              render: (holding) => (
                <span className="font-semibold text-ink-strong">{formatCurrencyWhole(holding.value)}</span>
              ),
            },
            {
              key: "gain",
              header: "Gain / loss",
              align: "right",
              render: (holding) => (
                <span
                  className={cn(
                    "font-semibold",
                    holding.gain >= 0 ? "text-positive" : "text-critical",
                  )}
                >
                  {formatSignedCurrency(holding.gain)}
                  <span className="block text-xs font-normal text-ink-faint">
                    {formatSignedPercent(holding.gainPercent)}
                  </span>
                </span>
              ),
            },
          ]}
        />
      </PanelCard>
    </PortalLayout>
  );
}
