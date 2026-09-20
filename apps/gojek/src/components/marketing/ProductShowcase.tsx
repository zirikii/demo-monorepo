import { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, CATEGORY_LABEL, productsByCategory } from "@/data/products";
import { SITE } from "@/data/site";
import type { ProductCategory } from "@/data/types";
import { cn } from "@/lib/cn";

export function ProductShowcase() {
  const [category, setCategory] = useState<ProductCategory>("transport");
  const items = productsByCategory(category);

  return (
    <section className="border-b border-white/8">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-sm tracking-[0.2em] text-go-green uppercase">Products</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">{SITE.productsHeading}</h2>
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              className={cn(
                "focus-go rounded-full px-4 py-2 text-sm",
                category === item ? "bg-white text-black" : "bg-white/6 text-go-muted hover:bg-white/10 hover:text-white",
              )}
              onClick={() => setCategory(item)}
            >
              {CATEGORY_LABEL[item]}
            </button>
          ))}
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((product) => (
            <li key={product.slug}>
              <Link
                to={`/products/${product.slug}`}
                className="focus-go block rounded-go-lg border border-white/8 bg-go-card p-6 transition hover:border-white/20"
              >
                <p className="text-xs tracking-[0.16em] text-go-faint uppercase">{CATEGORY_LABEL[product.category]}</p>
                <h3 className="mt-2 text-2xl font-semibold" style={{ color: product.color }}>
                  {product.name}
                </h3>
                <p className="mt-2 text-go-muted">{product.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
