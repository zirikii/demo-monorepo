import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/current-user";
import { readJson } from "@/lib/data/json-store";
import type { Bill, TopUp } from "@/lib/types";
import { formatAud, formatShortDate } from "@/lib/utils/format";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const bills = await readJson<Bill[]>("bills.json");
  const topUps = await readJson<TopUp[]>("top-ups.json");
  const due = bills.find((b) => b.status === "Due");
  const lastTopUp = topUps[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-optus-ink">Overview</h2>
        <p className="mt-1 text-sm text-optus-ink/70">Welcome back, {user?.name}.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-optus-ink/50">Data used</p>
          <p className="mt-2 text-3xl font-extrabold text-optus-teal">62%</p>
          <p className="mt-1 text-sm text-optus-ink/70">of your 100GB plan</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-muted">
            <div className="h-full w-[62%] rounded-full bg-optus-teal" />
          </div>
        </div>
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-optus-ink/50">Next bill</p>
          <p className="mt-2 text-3xl font-extrabold text-optus-ink">
            {due ? formatAud(due.amount, { cents: true }) : "—"}
          </p>
          <p className="mt-1 text-sm text-optus-ink/70">
            {due ? `Due ${formatShortDate(due.dueDate)}` : "All clear"}
          </p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-optus-ink/50">Last recharge</p>
          <p className="mt-2 text-3xl font-extrabold text-optus-ink">
            {lastTopUp ? formatAud(lastTopUp.amount) : "—"}
          </p>
          <p className="mt-1 text-sm text-optus-ink/70">
            {lastTopUp ? formatShortDate(lastTopUp.createdAt) : "No recharges yet"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/top-up"
          className="focus-ring inline-flex h-11 items-center rounded-md bg-optus-teal px-5 text-sm font-semibold text-white hover:bg-optus-teal-dark"
        >
          Recharge
        </Link>
        <Link
          href="/bills"
          className="focus-ring inline-flex h-11 items-center rounded-md border border-optus-teal px-5 text-sm font-semibold text-optus-teal hover:bg-optus-teal-light"
        >
          View bills
        </Link>
        <Link
          href="/usage"
          className="focus-ring inline-flex h-11 items-center rounded-md border border-line px-5 text-sm font-semibold text-optus-ink hover:bg-surface-muted"
        >
          Usage details
        </Link>
      </div>
    </div>
  );
}
