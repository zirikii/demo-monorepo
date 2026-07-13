import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { defaultSettings, readSettings, writeSettings, type DemoSettings } from "@/lib/storage";

export function SettingsPage() {
  useDocumentTitle("Settings");
  const { user } = useAuth();
  const [settings, setSettings] = useState<DemoSettings>(() => readSettings());
  const [saved, setSaved] = useState(false);

  if (!user) return <Navigate to="/login?redirect=/settings" replace />;

  const toggle = (key: keyof DemoSettings) => {
    if (typeof settings[key] !== "boolean") return;
    setSettings((s) => ({ ...s, [key]: !s[key] }));
    setSaved(false);
  };

  return (
    <PageLayout>
      <PageHero
        title="Settings"
        subtitle="Notification preferences for your demo Changi Account."
        crumbs={[{ label: "My Account", to: "/account" }, { label: "Settings" }]}
      />
      <section className="mx-auto max-w-2xl space-y-4 px-4 py-10 sm:px-6">
        {(
          [
            ["emailAlerts", "Email flight alerts"],
            ["pushAlerts", "Push notifications"],
            ["marketing", "Marketing updates"],
          ] as const
        ).map(([key, label]) => (
          <label
            key={key}
            className="flex cursor-pointer items-center justify-between rounded-xl border border-line bg-card px-4 py-3"
          >
            <span className="text-sm font-bold text-ink">{label}</span>
            <input
              type="checkbox"
              checked={Boolean(settings[key])}
              onChange={() => toggle(key)}
              className="h-4 w-4 accent-[var(--color-purple)]"
            />
          </label>
        ))}
        <div className="rounded-xl border border-line bg-card px-4 py-3">
          <label htmlFor="language" className="text-xs font-bold uppercase tracking-wide text-ink-faint">
            Language
          </label>
          <select
            id="language"
            value={settings.language}
            onChange={(e) => {
              setSettings((s) => ({ ...s, language: e.target.value }));
              setSaved(false);
            }}
            className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm"
          >
            <option value="en-AU">English (AU)</option>
            <option value="en-SG">English (SG)</option>
            <option value="zh-CN">中文</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="purple"
            onClick={() => {
              writeSettings(settings);
              setSaved(true);
            }}
          >
            Save preferences
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setSettings(defaultSettings);
              writeSettings(defaultSettings);
              setSaved(true);
            }}
          >
            Reset
          </Button>
        </div>
        {saved ? <p className="text-sm font-bold text-green">Preferences saved locally.</p> : null}
      </section>
    </PageLayout>
  );
}
