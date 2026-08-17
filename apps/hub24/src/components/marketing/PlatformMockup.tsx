import { ArrowUpRight } from "lucide-react";
import { billions } from "@/lib/format";

const ALLOCATION = [
  { label: "Managed portfolios", weight: 46, color: "#0057b8" },
  { label: "Managed funds", weight: 22, color: "#00a3ad" },
  { label: "Listed securities", weight: 20, color: "#4b8fe0" },
  { label: "Cash & term deposits", weight: 12, color: "#7fd4d8" },
];

const BARS = [42, 55, 48, 63, 71, 66, 78, 85];

/** A stylised AdviserHUB screenshot for the marketing hero — no real client data involved. */
export function PlatformMockup() {
  return (
    <div className="rounded-hub-xl border border-white/15 bg-white p-5 shadow-hub-lift">
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex flex-col">
          <span className="text-xs font-extrabold tracking-[0.14em] text-ink-ghost uppercase">
            Practice overview
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-ink-strong">
            {billions(8_024_000_000)}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-positive-tint px-3 py-1 text-sm font-bold text-positive">
          <ArrowUpRight aria-hidden className="h-4 w-4" />
          +6.4% FYTD
        </span>
      </div>

      <div className="grid gap-5 py-5 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-extrabold tracking-[0.12em] text-ink-ghost uppercase">
            Asset mix
          </span>
          <ul className="flex flex-col gap-2.5">
            {ALLOCATION.map((item) => (
              <li key={item.label} className="flex flex-col gap-1">
                <span className="flex justify-between text-xs font-semibold text-ink-soft">
                  {item.label}
                  <span className="text-ink-strong">{item.weight}%</span>
                </span>
                <span className="h-1.5 w-full overflow-hidden rounded-full bg-surface-deep">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${item.weight}%`, background: item.color }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-extrabold tracking-[0.12em] text-ink-ghost uppercase">
            Net inflows
          </span>
          <div className="flex h-28 items-end gap-2">
            {BARS.map((bar, index) => (
              <span
                key={bar + String(index)}
                className="flex-1 rounded-t-sm bg-hub-blue/80"
                style={{ height: `${bar}%` }}
              />
            ))}
          </div>
          <span className="text-xs text-ink-faint">Rolling 8 quarters, demo data</span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-hub bg-surface-tint px-4 py-3 text-sm">
        <span className="font-bold text-ink-strong">3 trades awaiting approval</span>
        <span className="font-semibold text-hub-blue">Review</span>
      </div>
    </div>
  );
}
