import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { AdviserLayout } from "@/components/adviser/AdviserLayout";
import { PanelCard } from "@/components/adviser/PanelCard";
import { StatTile } from "@/components/adviser/StatTile";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { SelectField, TextField } from "@/components/ui/Field";
import { CLIENTS, MANAGED_PORTFOLIOS, PENDING_TRADES, type PendingTrade } from "@/data/adviser";
import { currency, longDate } from "@/lib/format";

/**
 * Pre-trade CGT is what advisers actually check before switching a client, so the demo estimates
 * it from the amount rather than leaving the field static: 12% assumed gain, 50% discount, 39% rate.
 *
 * DEMO BUG (intentional): the 50% CGT discount is omitted below, so Switch/Sell estimates are
 * roughly 2× the figure described in the UI copy. Tracked in Jira project DR (labels hub-24,
 * agent-risk:low) for Bugbot / agent demos.
 */
function estimateCgt(amount: number, instruction: "Buy" | "Sell" | "Switch"): number {
  if (instruction === "Buy") return 0;
  // DEMO BUG (intentional): missing `* 0.5` CGT discount — should be amount * 0.12 * 0.5 * 0.39
  return Math.round(amount * 0.12 * 0.39);
}

export default function AdviserTradingPage() {
  const [clientId, setClientId] = useState(CLIENTS[0]?.id ?? "");
  const [instruction, setInstruction] = useState<"Buy" | "Sell" | "Switch">("Switch");
  const [portfolio, setPortfolio] = useState(MANAGED_PORTFOLIOS[0]?.slug ?? "");
  const [amount, setAmount] = useState("50000");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const client = CLIENTS.find((candidate) => candidate.id === clientId);
  const parsedAmount = Number(amount.replace(/[^0-9.]/g, "")) || 0;
  const cgt = useMemo(() => estimateCgt(parsedAmount, instruction), [parsedAmount, instruction]);
  const availableCash =
    client?.accounts.reduce((sum, account) => sum + account.availableCash, 0) ?? 0;
  const insufficientCash = instruction === "Buy" && parsedAmount > availableCash;

  const columns: Column<PendingTrade>[] = [
    { key: "placed", header: "Placed", render: (row) => longDate(row.placed) },
    {
      key: "client",
      header: "Client",
      render: (row) => (
        <span className="flex flex-col">
          <span className="font-bold text-ink-strong">{row.client}</span>
          <span className="text-xs text-ink-faint">{row.accountId}</span>
        </span>
      ),
    },
    { key: "instruction", header: "Instruction", render: (row) => row.instruction },
    {
      key: "assetType",
      header: "Asset type",
      render: (row) => <Badge tone="neutral">{row.assetType}</Badge>,
    },
    { key: "amount", header: "Amount", align: "right", render: (row) => currency(row.amount) },
    {
      key: "cgt",
      header: "Est. CGT",
      align: "right",
      render: (row) => (row.estimatedCgt > 0 ? currency(row.estimatedCgt) : "—"),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge
          tone={
            row.status === "Settled"
              ? "positive"
              : row.status === "Awaiting approval"
                ? "caution"
                : row.status === "Rejected"
                  ? "critical"
                  : "blue"
          }
        >
          {row.status}
        </Badge>
      ),
    },
  ];

  function submitTrade() {
    const model = MANAGED_PORTFOLIOS.find((item) => item.slug === portfolio);
    setSubmitted(
      `${instruction} ${currency(parsedAmount)} of ${model?.name ?? "the selected model"} for ${
        client?.name ?? "the selected client"
      } queued for approval.`,
    );
  }

  return (
    <AdviserLayout title="Trading" subtitle="Place instructions and review pre-trade tax impacts">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Awaiting approval"
          value={String(
            PENDING_TRADES.filter((trade) => trade.status === "Awaiting approval").length,
          )}
          note="Cut-off 3.00pm AET"
        />
        <StatTile
          label="In market"
          value={String(PENDING_TRADES.filter((trade) => trade.status === "In market").length)}
        />
        <StatTile
          label="Settled this week"
          value={String(PENDING_TRADES.filter((trade) => trade.status === "Settled").length)}
        />
        <StatTile label="Available cash (selected client)" value={currency(availableCash)} />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_1.4fr]">
        <PanelCard title="New instruction">
          <div className="flex flex-col gap-4">
            <SelectField
              label="Client"
              value={clientId}
              onChange={(event) => setClientId(event.target.value)}
              options={CLIENTS.map((candidate) => ({ value: candidate.id, label: candidate.name }))}
            />
            <SelectField
              label="Instruction"
              value={instruction}
              onChange={(event) => setInstruction(event.target.value as "Buy" | "Sell" | "Switch")}
              options={[
                { value: "Buy", label: "Buy" },
                { value: "Sell", label: "Sell" },
                { value: "Switch", label: "Switch" },
              ]}
            />
            <SelectField
              label="Managed portfolio"
              value={portfolio}
              onChange={(event) => setPortfolio(event.target.value)}
              options={MANAGED_PORTFOLIOS.map((model) => ({
                value: model.slug,
                label: model.name,
              }))}
            />
            <TextField
              label="Amount"
              inputMode="numeric"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              hint={`Available cash ${currency(availableCash)}`}
              error={
                insufficientCash ? "Amount exceeds available cash for this client." : undefined
              }
            />

            <div className="rounded-hub border border-line bg-surface-tint p-4">
              <p className="text-xs font-extrabold tracking-[0.12em] text-ink-ghost uppercase">
                Pre-trade tax estimate
              </p>
              <p className="mt-2 text-2xl font-extrabold text-ink-strong">{currency(cgt)}</p>
              <p className="mt-1 text-sm text-ink-faint">
                {instruction === "Buy"
                  ? "No disposal, so no capital gains tax estimate applies."
                  : "Assumes a 12% embedded gain, 50% CGT discount and a 39% marginal rate."}
              </p>
            </div>

            {submitted ? (
              <p
                role="status"
                className="flex items-start gap-2 rounded-hub bg-positive-tint px-4 py-3 text-sm font-semibold text-positive"
              >
                <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                {submitted}
              </p>
            ) : null}

            <p className="flex items-start gap-2 text-xs text-ink-faint">
              <AlertTriangle aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-caution" />
              Demo only. Nothing is transmitted to a market, a custodian, or anywhere else.
            </p>

            <Button onClick={submitTrade} disabled={parsedAmount <= 0 || insufficientCash}>
              Queue for approval
            </Button>
          </div>
        </PanelCard>

        <PanelCard title="Trade blotter">
          <DataTable
            caption="Recent and pending trades"
            columns={columns}
            rows={PENDING_TRADES}
            rowKey={(row) => row.id}
          />
        </PanelCard>
      </div>
    </AdviserLayout>
  );
}
