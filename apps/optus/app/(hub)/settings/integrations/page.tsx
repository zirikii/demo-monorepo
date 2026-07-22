import { PageHeader } from "@/components/layout/page-header";
import { IntegrationsPanel } from "@/components/settings/integrations-panel";
import { getSettings } from "@/lib/data/settings";
export default async function IntegrationsSettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <PageHeader
        eyebrow="Settings"
        title="Integrations"
        description="Toggle simulated exports and enterprise connections. Changes persist to local JSON."
      />
      <IntegrationsPanel integrations={settings.integrations} />
    </div>
  );
}
