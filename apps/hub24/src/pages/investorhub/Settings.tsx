import { useState } from "react";
import { PanelCard } from "@/components/portal/PanelCard";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { INVESTOR_NAV } from "@/components/portal/nav";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { PRACTICE } from "@/data/platform";
import { useAuth } from "@/hooks/useAuth";
import { usePortfolio } from "@/hooks/usePortfolio";
import { readJson, writeJson } from "@/lib/storage";

const SETTINGS_KEY = "hub24-demo-settings";

interface Preferences {
  transactionAlerts: boolean;
  quarterlyReports: boolean;
  paperlessStatements: boolean;
  marketCommentary: boolean;
}

const DEFAULTS: Preferences = {
  transactionAlerts: true,
  quarterlyReports: true,
  paperlessStatements: true,
  marketCommentary: false,
};

const FIELDS: { key: keyof Preferences; label: string; description: string }[] = [
  {
    key: "transactionAlerts",
    label: "Transaction alerts",
    description: "Email me when a trade, contribution or withdrawal is processed.",
  },
  {
    key: "quarterlyReports",
    label: "Quarterly reports",
    description: "Notify me when a quarterly report is available in InvestorHUB.",
  },
  {
    key: "paperlessStatements",
    label: "Paperless statements",
    description: "Receive annual and tax statements electronically rather than by post.",
  },
  {
    key: "marketCommentary",
    label: "Market commentary",
    description: "Send me the monthly commentary written for advised clients.",
  },
];

export default function InvestorSettingsPage() {
  const { user } = useAuth();
  const { reset } = usePortfolio();
  const [preferences, setPreferences] = useState<Preferences>(() =>
    readJson(SETTINGS_KEY, DEFAULTS),
  );
  const [resetNote, setResetNote] = useState(false);

  function update(key: keyof Preferences, value: boolean) {
    const next = { ...preferences, [key]: value };
    setPreferences(next);
    writeJson(SETTINGS_KEY, next);
  }

  return (
    <PortalLayout
      portal="InvestorHUB"
      nav={INVESTOR_NAV}
      contextLabel="Adviser"
      contextValue={PRACTICE.name}
      contextNote={PRACTICE.afsl}
      title="Settings"
      description="Notification preferences and demo controls"
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <PanelCard title="Your details" description="Held by your adviser and the platform">
          <dl className="flex flex-col divide-y divide-line-soft">
            {[
              { label: "Name", value: user?.name ?? "—" },
              { label: "Email", value: user?.email ?? "—" },
              { label: "Relationship", value: user?.jobTitle ?? "—" },
              { label: "Advice practice", value: PRACTICE.name },
              { label: "Licensee", value: PRACTICE.licensee },
              { label: "Adviser", value: "Daniel Okonjo" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <dt className="text-sm text-ink-faint">{item.label}</dt>
                <dd className="text-right text-sm font-semibold text-ink-strong">{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-ink-faint">
            Changes to your personal details are made through your adviser.
          </p>
        </PanelCard>

        <PanelCard title="Notifications" description="Saved to this browser only">
          <div className="flex flex-col gap-5">
            {FIELDS.map((field) => (
              <Toggle
                key={field.key}
                label={field.label}
                description={field.description}
                checked={preferences[field.key]}
                onChange={(value) => update(field.key, value)}
              />
            ))}
          </div>
        </PanelCard>
      </div>

      <PanelCard className="mt-6" title="Demo controls" description="Only exists in this demonstration build">
        <p className="text-[0.95rem] leading-relaxed text-ink-soft">
          Trades placed in AdviserHUB change the holdings, cash and transactions shown here, and the
          changes persist in this browser. Reset to put the portfolio back to its seeded state.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              reset();
              setResetNote(true);
            }}
          >
            Reset demo portfolio
          </Button>
          {resetNote ? (
            <span role="status" className="text-sm font-semibold text-positive">
              Portfolio reset to the seeded data.
            </span>
          ) : null}
        </div>
      </PanelCard>
    </PortalLayout>
  );
}
