import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ProductCard } from "@/components/marketing/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tabs, type TabOption } from "@/components/ui/Tabs";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/data/products";
import { pluralise } from "@/lib/format";

export default function ProductsPage() {
  const [category, setCategory] = useState("all");

  const options = useMemo<TabOption[]>(
    () => [
      { id: "all", label: "All", count: PRODUCTS.length },
      ...PRODUCT_CATEGORIES.map((entry) => ({
        id: entry.id,
        label: entry.name,
        count: PRODUCTS.filter((product) => product.category === entry.id).length,
      })),
    ],
    [],
  );

  const visible = useMemo(
    () =>
      category === "all" ? PRODUCTS : PRODUCTS.filter((product) => product.category === category),
    [category],
  );

  return (
    <PageLayout title="Products">
      <PageHero
        eyebrow="Products"
        title="We build products that a country runs on"
        body="Twenty-three services across six families, sharing one identity layer, one wallet, and one allocation engine. Pick a family to narrow the list."
      />

      <Section width="wide">
        <Tabs
          options={options}
          value={category}
          onChange={setCategory}
          ariaLabel="Filter products by category"
        />

        <p className="mt-6 text-sm font-semibold text-ink-faint">
          Showing {pluralise(visible.length, "product")}
        </p>

        {visible.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              title="Nothing in this family yet"
              body="Choose another category to see what those teams are building."
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </Section>

      <CtaBand />
    </PageLayout>
  );
}
