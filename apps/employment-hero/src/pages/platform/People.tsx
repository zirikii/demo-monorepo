import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { useWorkspace } from "@/hooks/useWorkspace";
import { formatCurrencyWhole, formatDate } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PlatformPeoplePage() {
  useDocumentTitle("People");
  const { employees } = useWorkspace();
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("All teams");

  const teams = useMemo(
    () => ["All teams", ...Array.from(new Set(employees.map((item) => item.team))).sort()],
    [employees],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return employees.filter((employee) => {
      const matchesTeam = team === "All teams" || employee.team === team;
      const matchesTerm =
        !term ||
        employee.name.toLowerCase().includes(term) ||
        employee.role.toLowerCase().includes(term) ||
        employee.email.toLowerCase().includes(term);
      return matchesTeam && matchesTerm;
    });
  }, [employees, query, team]);

  return (
    <PlatformLayout title="People" subtitle={`${employees.length} employees on the platform`}>
      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, role or email"
          aria-label="Search people"
          className="h-11 min-w-64 flex-1 rounded-eh border border-eh-line bg-white px-4 text-sm outline-none focus:border-eh-purple"
        />
        <select
          value={team}
          onChange={(event) => setTeam(event.target.value)}
          aria-label="Filter by team"
          className="h-11 rounded-eh border border-eh-line bg-white px-4 text-sm outline-none focus:border-eh-purple"
        >
          {teams.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-hidden rounded-eh-lg border border-eh-line bg-white">
        {filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-3xl text-sm">
              <thead className="bg-eh-surface-tint text-left">
                <tr>
                  {["Employee", "Team", "Location", "Type", "Started", "Salary", "Status"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-5 py-3.5 text-xs font-bold tracking-wide text-eh-ink-faint uppercase"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-eh-line-soft">
                {filtered.map((employee) => (
                  <tr key={employee.id} className="transition hover:bg-eh-purple-wash">
                    <td className="px-5 py-4">
                      <Link
                        to={`/platform/people/${employee.id}`}
                        className="focus-eh flex items-center gap-3"
                      >
                        <Avatar name={employee.name} size="sm" />
                        <span>
                          <span className="block font-semibold text-eh-ink">{employee.name}</span>
                          <span className="block text-xs text-eh-ink-faint">{employee.role}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-eh-ink-soft">{employee.team}</td>
                    <td className="px-5 py-4 text-eh-ink-soft">{employee.location}</td>
                    <td className="px-5 py-4 text-eh-ink-soft">{employee.employmentType}</td>
                    <td className="px-5 py-4 text-eh-ink-soft">{formatDate(employee.startDate)}</td>
                    <td className="px-5 py-4 text-eh-ink-soft">
                      {formatCurrencyWhole(employee.salary)}
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        tone={
                          employee.status === "Active"
                            ? "positive"
                            : employee.status === "Onboarding"
                              ? "purple"
                              : "neutral"
                        }
                      >
                        {employee.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6">
            <EmptyState
              title="No people match that search"
              body="Try a different name, role or team filter."
            />
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
