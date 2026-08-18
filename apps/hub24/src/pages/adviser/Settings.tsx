import { useState } from "react";
import { AdviserLayout } from "@/components/adviser/AdviserLayout";
import { PanelCard } from "@/components/adviser/PanelCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/Field";
import { useAuth } from "@/hooks/useAuth";
import { readJson, writeJson } from "@/lib/storage";

const PREFERENCES_KEY = "hub24-demo-adviser-preferences";

interface Preferences {
  tradeAlerts: boolean;
  reviewReminders: boolean;
  weeklyDigest: boolean;
  defaultMenu: string;
  reportingCurrency: string;
}

const DEFAULTS: Preferences = {
  tradeAlerts: true,
  reviewReminders: true,
  weeklyDigest: false,
  defaultMenu: "Choice",
  reportingCurrency: "AUD",
};

const TOGGLES: { key: keyof Preferences; label: string; description: string }[] = [
  {
    key: "tradeAlerts",
    label: "Trade approval alerts",
    description: "Notify me when an instruction is waiting on my approval.",
  },
  {
    key: "reviewReminders",
    label: "Review reminders",
    description: "Remind me 30 days before a client's annual review falls due.",
  },
  {
    key: "weeklyDigest",
    label: "Weekly practice digest",
    description: "A Monday summary of flows, applications and outstanding consents.",
  },
];

export default function AdviserSettingsPage() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<Preferences>(() =>
    readJson<Preferences>(PREFERENCES_KEY, DEFAULTS),
  );
  const [saved, setSaved] = useState(false);

  function update<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    const next = { ...preferences, [key]: value };
    setPreferences(next);
    writeJson(PREFERENCES_KEY, next);
    setSaved(true);
  }

  return (
    <AdviserLayout title="Settings" subtitle="Preferences are stored in this browser only">
      <div className="grid gap-5 xl:grid-cols-2">
        <PanelCard title="Profile">
          <div className="flex flex-col gap-4">
            <TextField label="Name" value={user?.name ?? ""} readOnly />
            <TextField label="Email" value={user?.email ?? ""} readOnly />
            <TextField label="Practice" value={user?.practice ?? ""} readOnly />
            <TextField label="Adviser code" value={user?.adviserCode ?? ""} readOnly />
            <p className="text-sm text-ink-faint">
              Profile details come from the demo account you signed in with and cannot be edited.
            </p>
          </div>
        </PanelCard>

        <PanelCard title="Notifications">
          <ul className="flex flex-col gap-4">
            {TOGGLES.map((toggle) => {
              const value = Boolean(preferences[toggle.key]);
              return (
                <li key={toggle.key} className="flex items-start justify-between gap-4">
                  <span className="flex flex-col">
                    <span className="font-bold text-ink-strong">{toggle.label}</span>
                    <span className="text-sm text-ink-faint">{toggle.description}</span>
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={value}
                    aria-label={toggle.label}
                    onClick={() => update(toggle.key, !value as Preferences[typeof toggle.key])}
                    className={
                      value
                        ? "focus-hub relative h-6 w-11 shrink-0 rounded-full bg-hub-blue transition"
                        : "focus-hub relative h-6 w-11 shrink-0 rounded-full bg-surface-deep transition"
                    }
                  >
                    <span
                      className={
                        value
                          ? "absolute top-0.5 left-[22px] h-5 w-5 rounded-full bg-white transition-all"
                          : "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-all"
                      }
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </PanelCard>

        <PanelCard title="Defaults">
          <div className="flex flex-col gap-4">
            <SelectField
              label="Default investment menu"
              value={preferences.defaultMenu}
              onChange={(event) => update("defaultMenu", event.target.value)}
              options={[
                { value: "Discover", label: "Discover" },
                { value: "Core", label: "Core" },
                { value: "Choice", label: "Choice" },
              ]}
            />
            <SelectField
              label="Reporting currency"
              value={preferences.reportingCurrency}
              onChange={(event) => update("reportingCurrency", event.target.value)}
              options={[
                { value: "AUD", label: "Australian dollar (AUD)" },
                { value: "NZD", label: "New Zealand dollar (NZD)" },
              ]}
            />
            {saved ? (
              <p role="status" className="text-sm font-semibold text-positive">
                Preferences saved to this browser.
              </p>
            ) : null}
          </div>
        </PanelCard>

        <PanelCard title="Security">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <span className="flex flex-col">
                <span className="font-bold text-ink-strong">Multi-factor authentication</span>
                <span className="text-sm text-ink-faint">Required for all AdviserHUB users.</span>
              </span>
              <Badge tone="positive">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="flex flex-col">
                <span className="font-bold text-ink-strong">Session timeout</span>
                <span className="text-sm text-ink-faint">
                  Inactive sessions end after 20 minutes.
                </span>
              </span>
              <Badge tone="neutral">20 min</Badge>
            </div>
            <Button
              variant="secondary"
              onClick={() => window.alert("Demo only — no password to reset.")}
              className="self-start"
            >
              Reset password
            </Button>
          </div>
        </PanelCard>
      </div>
    </AdviserLayout>
  );
}
