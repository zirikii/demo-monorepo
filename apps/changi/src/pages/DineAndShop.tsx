import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { OutletCard } from "@/components/shared/OutletCard";
import { cn } from "@/lib/cn";
import { outlets, type OutletCategory } from "@/data/dine";

type Filter = "all" | OutletCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "dine", label: "Dine" },
  { id: "shop", label: "Shop" },
];

export function DineAndShopPage() {
  const [searchParams] = useSearchParams();
  const initial = (searchParams.get("category") as Filter) ?? "all";
  const [filter, setFilter] = useState<Filter>(
    FILTERS.some((f) => f.id === initial) ? initial : "all",
  );

  const results = useMemo(() => {
    if (filter === "all") return outlets;
    return outlets.filter((outlet) => outlet.category === filter);
  }, [filter]);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Dine & Shop"
        title="Eat, drink and shop across Changi"
        copy="From local hawker favourites to duty-free flagships and the shops of Jewel — discover 260+ ways to dine and shop."
        crumbs={[{ label: "Home", to: "/" }, { label: "Dine & Shop" }]}
      />

      <section className="bg-sand py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="inline-flex flex-wrap gap-2 rounded-full border border-sand-deep bg-card p-1"
            role="tablist"
            aria-label="Filter outlets"
          >
            {FILTERS.map((option) => (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={filter === option.id}
                onClick={() => setFilter(option.id)}
                className={cn(
                  "rounded-full px-6 py-2 text-sm font-semibold transition-colors",
                  filter === option.id ? "bg-magenta text-white" : "text-ink hover:bg-sand-deep/40",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          <p className="mt-4 text-sm text-ink-soft" role="status">
            Showing {results.length} {results.length === 1 ? "outlet" : "outlets"}.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((outlet) => (
              <OutletCard key={outlet.slug} outlet={outlet} />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
