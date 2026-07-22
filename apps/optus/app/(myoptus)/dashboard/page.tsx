import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/current-user";
import { readJson } from "@/lib/data/json-store";
import type { AddOn, Bill, UsageMetric } from "@/lib/types";
import { formatAud, formatShortDate } from "@/lib/utils/format";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const [bills, usage, addOns] = await Promise.all([readJson<Bill[]>("bills.json"), readJson<UsageMetric[]>("usage.json"), readJson<AddOn[]>("add-ons.json")]);
  const due = bills.find((bill) => bill.status === "Due");
  const data = usage.find((item) => item.id === "mobile-data");
  const activeAddOns = addOns.filter((item) => item.active);
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-black text-optus-ink">Dashboard</h2><p className="mt-1 text-sm text-optus-ink/70">Welcome back, {user?.name}.</p></div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-line bg-white p-5"><p className="text-xs font-bold uppercase text-optus-ink/50">Data used</p><p className="mt-2 text-3xl font-black text-optus-teal-dark">{data?.pct ?? 0}%</p><p className="mt-1 text-sm text-optus-ink/70">{data ? `${data.used} of ${data.limit}` : "No usage"}</p></div>
        <div className="rounded-lg border border-line bg-white p-5"><p className="text-xs font-bold uppercase text-optus-ink/50">Next bill</p><p className="mt-2 text-3xl font-black text-optus-ink">{due ? formatAud(due.amount, { cents: true }) : "-"}</p><p className="mt-1 text-sm text-optus-ink/70">{due ? `Due ${formatShortDate(due.dueDate)}` : "All clear"}</p></div>
        <div className="rounded-lg border border-line bg-white p-5"><p className="text-xs font-bold uppercase text-optus-ink/50">Active add-ons</p><p className="mt-2 text-3xl font-black text-optus-ink">{activeAddOns.length}</p><p className="mt-1 text-sm text-optus-ink/70">Roaming, entertainment and data boosts</p></div>
      </div>
      <div className="flex flex-wrap gap-3"><Link href="/add-ons" className="inline-flex h-11 items-center rounded-md bg-optus-teal px-5 text-sm font-bold text-white">Manage add-ons</Link><Link href="/bills" className="inline-flex h-11 items-center rounded-md border border-optus-teal px-5 text-sm font-bold text-optus-teal-dark">View bills</Link><Link href="/usage" className="inline-flex h-11 items-center rounded-md border border-line px-5 text-sm font-bold text-optus-ink">Usage details</Link></div>
    </div>
  );
}
