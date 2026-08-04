import { useState } from "react";
import { readJson, writeJson } from "@/lib/storage";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";

type Prefs = {
  emailAlerts: boolean;
  smsAlerts: boolean;
  marketing: boolean;
};

const KEY = "commbank-demo-settings";

export function SettingsPage() {
  useDocumentTitle("Settings");
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<Prefs>(() =>
    readJson(KEY, { emailAlerts: true, smsAlerts: true, marketing: false }),
  );

  const toggle = (key: keyof Prefs) => {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    writeJson(KEY, next);
  };

  return (
    <section className="max-w-xl space-y-4">
      <h1 className="text-2xl font-extrabold text-ink">Settings</h1>
      <p className="text-sm text-ink-soft">Signed in as {user?.email}</p>
      {(
        [
          ["emailAlerts", "Email alerts", "Account and security emails"],
          ["smsAlerts", "SMS alerts", "Transaction notifications"],
          ["marketing", "Offers & tips", "CommBank Yello style marketing (demo)"],
        ] as const
      ).map(([key, title, body]) => (
        <div key={key} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3">
          <div>
            <p className="font-bold text-ink">{title}</p>
            <p className="text-sm text-ink-soft">{body}</p>
          </div>
          <Button variant="secondary" aria-pressed={prefs[key]} onClick={() => toggle(key)}>
            {prefs[key] ? "On" : "Off"}
          </Button>
        </div>
      ))}
    </section>
  );
}
