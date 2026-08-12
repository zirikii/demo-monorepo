import { AlertTriangle, CalendarDays, UserSearch, Users, Wallet } from "lucide-react";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { AgentFeed } from "@/components/platform/AgentFeed";
import { HeadcountChart } from "@/components/platform/HeadcountChart";
import { PanelCard } from "@/components/platform/PanelCard";
import { StatTile } from "@/components/platform/StatTile";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import {
  CANDIDATES,
  EMPLOYEES,
  LEAVE_REQUESTS,
  ORGANISATION,
  PAY_RUNS,
  PAY_RUN_EXCEPTIONS,
} from "@/data/platform";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency, formatDate } from "@/lib/format";

const SEVERITY_TONE = {
  high: "critical",
  medium: "caution",
  low: "neutral",
} as const;

export default function PlatformDashboard() {
  const { user } = useAuth();
  const draftRun = PAY_RUNS[0]!;
  const pendingLeave = LEAVE_REQUESTS.filter((request) => request.status === "Pending");
  const activeCandidates = CANDIDATES.filter((candidate) => candidate.stage !== "Hired");
  const onboarding = EMPLOYEES.filter((employee) => employee.status === "Onboarding");

  return (
    <PlatformLayout
      title={`Good morning, ${user?.name.split(" ")[0] ?? "there"}`}
      description={`${ORGANISATION.name} · pay cycle ${ORGANISATION.payCycle.toLowerCase()}`}
      actions={
        <>
          <ButtonLink to="/platform/payroll" size="sm">
            Review draft pay run
          </ButtonLink>
          <ButtonLink to="/platform/hiring" variant="secondary" size="sm">
            Open hiring pipeline
          </ButtonLink>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Headcount" value={String(EMPLOYEES.length)} trend="+1 this month" trendTone="positive" icon={Users} />
        <StatTile
          label="Next pay run"
          value={formatCurrency(draftRun.gross)}
          trend={`Pay date ${formatDate(draftRun.payDate)}`}
          icon={Wallet}
        />
        <StatTile
          label="Open candidates"
          value={String(activeCandidates.length)}
          trend="3 awaiting your review"
          trendTone="critical"
          icon={UserSearch}
        />
        <StatTile
          label="Pending leave"
          value={String(pendingLeave.length)}
          trend="2 overlap in October"
          trendTone="critical"
          icon={CalendarDays}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <PanelCard
          title="Hero AI activity"
          subtitle="Agents draft and recommend — you approve"
          action={{ label: "Responsible AI", to: "/responsible-ai" }}
        >
          <AgentFeed />
        </PanelCard>

        <PanelCard
          title="Pay run exceptions"
          subtitle={`${PAY_RUN_EXCEPTIONS.length} findings on ${draftRun.period}`}
          action={{ label: "Open pay run", to: "/platform/payroll" }}
        >
          <ul className="flex flex-col gap-3">
            {PAY_RUN_EXCEPTIONS.map((exception) => (
              <li
                key={exception.id}
                className="flex items-start gap-3 rounded-eh border border-line bg-surface-tint px-4 py-3.5"
              >
                <AlertTriangle
                  aria-hidden
                  className="mt-0.5 h-4 w-4 shrink-0 text-caution"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[0.95rem] font-semibold text-ink-strong">{exception.finding}</p>
                  <p className="text-sm text-ink-faint">{exception.employee}</p>
                </div>
                <Badge tone={SEVERITY_TONE[exception.severity]}>
                  {formatCurrency(exception.impact)}
                </Badge>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <PanelCard title="Headcount trend" subtitle="Rolling seven months">
          <HeadcountChart />
        </PanelCard>

        <PanelCard
          title="Onboarding in progress"
          subtitle={`${onboarding.length} new starter${onboarding.length === 1 ? "" : "s"}`}
          action={{ label: "View people", to: "/platform/people" }}
        >
          {onboarding.length ? (
            <ul className="flex flex-col gap-3">
              {onboarding.map((employee) => (
                <li
                  key={employee.id}
                  className="flex items-center justify-between gap-3 rounded-eh border border-line px-4 py-3.5"
                >
                  <div>
                    <p className="text-[0.95rem] font-semibold text-ink-strong">{employee.name}</p>
                    <p className="text-sm text-ink-faint">
                      {employee.jobTitle} · starts {formatDate(employee.startDate)}
                    </p>
                  </div>
                  <Badge tone="caution">Awaiting super details</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-faint">No one is mid-onboarding right now.</p>
          )}
        </PanelCard>
      </div>
    </PlatformLayout>
  );
}
