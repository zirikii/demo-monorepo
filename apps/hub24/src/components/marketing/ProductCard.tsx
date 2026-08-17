import { ArrowRight } from "lucide-react";
import { LinkCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/data/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <LinkCard to={`/product/${product.slug}`} className="flex h-full flex-col gap-3">
      <Badge tone={product.category === "platform" ? "blue" : "teal"}>{product.brand}</Badge>
      <h3 className="text-xl font-extrabold tracking-tight text-ink-strong">{product.name}</h3>
      <p className="flex-1 text-ink-soft">{product.summary}</p>
      <span className="inline-flex items-center gap-2 text-sm font-bold text-hub-blue">
        Learn more
        <ArrowRight aria-hidden className="h-4 w-4" />
      </span>
    </LinkCard>
  );
}
