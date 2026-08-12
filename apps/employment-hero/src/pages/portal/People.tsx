import { useMemo, useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Badge } from "@/components/ui/Badge";
import { filterPeople, people } from "@/data/people";
import { formatDate } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const teams = ["All", ...Array.from(new Set(people.map((p) => p.team)))];

export function PortalPeoplePage() {
  useDocumentTitle("People");
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("All");
  const rows = useMemo(() => filterPeople(query, team), [query, team]);

  return (
    <PortalLayout title="People">
      <div className="flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, role, location"
          className="focus-eh min-w-56 flex-1 rounded-full border border-line bg-white px-4 py-2 text-sm"
          aria-label="Filter people"
        />
        <select
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="focus-eh rounded-full border border-line bg-white px-4 py-2 text-sm"
          aria-label="Filter by team"
        >
          {teams.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="mt-4 overflow-x-auto rounded-eh-lg border border-line bg-white shadow-eh">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface-soft text-ink-faint">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Team</th>
              <th className="px-4 py-3 font-semibold">Location</th>
              <th className="px-4 py-3 font-semibold">Start</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((person) => (
              <tr key={person.id} className="border-t border-line">
                <td className="px-4 py-3 font-semibold">{person.name}</td>
                <td className="px-4 py-3">{person.role}</td>
                <td className="px-4 py-3">{person.team}</td>
                <td className="px-4 py-3">{person.location}</td>
                <td className="px-4 py-3">{formatDate(person.startDate)}</td>
                <td className="px-4 py-3">
                  <Badge tone={person.status === "Active" ? "success" : person.status === "On leave" ? "warn" : "soft"}>
                    {person.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-ink-faint">{rows.length} people shown</p>
    </PortalLayout>
  );
}
