import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatPercent } from "@/lib/formatters";
import type { ServiceHealth } from "@/lib/types";
function tone(status: ServiceHealth["status"]): "success" | "warning" | "danger" {
  if (status === "Operational") return "success";
  if (status === "Maintenance") return "warning";
  return "danger";
}
export function ServiceGrid({ services }: { services: ServiceHealth[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <Card key={service.id} className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-optus-teal">
                {service.category}
              </p>
              <h2 className="mt-2 text-xl font-black text-optus-ink">{service.name}</h2>
              <p className="text-sm text-optus-muted">{service.region}</p>
            </div>
            <Badge tone={tone(service.status)}>{service.status}</Badge>
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md bg-optus-page p-3">
              <dt className="text-optus-muted">Uptime</dt>
              <dd className="font-black text-optus-ink">{formatPercent(service.uptime)}</dd>
            </div>
            <div className="rounded-md bg-optus-page p-3">
              <dt className="text-optus-muted">Incidents</dt>
              <dd className="font-black text-optus-ink">{service.incidents}</dd>
            </div>
          </dl>
        </Card>
      ))}
    </div>
  );
}
