import { PageHeader } from "@/components/layout/page-header";
import { TeamTable } from "@/components/settings/team-table";
import { getSettings } from "@/lib/data/settings";
export default async function TeamSettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <PageHeader
        eyebrow="Settings"
        title="Team access"
        description="Role-based users for administrators, cost-centre managers, and end users."
      />
      <TeamTable members={settings.team} />
    </div>
  );
}
