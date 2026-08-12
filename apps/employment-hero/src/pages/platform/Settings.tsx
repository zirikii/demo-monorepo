import { useState } from "react";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { integrations } from "@/data/integrations";
import { readJson, writeJson } from "@/lib/storage";
import { useAuth } from "@/hooks/useAuth";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const SETTINGS_KEY = "employment-hero-demo-settings";

type Settings = { connected: string[]; weeklyDigest: boolean; payRunReminders: boolean };

const defaults: Settings = {
  connected: ["Xero", "Google Workspace", "Slack"],
  weeklyDigest: true,
  payRunReminders: true,
};

export function PlatformSettingsPage() {
  useDocumentTitle("Settings");
  const { user } = useAuth();
  const { reset } = useWorkspace();
  const [settings, setSettings] = useState<Settings>(() => readJson(SETTINGS_KEY, defaults));

  function update(next: Settings) {
    setSettings(next);
    writeJson(SETTINGS_KEY, next);
  }

  function toggleIntegration(name: string) {
    const connected = settings.connected.includes(name)
      ? settings.connected.filter((item) => item !== name)
      : [...settings.connected, name];
    update({ ...settings, connected });
  }

  return (
    <PlatformLayout title="Settings" subtitle="Account, notifications and integrations">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-eh-lg border border-eh-line bg-white p-6">
          <h2 className="text-lg font-semibold text-eh-ink">Account</h2>
          <div className="mt-5 space-y-4">
            <Field label="Full name" defaultValue={user?.name} readOnly />
            <Field label="Work email" defaultValue={user?.email} readOnly />
            <Field label="Company" defaultValue={user?.company} readOnly />
            <Field label="Plan" defaultValue={user?.plan} readOnly />
          </div>
          <p className="mt-4 text-xs text-eh-ink-faint">
            Account fields are read-only in this demo build.
          </p>
        </section>

        <section className="rounded-eh-lg border border-eh-line bg-white p-6">
          <h2 className="text-lg font-semibold text-eh-ink">Notifications</h2>
          <div className="mt-5 space-y-4">
            {[
              {
                key: "weeklyDigest" as const,
                label: "Weekly people digest",
                body: "A Monday summary of leave, onboarding and hiring activity.",
              },
              {
                key: "payRunReminders" as const,
                label: "Pay run reminders",
                body: "A reminder two days before each pay run closes.",
              },
            ].map((option) => (
              <label
                key={option.key}
                className="flex cursor-pointer items-start gap-3 rounded-eh border border-eh-line-soft p-4"
              >
                <input
                  type="checkbox"
                  checked={settings[option.key]}
                  onChange={() => update({ ...settings, [option.key]: !settings[option.key] })}
                  className="mt-0.5 size-4 accent-[#7622d7]"
                />
                <span className="text-sm">
                  <span className="block font-semibold text-eh-ink">{option.label}</span>
                  <span className="block text-eh-ink-faint">{option.body}</span>
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-eh-lg border border-eh-line bg-white p-6">
        <h2 className="text-lg font-semibold text-eh-ink">Integrations</h2>
        <p className="mt-1 text-sm text-eh-ink-faint">
          {settings.connected.length} of {integrations.length} connected.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => {
            const connected = settings.connected.includes(integration.name);
            return (
              <div
                key={integration.name}
                className="flex items-center justify-between gap-3 rounded-eh border border-eh-line-soft p-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-eh-ink">{integration.name}</p>
                  <p className="truncate text-xs text-eh-ink-faint">{integration.category}</p>
                </div>
                <Button
                  size="sm"
                  variant={connected ? "secondary" : "primary"}
                  onClick={() => toggleIntegration(integration.name)}
                >
                  {connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-eh-lg border border-eh-line bg-white p-6">
        <h2 className="text-lg font-semibold text-eh-ink">Demo data</h2>
        <p className="mt-1 text-sm text-eh-ink-faint">
          Leave decisions, pay run approvals and candidate stages are stored in this browser. Reset
          them to start the walkthrough again.
        </p>
        <Button variant="secondary" className="mt-4" onClick={reset}>
          Reset demo data
        </Button>
      </section>
    </PlatformLayout>
  );
}
