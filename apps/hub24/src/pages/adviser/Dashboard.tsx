import { Link } from "react-router-dom";
import { AdviserLayout } from "@/components/adviser/AdviserLayout";
import { PanelCard } from "@/components/adviser/PanelCard";
import { StatTile } from "@/components/adviser/StatTile";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DonutChart } from "@/components/ui/DonutChart";
import { TrendChart } from "@/components/ui/TrendChart";
import {
  ADVISER_TASKS,
  CLIENTS,
  FUA_TREND,
  MANAGED_PORTFOLIOS,
  PENDING_TRADES,
  bookValue,
  clientBalance,
} from "@/data/adviser";
import { useAuth } from "@/hooks/useAuth";
import { compactCurrency, currency, longDate, percent } from "@/lib/format";

export default function AdviserDashboardPage() {
  const { user } = useAuth();
  const totalBook = bookValue();
  const awaiting = PENDING_TRADES.filter((trade) => trade.status === "Awaiting approval");
  const reviewsDue = CLIENTS.filter((client) => client.status === "Review due");
  const topClients = [...CLIENTS].sort((a, b) => clientBalance(b) - clientBalance(a)).slice(0, 5);

  const assetMix = MANAGED_PORTFOLIOS.slice(0, 5).map((portfolio) => ({
    label: portfolio.name.replace(" Portfolio", "").replace(" Managed", ""),
    value: portfolio.fua,
  }));

  return (
    <AdviserLayout
      title={`Good morning, ${user?.name.split(" ")[0] ?? "there"}`}
      subtitle={`${user?.practice} · adviser code ${user?.adviserCode}`}
      actions={
        <ButtonLink to="/adviserhub/trading" size="sm" className="hidden sm:inline-flex">
          Place a trade
        </ButtonLink>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Funds under administration"
          value={compactCurrency(totalBook)}
          delta="+6.4% FYTD"
          trend="up"
          note={`${CLIENTS.length} clients`}
        />
        <StatTile
          label="Net inflows this quarter"
          value={compactCurrency(1_248_000)}
          delta="+18.2% vs prior"
          trend="up"
        />
        <StatTile
          label="Trades awaiting approval"
          value={String(awaiting.length)}
          note="Approve before 3.00pm AET"
        />
        <StatTile
          label="Reviews due"
          value={String(reviewsDue.length)}
          delta={reviewsDue.length > 0 ? "Action required" : "All current"}
          trend={reviewsDue.length > 0 ? "down" : "flat"}
        />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <PanelCard
          title="Funds under administration"
          action={{ label: "View clients", to: "/adviserhub/clients" }}
        >
          <TrendChart
            points={FUA_TREND.map((point) => ({ label: point.month, value: point.value }))}
            title="Twelve month funds under administration trend"
          />
        </PanelCard>

        <PanelCard
          title="Managed portfolio exposure"
          action={{ label: "All portfolios", to: "/adviserhub/portfolios" }}
        >
          <DonutChart
            title="Exposure by managed portfolio"
            slices={assetMix}
            valueFormatter={(value) => compactCurrency(value)}
          />
        </PanelCard>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_1fr]">
        <PanelCard
          title="Largest client relationships"
          action={{ label: "All clients", to: "/adviserhub/clients" }}
        >
          <ul className="flex flex-col divide-y divide-line-soft">
            {topClients.map((client) => (
              <li
                key={client.id}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <span className="flex min-w-0 flex-col">
                  <Link
                    to={`/adviserhub/clients/${client.id}`}
                    className="focus-hub truncate font-bold text-ink-strong hover:text-hub-blue"
                  >
                    {client.name}
                  </Link>
                  <span className="truncate text-sm text-ink-faint">
                    {client.entity} · {client.accounts.length} account
                    {client.accounts.length === 1 ? "" : "s"}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block font-bold text-ink-strong">
                    {currency(clientBalance(client))}
                  </span>
                  <span className="block text-sm text-ink-faint">
                    {percent(client.accounts[0]?.ytdReturn ?? 0)} YTD
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard title="Tasks" action={{ label: "Applications", to: "/adviserhub/applications" }}>
          <ul className="flex flex-col gap-3">
            {ADVISER_TASKS.slice(0, 5).map((task) => (
              <li key={task.id} className="flex items-start justify-between gap-3">
                <span className="flex flex-col">
                  <span className="font-semibold text-ink-strong">{task.title}</span>
                  <span className="text-sm text-ink-faint">
                    {task.client} · due {longDate(task.due)}
                  </span>
                </span>
                <Badge
                  tone={
                    task.priority === "High"
                      ? "critical"
                      : task.priority === "Medium"
                        ? "caution"
                        : "neutral"
                  }
                >
                  {task.priority}
                </Badge>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>
    </AdviserLayout>
  );
}
