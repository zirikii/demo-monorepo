import { SettingsTabs } from "@/components/myoptus/settings-tabs";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-optus-ink">Settings</h2>
        <p className="mt-1 text-sm text-optus-ink/70">Manage your account, profile and add-ons.</p>
      </div>
      <SettingsTabs />
      <div>{children}</div>
    </div>
  );
}
