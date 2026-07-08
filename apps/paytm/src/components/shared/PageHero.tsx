import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface PageHeroProps {
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  tone?: "light" | "navy";
}

/** Page-top band used on marketing/content pages. */
export function PageHero({ title, subtitle, children, tone = "light" }: PageHeroProps) {
  const navy = tone === "navy";
  return (
    <section
      className={cn(
        navy
          ? "bg-gradient-to-br from-paytm-navy-deep via-paytm-navy to-paytm-navy-mid text-white"
          : "bg-gradient-to-b from-paytm-sky/60 to-surface",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <h1
          className={cn(
            "max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl",
            navy ? "text-white" : "text-paytm-navy",
          )}
        >
          {title}
        </h1>
        {subtitle ? (
          <p className={cn("mt-3 max-w-2xl text-sm sm:text-base", navy ? "text-white/80" : "text-ink-soft")}>
            {subtitle}
          </p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
