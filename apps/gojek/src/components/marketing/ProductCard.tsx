import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categoryById } from "@/data/products";
import type { Product } from "@/data/types";
import { cn } from "@/lib/cn";

export function ProductCard({
  product,
  tone = "light",
}: {
  product: Product;
  tone?: "light" | "dark";
}) {
  const category = categoryById(product.category);

  return (
    <Link
      to={`/products/${product.slug}`}
      className={cn(
        "focus-go group flex flex-col gap-3 rounded-go-lg p-6 transition",
        tone === "dark"
          ? "bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
          : "border border-line bg-white hover:-translate-y-1 hover:shadow-go-lift",
      )}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-10 rounded-full"
        style={{ backgroundColor: category?.accent ?? "var(--color-go-green)" }}
      />
      <div className="flex items-start justify-between gap-3">
        <h3
          className={cn(
            "text-xl font-extrabold tracking-tight",
            tone === "dark" ? "text-white" : "text-ink-strong",
          )}
        >
          {product.name}
        </h3>
        <ArrowUpRight
          aria-hidden="true"
          className={cn(
            "h-5 w-5 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            tone === "dark" ? "text-white/50" : "text-ink-ghost",
          )}
        />
      </div>
      <p
        className={cn(
          "text-sm leading-relaxed",
          tone === "dark" ? "text-white/65" : "text-ink-soft",
        )}
      >
        {product.tagline}
      </p>
      <span
        className={cn(
          "mt-auto pt-2 text-xs font-bold tracking-wide uppercase",
          tone === "dark" ? "text-white/40" : "text-ink-ghost",
        )}
      >
        Since {product.since} · {product.markets.length} markets
      </span>
    </Link>
  );
}
