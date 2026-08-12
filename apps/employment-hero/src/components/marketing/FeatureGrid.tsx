import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";

export function FeatureGrid({ limit = 6 }: { limit?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.slice(0, limit).map((product, index) => (
        <Link
          key={product.slug}
          to={`/products/${product.slug}`}
          className="focus-eh group animate-fade-up rounded-eh-lg border border-line bg-white p-6 shadow-eh transition hover:-translate-y-0.5 hover:shadow-eh-lift"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <h3 className="text-lg font-bold text-ink group-hover:text-eh-purple">{product.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{product.tagline}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-eh-purple">
            Explore <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </span>
        </Link>
      ))}
    </div>
  );
}
