import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/marketing/ProductCard";
import { verticals, verticalStyles, type VerticalId } from "@/data/categories";
import { filterProducts } from "@/data/products";
import { cn } from "@/lib/cn";

function isVerticalId(value: string | null): value is VerticalId {
  return verticals.some((v) => v.id === value);
}

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("c");
  const [active, setActive] = useState<VerticalId | "all">(
    isVerticalId(initial) ? initial : "all",
  );
  const [query, setQuery] = useState("");

  const results = useMemo(() => filterProducts(query, active), [query, active]);

  const selectVertical = (id: VerticalId | "all") => {
    setActive(id);
    const next = new URLSearchParams(searchParams);
    if (id === "all") next.delete("c");
    else next.set("c", id);
    setSearchParams(next, { replace: true });
  };

  return (
    <PageLayout title="Products — Gojek (Demo)">
      <PageHero
        eyebrow="Products"
        title="20+ products, one super-app"
        description="Explore every Gojek service, grouped into the six colour-coded clusters from our brand system."
      />

      <Container className="py-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint"
            />
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <input
              id="product-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-full border border-line bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:border-gojek focus:ring-2 focus:ring-gojek/30"
            />
          </div>
          <p className="text-sm text-ink-soft" aria-live="polite">
            {results.length} {results.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={active === "all"}
            onClick={() => selectVertical("all")}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              active === "all"
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-ink-soft hover:border-ink/40 hover:text-ink",
            )}
          >
            All
          </button>
          {verticals.map((v) => {
            const isActive = v.id === active;
            const styles = verticalStyles[v.id];
            return (
              <button
                key={v.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectVertical(v.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  isActive ? styles.chipActive : cn("bg-white", styles.chip),
                )}
              >
                {v.short}
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          {results.length === 0 ? (
            <EmptyState
              title="No products found"
              description="Try a different search term or clear the filters."
              action={
                <Button
                  onClick={() => {
                    setQuery("");
                    selectVertical("all");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </PageLayout>
  );
}
