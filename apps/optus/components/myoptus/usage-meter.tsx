import { clampPercent } from "@/lib/utils/format";

export function UsageMeter({
  label,
  used,
  total,
  unit,
}: {
  label: string;
  used: number;
  total: number;
  unit: string;
}) {
  const pct = clampPercent(total === 0 ? 0 : (used / total) * 100);
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-optus-ink">{label}</p>
        <p className="text-sm text-optus-ink-soft">
          {used}
          {unit} of {total}
          {unit}
        </p>
      </div>
      <div
        className="mt-3 h-3 w-full overflow-hidden rounded-full bg-surface-muted"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} usage`}
      >
        <div className="h-full rounded-full bg-optus-yellow" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-xs text-optus-ink-soft">{pct}% used this cycle</p>
    </div>
  );
}
