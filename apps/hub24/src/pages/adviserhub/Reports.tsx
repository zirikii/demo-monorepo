import { PanelCard } from "@/components/portal/PanelCard";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { ADVISER_NAV } from "@/components/portal/nav";
import { StatTile } from "@/components/portal/StatTile";
import { DataTable } from "@/components/ui/DataTable";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CLIENTS, CLIENT_SEGMENTS, PRACTICE } from "@/data/platform";
import { formatCurrencyWhole, formatNumber, formatPercent, formatSignedCurrency } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function AdviserReportsPage() {
  const fum = CLIENTS.reduce((total, client) => total + client.balance, 0);
  const inflows = CLIENTS.filter((client) => client.netFlowYtd > 0).reduce(
    (total, client) => total + client.netFlowYtd,
    0,
  );
  const outflows = CLIENTS.filter((client) => client.netFlowYtd < 0).reduce(
    (total, client) => total + Math.abs(client.netFlowYtd),
    0,
  );

  const bySegment = CLIENT_SEGMENTS.map((segment) => {
    const clients = CLIENTS.filter((client) => client.segment === segment);
    return {
      segment,
      count: clients.length,
      balance: clients.reduce((total, client) => total + client.balance, 0),
      flow: clients.reduce((total, client) => total + client.netFlowYtd, 0),
    };
  }).sort((a, b) => b.balance - a.balance);

  const byAdviser = Array.from(new Set(CLIENTS.map((client) => client.adviser))).map((adviser) => {
    const clients = CLIENTS.filter((client) => client.adviser === adviser);
    return {
      adviser,
      count: clients.length,
      balance: clients.reduce((total, client) => total + client.balance, 0),
      flow: clients.reduce((total, client) => total + client.netFlowYtd, 0),
    };
  });

  const top = CLIENTS.slice()
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 10);

  return (
    <PortalLayout
      portal="AdviserHUB"
      nav={ADVISER_NAV}
      contextLabel="Practice"
      contextValue={PRACTICE.name}
      contextNote={`${PRACTICE.afsl} · ${PRACTICE.adviserCount} advisers`}
      title="Reports"
      description="Practice-level flow, balance and segment reporting"
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Funds under management" value={formatCurrencyWhole(fum)} note={`${CLIENTS.length} clients`} />
        <StatTile
          label="Gross inflows YTD"
          value={formatCurrencyWhole(inflows)}
          tone="positive"
          note={`${CLIENTS.filter((client) => client.netFlowYtd > 0).length} clients contributing`}
        />
        <StatTile
          label="Gross outflows YTD"
          value={formatCurrencyWhole(outflows)}
          tone="critical"
          note={`${CLIENTS.filter((client) => client.netFlowYtd < 0).length} clients drawing down`}
        />
        <StatTile
          label="Average balance"
          value={formatCurrencyWhole(fum / CLIENTS.length)}
          note="Across the book"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <PanelCard title="Book composition" description="Funds under management by client segment">
          <ul className="flex flex-col gap-4">
            {bySegment.map((entry) => (
              <li key={entry.segment} className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold text-ink-strong">{entry.segment}</span>
                  <span className="text-sm tabular-nums text-ink-faint">
                    {formatCurrencyWhole(entry.balance)} · {formatPercent((entry.balance / fum) * 100, 1)}
                  </span>
                </div>
                <ProgressBar value={(entry.balance / fum) * 100} label={`${entry.segment} share`} />
                <p className="text-xs text-ink-faint">
                  {formatNumber(entry.count)} clients · net flow {formatSignedCurrency(entry.flow)}
                </p>
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard title="By adviser" bodyClassName="p-0">
          <DataTable
            className="rounded-none border-0"
            caption="Book by adviser"
            rowKey={(row) => row.adviser}
            rows={byAdviser}
            columns={[
              {
                key: "adviser",
                header: "Adviser",
                render: (row) => <span className="font-semibold text-ink-strong">{row.adviser}</span>,
              },
              { key: "count", header: "Clients", align: "right", render: (row) => formatNumber(row.count) },
              {
                key: "balance",
                header: "Balance",
                align: "right",
                render: (row) => formatCurrencyWhole(row.balance),
              },
              {
                key: "flow",
                header: "Net flow YTD",
                align: "right",
                render: (row) => (
                  <span className={cn("font-semibold", row.flow >= 0 ? "text-positive" : "text-critical")}>
                    {formatSignedCurrency(row.flow)}
                  </span>
                ),
              },
            ]}
          />
        </PanelCard>
      </div>

      <PanelCard className="mt-6" title="Top ten clients by balance" bodyClassName="p-0">
        <DataTable
          className="rounded-none border-0"
          caption="Top ten clients by balance"
          rowKey={(client) => client.id}
          rows={top}
          columns={[
            {
              key: "name",
              header: "Client",
              render: (client) => <span className="font-semibold text-ink-strong">{client.name}</span>,
            },
            { key: "segment", header: "Segment", render: (client) => client.segment },
            { key: "adviser", header: "Adviser", render: (client) => client.adviser },
            {
              key: "balance",
              header: "Balance",
              align: "right",
              render: (client) => formatCurrencyWhole(client.balance),
            },
            {
              key: "share",
              header: "Share of book",
              align: "right",
              render: (client) => formatPercent((client.balance / fum) * 100, 1),
            },
          ]}
        />
      </PanelCard>
    </PortalLayout>
  );
}
