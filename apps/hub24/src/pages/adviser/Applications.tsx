import { AdviserLayout } from "@/components/adviser/AdviserLayout";
import { PanelCard } from "@/components/adviser/PanelCard";
import { StatTile } from "@/components/adviser/StatTile";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ADVISER_TASKS, APPLICATIONS, type AccountApplication } from "@/data/adviser";
import { longDate } from "@/lib/format";

export default function AdviserApplicationsPage() {
  const inFlight = APPLICATIONS.filter((application) => application.stage !== "Complete");

  const columns: Column<AccountApplication>[] = [
    {
      key: "client",
      header: "Applicant",
      render: (row) => (
        <span className="flex flex-col">
          <span className="font-bold text-ink-strong">{row.client}</span>
          <span className="text-xs text-ink-faint">{row.id}</span>
        </span>
      ),
    },
    { key: "product", header: "Product", render: (row) => row.product },
    { key: "menu", header: "Menu", render: (row) => <Badge tone="blue">{row.menu}</Badge> },
    { key: "submitted", header: "Submitted", render: (row) => longDate(row.submitted) },
    {
      key: "stage",
      header: "Stage",
      render: (row) => (
        <Badge
          tone={
            row.stage === "Complete" ? "positive" : row.stage === "Funding" ? "teal" : "caution"
          }
        >
          {row.stage}
        </Badge>
      ),
    },
    {
      key: "progress",
      header: "Progress",
      render: (row) => (
        <span className="flex w-40 flex-col gap-1">
          <ProgressBar value={row.progress} label={`${row.client} application progress`} />
          <span className="text-xs text-ink-faint">{row.progress}%</span>
        </span>
      ),
    },
  ];

  return (
    <AdviserLayout
      title="Applications"
      subtitle="Online account applications with straight-through processing"
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="In flight" value={String(inFlight.length)} note="Across all products" />
        <StatTile
          label="Awaiting signature"
          value={String(APPLICATIONS.filter((item) => item.stage === "Awaiting signature").length)}
        />
        <StatTile
          label="Completed this month"
          value={String(APPLICATIONS.filter((item) => item.stage === "Complete").length)}
          delta="Straight-through"
          trend="up"
        />
        <StatTile label="Median time to open" value="2.4 days" delta="-0.8 days" trend="up" />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <PanelCard title="Application pipeline">
          <DataTable
            caption="Account applications"
            columns={columns}
            rows={APPLICATIONS}
            rowKey={(row) => row.id}
          />
        </PanelCard>

        <PanelCard title="Outstanding items">
          <ul className="flex flex-col gap-3">
            {ADVISER_TASKS.filter(
              (task) => task.category === "Application" || task.category === "Consent",
            ).map((task) => (
              <li key={task.id} className="rounded-hub border border-line p-4">
                <p className="font-bold text-ink-strong">{task.title}</p>
                <p className="text-sm text-ink-faint">
                  {task.client} · due {longDate(task.due)}
                </p>
                <Badge className="mt-2" tone={task.priority === "High" ? "critical" : "caution"}>
                  {task.priority} priority
                </Badge>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>
    </AdviserLayout>
  );
}
