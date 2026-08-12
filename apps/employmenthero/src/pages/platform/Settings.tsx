import { useState } from "react";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { PanelCard } from "@/components/platform/PanelCard";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import { INTEGRATIONS } from "@/data/integrations";
import { ORGANISATION } from "@/data/platform";
import { useAuth } from "@/hooks/useAuth";
import { readJson, writeJson } from "@/lib/storage";

const SETTINGS_KEY = "employmenthero-demo-settings";

interface DemoSettings {
  heroAi: boolean;
  payrollAgent: boolean;
  ewa: boolean;
  weeklyDigest: boolean;
  leaveReminders: boolean;
  integrations: Record<string, boolean>;
}

const DEFAULTS: DemoSettings = {
  heroAi: true,
  payrollAgent: true,
  ewa: true,
  weeklyDigest: true,
  leaveReminders: false,
  integrations: { Xero: true, Deputy: true, Slack: false, "Google Workspace": true, Go1: true },
};

const CONNECTABLE = INTEGRATIONS.filter((integration) =>
  Object.keys(DEFAULTS.integrations).includes(integration.name),
);

export default function PlatformSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<DemoSettings>(() => readJson(SETTINGS_KEY, DEFAULTS));

  function update(partial: Partial<DemoSettings>) {
    const next = { ...settings, ...partial };
    setSettings(next);
    writeJson(SETTINGS_KEY, next);
  }

  function toggleIntegration(name: string, enabled: boolean) {
    update({ integrations: { ...settings.integrations, [name]: enabled } });
  }

  return (
    <PlatformLayout title="Settings" description="Organisation, agents, notifications and integrations">
      <div className="grid gap-6 xl:grid-cols-2">
        <PanelCard title="Organisation">
          <dl className="flex flex-col gap-3 text-sm">
            {[
              ["Business name", ORGANISATION.name],
              ["ABN", ORGANISATION.abn],
              ["Pay cycle", ORGANISATION.payCycle],
              ["Plan", ORGANISATION.plan],
              ["Venues", ORGANISATION.sites.join(", ")],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-6 border-b border-line-soft pb-3 last:border-b-0"
              >
                <dt className="text-ink-faint">{label}</dt>
                <dd className="text-right font-semibold text-ink-strong">{value}</dd>
              </div>
            ))}
          </dl>
        </PanelCard>

        <PanelCard title="Your account">
          <dl className="flex flex-col gap-3 text-sm">
            {[
              ["Name", user?.name ?? "—"],
              ["Email", user?.email ?? "—"],
              ["Role", user?.jobTitle ?? "—"],
              ["Portal", user?.portal ?? "—"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-6 border-b border-line-soft pb-3 last:border-b-0"
              >
                <dt className="text-ink-faint">{label}</dt>
                <dd className="text-right font-semibold text-ink-strong">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-eh bg-surface-tint px-4 py-3 text-sm text-ink-faint">
            This is a mock session stored in your browser. No account exists on any server.
          </p>
        </PanelCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <PanelCard title="Hero AI" subtitle="Agents always require a person to approve">
          <div className="flex flex-col gap-5">
            <Toggle
              checked={settings.heroAi}
              onChange={(checked) => update({ heroAi: checked })}
              label="Recruitment Agent"
              description="Score applications and run first-round interviews."
            />
            <Toggle
              checked={settings.payrollAgent}
              onChange={(checked) => update({ payrollAgent: checked })}
              label="Payroll Agent"
              description="Validate each draft pay run before approval."
            />
            <Toggle
              checked={settings.ewa}
              onChange={(checked) => update({ ewa: checked })}
              label="Earned Wage Access"
              description="Let employees draw on wages already earned."
            />
          </div>
        </PanelCard>

        <PanelCard title="Notifications">
          <div className="flex flex-col gap-5">
            <Toggle
              checked={settings.weeklyDigest}
              onChange={(checked) => update({ weeklyDigest: checked })}
              label="Weekly people digest"
              description="Headcount, turnover and open roles every Monday."
            />
            <Toggle
              checked={settings.leaveReminders}
              onChange={(checked) => update({ leaveReminders: checked })}
              label="Daily leave reminders"
              description="Nudge managers with requests older than 48 hours."
            />
          </div>
        </PanelCard>
      </div>

      <div className="mt-6">
        <PanelCard title="Integrations" action={{ label: "Browse all", to: "/integrations" }}>
          <ul className="flex flex-col gap-5">
            {CONNECTABLE.map((integration) => (
              <li key={integration.name} className="border-b border-line-soft pb-5 last:border-b-0 last:pb-0">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[0.95rem] font-bold text-ink-strong">{integration.name}</span>
                  <Badge tone="neutral">{integration.category}</Badge>
                </div>
                <Toggle
                  checked={settings.integrations[integration.name] ?? false}
                  onChange={(checked) => toggleIntegration(integration.name, checked)}
                  label={settings.integrations[integration.name] ? "Connected" : "Not connected"}
                  description={integration.description}
                />
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>
    </PlatformLayout>
  );
}
