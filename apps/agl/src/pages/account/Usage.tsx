import { useState } from "react";
import { AccountLayout } from "@/components/account/AccountLayout";
import { UsageChart } from "@/components/account/UsageChart";
import { dailyUsage, internetUsage, mobileUsage, monthlyUsage } from "@/data/account";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { formatCurrency, formatKwh } from "@/lib/format";

export function AccountUsagePage() {
  useDocumentTitle("Usage");
  const [range, setRange] = useState<"month" | "day">("month");
  const points = range === "month" ? monthlyUsage : dailyUsage;
  const total = points.reduce((s, p) => s + p.kwh, 0);
  const cost = points.reduce((s, p) => s + p.cost, 0);

  return (
    <AccountLayout title="Usage">
      <section className="rounded-agl-lg border border-line-soft bg-white p-6 shadow-agl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-ink">Electricity</h2>
            <p className="text-sm text-ink-soft">
              {formatKwh(total)} · {formatCurrency(cost)} {range === "month" ? "over 12 months" : "this week"}
            </p>
          </div>
          <div className="inline-flex rounded-full bg-surface-tint p-1" role="group" aria-label="Usage range">
            {(["month", "day"] as const).map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={range === r}
                onClick={() => setRange(r)}
                className={cn("rounded-full px-4 py-1.5 text-sm font-bold", range === r ? "bg-white text-agl-blue shadow-agl" : "text-ink-soft")}
              >
                {r === "month" ? "Monthly" : "Daily"}
              </button>
            ))}
          </div>
        </div>
        <UsageChart points={points} />
      </section>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-agl-lg border border-line-soft bg-white p-6">
          <h2 className="text-lg font-extrabold text-ink">Internet · {internetUsage.planSpeed}</h2>
          <p className="mt-2 text-3xl font-extrabold text-agl-blue-dark">{internetUsage.downloadedGb}GB</p>
          <p className="text-sm text-ink-soft">downloaded this month · unlimited data</p>
        </section>
        <section className="rounded-agl-lg border border-line-soft bg-white p-6">
          <h2 className="text-lg font-extrabold text-ink">Mobile data</h2>
          <p className="mt-2 text-3xl font-extrabold text-agl-blue-dark">
            {mobileUsage.usedGb}GB <span className="text-base font-semibold text-ink-faint">of {mobileUsage.allowanceGb}GB</span>
          </p>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-surface-deep" role="progressbar" aria-valuenow={mobileUsage.usedGb} aria-valuemin={0} aria-valuemax={mobileUsage.allowanceGb} aria-label="Mobile data used">
            <div className="h-full rounded-full bg-agl-gradient" style={{ width: `${(mobileUsage.usedGb / mobileUsage.allowanceGb) * 100}%` }} />
          </div>
          <p className="mt-2 text-sm text-ink-soft">{mobileUsage.daysLeft} days left in this cycle</p>
        </section>
      </div>
    </AccountLayout>
  );
}
