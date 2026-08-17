import { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { readJson, writeJson } from "@/lib/storage";

interface Prefs {
  emailAlerts: boolean;
  smsAlerts: boolean;
  corporateActions: boolean;
}

const DEFAULTS: Prefs = { emailAlerts: true, smsAlerts: false, corporateActions: true };

export default function SettingsPage() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<Prefs>(() => readJson("hub24-demo-prefs", DEFAULTS));

  function toggle(key: keyof Prefs) {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    writeJson("hub24-demo-prefs", next);
  }

  return (
    <PortalLayout title="Settings" description="Account, practice and integrations">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-bold">Profile</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-faint">Name</dt>
              <dd className="font-semibold">{user?.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-faint">Email</dt>
              <dd className="font-semibold">{user?.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-faint">Practice</dt>
              <dd className="font-semibold">{user?.practice}</dd>
            </div>
          </dl>
        </Card>
        <Card>
          <h2 className="font-bold">Integrations</h2>
          <ul className="mt-4 space-y-3">
            {(
              [
                ["emailAlerts", "Email alerts"],
                ["smsAlerts", "SMS alerts"],
                ["corporateActions", "Corporate action notifications"],
              ] as const
            ).map(([key, label]) => (
              <li key={key} className="flex items-center justify-between gap-3">
                <span className="text-sm">{label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={prefs[key]}
                  onClick={() => toggle(key)}
                  className={`focus-hub h-6 w-11 rounded-full ${prefs[key] ? "bg-hub-teal" : "bg-line"}`}
                >
                  <span className={`block h-5 w-5 rounded-full bg-white transition ${prefs[key] ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </PortalLayout>
  );
}
