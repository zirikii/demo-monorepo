import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { HeadcountChart } from "@/components/platform/HeadcountChart";
import { PanelCard } from "@/components/platform/PanelCard";
import { StatTile } from "@/components/platform/StatTile";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DEPARTMENTS, EMPLOYEES, LOCATIONS, PAY_RUNS } from "@/data/platform";
import { formatCurrency, formatPercent } from "@/lib/format";

const SAVED_REPORTS = [
  { name: "Payroll summary by venue", schedule: "Every pay run", owner: "Finance" },
  { name: "Turnover by tenure band", schedule: "Monthly", owner: "People" },
  { name: "Leave liability", schedule: "Monthly", owner: "Finance" },
  { name: "Award compliance exceptions", schedule: "Every pay run", owner: "People" },
  { name: "Hiring funnel and source", schedule: "Weekly", owner: "Talent" },
  { name: "Training completion by site", schedule: "Quarterly", owner: "Compliance" },
];

export default function PlatformReports() {
  const lastRun = PAY_RUNS[1]!;
  const priorRun = PAY_RUNS[2]!;
  const change = ((lastRun.gross - priorRun.gross) / priorRun.gross) * 100;

  const byDepartment = DEPARTMENTS.map((department) => ({
    department,
    count: EMPLOYEES.filter((employee) => employee.department === department).length,
  })).sort((a, b) => b.count - a.count);

  const byLocation = LOCATIONS.map((location) => ({
    location,
    count: EMPLOYEES.filter((employee) => employee.location === location).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <PlatformLayout title="Reports" description="Workforce and payroll analytics">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Headcount" value={String(EMPLOYEES.length)} trend="+33% year on year" trendTone="positive" />
        <StatTile
          label="Last pay run gross"
          value={formatCurrency(lastRun.gross)}
          trend={`${change >= 0 ? "+" : ""}${formatPercent(change, 1)} vs prior`}
          trendTone={change >= 0 ? "critical" : "positive"}
        />
        <StatTile label="Casual mix" value="31%" trend="5 of 16 employees" />
        <StatTile label="12-month turnover" value="18.4%" trend="-4.2% vs last quarter" trendTone="positive" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <PanelCard title="Headcount trend">
          <HeadcountChart />
        </PanelCard>

        <PanelCard title="Headcount by department">
          <ul className="flex flex-col gap-4">
            {byDepartment.map((row) => (
              <li key={row.department}>
                <ProgressBar
                  value={Math.round((row.count / EMPLOYEES.length) * 100)}
                  label={`${row.department} · ${row.count}`}
                />
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <PanelCard title="Headcount by venue">
          <ul className="flex flex-col gap-4">
            {byLocation.map((row) => (
              <li key={row.location}>
                <ProgressBar
                  value={Math.round((row.count / EMPLOYEES.length) * 100)}
                  label={`${row.location} · ${row.count}`}
                  tone="positive"
                />
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard title="Saved reports" subtitle="Scheduled and shared with their owners">
          <ul className="flex flex-col gap-3">
            {SAVED_REPORTS.map((report) => (
              <li
                key={report.name}
                className="flex items-center justify-between gap-4 rounded-eh border border-line px-4 py-3"
              >
                <div>
                  <p className="text-sm font-bold text-ink-strong">{report.name}</p>
                  <p className="text-xs text-ink-faint">{report.schedule}</p>
                </div>
                <span className="text-sm text-ink-faint">{report.owner}</span>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>
    </PlatformLayout>
  );
}
