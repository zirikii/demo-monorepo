import { ArrowUpRight } from "lucide-react";
import { formatCurrencyWhole, formatPercent } from "@/lib/format";
import { cn } from "@/lib/cn";

const ALLOCATION = [
  { label: "Australian equities", weight: 31, tone: "bg-h24-teal" },
  { label: "International equities", weight: 27, tone: "bg-h24-teal-bright" },
  { label: "Fixed income", weight: 24, tone: "bg-h24-navy" },
  { label: "Property & infrastructure", weight: 11, tone: "bg-h24-aqua" },
  { label: "Cash", weight: 7, tone: "bg-surface-deep" },
];

const SERIES = [38, 44, 41, 52, 58, 55, 63, 69, 66, 74, 81, 88];

/**
 * A static representation of the InvestorHUB dashboard used on marketing pages. It is
 * deliberately not wired to the portfolio context so the landing page renders without a
 * session.
 */
export function PortfolioMockup({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "rounded-h24-xl border border-white/12 bg-white p-5 shadow-h24-lift md:p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-ink-ghost uppercase">
            Portfolio value
          </p>
          <p className="font-display text-3xl font-semibold text-h24-navy">
            {formatCurrencyWhole(1_874_320)}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-positive-tint px-2.5 py-1 text-xs font-semibold text-positive">
          <ArrowUpRight className="h-3.5 w-3.5" />
          {formatPercent(9.4, 1)} 1yr
        </span>
      </div>

      <div className="mt-5 flex h-24 items-end gap-1.5">
        {SERIES.map((height, index) => (
          <span
            key={index}
            className={cn(
              "flex-1 rounded-t-sm",
              index === SERIES.length - 1 ? "bg-h24-teal" : "bg-h24-tint-strong",
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="text-xs font-bold tracking-[0.14em] text-ink-ghost uppercase">Asset allocation</p>
        <div className="mt-3 flex h-2.5 overflow-hidden rounded-full">
          {ALLOCATION.map((slice) => (
            <span key={slice.label} className={slice.tone} style={{ width: `${slice.weight}%` }} />
          ))}
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {ALLOCATION.map((slice) => (
            <li key={slice.label} className="flex items-center gap-2 text-xs text-ink-soft">
              <span className={cn("h-2 w-2 rounded-full", slice.tone)} />
              <span className="flex-1 truncate">{slice.label}</span>
              <span className="font-semibold text-ink">{slice.weight}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
