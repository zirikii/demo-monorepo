import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/current-user";
import { readJson } from "@/lib/data/json-store";
import type { Bill, Recharge } from "@/lib/types";
import { formatAud, formatShortDate } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const bills = await readJson<Bill[]>("bills.json");
  const recharges = await readJson<Recharge[]>("recharges.json");
  const due = bills.find((b) => b.status === "Due");
  const lastRecharge = recharges[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-optus-ink">Dashboard</h2>
        <p className="mt-1 text-sm text-optus-ink-soft">Welcome back, {user?.name}.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-optus-ink-soft">Data used</p>
          <p className="mt-2 text-3xl font-bold text-optus-ink">62%</p>
          <p className="mt-1 text-sm text-optus-ink-soft">of 180GB this cycle</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-optus-ink-soft">Next bill</p>
          <p className="mt-2 text-3xl font-bold text-optus-ink">
            {due ? formatAud(due.amount, { cents: true }) : "—"}
          </p>
          <p className="mt-1 text-sm text-optus-ink-soft">
            {due ? `Due ${formatShortDate(due.dueDate)}` : "All clear"}
          </p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-optus-ink-soft">Last recharge</p>
          <p className="mt-2 text-3xl font-bold text-optus-ink">
            {lastRecharge ? formatAud(lastRecharge.amount) : "—"}
          </p>
          <p className="mt-1 text-sm text-optus-ink-soft">
            {lastRecharge ? formatShortDate(lastRecharge.createdAt) : "No recharges yet"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/recharge"
          className="inline-flex h-11 items-center rounded-md bg-optus-yellow px-5 text-sm font-semibold text-optus-ink hover:bg-optus-yellow-dark"
        >
          Recharge
        </Link>
        <Link
          href="/bills"
          className="inline-flex h-11 items-center rounded-md bg-optus-ink px-5 text-sm font-semibold text-white hover:bg-optus-ink/90"
        >
          View bills
        </Link>
        <Link
          href="/usage"
          className="inline-flex h-11 items-center rounded-md border border-line px-5 text-sm font-semibold text-optus-ink hover:bg-surface-muted"
        >
          Usage details
        </Link>
      </div>
    </div>
  );
}
