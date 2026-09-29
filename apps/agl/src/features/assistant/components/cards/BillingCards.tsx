import { CalendarClock, CreditCard, Flame, Landmark, TrendingUp, Zap } from "lucide-react";
import { comparableBill, household, latestBill, totalOutstanding } from "@/data/account";
import { energyPlans, estimateAnnualCost } from "@/data/plans";
import { formatCurrency, formatDate, formatKwh, formatPercentChange } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { CardShell, Row } from "./CardShell";

export function BillCard() {
  const elec = latestBill("electricity");
  const gas = latestBill("gas");
  return (
    <CardShell>
      <div className="grid gap-3">
        {[
          { bill: elec, label: "Electricity", Icon: Zap },
          { bill: gas, label: "Gas", Icon: Flame },
        ].map(({ bill, label, Icon }) =>
          bill ? (
            <div key={label} className="flex items-center gap-3 rounded-xl bg-surface-tint p-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-agl-blue">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="font-bold text-ink">{label}</p>
                <p className="text-xs text-ink-faint">Due {formatDate(bill.due, "short")}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-extrabold text-ink">{formatCurrency(bill.amount)}</p>
                {bill.readType === "estimated" && <Badge tone="caution">Estimated</Badge>}
              </div>
            </div>
          ) : null,
        )}
      </div>
      <div className="mt-3 border-t border-line-soft pt-2">
        <Row label="Total owing" value={formatCurrency(totalOutstanding())} strong />
      </div>
    </CardShell>
  );
}

export function PaymentConfirmCard() {
  const elec = latestBill("electricity");
  return (
    <CardShell title="Confirm payment" icon={<CreditCard className="h-4 w-4 text-agl-blue" aria-hidden="true" />}>
      <Row label="Electricity bill" value={formatCurrency(elec?.amount ?? 0)} strong />
      <Row label="Pay with" value={`${household.savedCard.brand} •••• ${household.savedCard.last4}`} />
      <Row label="Account" value="8123 441 902" />
    </CardShell>
  );
}

export function BpayCard() {
  return (
    <CardShell>
      <div className="flex items-stretch gap-3">
        <div className="flex w-16 flex-col items-center justify-center rounded-xl bg-[#1b3f94] text-center text-[10px] font-extrabold tracking-wide text-white">
          B<span className="text-base leading-none">PAY</span>
        </div>
        <div className="flex-1">
          <Row label="Biller code" value="2345" strong />
          <Row label="Ref (electricity)" value="8123 4419 02" />
          <Row label="Ref (gas)" value="8123 4419 19" />
        </div>
      </div>
    </CardShell>
  );
}

export function UsageCompareCard() {
  const current = latestBill("electricity");
  const previous = current ? comparableBill(current) : undefined;
  const max = Math.max(current?.usageKwh ?? 0, previous?.usageKwh ?? 0) || 1;
  const bars = [
    { label: "Jun–Sep 2025", kwh: previous?.usageKwh ?? 0, amount: previous?.amount ?? 0, tone: "bg-line" },
    { label: "Jun–Sep 2026", kwh: current?.usageKwh ?? 0, amount: current?.amount ?? 0, tone: "bg-agl-gradient" },
  ];
  return (
    <CardShell title="Your electricity use" icon={<TrendingUp className="h-4 w-4 text-agl-blue" aria-hidden="true" />}>
      <div className="space-y-3">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-semibold text-ink-soft">{b.label}</span>
              <span className="font-bold text-ink">
                {formatKwh(b.kwh)} · {formatCurrency(b.amount)}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-surface-deep">
              <div className={`h-full rounded-full ${b.tone}`} style={{ width: `${(b.kwh / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      {current?.usageKwh && previous?.usageKwh && (
        <p className="mt-3 text-xs text-ink-soft">
          <span className="font-extrabold text-caution">{formatPercentChange(current.usageKwh, previous.usageKwh)}</span> usage vs
          the same quarter last year · Actual meter read
        </p>
      )}
    </CardShell>
  );
}

export function ExtensionCard({ extendedDue }: { extendedDue: string }) {
  const elec = latestBill("electricity");
  return (
    <CardShell title="Payment extension" icon={<CalendarClock className="h-4 w-4 text-agl-blue" aria-hidden="true" />}>
      <Row label="Amount" value={formatCurrency(elec?.amount ?? 0)} strong />
      <Row label="Current due date" value={<s className="text-ink-faint">{elec ? formatDate(elec.due, "short") : ""}</s>} />
      <Row label="New due date" value={<span className="text-positive">{extendedDue}</span>} />
      <Row label="Fees" value="None" />
    </CardShell>
  );
}

export function InstalmentCard() {
  const total = totalOutstanding();
  const plans = [
    { label: "Weekly", amount: total / 12 },
    { label: "Fortnightly", amount: total / 6 },
    { label: "Monthly", amount: total / 3 },
  ];
  return (
    <CardShell title={`Split ${formatCurrency(total)}`}>
      <div className="grid grid-cols-3 gap-2">
        {plans.map((p) => (
          <div key={p.label} className="rounded-xl bg-surface-tint p-3 text-center">
            <p className="text-xs font-semibold text-ink-soft">{p.label}</p>
            <p className="text-base font-extrabold text-ink">{formatCurrency(p.amount)}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-ink-faint">Paid from {household.bankAccount}. Change or stop any time.</p>
    </CardShell>
  );
}

export function RefundCard() {
  return (
    <CardShell title="Account credit" icon={<Landmark className="h-4 w-4 text-agl-blue" aria-hidden="true" />}>
      <Row label="Gas account credit" value={formatCurrency(household.gasCredit)} strong />
      <Row label="Refund to" value={household.bankAccount} />
      <Row label="Arrives" value="3–5 business days" />
    </CardShell>
  );
}

export function PlanCompareCard() {
  const current = energyPlans.find((p) => p.slug === "value-saver");
  const alt = energyPlans.find((p) => p.slug === "netflix-plan");
  if (!current || !alt) return null;
  const rows = [
    { plan: current, tag: "Your plan" },
    { plan: alt, tag: "Includes Netflix" },
  ];
  return (
    <CardShell title="Plans for your usage (3,900 kWh/yr)">
      <div className="grid grid-cols-2 gap-2">
        {rows.map(({ plan, tag }) => (
          <div key={plan.slug} className="rounded-xl border border-line-soft p-3">
            <Badge tone={tag === "Your plan" ? "blue" : "sky"}>{tag}</Badge>
            <p className="mt-2 font-extrabold text-ink">{plan.name}</p>
            <p className="text-lg font-extrabold text-agl-blue">
              {formatCurrency(estimateAnnualCost(plan, 3900, "NSW"), { whole: true })}
              <span className="text-xs font-semibold text-ink-faint">/yr est.</span>
            </p>
            <p className="text-xs text-ink-soft">{plan.usageCents}c/kWh · {plan.supplyCentsPerDay}c/day</p>
          </div>
        ))}
      </div>
    </CardShell>
  );
}
