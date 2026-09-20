import { JOB_LOCATIONS, JOB_TEAMS } from "@/data/jobs";
import type { JobTeam } from "@/data/types";
import { titleCase } from "@/lib/format";

export function JobFilters({
  location,
  team,
  onLocation,
  onTeam,
}: {
  location: string;
  team: JobTeam | "all";
  onLocation: (value: string) => void;
  onTeam: (value: JobTeam | "all") => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <label className="flex-1 text-sm">
        <span className="mb-1 block text-go-faint">Location</span>
        <select
          value={location}
          onChange={(event) => onLocation(event.target.value)}
          className="w-full rounded-go border border-go-line bg-go-card px-3 py-2"
        >
          {JOB_LOCATIONS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="flex-1 text-sm">
        <span className="mb-1 block text-go-faint">Team</span>
        <select
          value={team}
          onChange={(event) => onTeam(event.target.value as JobTeam | "all")}
          className="w-full rounded-go border border-go-line bg-go-card px-3 py-2"
        >
          {JOB_TEAMS.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All teams" : titleCase(item)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
