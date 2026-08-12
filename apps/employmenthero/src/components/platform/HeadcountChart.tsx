import { HEADCOUNT_TREND } from "@/data/platform";

const MAX = Math.max(...HEADCOUNT_TREND.map((point) => point.value));

export function HeadcountChart() {
  return (
    <div>
      <div className="flex h-40 items-end gap-3">
        {HEADCOUNT_TREND.map((point) => (
          <div key={point.month} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs font-bold text-ink-faint">{point.value}</span>
            <div
              className="w-full rounded-t-eh-sm bg-eh-purple/85 transition hover:bg-eh-purple"
              style={{ height: `${(point.value / MAX) * 100}%` }}
              role="presentation"
            />
            <span className="text-xs text-ink-faint">{point.month}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-ink-faint">
        Headcount across five venues, February to August 2026.
      </p>
    </div>
  );
}
