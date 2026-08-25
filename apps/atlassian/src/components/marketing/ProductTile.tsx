import { Link } from "react-router-dom";
import { AppMark } from "@/components/brand/AppMark";
import type { Product } from "@/data/types";

export function ProductTile({ product }: { product: Product }) {
  return (
    <Link
      to={`/software/${product.slug}`}
      className="focus-atl flex flex-col gap-3 border border-line bg-white p-6 transition hover:shadow-atl-lift"
    >
      <AppMark slug={product.slug} size={40} />
      <h3 className="text-lg font-bold text-ink-strong">{product.name}</h3>
      <p className="text-sm leading-relaxed text-ink-soft">{product.summary}</p>
    </Link>
  );
}
