import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/current-user";
import { readJson } from "@/lib/data/json-store";
import type { Bill, TopUp } from "@/lib/types";
import { formatNzd, formatShortDate } from "@/lib/utils/format";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const bills = await readJson<Bill[]>("bills.json");
  const topUps = await readJson<TopUp[]>("top-ups.json");
  const due = bills.find((b) => b.status === "Due");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-spark-ink">Dashboard</h2>
        <p className="mt-1 text-sm text-spark-ink/70">Welcome back, {user?.name}.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-spark-ink/50">Data used</p>
          <p className="mt-2 text-3xl font-bold text-spark-purple">62%</p>
          <p className="mt-1 text-sm text-spark-ink/70">of Endless high-speed bucket</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-spark-ink/50">Next bill</p>
          <p className="mt-2 text-3xl font-bold text-spark-ink">
            {due ? formatNzd(due.amount, { cents: true }) : "—"}
          </p>
          <p className="mt-1 text-sm text-spark-ink/70">
            {due ? `Due ${formatShortDate(due.dueDate)}` : "All clear"}
          </p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-spark-ink/50">Last top-up</p>
          <p className="mt-2 text-3xl font-bold text-spark-ink">
            {topUps[0] ? formatNzd(topUps[0].amount) : "—"}
          </p>
          <p className="mt-1 text-sm text-spark-ink/70">
            {topUps[0] ? formatShortDate(topUps[0].createdAt) : "No top-ups yet"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/top-up"
          className="inline-flex h-11 items-center rounded-md bg-spark-purple px-5 text-sm font-semibold text-white"
        >
          Top up
        </Link>
        <Link
          href="/bills"
          className="inline-flex h-11 items-center rounded-md border border-spark-purple px-5 text-sm font-semibold text-spark-purple"
        >
          View bills
        </Link>
        <Link
          href="/usage"
          className="inline-flex h-11 items-center rounded-md border border-line px-5 text-sm font-semibold text-spark-ink"
        >
          Usage details
        </Link>
      </div>
    </div>
  );
}
