import { Clock, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";

const locations = [
  { name: "Sydney CBD", suburb: "Sydney NSW 2000", branch: true, atm: true, hours: "Mon–Fri 9:30am–4pm" },
  { name: "Broadway Shopping Centre", suburb: "Glebe NSW 2037", branch: true, atm: true, hours: "Mon–Fri 9:30am–4pm" },
  { name: "Bondi Junction", suburb: "Bondi Junction NSW 2022", branch: true, atm: true, hours: "Mon–Fri 9:30am–4pm" },
  { name: "Wynyard Station ATM", suburb: "Sydney NSW 2000", branch: false, atm: true, hours: "Open 24 hours" },
  { name: "Newtown ATM", suburb: "Newtown NSW 2042", branch: false, atm: true, hours: "Open 24 hours" },
] as const;

export function LocationsPage() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"all" | "branch" | "atm">("all");
  const visible = useMemo(
    () =>
      locations.filter(
        (location) =>
          `${location.name} ${location.suburb}`.toLowerCase().includes(query.toLowerCase()) &&
          (kind === "all" || (kind === "branch" ? location.branch : location.atm)),
      ),
    [kind, query],
  );

  return (
    <PublicLayout>
      <section className="bg-cba-yellow py-14">
        <div className="container-page">
          <p className="font-semibold">Locate us</p>
          <h1 className="mt-2 text-4xl font-bold">Find a branch or ATM</h1>
          <p className="mt-3">All locations in this demonstration are display-only.</p>
        </div>
      </section>
      <section className="container-page grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <label className="font-semibold" htmlFor="location-search">Suburb or postcode</label>
          <div className="relative mt-2">
            <Search aria-hidden="true" className="absolute left-3 top-3.5 h-5 w-5 text-cba-muted" />
            <input
              id="location-search"
              className="field pl-11"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. Sydney 2000"
            />
          </div>
          <fieldset className="mt-5">
            <legend className="font-semibold">Show</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["all", "branch", "atm"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={kind === value}
                  className={kind === value ? "rounded-full bg-cba-ink px-4 py-2 text-sm text-white" : "rounded-full border border-cba-line px-4 py-2 text-sm"}
                  onClick={() => setKind(value)}
                >
                  {value === "all" ? "All locations" : value === "branch" ? "Branches" : "ATMs"}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="mt-7 space-y-3" aria-live="polite">
            {visible.map((location) => (
              <article key={location.name} className="surface-card p-5">
                <div className="flex gap-3"><MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-cba-positive" />
                  <div>
                    <h2 className="font-bold">{location.name}</h2>
                    <p className="mt-1 text-sm text-cba-ink-soft">{location.suburb}</p>
                    <p className="mt-3 flex items-center gap-2 text-xs"><Clock aria-hidden="true" className="h-4 w-4" />{location.hours}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] bg-cba-neutral-deep">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(30deg, transparent 48%, white 49% 51%, transparent 52%), linear-gradient(120deg, transparent 48%, white 49% 51%, transparent 52%)", backgroundSize: "70px 70px" }} />
          {visible.slice(0, 4).map((location, index) => (
            <div key={location.name} className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-cba-yellow font-bold shadow-card" style={{ left: `${18 + index * 20}%`, top: `${24 + (index % 2) * 36}%` }}>
              {index + 1}
            </div>
          ))}
          <p className="absolute bottom-5 left-5 rounded-xl bg-white px-4 py-2 text-xs shadow-card">Illustrative map — no location service used</p>
        </div>
      </section>
    </PublicLayout>
  );
}
