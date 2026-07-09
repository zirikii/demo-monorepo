import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Badge, type BadgeTint } from "@/components/ui/Badge";

interface PageHeroProps {
  eyebrow?: string;
  eyebrowTint?: BadgeTint;
  title: ReactNode;
  copy?: ReactNode;
  children?: ReactNode;
  dark?: boolean;
}

/** Standard interior-page hero band. */
export function PageHero({
  eyebrow,
  eyebrowTint = "mint",
  title,
  copy,
  children,
  dark = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        dark ? "bg-navy text-white squiz-lines-dark" : "squiz-lines",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-3xl">
          {eyebrow && (
            <Badge tint={eyebrowTint} className="mb-5">
              {eyebrow}
            </Badge>
          )}
          <h1
            className={cn(
              "text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl",
              dark ? "text-white" : "text-navy",
            )}
          >
            {title}
          </h1>
          {copy && (
            <p
              className={cn(
                "mt-6 text-lg leading-relaxed sm:text-xl",
                dark ? "text-white/70" : "text-ink-soft",
              )}
            >
              {copy}
            </p>
          )}
          {children && <div className="mt-9 flex flex-wrap gap-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}
