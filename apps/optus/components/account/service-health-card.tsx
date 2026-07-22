import type { Service } from "@/lib/types";
import { formatPercent, formatShortDate } from "@/lib/utils/format";

export function ServiceHealthCard({ service }: { service: Service }) {
  return (
    <article className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-optus-teal">
            {service.type}
          </p>
          <h3 className="mt-1 font-black text-optus-ink">{service.name}</h3>
        </div>
        <span className="rounded-full bg-optus-teal-light px-3 py-1 text-xs font-bold text-optus-navy">
          {service.status}
        </span>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-optus-teal"
          style={{ width: formatPercent(service.usagePercent) }}
        />
      </div>
      <p className="mt-2 text-sm text-optus-ink/70">{service.usageLabel}</p>
      <p className="mt-1 text-xs text-optus-ink/50">Renews {formatShortDate(service.renewsAt)}</p>
    </article>
  );
}
