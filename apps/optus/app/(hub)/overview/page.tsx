import { ActionList } from "@/components/dashboard/action-list";
import { CostCentreChart } from "@/components/dashboard/cost-centre-chart";
import { KpiRow } from "@/components/dashboard/kpi-row";
import { ServiceHealthPanel } from "@/components/dashboard/service-health-panel";
import { UsageBars } from "@/components/dashboard/usage-bars";
import { PageHeader } from "@/components/layout/page-header";
import { getInsights, getServiceHealth } from "@/lib/data/business";
import { getFleetDevices } from "@/lib/data/fleet";
export default async function OverviewPage() {
  const [fleet, services, insights] = await Promise.all([
    getFleetDevices(),
    getServiceHealth(),
    getInsights(),
  ]);
  return (
    <div>
      <PageHeader
        eyebrow="Executive dashboard"
        title="Welcome back, Optus Business admin"
        description="Monitor spend, usage, service health, and priority actions across the Harbour Retail Group account."
      />
      <KpiRow fleet={fleet} services={services} />
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          <CostCentreChart rows={insights.costCentres} />
          <UsageBars fleet={fleet} />
        </div>
        <div className="space-y-6">
          <ActionList />
          <ServiceHealthPanel services={services} />
        </div>
      </div>
    </div>
  );
}
