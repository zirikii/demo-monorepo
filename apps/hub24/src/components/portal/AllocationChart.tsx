import type { AllocationSlice } from "@/lib/portfolio";
import type { AssetClass } from "@/data/types";
import { formatCurrencyWhole, formatPercent } from "@/lib/format";
import { cn } from "@/lib/cn";

const COLOURS: Record<AssetClass, string> = {
  "Australian equities": "bg-h24-teal",
  "International equities": "bg-h24-teal-bright",
  "Fixed income": "bg-h24-navy",
  "Property & infrastructure": "bg-h24-aqua",
  Alternatives: "bg-info",
  Cash: "bg-surface-deep",
};

export function AllocationChart({ slices }: { slices: AllocationSlice[] }) {
  return (
    <div className="flex flex-col gap-5">
      <div
        role="img"
        aria-label={slices
          .map((slice) => `${slice.assetClass} ${formatPercent(slice.weight, 1)}`)
          .join(", ")}
        className="flex h-3 overflow-hidden rounded-full"
      >
        {slices.map((slice) => (
          <span
            key={slice.assetClass}
            className={COLOURS[slice.assetClass]}
            style={{ width: `${slice.weight}%` }}
          />
        ))}
      </div>

      <ul className="flex flex-col gap-2.5">
        {slices.map((slice) => (
          <li key={slice.assetClass} className="flex items-center gap-3 text-sm">
            <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", COLOURS[slice.assetClass])} />
            <span className="flex-1 truncate text-ink">{slice.assetClass}</span>
            <span className="tabular-nums text-ink-faint">{formatCurrencyWhole(slice.value)}</span>
            <span className="w-14 text-right font-semibold tabular-nums text-ink-strong">
              {formatPercent(slice.weight, 1)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
