import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, type ReactNode } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { EventGrid } from "@/components/events/EventCard";
import { SearchBox } from "@/components/layout/SiteHeader";
import { CATEGORY_LABELS, CATEGORY_NAV, DATE_SHORTCUTS, REGIONS, regionLabel, type DateRangeId } from "@/data/nav";
import type { CategoryId, RegionId } from "@/data/types";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useRegion } from "@/hooks/useRegion";
import { cn } from "@/lib/cn";
import { filterEvents } from "@/lib/eventFilters";
import { NotFoundPage } from "./NotFound";

const FLAGS = { premium: "Premium Tickets", "last-minute": "Last Minute", featured: "Featured" } as const;
type Flag = keyof typeof FLAGS;

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
        active ? "border-midnight bg-midnight text-white" : "border-line bg-white text-ink hover:border-midnight",
      )}
    >
      {children}
    </button>
  );
}

type ListingProps = { mode: "whats-on" | "category" | "search" };

export function ListingPage({ mode }: ListingProps) {
  const { category } = useParams<{ category: string }>();
  const [params, setParams] = useSearchParams();
  const { region, setRegion } = useRegion();

  const cat = mode === "category" ? (category as CategoryId) : ((params.get("category") as CategoryId | null) ?? undefined);
  const validCategory = !cat || cat in CATEGORY_LABELS;
  const genre = params.get("genre") ?? undefined;
  const range = (params.get("range") as DateRangeId | null) ?? undefined;
  const flag = (params.get("filter") as Flag | null) ?? undefined;
  const query = params.get("q") ?? "";

  const title =
    mode === "search"
      ? query
        ? `Results for “${query}”`
        : "Search"
      : mode === "category" && cat
        ? CATEGORY_LABELS[cat]
        : flag
          ? FLAGS[flag]
          : range
            ? (DATE_SHORTCUTS.find((d) => d.id === range)?.label ?? "What's On")
            : "What's On";
  useDocumentTitle(title);

  const results = useMemo(
    () => (validCategory ? filterEvents({ category: cat, genre, range, flag, region, query: mode === "search" ? query : undefined }) : []),
    [validCategory, cat, genre, range, flag, region, query, mode],
  );

  if (!validCategory) return <NotFoundPage />;

  const set = (key: string, value: string | undefined) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };
  const genres = mode === "category" ? (CATEGORY_NAV.find((c) => c.id === cat)?.children ?? []) : [];
  const anyFilter = Boolean(genre || range || flag || (mode !== "category" && cat) || region !== "national");

  return (
    <div className="container-tk py-8">
      <nav aria-label="Breadcrumb" className="mb-3 text-sm text-ink-soft">
        <Link to="/" className="link">
          Home
        </Link>{" "}
        / <span>{title}</span>
      </nav>
      <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      {mode === "search" && <SearchBox className="mt-4 max-w-xl" />}

      <div className="main-content-box mt-6 space-y-4 p-4 md:p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
          <SlidersHorizontal className="size-4" aria-hidden /> Filter
          {anyFilter && (
            <button
              type="button"
              onClick={() => {
                const next = new URLSearchParams();
                if (query) next.set("q", query);
                setParams(next, { replace: true });
                setRegion("national");
              }}
              className="ml-auto flex items-center gap-1 text-sm font-medium text-tk-blue hover:underline"
            >
              <X className="size-3.5" aria-hidden /> Clear all
            </button>
          )}
        </div>
        {mode !== "category" && (
          <div role="group" aria-label="Category" className="flex gap-2 overflow-x-auto pb-1">
            <Chip active={!cat} onClick={() => set("category", undefined)}>
              All categories
            </Chip>
            {(Object.keys(CATEGORY_LABELS) as CategoryId[]).map((c) => (
              <Chip key={c} active={cat === c} onClick={() => set("category", cat === c ? undefined : c)}>
                {CATEGORY_LABELS[c]}
              </Chip>
            ))}
          </div>
        )}
        {genres.length > 0 && (
          <div role="group" aria-label="Genre" className="flex gap-2 overflow-x-auto pb-1">
            <Chip active={!genre} onClick={() => set("genre", undefined)}>
              All {cat ? CATEGORY_LABELS[cat] : ""}
            </Chip>
            {genres.map((g) => {
              const value = new URLSearchParams(g.to.split("?")[1]).get("genre") ?? "";
              return (
                <Chip key={g.to} active={genre === value} onClick={() => set("genre", genre === value ? undefined : value)}>
                  {g.label}
                </Chip>
              );
            })}
          </div>
        )}
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm">
            <span className="font-medium text-ink-soft">Region</span>
            <select value={region} onChange={(e) => setRegion(e.target.value as RegionId)} className="field w-auto py-1.5">
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="font-medium text-ink-soft">Dates</span>
            <select value={range ?? ""} onChange={(e) => set("range", e.target.value || undefined)} className="field w-auto py-1.5">
              <option value="">Any date</option>
              {DATE_SHORTCUTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
          {mode !== "search" && (
            <label className="flex items-center gap-2 text-sm">
              <span className="font-medium text-ink-soft">Show</span>
              <select value={flag ?? ""} onChange={(e) => set("filter", e.target.value || undefined)} className="field w-auto py-1.5">
                <option value="">All events</option>
                {(Object.keys(FLAGS) as Flag[]).map((f) => (
                  <option key={f} value={f}>
                    {FLAGS[f]}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>

      <p className="mb-4 mt-6 text-sm text-ink-soft" aria-live="polite">
        {results.length} {results.length === 1 ? "event" : "events"}
        {region !== "national" ? ` in ${regionLabel(region)}` : ""}
      </p>
      <EventGrid
        events={results}
        emptyText={mode === "search" && query ? `We couldn't find anything for “${query}”. Try an artist, team, venue or city.` : "No events match these filters."}
      />
    </div>
  );
}
