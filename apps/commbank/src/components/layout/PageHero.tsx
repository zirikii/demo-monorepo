import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  tone = "yellow",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  tone?: "yellow" | "black" | "light";
  children?: ReactNode;
}) {
  const toneClass = {
    yellow: "bg-cba-yellow text-black",
    black: "bg-black text-white",
    light: "bg-surface-tint text-black",
  }[tone];

  return (
    <section className={cn("py-12 sm:py-16", toneClass)}>
      <div className="container-page">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p
              className={cn(
                "mb-3 text-xs font-bold uppercase tracking-[0.14em]",
                tone === "black" ? "text-cba-yellow" : "text-black/60",
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p
              className={cn(
                "mt-4 text-lg leading-relaxed",
                tone === "black" ? "text-white/80" : "text-black/75",
              )}
            >
              {description}
            </p>
          ) : null}
          {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
