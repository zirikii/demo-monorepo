import type { UsagePoint } from "@/data/account";
import { formatCurrency, formatKwh } from "@/lib/format";

export function UsageChart({ points, showSolar = false }: { points: UsagePoint[]; showSolar?: boolean }) {
  const max = Math.max(...points.map((p) => Math.max(p.kwh, showSolar ? p.solarExportKwh : 0)), 1);
  return (
    <figure>
      <div className="flex h-56 items-end gap-2" role="img" aria-label={`Usage chart: ${points.map((p) => `${p.label} ${formatKwh(p.kwh)}`).join(", ")}`}>
        {points.map((p) => (
          <div key={p.label} className="group relative flex h-full flex-1 flex-col items-center justify-end gap-1">
            <span className="pointer-events-none absolute -top-2 z-10 hidden -translate-y-full rounded-agl bg-agl-navy px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
              {formatKwh(p.kwh)} · {formatCurrency(p.cost)}
            </span>
            <div className="flex w-full items-end justify-center gap-0.5" style={{ height: "100%" }}>
              <span className="w-full max-w-7 rounded-t-md bg-agl-gradient" style={{ height: `${(p.kwh / max) * 100}%` }} />
              {showSolar && <span className="w-full max-w-3 rounded-t-md bg-[#f5b301]" style={{ height: `${(p.solarExportKwh / max) * 100}%` }} />}
            </div>
            <span className="text-[11px] font-semibold text-ink-faint">{p.label}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 flex gap-4 text-xs text-ink-soft">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-agl-gradient" aria-hidden="true" /> Grid usage
        </span>
        {showSolar && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#f5b301]" aria-hidden="true" /> Solar exported
          </span>
        )}
      </figcaption>
    </figure>
  );
}
