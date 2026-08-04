import { useMemo, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChips } from "@/components/ui/Tabs";
import { TextField } from "@/components/ui/Field";
import { branchLocations, locationKinds, locationServices, states } from "@/data/branches";
import { matchesQuery } from "@/lib/search";

export function BranchLocator() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<string>("All");
  const [kind, setKind] = useState<string>("All");
  const [service, setService] = useState<string | null>(null);

  const results = useMemo(
    () =>
      branchLocations.filter((location) => {
        if (state !== "All" && location.state !== state) return false;
        if (kind !== "All" && location.kind !== kind) return false;
        if (service && !location.services.includes(service)) return false;
        return matchesQuery(
          [location.name, location.suburb, location.postcode, location.address, location.state],
          query,
        );
      }),
    [query, state, kind, service],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      <aside className="space-y-6">
        <TextField
          label="Search by suburb or postcode"
          placeholder="e.g. Parramatta or 2150"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div>
          <p className="mb-2 text-sm font-semibold text-black">State</p>
          <FilterChips
            options={states}
            value={state}
            onChange={setState}
            ariaLabel="Filter by state"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-black">Location type</p>
          <FilterChips
            options={locationKinds}
            value={kind}
            onChange={setKind}
            ariaLabel="Filter by location type"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-black">Services</p>
          <FilterChips
            options={["Any", ...locationServices]}
            value={service ?? "Any"}
            onChange={(option) => setService(option === "Any" ? null : option)}
            ariaLabel="Filter by service"
          />
        </div>
      </aside>

      <div>
        <p className="mb-4 text-sm text-ink-soft" role="status">
          Showing <strong className="text-black">{results.length}</strong> of{" "}
          {branchLocations.length} locations
        </p>

        {results.length === 0 ? (
          <EmptyState
            title="No locations match those filters"
            description="Try a different suburb or postcode, or clear one of the filters."
          />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {results.map((location) => (
              <li
                key={location.id}
                className="rounded-2xl border border-line bg-surface p-5 transition-shadow hover:shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-black">{location.name}</h3>
                  <Badge tone={location.kind === "ATM" ? "neutral" : "yellow"}>
                    {location.kind}
                  </Badge>
                </div>
                <p className="mt-2 flex gap-2 text-sm text-ink-soft">
                  <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {location.address}, {location.suburb} {location.state} {location.postcode}
                  </span>
                </p>
                <p className="mt-1.5 flex gap-2 text-sm text-ink-soft">
                  <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                  {location.hours}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {location.services.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-surface-grey px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
