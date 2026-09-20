import { useState } from "react";
import { Navigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/Field";
import { cn } from "@/lib/cn";
import { useAuth } from "@/hooks/useAuth";
import {
  defaultSettings,
  readSettings,
  writeSettings,
  type DemoSettings,
} from "@/lib/storage";

type ToggleKey = "promoEmails" | "pushAlerts" | "smsUpdates";

const toggles: { key: ToggleKey; label: string; description: string }[] = [
  { key: "promoEmails", label: "Promotional emails", description: "Deals, vouchers and product news." },
  { key: "pushAlerts", label: "Push notifications", description: "Order and trip updates in real time." },
  { key: "smsUpdates", label: "SMS updates", description: "Important account alerts by text." },
];

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-gojek" : "bg-line",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-[22px]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

export function SettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<DemoSettings>(() => readSettings());
  const [saved, setSaved] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  const update = (patch: Partial<DemoSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
    setSaved(false);
  };

  const save = () => {
    writeSettings(settings);
    setSaved(true);
  };

  const reset = () => {
    setSettings(defaultSettings);
    writeSettings(defaultSettings);
    setSaved(true);
  };

  return (
    <PageLayout title="Settings — Gojek (Demo)">
      <Container className="max-w-2xl py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Settings</h1>
        <p className="mt-2 text-ink-soft">Manage your notifications and preferences.</p>

        <section className="mt-8 rounded-2xl border border-line bg-card p-6">
          <h2 className="text-lg font-bold text-ink">Notifications</h2>
          <div className="mt-4 space-y-4">
            {toggles.map((toggle) => (
              <div key={toggle.key} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-ink">{toggle.label}</p>
                  <p className="text-sm text-ink-soft">{toggle.description}</p>
                </div>
                <Toggle
                  label={toggle.label}
                  checked={settings[toggle.key]}
                  onChange={() => update({ [toggle.key]: !settings[toggle.key] })}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-line bg-card p-6">
          <h2 className="text-lg font-bold text-ink">Preferences</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Language"
              value={settings.language}
              onChange={(e) => update({ language: e.target.value })}
            >
              <option value="en">English</option>
              <option value="id">Bahasa Indonesia</option>
              <option value="vi">Tiếng Việt</option>
            </SelectField>
            <SelectField
              label="Currency"
              value={settings.currency}
              onChange={(e) => update({ currency: e.target.value })}
            >
              <option value="IDR">IDR — Rupiah</option>
              <option value="SGD">SGD — Singapore Dollar</option>
              <option value="VND">VND — Vietnamese Dong</option>
            </SelectField>
          </div>
        </section>

        <div className="mt-6 flex items-center gap-3">
          <Button onClick={save}>Save changes</Button>
          <Button variant="ghost" onClick={reset}>
            Reset to defaults
          </Button>
          {saved ? (
            <span className="text-sm font-semibold text-gojek" role="status">
              Saved
            </span>
          ) : null}
        </div>
      </Container>
    </PageLayout>
  );
}
