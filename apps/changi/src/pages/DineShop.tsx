import { useMemo, useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { EmptyState } from "@/components/ui/EmptyState";
import { outlets, type Outlet } from "@/data/outlets";
import { cn } from "@/lib/cn";

const terminalFilters = ["All", "T1", "T2", "T3", "T4", "Jewel"] as const;
type TerminalFilter = (typeof terminalFilters)[number];

function matchesQuery(outlet: Outlet, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  return [outlet.name, outlet.subcategory, outlet.terminal, outlet.hours, outlet.highlight].some(
    (value) => value?.toLowerCase().includes(q) ?? false,
  );
}

export function DineShopPage() {
  useDocumentTitle("Dine & Shop");
  const [tab, setTab] = useState<"Dining" | "Shopping">("Dining");
  const [query, setQuery] = useState("");
  const [terminal, setTerminal] = useState<TerminalFilter>("All");

  const rows = useMemo(
    () =>
      outlets.filter((o) => {
        if (o.category !== tab) return false;
        if (terminal !== "All" && o.terminal !== terminal) return false;
        return matchesQuery(o, query);
      }),
    [query, tab, terminal],
  );

  return (
    <PageLayout>
      <PageHero
        title="Dine & Shop"
        subtitle="Homegrown favourites, global brands, GST-absorbed shopping, and Changi Pay."
        crumbs={[{ label: "Dine & Shop" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-line bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex self-start rounded-lg bg-surface p-1">
            {(["Dining", "Shopping"] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-bold",
                  tab === t ? "bg-purple text-white" : "text-ink-soft hover:text-ink",
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex flex-1 flex-col gap-2 sm:max-w-xl sm:flex-row">
            <label className="sr-only" htmlFor="outlet-search">
              Search Dine & Shop outlets
            </label>
            <input
              id="outlet-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brand, cuisine, or shop type"
              className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none ring-purple focus:ring-2"
            />

            <label className="sr-only" htmlFor="terminal-filter">
              Filter outlets by terminal
            </label>
            <select
              id="terminal-filter"
              value={terminal}
              onChange={(e) => setTerminal(e.target.value as TerminalFilter)}
              className="rounded-md border border-line bg-surface px-3 py-2 text-sm"
            >
              {terminalFilters.map((option) => (
                <option key={option} value={option}>
                  {option === "All" ? "All locations" : option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {rows.length === 0 ? (
          <EmptyState
            title="No Dine & Shop outlets match your filters"
            description="Try another brand, category, or terminal."
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((o) => (
              <article key={o.id} className="rounded-xl border border-line bg-card p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-ink-faint">
                  {o.subcategory}
                </p>
                <h2 className="mt-1 text-base font-black text-ink-deep">{o.name}</h2>
                <p className="mt-2 text-sm text-ink-soft">
                  {o.terminal} · {o.hours}
                </p>
                {o.highlight ? (
                  <p className="mt-2 text-sm font-bold text-purple">{o.highlight}</p>
                ) : null}
              </article>
            ))}
          </div>
        )}
        <p className="mt-4 text-xs text-ink-faint">
          Showing {rows.length} demo outlets — availability and opening hours are illustrative.
        </p>
      </section>
    </PageLayout>
  );
}
