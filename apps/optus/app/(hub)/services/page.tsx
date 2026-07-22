import { PageHeader } from "@/components/layout/page-header";
import { ServiceGrid } from "@/components/services/service-grid";
import { getServiceHealth } from "@/lib/data/business";
export default async function ServicesPage() {
  const services = await getServiceHealth();
  return (
    <div>
      <PageHeader
        eyebrow="Network and services"
        title="Service health"
        description="Track mobile, broadband, voice, and 5G services across Australian operating regions."
      />
      <ServiceGrid services={services} />
    </div>
  );
}
