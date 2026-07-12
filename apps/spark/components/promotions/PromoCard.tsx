import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Promotion } from "@/lib/types";
import { ACCENT_CLASSES } from "@/lib/utils/accent";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";

/**
 * Promotion tile used on the Travel & Move hub and the home page.
 * `featured` renders a larger card with highlight bullets.
 */
export function PromoCard({
  promo,
  featured = false,
}: {
  promo: Promotion;
  featured?: boolean;
}) {
  const accent = ACCENT_CLASSES[promo.accent];

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow hover:shadow-card-hover",
        featured && "md:col-span-2",
      )}
    >
      <div className={cn("h-1.5 w-full", accent.bar)} aria-hidden />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <p className={cn("text-xs font-semibold uppercase tracking-wide", accent.text)}>
            {promo.eyebrow}
          </p>
          {promo.badge ? <Badge tone="brand">{promo.badge}</Badge> : null}
        </div>

        <h3 className="mt-2 text-xl font-bold text-spark-ink">{promo.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{promo.description}</p>

        {featured && promo.highlights?.length ? (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {promo.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-ink-secondary">
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    accent.softBg,
                    accent.text,
                  )}
                >
                  <Check className="h-3 w-3" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href={promo.cta.href}
            className={cn(
              "focus-ring inline-flex items-center gap-1.5 rounded-md text-sm font-semibold",
              accent.text,
            )}
          >
            {promo.cta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          {promo.secondaryCta ? (
            <Link
              href={promo.secondaryCta.href}
              className="focus-ring rounded-md text-sm font-medium text-ink-muted hover:text-spark-ink"
            >
              {promo.secondaryCta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
