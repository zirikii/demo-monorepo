import { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { useAuth } from "@/hooks/useAuth";
import { readJson, writeJson } from "@/lib/storage";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

type SettingsState = {
  companyName: string;
  timezone: string;
  sso: boolean;
  weeklyDigest: boolean;
};

const KEY = "eh-demo-settings";

export function PortalSettingsPage() {
  useDocumentTitle("Settings");
  const { user } = useAuth();
  const [settings, setSettings] = useState<SettingsState>(() =>
    readJson(KEY, {
      companyName: user?.company ?? "Harbour & Co",
      timezone: "Australia/Sydney",
      sso: false,
      weeklyDigest: true,
    }),
  );
  const [saved, setSaved] = useState(false);

  return (
    <PortalLayout title="Settings">
      <form
        className="max-w-xl space-y-5 rounded-eh-lg border border-line bg-white p-6 shadow-eh"
        onSubmit={(e) => {
          e.preventDefault();
          writeJson(KEY, settings);
          setSaved(true);
        }}
      >
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Company name</span>
          <input
            className="focus-eh w-full rounded-eh-md border border-line px-3.5 py-2.5"
            value={settings.companyName}
            onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Timezone</span>
          <select
            className="focus-eh w-full rounded-eh-md border border-line px-3.5 py-2.5"
            value={settings.timezone}
            onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
          >
            {["Australia/Sydney", "Pacific/Auckland", "Europe/London", "Asia/Singapore"].map((tz) => (
              <option key={tz}>{tz}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={settings.sso} onChange={(e) => setSettings({ ...settings, sso: e.target.checked })} />
          Enable SSO (demo toggle)
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={settings.weeklyDigest} onChange={(e) => setSettings({ ...settings, weeklyDigest: e.target.checked })} />
          Weekly people digest emails
        </label>
        <button type="submit" className="focus-eh rounded-full bg-eh-purple px-5 py-2.5 text-sm font-semibold text-white">
          Save settings
        </button>
        {saved ? <p className="text-sm text-positive">Saved to localStorage.</p> : null}
      </form>
    </PortalLayout>
  );
}
