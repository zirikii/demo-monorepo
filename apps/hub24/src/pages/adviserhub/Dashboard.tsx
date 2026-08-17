import { AlertTriangle, CalendarClock, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { PanelCard } from "@/components/portal/PanelCard";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { ADVISER_NAV } from "@/components/portal/nav";
import { StatTile } from "@/components/portal/StatTile";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CLIENTS, CLIENT_SEGMENTS, PRACTICE } from "@/data/platform";
import { useAuth } from "@/hooks/useAuth";
import { usePortfolio } from "@/hooks/usePortfolio";
import {
  formatCurrencyWhole,
  formatDate,
  formatNumber,
  formatSignedCurrency,
} from "@/lib/format";
import { sortTransactions } from "@/lib/portfolio";
import { cn } from "@/lib/cn";

const STATUS_TONES = {
  "On track": "positive",
  "Review due": "caution",
  "Action required": "critical",
} as const;

export default function AdviserDashboardPage() {
  const { user } = useAuth();
  const { transactions } = usePortfolio();

  const fum = CLIENTS.reduce((total, client) => total + client.balance, 0);
  const netFlow = CLIENTS.reduce((total, client) => total + client.netFlowYtd, 0);
  const attention = CLIENTS.filter((client) => client.status !== "On track");
  const upcoming = CLIENTS.slice()
    .sort((a, b) => a.reviewDue.localeCompare(b.reviewDue))
    .slice(0, 6);
  const recentTrades = sortTransactions(
    transactions.filter((transaction) => transaction.type === "Buy" || transaction.type === "Sell"),
  ).slice(0, 5);

  const segmentTotals = CLIENT_SEGMENTS.map((segment) => ({
    segment,
    value: CLIENTS.filter((client) => client.segment === segment).reduce(
      (total, client) => total + client.balance,
      0,
    ),
  })).sort((a, b) => b.value - a.value);

  return (
    <PortalLayout
      portal="AdviserHUB"
      nav={ADVISER_NAV}
      contextLabel="Practice"
      contextValue={PRACTICE.name}
      contextNote={`${PRACTICE.afsl} · ${PRACTICE.adviserCount} advisers`}
      title={`Good morning, ${user?.name.split(" ")[0] ?? "there"}`}
      description="Your client book at a glance"
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Funds under management"
          value={formatCurrencyWhole(fum)}
          note={`${CLIENTS.length} clients`}
          icon={TrendingUp}
        />
        <StatTile
          label="Net flow YTD"
          value={formatSignedCurrency(netFlow)}
          note={netFlow >= 0 ? "Net inflow" : "Net outflow"}
          tone={netFlow >= 0 ? "positive" : "critical"}
          icon={Users}
        />
        <StatTile
          label="Needing attention"
          value={formatNumber(attention.length)}
          note="Reviews due or action required"
          tone={attention.length > 0 ? "critical" : "positive"}
          icon={AlertTriangle}
        />
        <StatTile
          label="Next review"
          value={formatDate(upcoming[0]?.reviewDue ?? "2026-09-01")}
          note={upcoming[0]?.name}
          icon={CalendarClock}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <PanelCard
          title="Clients needing attention"
          description="Review due or an outstanding action"
          action={{ label: "All clients", to: "/adviserhub/clients" }}
        >
          <ul className="flex flex-col divide-y divide-line-soft">
            {attention.map((client) => (
              <li key={client.id} className="flex flex-wrap items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/adviserhub/clients/${client.id}`}
                    className="focus-h24 block truncate font-semibold text-ink-strong hover:text-h24-teal-dark"
                  >
                    {client.name}
                  </Link>
                  <p className="text-xs text-ink-faint">
                    {client.segment} · review {formatDate(client.reviewDue)}
                  </p>
                </div>
                <span className="tabular-nums text-sm text-ink-soft">
                  {formatCurrencyWhole(client.balance)}
                </span>
                <Badge tone={STATUS_TONES[client.status]}>{client.status}</Badge>
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard title="Book by segment" description="Funds under management">
          <ul className="flex flex-col gap-4">
            {segmentTotals.map((entry) => (
              <li key={entry.segment} className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold text-ink-strong">{entry.segment}</span>
                  <span className="text-sm tabular-nums text-ink-faint">
                    {formatCurrencyWhole(entry.value)}
                  </span>
                </div>
                <ProgressBar
                  value={(entry.value / fum) * 100}
                  label={`${entry.segment} share of funds under management`}
                />
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <PanelCard
          title="Upcoming reviews"
          description="Next six by due date"
          action={{ label: "All clients", to: "/adviserhub/clients" }}
        >
          <ul className="flex flex-col divide-y divide-line-soft">
            {upcoming.map((client) => (
              <li key={client.id} className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="w-24 shrink-0 text-sm text-ink-faint">
                  {formatDate(client.reviewDue)}
                </span>
                <Link
                  to={`/adviserhub/clients/${client.id}`}
                  className="focus-h24 min-w-0 flex-1 truncate text-sm font-medium text-ink-strong hover:text-h24-teal-dark"
                >
                  {client.name}
                </Link>
                <span className="text-xs text-ink-faint">{client.adviser}</span>
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard
          title="Recent trading"
          description="Direct market trades on the demo portfolio"
          action={{ label: "Place a trade", to: "/adviserhub/trading" }}
        >
          {recentTrades.length === 0 ? (
            <p className="text-sm text-ink-faint">No trades placed yet in this session.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-line-soft">
              {recentTrades.map((trade) => (
                <li key={trade.id} className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <Badge tone={trade.type === "Buy" ? "teal" : "neutral"}>{trade.type}</Badge>
                  <span className="min-w-0 flex-1 truncate text-sm text-ink">{trade.description}</span>
                  <span
                    className={cn(
                      "text-sm font-semibold tabular-nums",
                      trade.amount >= 0 ? "text-positive" : "text-ink-strong",
                    )}
                  >
                    {formatCurrencyWhole(trade.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </PanelCard>
      </div>
    </PortalLayout>
  );
}
