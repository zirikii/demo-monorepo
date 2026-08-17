import type { PerformancePoint } from "@/data/types";
import { formatCurrencyWhole, formatMonthYear } from "@/lib/format";

export function PerformanceChart({ points }: { points: PerformancePoint[] }) {
  const values = points.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-48 items-end gap-1.5">
        {points.map((point, index) => {
          // Floor the bars at 20% so the earliest month is still legible rather than a sliver.
          const height = ((point.value - min) / (max - min || 1)) * 80 + 20;
          const last = index === points.length - 1;
          return (
            <div key={point.month} className="flex flex-1 flex-col justify-end">
              <div
                className={last ? "rounded-t-sm bg-h24-teal" : "rounded-t-sm bg-h24-tint-strong"}
                style={{ height: `${height}%` }}
                title={`${formatMonthYear(`${point.month}-01`)} · ${formatCurrencyWhole(point.value)}`}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-ink-ghost">
        <span>{formatMonthYear(`${points[0]?.month ?? "2026-01"}-01`)}</span>
        <span>{formatMonthYear(`${points[points.length - 1]?.month ?? "2026-01"}-01`)}</span>
      </div>
    </div>
  );
}
