import { useMemo, useState } from "react";
import { Clock, MapPin, Search } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { HelpBlock } from "@/components/marketing/HelpBlock";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { SelectField } from "@/components/ui/Field";
import { branchStates, branches, filterBranches } from "@/data/branches";
import { pluralise } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function LocateUsPage() {
  useDocumentTitle("Locate us");
  const [query, setQuery] = useState("");
  const [state, setState] = useState("all");
  const [type, setType] = useState("all");

  const results = useMemo(
    () => filterBranches(branches, { query, state, type }),
    [query, state, type],
  );

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Locate us" }]} />
      <PageHero
        eyebrow="Locate us"
        title="Find a branch, ATM or business centre"
        intro="Search by suburb or postcode to see opening hours and the services available at each location."
      />

      <Section>
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <label className="block text-sm font-bold text-ink" htmlFor="branch-search">
              Suburb, postcode or name
            </label>
            <div className="relative mt-1.5">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-ghost"
              />
              <input
                id="branch-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="e.g. Parramatta or 2150"
                className="focus-cba w-full rounded-cba border border-line bg-surface py-2.5 pl-11 pr-3 text-[15px]"
              />
            </div>
          </div>
          <SelectField
            label="State"
            value={state}
            onChange={(event) => setState(event.target.value)}
          >
            <option value="all">All states</option>
            {branchStates.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
          <SelectField label="Type" value={type} onChange={(event) => setType(event.target.value)}>
            <option value="all">All locations</option>
            <option value="Branch">Branch</option>
            <option value="ATM">ATM</option>
            <option value="Business centre">Business centre</option>
          </SelectField>
        </div>

        <p className="mt-5 text-sm text-ink-faint" aria-live="polite">
          {pluralise(results.length, "location")} found
        </p>

        <div className="mt-4">
          {results.length === 0 ? (
            <EmptyState
              title="No locations match your search"
              body="Try a nearby suburb or postcode, or clear the state and type filters."
            />
          ) : (
            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {results.map((branch) => (
                <li
                  key={branch.id}
                  className="flex h-full flex-col rounded-cba-lg border border-line-soft p-6 shadow-cba"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold text-ink">{branch.name}</h2>
                    <Badge tone={branch.type === "ATM" ? "muted" : "yellow"}>{branch.type}</Badge>
                  </div>
                  <p className="mt-2 flex items-start gap-2 text-[15px] text-ink-soft">
                    <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      {branch.address}
                      <br />
                      {branch.suburb} {branch.state} {branch.postcode}
                    </span>
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-sm text-ink-soft">
                    <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                    {branch.hours}
                  </p>
                  <ul className="mt-4 flex flex-1 flex-wrap content-start gap-2">
                    {branch.services.map((service) => (
                      <li
                        key={service}
                        className="rounded-full bg-surface-tint px-3 py-1 text-[12px] font-bold text-ink-soft"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <HelpBlock />
    </PageLayout>
  );
}
