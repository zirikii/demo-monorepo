import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { useWorkspace } from "@/hooks/useWorkspace";
import { formatCurrencyWhole, formatPercent } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PlatformReportsPage() {
  useDocumentTitle("Reports");
  const { employees, payRuns, candidates } = useWorkspace();

  const totalSalary = employees.reduce((sum, employee) => sum + employee.salary, 0);
  const averageSalary = totalSalary / employees.length;
  const finalised = payRuns.filter((run) => run.status === "Finalised");
  const hired = candidates.filter((candidate) => candidate.stage === "Hired").length;

  const byTeam = employees.reduce<Record<string, number>>((acc, employee) => {
    acc[employee.team] = (acc[employee.team] ?? 0) + 1;
    return acc;
  }, {});
  const maxTeam = Math.max(...Object.values(byTeam));

  const tiles = [
    { label: "Annual salary cost", value: formatCurrencyWhole(totalSalary) },
    { label: "Average salary", value: formatCurrencyWhole(averageSalary) },
    { label: "Finalised pay runs", value: String(finalised.length) },
    { label: "Hires this quarter", value: String(hired) },
  ];

  return (
    <PlatformLayout title="Reports" subtitle="Headcount, cost and hiring at a glance">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-eh-lg border border-eh-line bg-white p-5">
            <p className="text-xs font-semibold tracking-wide text-eh-ink-faint uppercase">
              {tile.label}
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-eh-ink">{tile.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-eh-lg border border-eh-line bg-white p-6">
          <h2 className="text-lg font-semibold text-eh-ink">Headcount by team</h2>
          <ul className="mt-5 space-y-4">
            {Object.entries(byTeam)
              .sort((a, b) => b[1] - a[1])
              .map(([team, count]) => (
                <li key={team}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-eh-ink">{team}</span>
                    <span className="text-eh-ink-faint">{count}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-eh-surface-deep">
                    <div
                      className="h-full rounded-full bg-eh-purple"
                      style={{ width: `${(count / maxTeam) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </section>

        <section className="rounded-eh-lg border border-eh-line bg-white p-6">
          <h2 className="text-lg font-semibold text-eh-ink">Employment type mix</h2>
          <ul className="mt-5 space-y-4">
            {["Full time", "Part time", "Casual"].map((type) => {
              const count = employees.filter((item) => item.employmentType === type).length;
              const share = (count / employees.length) * 100;
              return (
                <li key={type}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-eh-ink">{type}</span>
                    <span className="text-eh-ink-faint">{formatPercent(share, 0)}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-eh-surface-deep">
                    <div
                      className="h-full rounded-full bg-eh-purple-lift"
                      style={{ width: `${share}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </PlatformLayout>
  );
}
