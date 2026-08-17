import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { CardBody, CardHeading, LinkCard } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRODUCT_CATEGORIES, PRODUCTS } from "@/data/products";
import { cn } from "@/lib/cn";

type Filter = (typeof PRODUCT_CATEGORIES)[number] | "All";

const FILTERS: Filter[] = ["All", ...PRODUCT_CATEGORIES];

export default function ProductsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const products = filter === "All" ? PRODUCTS : PRODUCTS.filter((item) => item.category === filter);

  return (
    <PageLayout title="Products and solutions">
      <PageHero
        eyebrow="Products & solutions"
        title="Everything HUB24 offers, in one list"
        body="Platform products, investment menus, reporting capability, portals and the wider HUB24 Group technology businesses."
        crumbs={[{ label: "Home", to: "/" }, { label: "Products & solutions" }]}
      />

      <Section>
        <SectionHeading eyebrow="Browse" title="Filter by category" />

        <div role="group" aria-label="Filter products by category" className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
              className={cn(
                "focus-h24 rounded-full border px-4 py-2 text-sm font-semibold transition",
                filter === option
                  ? "border-h24-teal bg-h24-teal text-white"
                  : "border-line bg-white text-ink-soft hover:border-h24-teal hover:text-h24-teal-dark",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {products.length === 0 ? (
          <EmptyState className="mt-10" title="No products in this category" />
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <LinkCard
                key={product.slug}
                to={`/product/${product.slug}/`}
                className="flex h-full flex-col gap-3"
              >
                <span className="text-xs font-bold tracking-[0.16em] text-h24-teal-dark uppercase">
                  {product.category}
                </span>
                <CardHeading>{product.name}</CardHeading>
                <p className="text-sm font-semibold text-ink-faint">{product.tagline}</p>
                <CardBody className="flex-1">{product.summary}</CardBody>
              </LinkCard>
            ))}
          </div>
        )}
      </Section>

      <CtaBand
        title="Which combination is right for your practice?"
        body="Most practices run HUB24 Invest and HUB24 Super with managed portfolios, and add SMSF Access, Private Invest or Engage as the client base demands."
      />
    </PageLayout>
  );
}
