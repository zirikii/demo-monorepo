import { readJson } from "@/lib/data/json-store";
import type { UsageMetric } from "@/lib/types";

export default async function UsagePage() {
  const rows = await readJson<UsageMetric[]>("usage.json");
  return <div><h2 className="text-2xl font-black text-optus-ink">Usage</h2><p className="mt-1 text-sm text-optus-ink/70">Current billing cycle (demo figures).</p><ul className="mt-8 space-y-5">{rows.map((row) => <li key={row.id} className="rounded-lg border border-line bg-white p-5"><div className="flex items-center justify-between gap-4"><p className="font-bold text-optus-ink">{row.label}</p><p className="text-sm text-optus-ink/70">{row.used} / {row.limit}</p></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-muted"><div className="h-full rounded-full bg-optus-teal" style={{ width: `${row.pct}%` }} /></div></li>)}</ul></div>;
}
