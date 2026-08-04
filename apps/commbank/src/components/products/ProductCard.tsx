import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import type { Product } from "@/data/types";
import { ButtonLink } from "../ui/Button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col rounded-cba-lg border border-line-soft bg-surface p-6 shadow-cba">
      <p className="text-[13px] font-bold uppercase tracking-wider text-ink-faint">
        {product.tagline}
      </p>
      <h3 className="mt-1 text-xl font-extrabold text-ink">
        <Link to={`/products/${product.slug}`} className="focus-cba hover:underline">
          {product.name}
        </Link>
      </h3>

      {product.headline ? (
        <div className="mt-4 rounded-cba-md bg-cba-yellow-tint px-4 py-3">
          <p className="text-2xl font-extrabold text-ink">{product.headline.value}</p>
          <p className="text-[13px] text-ink-soft">{product.headline.label}</p>
        </div>
      ) : null}

      <ul className="mt-4 flex-1 space-y-2">
        {product.features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-positive" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        <ButtonLink to={`/products/${product.slug}`} size="sm">
          {product.ctaLabel}
        </ButtonLink>
        <ButtonLink to={`/products/${product.slug}`} variant="secondary" size="sm">
          View details
        </ButtonLink>
      </div>
    </article>
  );
}
