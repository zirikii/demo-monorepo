import { useState } from "react";
import { NetBankLayout } from "@/components/netbank/NetBankLayout";
import { Button } from "@/components/ui/Button";
import { ToggleRow } from "@/components/ui/Field";
import { useAuth } from "@/hooks/useAuth";
import { useBanking } from "@/hooks/useBanking";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatDateLong } from "@/lib/format";
import { readSettings, writeSettings, type DemoSettings } from "@/lib/storage";

const toggles: { key: keyof DemoSettings; label: string; description: string }[] = [
  {
    key: "statementsPaperless",
    label: "Paperless statements",
    description: "Receive statements in NetBank instead of the post.",
  },
  {
    key: "spendAlerts",
    label: "Spend alerts",
    description: "Get a notification when a transaction is larger than your usual spend.",
  },
  {
    key: "marketingEmails",
    label: "Offers and updates by email",
    description: "Hear about CommBank Yello offers and product updates.",
  },
  {
    key: "callerCheck",
    label: "CallerCheck",
    description: "Confirm a call is really from us with a code sent to your CommBank app.",
  },
  {
    key: "netcodeSms",
    label: "NetCode by SMS",
    description: "Send one-time security codes to your registered mobile number.",
  },
];

export function NetBankSettingsPage() {
  useDocumentTitle("Settings — NetBank");
  const { user } = useAuth();
  const { reset } = useBanking();
  const [settings, setSettings] = useState<DemoSettings>(() => readSettings());
  const [resetDone, setResetDone] = useState(false);

  const update = (key: keyof DemoSettings, value: boolean) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    writeSettings(next);
  };

  return (
    <NetBankLayout title="Settings" intro="Manage your details, notifications and demo data.">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div className="rounded-cba-lg bg-surface px-6 shadow-cba">
          <h2 className="pt-6 text-base font-extrabold text-ink">Notifications and security</h2>
          <div className="divide-y divide-line-soft pb-4">
            {toggles.map((toggle) => (
              <ToggleRow
                key={toggle.key}
                label={toggle.label}
                description={toggle.description}
                checked={settings[toggle.key]}
                onChange={(value) => update(toggle.key, value)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-cba-lg bg-surface p-6 shadow-cba">
            <h2 className="text-base font-extrabold text-ink">Your details</h2>
            <dl className="mt-4 space-y-3 text-[15px]">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Name</dt>
                <dd className="font-bold text-ink">{user?.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Client number</dt>
                <dd className="font-bold tabular-nums text-ink">{user?.clientNumber}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Email</dt>
                <dd className="font-bold text-ink">{user?.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Customer since</dt>
                <dd className="font-bold text-ink">
                  {user ? formatDateLong(user.customerSince) : "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-cba-lg bg-surface p-6 shadow-cba">
            <h2 className="text-base font-extrabold text-ink">Demo data</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Reset accounts, transactions and card locks back to their seeded values.
            </p>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => {
                reset();
                setResetDone(true);
              }}
            >
              Reset demo data
            </Button>
            {resetDone ? (
              <p role="status" className="mt-3 text-sm font-bold text-positive">
                Demo data has been reset.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </NetBankLayout>
  );
}
