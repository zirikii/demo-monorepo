import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Product } from "@/data/products";
import { verticalStyles } from "@/data/categories";
import { ProductIcon } from "@/components/ProductIcon";

export function ProductCard({ product }: { product: Product }) {
  const styles = verticalStyles[product.vertical];
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-card">
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            styles.iconWrap,
          )}
        >
          <ProductIcon icon={product.icon} className="h-6 w-6" />
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="h-5 w-5 text-ink-faint transition-colors group-hover:text-ink"
        />
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{product.name}</h3>
      <p className={cn("mt-1 text-sm font-semibold", styles.text)}>{product.tagline}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
        {product.description}
      </p>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink-faint">
        {product.countries.join(" · ")}
      </p>
    </article>
  );
}
