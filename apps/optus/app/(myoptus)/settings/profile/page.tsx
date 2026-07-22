import type { Metadata } from "next";
import { readJson } from "@/lib/data/json-store";
import type { SettingsFile } from "@/lib/types";
import { SettingsTabs } from "@/components/myoptus/settings-tabs";
import { ProfileForm } from "@/components/myoptus/profile-form";

export const metadata: Metadata = {
  title: "Profile settings",
};

export default async function ProfileSettingsPage() {
  const settings = await readJson<SettingsFile>("settings.json");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-optus-ink">Settings</h2>
      <SettingsTabs />
      <ProfileForm initial={settings.profile} />
    </div>
  );
}
