import { useMemo, useState } from "react";
import { Check, ChevronRight, MoreHorizontal, Plus, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { announcements, candidates, dashboardMetrics, employees } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function DashboardPage() {
  const location = useLocation();
  const section = location.pathname.split("/").at(-1) ?? "dashboard";
  const title = section === "dashboard" ? "Overview" : section[0]?.toUpperCase() + section.slice(1);
  useDocumentTitle(`${title} — Acme Digital`);

  return (
    <DashboardShell>
      {section === "dashboard" ? <Overview /> : null}
      {section === "people" ? <People /> : null}
      {section === "payroll" ? <Payroll /> : null}
      {section === "recruitment" ? <Recruitment /> : null}
      {section === "leave" ? <Leave /> : null}
    </DashboardShell>
  );
}

function Overview() {
  const [period, setPeriod] = useState("This month");

  return (
    <div className="mx-auto max-w-[1440px]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-ink-faint">Wednesday, 12 August</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-[-0.035em]">Good morning, Avery</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Here&rsquo;s what&rsquo;s happening across Acme Digital.
          </p>
        </div>
        <div className="inline-flex self-start rounded-full border border-line bg-white p-1">
          {["This month", "Quarter"].map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={period === option}
              onClick={() => setPeriod(option)}
              className={`focus-hero rounded-full px-4 py-2 text-xs font-bold ${period === option ? "bg-ink text-white" : ""}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const multiplier = period === "Quarter" && index === 0 ? "90" : metric.value;
          return (
            <Card key={metric.label} className="p-5">
              <div className="flex items-center justify-between">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl tone-${["violet", "coral", "green", "blue"][index]}`}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <button
                  type="button"
                  aria-label={`More ${metric.label} options`}
                  className="focus-hero rounded-full p-1"
                >
                  <MoreHorizontal aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-6 text-sm text-ink-soft">{metric.label}</p>
              <p className="mt-1 text-3xl font-semibold tracking-[-0.04em]">{multiplier}</p>
              <p className="mt-3 text-xs font-semibold text-positive">{metric.change}</p>
            </Card>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Your priorities</h2>
              <p className="mt-1 text-xs text-ink-faint">Tasks that need your attention</p>
            </div>
            <Badge tone="coral">5 open</Badge>
          </div>
          <div className="mt-5 divide-y divide-line">
            {[
              ["Approve July pay run", "Due Friday", "Payroll"],
              ["Review 3 leave requests", "Due today", "Leave"],
              ["Sign off new starter workflow", "Due 14 Aug", "Onboarding"],
              ["Complete security training", "Due 28 Aug", "Learning"],
            ].map(([task, due, type]) => (
              <button
                key={task}
                type="button"
                className="focus-hero flex w-full items-center gap-3 py-4 text-left"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-line">
                  <Check aria-hidden="true" className="h-4 w-4 text-ink-faint" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{task}</span>
                  <span className="mt-1 block text-xs text-ink-faint">
                    {type} · {due}
                  </span>
                </span>
                <ChevronRight aria-hidden="true" className="h-4 w-4 text-ink-faint" />
              </button>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-bold">Company feed</h2>
          <div className="mt-5 space-y-5">
            {announcements.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-soft">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-ink-soft">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

function People() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      employees.filter((employee) =>
        `${employee.name} ${employee.role} ${employee.team}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <DataPage title="People" intro="Everyone at Acme Digital, in one place." action="Add employee">
      <div className="mb-5 flex items-center rounded-full border border-line bg-white px-4 sm:max-w-sm">
        <Search aria-hidden="true" className="h-4 w-4 text-ink-faint" />
        <input
          aria-label="Search people"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, role or team"
          className="min-h-11 flex-1 bg-transparent px-3 text-sm outline-none"
        />
      </div>
      <div className="overflow-x-auto rounded-hero-lg border border-line bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-line bg-neutral-soft">
            <tr>
              <th className="p-4">Employee</th>
              <th className="p-4">Role</th>
              <th className="p-4">Team</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((employee) => (
              <tr
                key={employee.id}
                className="border-b border-line last:border-0 hover:bg-violet-soft/40"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-violet-soft text-xs font-bold">
                      {employee.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="font-bold">{employee.name}</p>
                      <p className="text-xs text-ink-faint">{employee.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-ink-soft">{employee.role}</td>
                <td className="p-4 text-ink-soft">{employee.team}</td>
                <td className="p-4 text-ink-soft">{employee.location}</td>
                <td className="p-4">
                  <Badge tone={employee.status === "Active" ? "green" : "coral"}>
                    {employee.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DataPage>
  );
}

function Recruitment() {
  return (
    <DataPage
      title="Recruitment"
      intro="Six open roles and a healthy candidate pipeline."
      action="Create role"
    >
      <div className="grid gap-4 lg:grid-cols-5">
        {["New", "Screen", "Interview", "Offer", "Hired"].map((stage) => (
          <div key={stage} className="rounded-hero-lg bg-neutral-soft p-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold">{stage}</h2>
              <Badge>{candidates.filter((candidate) => candidate.stage === stage).length}</Badge>
            </div>
            <div className="mt-3 space-y-3">
              {candidates
                .filter((candidate) => candidate.stage === stage)
                .map((candidate) => (
                  <Card key={candidate.id} className="p-4">
                    <p className="text-sm font-bold">{candidate.name}</p>
                    <p className="mt-1 text-xs leading-5 text-ink-soft">{candidate.role}</p>
                    <p className="mt-4 text-xs font-bold text-positive">Match {candidate.score}%</p>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </DataPage>
  );
}

function Payroll() {
  return (
    <DataPage
      title="Payroll"
      intro="July monthly pay run · Approval due Friday."
      action="Start pay run"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Gross earnings", "$362,810"],
          ["Deductions", "$76,432"],
          ["Net pay", "$286,378"],
        ].map(([label, value], index) => (
          <Card key={label} className={`p-6 tone-${["violet", "coral", "green"][index]}`}>
            <p className="text-sm text-ink-soft">{label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{value}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-5 p-6">
        <h2 className="text-lg font-bold">Pre-flight checks</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            "Timesheets imported",
            "Leave synced",
            "Expenses approved",
            "Award checks complete",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl bg-green-soft p-4 text-sm font-semibold"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-green">
                <Check aria-hidden="true" className="h-4 w-4" />
              </span>
              {item}
            </div>
          ))}
        </div>
      </Card>
    </DataPage>
  );
}

function Leave() {
  return (
    <DataPage
      title="Leave"
      intro="Keep the team supported and every absence visible."
      action="Request leave"
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_0.55fr]">
        <Card className="p-6">
          <h2 className="text-lg font-bold">August calendar</h2>
          <div className="mt-5 grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, index) => (
              <div
                key={index}
                className={`min-h-16 rounded-xl p-2 text-xs ${[9, 10, 16, 22, 23].includes(index) ? "bg-violet-soft" : "bg-neutral-soft"}`}
              >
                <span>{index < 4 ? "" : index - 3}</span>
                {[9, 16, 22].includes(index) ? (
                  <span className="mt-2 block h-2 rounded-full bg-violet" />
                ) : null}
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Pending</h2>
            <Badge tone="coral">3</Badge>
          </div>
          <div className="mt-5 space-y-4">
            {employees.slice(3, 6).map((employee) => (
              <div key={employee.id} className="rounded-xl border border-line p-4">
                <p className="text-sm font-bold">{employee.name}</p>
                <p className="mt-1 text-xs text-ink-soft">Annual leave · 2 days</p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="focus-hero rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="focus-hero rounded-full border border-line px-3 py-1.5 text-xs font-bold"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DataPage>
  );
}

function DataPage({
  title,
  intro,
  action,
  children,
}: {
  title: string;
  intro: string;
  action: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1440px]">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.035em]">{title}</h1>
          <p className="mt-2 text-sm text-ink-soft">{intro}</p>
        </div>
        <Button className="self-start">
          <Plus aria-hidden="true" className="mr-2 h-4 w-4" />
          {action}
        </Button>
      </div>
      {children}
    </div>
  );
}
