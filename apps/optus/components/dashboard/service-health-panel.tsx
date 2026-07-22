import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusDot } from "@/components/ui/status-dot";
import { formatPercent } from "@/lib/formatters";
import type { ServiceHealth } from "@/lib/types";
function toneFor(status: ServiceHealth["status"]): "success" | "warning" | "danger" {
  if (status === "Operational") return "success";
  if (status === "Maintenance") return "warning";
  return "danger";
}
export function ServiceHealthPanel({ services }: { services: ServiceHealth[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service health</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {services.slice(0, 5).map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between gap-3 rounded-md border border-optus-line p-3"
          >
            <div className="flex items-center gap-3">
              <StatusDot tone={toneFor(service.status)} />
              <div>
                <p className="font-bold text-optus-ink">{service.name}</p>
                <p className="text-sm text-optus-muted">
                  {service.region} · {formatPercent(service.uptime)} uptime
                </p>
              </div>
            </div>
            <Badge tone={toneFor(service.status)}>{service.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
