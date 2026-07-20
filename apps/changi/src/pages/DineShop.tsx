import { useMemo, useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { EmptyState } from "@/components/ui/EmptyState";
import { outlets } from "@/data/outlets";
import { cn } from "@/lib/cn";

const terminalOptions = ["All", "T1", "T2", "T3", "T4", "Jewel"] as const;

type TerminalFilter = (typeof terminalOptions)[number];

export function DineShopPage() {
  useDocumentTitle("Dine & Shop");
  const [tab, setTab] = useState<"Dining" | "Shopping">("Dining");
  const [terminal, setTerminal] = useState<TerminalFilter>("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();

    return outlets.filter((o) => {
      if (o.category !== tab) return false;
      if (terminal !== "All" && o.terminal !== terminal) return false;
      if (!q) return true;

      return o.name.toLowerCase().includes(q) || o.subcategory.toLowerCase().includes(q);
    });
  }, [query, tab, terminal]);

  return (
    <PageLayout>
      <PageHero
        title="Dine & Shop"
        subtitle="Homegrown favourites, global brands, GST-absorbed shopping, and Changi Pay."
        crumbs={[{ label: "Dine & Shop" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 space-y-4 rounded-xl border border-line bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="inline-flex rounded-lg bg-surface p-1">
              {(["Dining", "Shopping"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
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
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search outlet or subcategory"
              className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm outline-none ring-purple focus:ring-2 lg:max-w-xs"
              aria-label="Search outlets"
            />
          </div>

          <div className="flex flex-wrap gap-2" aria-label="Filter by terminal">
            {terminalOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTerminal(option)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-bold transition-colors",
                  terminal === option
                    ? "border-purple bg-purple text-white"
                    : "border-line bg-surface text-ink-soft hover:border-purple hover:text-purple",
                )}
                aria-pressed={terminal === option}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {rows.length === 0 ? (
          <EmptyState
            title="No outlets match your filters"
            description="Try another terminal, switch between dining and shopping, or search a different outlet."
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
                {o.highlight ? <p className="mt-2 text-sm font-bold text-purple">{o.highlight}</p> : null}
              </article>
            ))}
          </div>
        )}
        <p className="mt-4 text-xs text-ink-faint">
          Showing {rows.length} demo outlets — availability and hours are illustrative.
        </p>
      </section>
    </PageLayout>
  );
}
