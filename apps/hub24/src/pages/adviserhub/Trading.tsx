import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { PanelCard } from "@/components/portal/PanelCard";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { ADVISER_NAV } from "@/components/portal/nav";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field, Select, TextInput } from "@/components/ui/Field";
import { PRACTICE, TRADEABLE_SECURITIES } from "@/data/platform";
import { usePortfolio } from "@/hooks/usePortfolio";
import { formatCurrency, formatCurrencyWhole, formatDate, formatUnits } from "@/lib/format";
import { accountValue, brokerageFor, sortTransactions, valueHoldings } from "@/lib/portfolio";
import { cn } from "@/lib/cn";

export default function AdviserTradingPage() {
  const { accounts, holdings, transactions, placeTrade } = usePortfolio();

  const [accountId, setAccountId] = useState(accounts[0]?.id ?? "");
  const [code, setCode] = useState<string>(TRADEABLE_SECURITIES[0].code);
  const [side, setSide] = useState<"Buy" | "Sell">("Buy");
  const [units, setUnits] = useState("100");
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);

  const security = TRADEABLE_SECURITIES.find((item) => item.code === code) ?? TRADEABLE_SECURITIES[0];
  const account = accounts.find((candidate) => candidate.id === accountId);
  const parsedUnits = Number(units);
  const consideration = Number.isFinite(parsedUnits) ? parsedUnits * security.price : 0;
  const brokerage = consideration > 0 ? brokerageFor(consideration) : 0;

  const accountHoldings = valueHoldings(
    holdings.filter((holding) => holding.accountId === accountId),
  ).sort((a, b) => b.value - a.value);

  const tradeHistory = sortTransactions(
    transactions.filter((transaction) => transaction.type === "Buy" || transaction.type === "Sell"),
  ).slice(0, 10);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = placeTrade({
      accountId,
      code: security.code,
      name: security.name,
      side,
      units: parsedUnits,
      price: security.price,
    });
    setFeedback({
      ok: result.ok,
      message: result.ok
        ? `${side} order for ${formatUnits(parsedUnits)} ${security.code} accepted at ${formatCurrency(security.price)}.`
        : result.message,
    });
  }

  return (
    <PortalLayout
      portal="AdviserHUB"
      nav={ADVISER_NAV}
      contextLabel="Practice"
      contextValue={PRACTICE.name}
      contextNote={`${PRACTICE.afsl} · ${PRACTICE.adviserCount} advisers`}
      title="Direct market trading"
      description="Place an at-market order against a client account"
    >
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <PanelCard title="New order" description="Australian listed securities">
          <form noValidate className="flex flex-col gap-5" onSubmit={onSubmit}>
            <Field label="Account" htmlFor="trade-account">
              <Select
                id="trade-account"
                value={accountId}
                onChange={(event) => {
                  setAccountId(event.target.value);
                  setFeedback(null);
                }}
              >
                {accounts.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Security" htmlFor="trade-code">
              <Select
                id="trade-code"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setFeedback(null);
                }}
              >
                {TRADEABLE_SECURITIES.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.code} — {option.name}
                  </option>
                ))}
              </Select>
            </Field>

            <fieldset className="flex flex-col gap-1.5">
              <legend className="text-sm font-semibold text-ink-strong">Order type</legend>
              <div className="mt-1 flex gap-2">
                {(["Buy", "Sell"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={side === option}
                    onClick={() => {
                      setSide(option);
                      setFeedback(null);
                    }}
                    className={cn(
                      "focus-h24 flex-1 rounded-full border px-4 py-2.5 text-sm font-semibold transition",
                      side === option
                        ? "border-h24-teal bg-h24-teal text-white"
                        : "border-line bg-white text-ink-soft hover:border-h24-teal hover:text-h24-teal-dark",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <Field label="Units" htmlFor="trade-units" hint="Listed securities trade in whole units.">
              <TextInput
                id="trade-units"
                type="number"
                min={1}
                step={1}
                value={units}
                onChange={(event) => {
                  setUnits(event.target.value);
                  setFeedback(null);
                }}
              />
            </Field>

            <dl className="flex flex-col divide-y divide-line-soft rounded-h24 bg-surface-tint px-4">
              <div className="flex justify-between gap-4 py-2.5 text-sm">
                <dt className="text-ink-faint">Last price</dt>
                <dd className="font-semibold tabular-nums text-ink-strong">
                  {formatCurrency(security.price)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5 text-sm">
                <dt className="text-ink-faint">Consideration</dt>
                <dd className="font-semibold tabular-nums text-ink-strong">
                  {formatCurrency(consideration)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5 text-sm">
                <dt className="text-ink-faint">Brokerage</dt>
                <dd className="font-semibold tabular-nums text-ink-strong">
                  {formatCurrency(brokerage)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5 text-sm">
                <dt className="text-ink-faint">Available cash</dt>
                <dd className="font-semibold tabular-nums text-ink-strong">
                  {account ? formatCurrency(account.cash) : "—"}
                </dd>
              </div>
            </dl>

            <Button type="submit" size="lg">
              Place {side.toLowerCase()} order
            </Button>

            {feedback ? (
              <p
                role="status"
                className={cn(
                  "flex items-start gap-2 rounded-h24 px-4 py-3 text-sm font-semibold",
                  feedback.ok
                    ? "bg-positive-tint text-positive"
                    : "bg-critical-tint text-critical",
                )}
              >
                {feedback.ok ? (
                  <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                {feedback.message}
              </p>
            ) : null}
          </form>
        </PanelCard>

        <div className="flex flex-col gap-6">
          <PanelCard
            title="Account holdings"
            description={
              account
                ? `${account.name} · ${formatCurrencyWhole(accountValue(account, holdings))}`
                : "Select an account"
            }
            bodyClassName="p-0"
          >
            <DataTable
              className="rounded-none border-0"
              caption="Holdings in the selected account"
              rowKey={(holding) => holding.id}
              rows={accountHoldings}
              empty={<EmptyState className="m-5" title="No holdings in this account" />}
              columns={[
                {
                  key: "name",
                  header: "Investment",
                  render: (holding) => (
                    <div className="flex flex-col">
                      <span className="font-semibold text-ink-strong">{holding.code}</span>
                      <span className="text-xs text-ink-faint">{holding.name}</span>
                    </div>
                  ),
                },
                {
                  key: "units",
                  header: "Units",
                  align: "right",
                  render: (holding) => formatUnits(holding.units),
                },
                {
                  key: "value",
                  header: "Value",
                  align: "right",
                  render: (holding) => formatCurrencyWhole(holding.value),
                },
              ]}
            />
          </PanelCard>

          <PanelCard title="Recent trades" description="Most recent ten across the demo portfolio">
            {tradeHistory.length === 0 ? (
              <p className="text-sm text-ink-faint">No trades placed yet.</p>
            ) : (
              <ul className="flex flex-col divide-y divide-line-soft">
                {tradeHistory.map((trade) => (
                  <li key={trade.id} className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <Badge tone={trade.type === "Buy" ? "teal" : "neutral"}>{trade.type}</Badge>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-ink">{trade.description}</p>
                      <p className="text-xs text-ink-faint">{formatDate(trade.date)}</p>
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-ink-strong">
                      {formatCurrency(trade.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </PanelCard>
        </div>
      </div>

      <p className="mt-8 text-xs text-ink-faint">
        Orders placed here update the demo portfolio in this browser only. Nothing is sent to a
        market, a broker or a server.
      </p>
    </PortalLayout>
  );
}
