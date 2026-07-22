import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/current-user";
import { readJson } from "@/lib/data/json-store";
import type { Bill, MobilePlan, UsageSnapshot } from "@/lib/types";
import { formatAud, formatShortDate } from "@/lib/utils/format";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const bills = await readJson<Bill[]>("bills.json");
  const usage = await readJson<UsageSnapshot>("usage.json");
  const plans = await readJson<MobilePlan[]>("mobile-plans.json");
  const due = bills.find((b) => b.status === "Due") ?? bills.find((b) => b.status === "Overdue");
  const plan = plans.find((p) => p.id === "choice") ?? plans[0];
  const usedPct = Math.round((usage.dataUsedGb / usage.dataAllowanceGb) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-optus-ink">Dashboard</h2>
        <p className="mt-1 text-sm text-optus-ink/70">Welcome back, {user?.name}.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-optus-ink/50">Data used</p>
          <p className="mt-2 text-3xl font-bold text-optus-teal">{usedPct}%</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-muted">
            <div className="h-full rounded-full bg-optus-teal" style={{ width: `${usedPct}%` }} />
          </div>
          <p className="mt-2 text-sm text-optus-ink/70">
            {usage.dataUsedGb}GB of {usage.dataAllowanceGb}GB · {usage.periodLabel}
          </p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-optus-ink/50">Next bill</p>
          <p className="mt-2 text-3xl font-bold text-optus-ink">
            {due ? formatAud(due.amount, { cents: true }) : "—"}
          </p>
          <p className="mt-1 text-sm text-optus-ink/70">
            {due ? `Due ${formatShortDate(due.dueDate)}` : "All clear"}
          </p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-optus-ink/50">Your plan</p>
          <p className="mt-2 text-3xl font-bold text-optus-ink">{plan?.name ?? "—"}</p>
          <p className="mt-1 text-sm text-optus-ink/70">
            {plan ? `${formatAud(plan.price)}/mth · ${plan.data}` : "No plan"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/add-ons"
          className="inline-flex h-11 items-center rounded-md bg-optus-teal px-5 text-sm font-semibold text-white"
        >
          Boost data
        </Link>
        <Link
          href="/bills"
          className="inline-flex h-11 items-center rounded-md border border-optus-teal px-5 text-sm font-semibold text-optus-teal"
        >
          View bills
        </Link>
        <Link
          href="/usage"
          className="inline-flex h-11 items-center rounded-md border border-line px-5 text-sm font-semibold text-optus-ink"
        >
          Usage details
        </Link>
      </div>
    </div>
  );
}
