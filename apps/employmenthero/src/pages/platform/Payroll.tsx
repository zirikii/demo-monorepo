import { AlertTriangle } from "lucide-react";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { PanelCard } from "@/components/platform/PanelCard";
import { StatTile } from "@/components/platform/StatTile";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { ORGANISATION, PAY_RUNS, PAY_RUN_EXCEPTIONS } from "@/data/platform";
import type { PayRun } from "@/data/types";
import { formatCurrency, formatDate } from "@/lib/format";

const STATUS_TONE = {
  Draft: "caution",
  "Awaiting approval": "caution",
  Finalised: "info",
  Lodged: "positive",
} as const;

const SEVERITY_TONE = {
  high: "critical",
  medium: "caution",
  low: "neutral",
} as const;

export default function PlatformPayroll() {
  const draft = PAY_RUNS[0]!;

  const columns: Column<PayRun>[] = [
    {
      key: "period",
      header: "Pay period",
      render: (run) => (
        <span className="flex flex-col">
          <span className="font-bold text-ink-strong">{run.period}</span>
          <span className="text-xs text-ink-faint">Pay date {formatDate(run.payDate)}</span>
        </span>
      ),
    },
    { key: "employees", header: "Employees", hideBelow: "sm", render: (run) => run.employees },
    {
      key: "gross",
      header: "Gross",
      align: "right",
      render: (run) => formatCurrency(run.gross),
    },
    {
      key: "tax",
      header: "PAYG",
      align: "right",
      hideBelow: "md",
      render: (run) => formatCurrency(run.tax),
    },
    {
      key: "super",
      header: "Super",
      align: "right",
      hideBelow: "md",
      render: (run) => formatCurrency(run.super),
    },
    {
      key: "net",
      header: "Net",
      align: "right",
      hideBelow: "lg",
      render: (run) => formatCurrency(run.net),
    },
    {
      key: "status",
      header: "Status",
      align: "right",
      render: (run) => <Badge tone={STATUS_TONE[run.status]}>{run.status}</Badge>,
    },
  ];

  return (
    <PlatformLayout
      title="Payroll"
      description={`${ORGANISATION.payCycle} · next pay date ${formatDate(ORGANISATION.nextPayDate)}`}
      actions={
        <>
          <ButtonLink to="/platform/reports" size="sm">
            Payroll reports
          </ButtonLink>
          <ButtonLink to="/products/payroll-software" variant="secondary" size="sm">
            About payroll
          </ButtonLink>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Draft gross" value={formatCurrency(draft.gross)} trend={draft.period} />
        <StatTile label="PAYG withheld" value={formatCurrency(draft.tax)} />
        <StatTile label="Superannuation" value={formatCurrency(draft.super)} trend="Payday Super ready" trendTone="positive" />
        <StatTile
          label="Exceptions"
          value={String(PAY_RUN_EXCEPTIONS.length)}
          trend="Raised by the Payroll Agent"
          trendTone="critical"
        />
      </div>

      <div className="mt-6">
        <PanelCard
          title="Payroll Agent findings"
          subtitle={`Validated against ${draft.period} before approval`}
          action={{ label: "Responsible AI", to: "/responsible-ai" }}
        >
          <ul className="flex flex-col gap-3">
            {PAY_RUN_EXCEPTIONS.map((exception) => (
              <li
                key={exception.id}
                className="flex flex-col gap-2 rounded-eh border border-line bg-surface-tint px-5 py-4 sm:flex-row sm:items-start sm:gap-4"
              >
                <AlertTriangle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-caution" />
                <div className="min-w-0 flex-1">
                  <p className="text-[0.98rem] font-bold text-ink-strong">{exception.finding}</p>
                  <p className="text-sm text-ink-faint">{exception.employee}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{exception.detail}</p>
                </div>
                <Badge tone={SEVERITY_TONE[exception.severity]} className="shrink-0">
                  {formatCurrency(exception.impact)}
                </Badge>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-faint">
            Nothing is auto-corrected. Each finding links to the pay line that produced it.
          </p>
        </PanelCard>
      </div>

      <div className="mt-6">
        <PanelCard title="Pay run history" subtitle="Last five cycles" bodyClassName="p-0">
          <DataTable
            columns={columns}
            rows={PAY_RUNS}
            rowKey={(run) => run.id}
            caption="Pay run history"
            className="rounded-none border-0"
          />
        </PanelCard>
      </div>
    </PlatformLayout>
  );
}
