import { CalendarClock, TrendingUp, Wallet } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { PanelCard } from "@/components/portal/PanelCard";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { ADVISER_NAV } from "@/components/portal/nav";
import { StatTile } from "@/components/portal/StatTile";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CLIENTS, MODELS, PRACTICE } from "@/data/platform";
import { formatCurrencyWhole, formatDate, formatPercent, formatSignedCurrency } from "@/lib/format";

const STATUS_TONES = {
  "On track": "positive",
  "Review due": "caution",
  "Action required": "critical",
} as const;

/** Deterministic model mix so a client detail page renders the same on every visit. */
function modelsForClient(clientId: string) {
  const seed = clientId.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  const first = MODELS[seed % MODELS.length]!;
  const second = MODELS[(seed + 3) % MODELS.length]!;
  const firstWeight = 55 + (seed % 25);
  return [
    { model: first, weight: firstWeight },
    { model: second, weight: 100 - firstWeight },
  ];
}

export default function AdviserClientDetailPage() {
  const { id = "" } = useParams();
  const client = CLIENTS.find((candidate) => candidate.id === id);

  if (!client) {
    return <Navigate to="/adviserhub/clients" replace />;
  }

  const mix = modelsForClient(client.id);
  const blendedFee = mix.reduce(
    (total, entry) => total + (entry.model.managementFee * entry.weight) / 100,
    0,
  );
  const blendedReturn = mix.reduce(
    (total, entry) => total + (entry.model.oneYearReturn * entry.weight) / 100,
    0,
  );

  return (
    <PortalLayout
      portal="AdviserHUB"
      nav={ADVISER_NAV}
      contextLabel="Practice"
      contextValue={PRACTICE.name}
      contextNote={`${PRACTICE.afsl} · ${PRACTICE.adviserCount} advisers`}
      title={client.name}
      description={`${client.segment} · adviser ${client.adviser}`}
      actions={
        <>
          <ButtonLink to="/adviserhub/trading" size="sm">
            Place a trade
          </ButtonLink>
          <ButtonLink to="/adviserhub/clients" variant="secondary" size="sm">
            Back to clients
          </ButtonLink>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Balance"
          value={formatCurrencyWhole(client.balance)}
          note={client.accounts.join(" · ")}
          icon={Wallet}
        />
        <StatTile
          label="Net flow YTD"
          value={formatSignedCurrency(client.netFlowYtd)}
          tone={client.netFlowYtd >= 0 ? "positive" : "critical"}
          note={client.netFlowYtd >= 0 ? "Net inflow" : "Net outflow"}
          icon={TrendingUp}
        />
        <StatTile
          label="Review due"
          value={formatDate(client.reviewDue)}
          note={client.status}
          tone={client.status === "On track" ? "default" : "critical"}
          icon={CalendarClock}
        />
        <StatTile
          label="Blended model fee"
          value={formatPercent(blendedFee)}
          note={`Weighted 1yr return ${formatPercent(blendedReturn)}`}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <PanelCard title="Client">
          <div className="flex items-center gap-4">
            <Avatar name={client.name} size="lg" />
            <div>
              <p className="font-display text-lg font-semibold text-ink-strong">{client.name}</p>
              <p className="text-sm text-ink-faint">{client.segment}</p>
              <Badge tone={STATUS_TONES[client.status]} className="mt-2">
                {client.status}
              </Badge>
            </div>
          </div>
          <dl className="mt-6 flex flex-col divide-y divide-line-soft">
            {[
              { label: "Adviser", value: client.adviser },
              { label: "Practice", value: PRACTICE.name },
              { label: "Licensee", value: PRACTICE.licensee },
              { label: "Accounts", value: client.accounts.join(", ") },
              { label: "Next review", value: formatDate(client.reviewDue) },
            ].map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <dt className="text-sm text-ink-faint">{item.label}</dt>
                <dd className="max-w-[60%] text-right text-sm font-semibold text-ink-strong">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </PanelCard>

        <PanelCard title="Managed portfolio mix" description="Models implemented for this client">
          <ul className="flex flex-col gap-6">
            {mix.map((entry) => (
              <li key={entry.model.code} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="font-semibold text-ink-strong">{entry.model.name}</span>
                  <span className="text-sm tabular-nums text-ink-faint">
                    {entry.weight}% · {formatCurrencyWhole((client.balance * entry.weight) / 100)}
                  </span>
                </div>
                <ProgressBar
                  value={entry.weight}
                  label={`${entry.model.name} weight for ${client.name}`}
                />
                <p className="text-xs text-ink-faint">
                  {entry.model.manager} · {entry.model.riskProfile} · fee{" "}
                  {formatPercent(entry.model.managementFee)} · 1yr{" "}
                  {formatPercent(entry.model.oneYearReturn)}
                </p>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>

      <p className="mt-8 text-xs text-ink-faint">
        This client record is invented for a demonstration build.
      </p>
    </PortalLayout>
  );
}
