import { useState } from "react";
import { JiraLayout } from "@/components/jira/JiraLayout";
import { PROJECT } from "@/data/jira";
import { readJson, writeJson } from "@/lib/storage";

const SETTINGS_KEY = "atlassian-demo-settings";

interface DemoSettings {
  emailNotifications: boolean;
  releaseInsights: boolean;
}

const DEFAULTS: DemoSettings = {
  emailNotifications: true,
  releaseInsights: false,
};

const TOGGLES: { key: keyof DemoSettings; label: string; description: string }[] = [
  {
    key: "emailNotifications",
    label: "Email notifications",
    description: "Send watchers a digest when a work item on this project changes.",
  },
  {
    key: "releaseInsights",
    label: "Release insights",
    description: "Surface sprint and release risk in the board sidebar.",
  },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<DemoSettings>(() => ({
    ...DEFAULTS,
    ...readJson(SETTINGS_KEY, DEFAULTS),
  }));

  function update(key: keyof DemoSettings, value: boolean) {
    const next = { ...settings, [key]: value };
    setSettings(next);
    writeJson(SETTINGS_KEY, next);
  }

  return (
    <JiraLayout title="Project settings">
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-atl-lg border border-line bg-white p-6">
          <h2 className="text-base font-extrabold text-ink-strong">Project</h2>
          <dl className="mt-4 flex flex-col gap-3 text-sm">
            <div className="flex justify-between gap-6 border-b border-line pb-3">
              <dt className="text-ink-faint">Name</dt>
              <dd className="font-semibold text-ink-strong">{PROJECT.name}</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-line pb-3">
              <dt className="text-ink-faint">Key</dt>
              <dd className="font-semibold text-ink-strong">{PROJECT.key}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-ink-faint">Type</dt>
              <dd className="font-semibold text-ink-strong">{PROJECT.type}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-atl-lg border border-line bg-white p-6">
          <h2 className="text-base font-extrabold text-ink-strong">Preferences</h2>
          <p className="mt-1 text-sm text-ink-faint">Stored in this browser only.</p>
          <ul className="mt-5 flex flex-col gap-5">
            {TOGGLES.map((toggle) => {
              const checked = settings[toggle.key];
              return (
                <li key={toggle.key} className="flex items-start justify-between gap-4">
                  <span className="flex flex-col">
                    <span className="font-bold text-ink-strong">{toggle.label}</span>
                    <span className="text-sm text-ink-faint">{toggle.description}</span>
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    aria-label={toggle.label}
                    onClick={() => update(toggle.key, !checked)}
                    className={
                      checked
                        ? "focus-atl relative h-6 w-11 shrink-0 rounded-full bg-atl-blue transition"
                        : "focus-atl relative h-6 w-11 shrink-0 rounded-full bg-surface-deep transition"
                    }
                  >
                    <span
                      className={
                        checked
                          ? "absolute top-0.5 left-[22px] h-5 w-5 rounded-full bg-white transition-all"
                          : "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-all"
                      }
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </JiraLayout>
  );
}
