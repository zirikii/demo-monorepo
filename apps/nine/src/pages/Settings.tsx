import { useState } from "react";
import { Check } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { cn } from "@/lib/cn";
import {
  defaultSettings,
  readSettings,
  writeSettings,
  type DemoSettings,
} from "@/lib/storage";

const toggles: { key: keyof DemoSettings; label: string; description: string }[] = [
  {
    key: "breakingAlerts",
    label: "Breaking news alerts",
    description: "Get notified when major news breaks.",
  },
  {
    key: "morningBriefing",
    label: "Morning briefing",
    description: "A daily wrap of the top stories in your inbox.",
  },
  {
    key: "sportScores",
    label: "Live score updates",
    description: "Follow scores for the codes you care about.",
  },
  {
    key: "personalised",
    label: "Personalised homepage",
    description: "Tailor your feed based on what you read.",
  },
];

const editions = ["National", "NSW", "Victoria", "Queensland", "WA", "SA"];

export function SettingsPage() {
  useDocumentTitle("Settings");
  const [settings, setSettings] = useState<DemoSettings>(() => readSettings());
  const [saved, setSaved] = useState(false);

  const update = (next: DemoSettings) => {
    setSettings(next);
    writeSettings(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-black tracking-tight text-ink">Settings</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Preferences are saved to this browser (demo only).
        </p>

        <section className="mt-6 rounded-2xl border border-line bg-card p-6">
          <h2 className="text-lg font-black text-ink">Notifications</h2>
          <ul className="mt-4 divide-y divide-line-soft">
            {toggles.map((t) => {
              const on = settings[t.key] as boolean;
              return (
                <li key={t.key} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-ink">{t.label}</p>
                    <p className="text-xs text-ink-soft">{t.description}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={t.label}
                    onClick={() => update({ ...settings, [t.key]: !on })}
                    className={cn(
                      "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                      on ? "bg-nine-deep" : "bg-surface-deep",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                        on ? "translate-x-[22px]" : "translate-x-0.5",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-6 rounded-2xl border border-line bg-card p-6">
          <h2 className="text-lg font-black text-ink">Edition</h2>
          <p className="mt-1 text-xs text-ink-soft">Choose the local news edition for your homepage.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {editions.map((ed) => (
              <button
                key={ed}
                type="button"
                aria-pressed={settings.edition === ed}
                onClick={() => update({ ...settings, edition: ed })}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                  settings.edition === ed
                    ? "bg-nine-deep text-white"
                    : "border border-line bg-card text-ink-soft hover:bg-surface",
                )}
              >
                {ed}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => update(defaultSettings)}
            className="text-sm font-semibold text-ink-soft hover:text-ink hover:underline"
          >
            Reset to defaults
          </button>
          {saved ? (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-positive">
              <Check className="h-4 w-4" aria-hidden="true" />
              Saved
            </span>
          ) : null}
        </div>
      </div>
    </PageLayout>
  );
}
