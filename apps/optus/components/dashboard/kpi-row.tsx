import { Activity, AlertTriangle, ReceiptText, Smartphone } from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/formatters";
import type { FleetDevice, ServiceHealth } from "@/lib/types";
export function KpiRow({ fleet, services }: { fleet: FleetDevice[]; services: ServiceHealth[] }) {
  const spend = fleet.reduce((total, device) => total + device.monthlyCost, 0);
  const roaming = fleet.filter((device) => device.roaming).length;
  const uptime = services.reduce((total, service) => total + service.uptime, 0) / services.length;
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Monthly fleet spend"
        value={formatCurrency(spend)}
        detail="Across active mobile services"
        icon={ReceiptText}
        tone="yellow"
      />
      <MetricCard
        title="Active services"
        value={formatNumber(fleet.length)}
        detail="Mobile fleet connections"
        icon={Smartphone}
      />
      <MetricCard
        title="Roaming alerts"
        value={String(roaming)}
        detail="High-usage international plans"
        icon={AlertTriangle}
        tone="yellow"
      />
      <MetricCard
        title="Service uptime"
        value={formatPercent(uptime)}
        detail="Mobile, broadband, voice, and 5G"
        icon={Activity}
      />
    </div>
  );
}
