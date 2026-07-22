import { FleetTable } from "@/components/fleet/fleet-table";
import { PageHeader } from "@/components/layout/page-header";
import { getFleetDevices } from "@/lib/data/fleet";
export default async function FleetPage() {
  const devices = await getFleetDevices();
  return (
    <div>
      <PageHeader
        eyebrow="My Fleet Manager"
        title="Mobile fleet control"
        description="Manage Optus mobile services, device assignments, data usage, and roaming risk by cost centre."
      />
      <FleetTable devices={devices} />
    </div>
  );
}
