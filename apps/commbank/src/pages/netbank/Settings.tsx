import { useState } from "react";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { Button } from "@/components/ui/Button";
import { SelectField, ToggleField } from "@/components/ui/Field";
import { useAuth } from "@/hooks/useAuth";
import { useBanking } from "@/hooks/useBanking";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { readSettings, writeSettings, type DemoSettings } from "@/lib/storage";
import { formatLongDate } from "@/lib/format";

export function NetBankSettingsPage() {
  useDocumentTitle("Settings");
  const { user } = useAuth();
  const { reset } = useBanking();
  const [settings, setSettings] = useState<DemoSettings>(() => readSettings());
  const [status, setStatus] = useState<string | null>(null);

  const update = <K extends keyof DemoSettings>(key: K, value: DemoSettings[K]) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    writeSettings(next);
    setStatus("Settings saved.");
  };

  return (
    <NetBankLayout title="Settings">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,640px)_1fr] lg:items-start">
        <div className="space-y-8">
          <section className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-lg font-bold text-black">Personal details</h2>
            <dl className="mt-4 divide-y divide-line text-sm">
              {[
                { label: "Name", value: user?.name ?? "—" },
                { label: "Client number", value: user?.clientNumber ?? "—" },
                { label: "Email", value: user?.email ?? "—" },
                {
                  label: "Customer since",
                  value: user ? formatLongDate(user.customerSince) : "—",
                },
                { label: "CommBank Yello tier", value: user?.yelloTier ?? "—" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between gap-4 py-3">
                  <dt className="text-ink-soft">{row.label}</dt>
                  <dd className="font-semibold text-black">{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-lg font-bold text-black">Notifications</h2>
            <div className="mt-2 divide-y divide-line">
              <ToggleField
                label="Email alerts"
                description="Transaction receipts and security notices by email."
                checked={settings.emailAlerts}
                onChange={(value) => update("emailAlerts", value)}
              />
              <ToggleField
                label="Push notifications"
                description="Real-time transaction alerts in the CommBank app."
                checked={settings.pushAlerts}
                onChange={(value) => update("pushAlerts", value)}
              />
              <ToggleField
                label="Marketing offers"
                description="Personalised product offers and CommBank Yello promotions."
                checked={settings.marketingOffers}
                onChange={(value) => update("marketingOffers", value)}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-lg font-bold text-black">Display & statements</h2>
            <div className="mt-2 divide-y divide-line">
              <ToggleField
                label="Hide balances on the home screen"
                description="Mask balances until you open an account."
                checked={settings.hideBalances}
                onChange={(value) => update("hideBalances", value)}
              />
            </div>
            <SelectField
              className="mt-5"
              label="Statement delivery"
              value={settings.statementDelivery}
              onChange={(event) =>
                update("statementDelivery", event.target.value as DemoSettings["statementDelivery"])
              }
            >
              <option value="online">Online only</option>
              <option value="paper">Paper and online</option>
            </SelectField>
          </section>
        </div>

        <div className="space-y-6">
          {status ? (
            <p
              role="status"
              className="rounded-xl border border-positive bg-positive/5 px-5 py-4 text-sm text-black"
            >
              {status}
            </p>
          ) : null}

          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-base font-bold text-black">Reset demo data</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Restore the original account balances, transactions and card settings. Useful before
              running through the demo again.
            </p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => {
                reset();
                setStatus("Demo accounts, transactions and cards reset.");
              }}
            >
              Reset accounts
            </Button>
          </div>

          <p className="text-xs text-ink-muted">
            Settings are stored in your browser&apos;s local storage. Clearing site data removes
            them.
          </p>
        </div>
      </div>
    </NetBankLayout>
  );
}
