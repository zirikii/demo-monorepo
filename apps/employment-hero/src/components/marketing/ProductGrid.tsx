import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/data/types";

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((product) => (
        <Link
          key={product.slug}
          to={`/products/${product.slug}`}
          className="focus-eh group flex flex-col rounded-eh-lg border border-eh-line bg-white p-7 transition hover:-translate-y-1 hover:border-eh-purple hover:shadow-eh-lift"
        >
          <Badge tone="purple">{product.category}</Badge>
          <h3 className="mt-4 font-display text-xl font-bold text-eh-ink group-hover:text-eh-purple">
            {product.name}
          </h3>
          <p className="mt-2 text-sm font-medium text-eh-purple">{product.tagline}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-eh-ink-soft">{product.summary}</p>
          <div className="mt-6 flex items-center justify-between border-t border-eh-line pt-5">
            <span>
              <span className="block font-display text-xl font-bold text-eh-ink">
                {product.stat.value}
              </span>
              <span className="block text-[11px] text-eh-ink-faint">{product.stat.label}</span>
            </span>
            <ArrowRight
              size={18}
              className="text-eh-purple transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
