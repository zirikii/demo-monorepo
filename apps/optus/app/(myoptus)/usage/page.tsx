import { readJson } from "@/lib/data/json-store";
import type { UsageSnapshot } from "@/lib/types";

export default async function UsagePage() {
  const usage = await readJson<UsageSnapshot>("usage.json");
  const usedPct = Math.min(
    100,
    Math.round((usage.dataUsedGb / usage.dataAllowanceGb) * 100),
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-optus-ink">Usage</h2>
        <p className="mt-1 text-sm text-optus-ink/70">Billing period {usage.periodLabel}</p>
      </div>

      <div className="rounded-lg border border-line bg-white p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-optus-ink/60">Shared data</p>
            <p className="mt-1 text-3xl font-extrabold text-optus-teal">
              {usage.dataUsedGb}GB
              <span className="text-base font-semibold text-optus-ink/50">
                {" "}
                / {usage.dataAllowanceGb}GB
              </span>
            </p>
          </div>
          <p className="text-2xl font-bold text-optus-ink">{usedPct}%</p>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface-muted">
          <div className="h-full rounded-full bg-optus-teal" style={{ width: `${usedPct}%` }} />
        </div>
        <p className="mt-3 text-sm text-optus-ink/65">
          Endless Data keeps you online at slower speeds after you use your allowance (demo).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-optus-ink/50">Calls</p>
          <p className="mt-2 text-2xl font-bold">{usage.callsMinutes} min</p>
          <p className="mt-1 text-sm text-optus-ink/65">Unlimited standard national calls</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase text-optus-ink/50">SMS</p>
          <p className="mt-2 text-2xl font-bold">{usage.smsCount}</p>
          <p className="mt-1 text-sm text-optus-ink/65">Unlimited standard national texts</p>
        </div>
      </div>
    </div>
  );
}
