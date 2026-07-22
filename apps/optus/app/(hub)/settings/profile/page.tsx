import { PageHeader } from "@/components/layout/page-header";
import { ProfileCard } from "@/components/settings/profile-card";
import { getSettings } from "@/lib/data/settings";
export default async function ProfileSettingsPage() {
  const settings = await getSettings();
  return (
    <div>
      <PageHeader
        eyebrow="Settings"
        title="Profile"
        description="Primary contact and billing profile for the demo account."
      />
      <ProfileCard profile={settings.profile} />
    </div>
  );
}
