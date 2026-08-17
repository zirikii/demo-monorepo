import { useState } from "react";
import { FileBarChart } from "lucide-react";
import { AdviserLayout } from "@/components/adviser/AdviserLayout";
import { PanelCard } from "@/components/adviser/PanelCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DonutChart } from "@/components/ui/DonutChart";
import { TrendChart } from "@/components/ui/TrendChart";
import { CLIENTS, ENGAGE_REPORTS, allocationFor, clientBalance } from "@/data/adviser";
import { compactCurrency, currency, longDate } from "@/lib/format";

const PERFORMANCE = [
  { label: "Sep", value: 96 },
  { label: "Oct", value: 98 },
  { label: "Nov", value: 101 },
  { label: "Dec", value: 100 },
  { label: "Jan", value: 104 },
  { label: "Feb", value: 106 },
  { label: "Mar", value: 105 },
  { label: "Apr", value: 108 },
  { label: "May", value: 110 },
  { label: "Jun", value: 111 },
  { label: "Jul", value: 113 },
  { label: "Aug", value: 116 },
];

/** Engage reports combine platform data with balances the client holds elsewhere. */
const NON_CUSTODIAL = [
  { label: "Principal residence", value: 1_850_000 },
  { label: "Investment property", value: 720_000 },
  { label: "Cash accounts held away", value: 96_400 },
  { label: "Separately held shares", value: 142_800 },
];

const SECTION_LIBRARY = [
  "Wealth summary",
  "Performance",
  "Asset allocation",
  "Income",
  "Contributions",
  "Tax estimate",
  "Non-custodial assets",
  "Next steps",
];

export default function AdviserReportingPage() {
  const [clientId, setClientId] = useState(CLIENTS[0]?.id ?? "");
  const [sections, setSections] = useState<string[]>([
    "Wealth summary",
    "Performance",
    "Asset allocation",
    "Next steps",
  ]);

  const client = CLIENTS.find((candidate) => candidate.id === clientId) ?? CLIENTS[0];
  const allocation = client
    ? allocationFor(client).map((entry) => ({ label: entry.assetClass, value: entry.value }))
    : [];
  const transactions = client?.accounts.flatMap((account) => account.transactions) ?? [];
  const income = transactions.filter((transaction) => transaction.type === "Income");
  const contributions = transactions.filter((transaction) => transaction.type === "Contribution");
  const unrealised =
    client?.accounts
      .flatMap((account) => account.holdings)
      .reduce((sum, holding) => sum + holding.unrealisedGain, 0) ?? 0;

  function toggleSection(section: string) {
    setSections((current) =>
      current.includes(section)
        ? current.filter((item) => item !== section)
        : [...current, section],
    );
  }

  return (
    <AdviserLayout
      title="Engage reporting"
      subtitle="Build an interactive client presentation from platform and non-custodial data"
    >
      <div className="grid gap-5 xl:grid-cols-[1fr_1.7fr]">
        <div className="flex flex-col gap-5">
          <PanelCard title="Report builder">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-ink-strong">Client</span>
                <div className="flex flex-col gap-1">
                  {CLIENTS.slice(0, 6).map((candidate) => (
                    <button
                      key={candidate.id}
                      type="button"
                      aria-pressed={candidate.id === clientId}
                      onClick={() => setClientId(candidate.id)}
                      className={
                        candidate.id === clientId
                          ? "focus-hub rounded-hub border border-hub-blue bg-hub-tint px-4 py-2.5 text-left text-sm font-bold text-hub-blue-dark"
                          : "focus-hub rounded-hub border border-line px-4 py-2.5 text-left text-sm font-semibold text-ink-soft hover:border-hub-blue"
                      }
                    >
                      {candidate.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold text-ink-strong">Sections</span>
                <div className="flex flex-wrap gap-2">
                  {SECTION_LIBRARY.map((section) => {
                    const active = sections.includes(section);
                    return (
                      <button
                        key={section}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleSection(section)}
                        className={
                          active
                            ? "focus-hub rounded-full bg-hub-blue px-3 py-1.5 text-xs font-bold text-white"
                            : "focus-hub rounded-full border border-line px-3 py-1.5 text-xs font-bold text-ink-soft hover:border-hub-blue hover:text-hub-blue"
                        }
                      >
                        {section}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                onClick={() =>
                  window.alert(
                    `Demo only — a ${sections.length}-section pack for ${client?.name ?? "this client"} would open in presentation mode.`,
                  )
                }
              >
                Open presentation
              </Button>
            </div>
          </PanelCard>

          <PanelCard title="Saved reports" action={{ label: "Clients", to: "/adviserhub/clients" }}>
            <ul className="flex flex-col divide-y divide-line-soft">
              {ENGAGE_REPORTS.map((report) => (
                <li
                  key={report.id}
                  className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span className="flex flex-col">
                    <span className="font-bold text-ink-strong">{report.name}</span>
                    <span className="text-sm text-ink-faint">
                      {report.template} · updated {longDate(report.updated)}
                    </span>
                  </span>
                  <Badge
                    tone={
                      report.status === "Presented"
                        ? "positive"
                        : report.status === "Ready"
                          ? "blue"
                          : "neutral"
                    }
                  >
                    {report.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </PanelCard>
        </div>

        <Card className="flex flex-col gap-6">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <span className="flex items-center gap-3">
              <FileBarChart aria-hidden className="h-6 w-6 text-hub-blue" />
              <span className="flex flex-col">
                <span className="text-xs font-extrabold tracking-[0.12em] text-ink-ghost uppercase">
                  Presentation preview
                </span>
                <span className="text-xl font-extrabold tracking-tight text-ink-strong">
                  {client?.name}
                </span>
              </span>
            </span>
            <span className="text-right">
              <span className="block text-xs font-extrabold tracking-[0.12em] text-ink-ghost uppercase">
                Total wealth
              </span>
              <span className="block text-xl font-extrabold text-ink-strong">
                {client ? currency(clientBalance(client)) : "—"}
              </span>
            </span>
          </header>

          {sections.includes("Performance") ? (
            <section>
              <h3 className="text-sm font-extrabold tracking-[0.1em] text-ink-faint uppercase">
                Performance
              </h3>
              <TrendChart
                className="mt-3"
                points={PERFORMANCE}
                title="Indexed portfolio performance"
              />
            </section>
          ) : null}

          {sections.includes("Asset allocation") ? (
            <section>
              <h3 className="text-sm font-extrabold tracking-[0.1em] text-ink-faint uppercase">
                Asset allocation
              </h3>
              <DonutChart
                className="mt-3"
                title="Asset allocation"
                slices={allocation}
                valueFormatter={(value) => compactCurrency(value)}
              />
            </section>
          ) : null}

          {sections.includes("Wealth summary") ? (
            <section>
              <h3 className="text-sm font-extrabold tracking-[0.1em] text-ink-faint uppercase">
                Wealth summary
              </h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {client?.accounts.map((account) => (
                  <li key={account.id} className="rounded-hub border border-line p-4">
                    <span className="block text-sm text-ink-faint">{account.type}</span>
                    <span className="block text-lg font-extrabold text-ink-strong">
                      {currency(account.balance)}
                    </span>
                    <span className="block text-sm text-ink-faint">{account.menu} menu</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {sections.includes("Income") ? (
            <section>
              <h3 className="text-sm font-extrabold tracking-[0.1em] text-ink-faint uppercase">
                Income
              </h3>
              <ul className="mt-3 flex flex-col divide-y divide-line-soft">
                {income.map((transaction) => (
                  <li
                    key={transaction.date + transaction.description}
                    className="flex justify-between gap-4 py-2 first:pt-0 last:pb-0"
                  >
                    <span className="text-ink-soft">{transaction.description}</span>
                    <span className="font-bold text-ink-strong">
                      {currency(transaction.amount)}
                    </span>
                  </li>
                ))}
                {income.length === 0 ? (
                  <li className="py-2 text-ink-faint">
                    No income received in the reporting period.
                  </li>
                ) : null}
              </ul>
            </section>
          ) : null}

          {sections.includes("Contributions") ? (
            <section>
              <h3 className="text-sm font-extrabold tracking-[0.1em] text-ink-faint uppercase">
                Contributions
              </h3>
              <p className="mt-3 text-2xl font-extrabold text-ink-strong">
                {currency(contributions.reduce((sum, transaction) => sum + transaction.amount, 0))}
              </p>
              <p className="text-sm text-ink-faint">
                Across {contributions.length} contribution{contributions.length === 1 ? "" : "s"} in
                the reporting period.
              </p>
            </section>
          ) : null}

          {sections.includes("Tax estimate") ? (
            <section>
              <h3 className="text-sm font-extrabold tracking-[0.1em] text-ink-faint uppercase">
                Tax estimate
              </h3>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-hub border border-line p-4">
                  <dt className="text-sm text-ink-faint">Unrealised gain</dt>
                  <dd className="text-lg font-extrabold text-ink-strong">{currency(unrealised)}</dd>
                </div>
                <div className="rounded-hub border border-line p-4">
                  <dt className="text-sm text-ink-faint">Estimated CGT if realised</dt>
                  <dd className="text-lg font-extrabold text-ink-strong">
                    {currency(Math.round(unrealised * 0.5 * 0.39))}
                  </dd>
                </div>
              </dl>
              <p className="mt-2 text-sm text-ink-faint">
                Assumes the 50% discount and a 39% marginal rate. Demo estimate, not tax advice.
              </p>
            </section>
          ) : null}

          {sections.includes("Non-custodial assets") ? (
            <section>
              <h3 className="text-sm font-extrabold tracking-[0.1em] text-ink-faint uppercase">
                Non-custodial assets
              </h3>
              <ul className="mt-3 flex flex-col divide-y divide-line-soft">
                {NON_CUSTODIAL.map((asset) => (
                  <li
                    key={asset.label}
                    className="flex justify-between gap-4 py-2 first:pt-0 last:pb-0"
                  >
                    <span className="text-ink-soft">{asset.label}</span>
                    <span className="font-bold text-ink-strong">{currency(asset.value)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-ink-faint">
                Client-declared balances held away from the platform.
              </p>
            </section>
          ) : null}

          {sections.includes("Next steps") ? (
            <section>
              <h3 className="text-sm font-extrabold tracking-[0.1em] text-ink-faint uppercase">
                Next steps
              </h3>
              <ul className="mt-3 flex list-disc flex-col gap-1 pl-5 text-ink-soft">
                <li>Confirm contribution strategy before 30 June</li>
                <li>Review managed portfolio weightings against the target allocation</li>
                <li>Schedule the next review meeting</li>
              </ul>
            </section>
          ) : null}

          {sections.length === 0 ? (
            <p className="text-ink-faint">
              Select at least one section to preview the presentation.
            </p>
          ) : null}
        </Card>
      </div>
    </AdviserLayout>
  );
}
