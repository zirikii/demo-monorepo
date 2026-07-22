import { PageHeader } from "@/components/layout/page-header";
import { ProfileCard } from "@/components/settings/profile-card";
import { getSettings } from "@/lib/data/settings";
export default async function AccountSettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <PageHeader
        eyebrow="Settings"
        title="Account"
        description="Optus account details shown from local settings JSON."
      />
      <ProfileCard profile={settings.profile} />
    </div>
  );
}
