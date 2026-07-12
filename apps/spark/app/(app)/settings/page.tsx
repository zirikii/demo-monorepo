import type { Metadata } from "next";
import { requireSession } from "@/lib/auth/server";
import { getSettings } from "@/lib/data/settings";
import { PageHeader } from "@/components/layout/PageHeader";
import { SettingsPanel } from "@/components/settings/SettingsPanel";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const [user, settings] = await Promise.all([requireSession(), getSettings()]);

  return (
    <div className="container-page max-w-3xl space-y-6 py-8">
      <PageHeader title="Settings" description="Manage your account, notifications and privacy." />
      <SettingsPanel initial={settings} user={user} />
    </div>
  );
}
