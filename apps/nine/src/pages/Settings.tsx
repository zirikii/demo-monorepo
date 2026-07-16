import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

type Prefs = {
  breaking: boolean;
  sport: boolean;
  lifestyle: boolean;
};

const KEY = "nine-demo-prefs";

export function SettingsPage() {
  useDocumentTitle("Settings");
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<Prefs>({ breaking: true, sport: true, lifestyle: false });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setPrefs(JSON.parse(raw) as Prefs);
    } catch {
      /* ignore */
    }
  }, []);

  if (!user) return <Navigate to="/login" replace />;

  const toggle = (k: keyof Prefs) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  const save = () => {
    localStorage.setItem(KEY, JSON.stringify(prefs));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PageLayout>
      <h1 className="font-display text-4xl font-bold">Settings</h1>
      <p className="mt-2 text-nine-muted">Notification preferences for {user.email}</p>
      <ul className="mt-8 max-w-md space-y-3">
        {(
          [
            ["breaking", "Breaking news alerts"],
            ["sport", "Sport score pushes"],
            ["lifestyle", "Lifestyle & shopping picks"],
          ] as const
        ).map(([key, label]) => (
          <li key={key}>
            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-nine-line px-4 py-3">
              <span className="text-sm font-semibold">{label}</span>
              <input type="checkbox" checked={prefs[key]} onChange={() => toggle(key)} />
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center gap-3">
        <Button type="button" onClick={save}>
          Save preferences
        </Button>
        {saved && <span className="text-sm font-semibold text-nine-blue">Saved</span>}
      </div>
    </PageLayout>
  );
}
