import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/marketing/ProductCard";
import { verticals, verticalStyles, type VerticalId } from "@/data/categories";
import { productsByVertical } from "@/data/products";
import { cn } from "@/lib/cn";

export function ProductShowcase() {
  const [active, setActive] = useState<VerticalId>("transport");
  const items = productsByVertical(active);
  const activeVertical = verticals.find((v) => v.id === active);

  return (
    <section className="bg-surface py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="20+ products, 6 clusters"
          title="We serve millions of customers across Southeast Asia"
          description="Every Gojek service belongs to a colour-coded cluster — a system straight from our brand playbook."
        />

        <div
          role="tablist"
          aria-label="Product clusters"
          className="mt-10 flex flex-wrap gap-2"
        >
          {verticals.map((v) => {
            const isActive = v.id === active;
            const styles = verticalStyles[v.id];
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(v.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  isActive ? styles.chipActive : cn("bg-white", styles.chip),
                )}
              >
                {v.label}
              </button>
            );
          })}
        </div>

        {activeVertical ? (
          <p className="mt-6 max-w-2xl text-ink-soft">{activeVertical.blurb}</p>
        ) : null}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>

        <div className="mt-10">
          <Link
            to={`/products?c=${active}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-gojek hover:text-gojek-deep"
          >
            See all products
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
