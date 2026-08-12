import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  tone = "soft",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  tone?: "soft" | "purple";
}) {
  return (
    <div className={cn(tone === "purple" ? "hero-purple text-white" : "hero-atmosphere", "border-b border-line")}>
      <div className="container-eh animate-fade-up py-14 sm:py-20">
        {eyebrow ? (
          <p className={cn("text-sm font-semibold uppercase tracking-[0.14em]", tone === "purple" ? "text-white/80" : "text-eh-purple")}>
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {description ? (
          <p className={cn("mt-4 max-w-2xl text-lg leading-relaxed", tone === "purple" ? "text-white/85" : "text-ink-soft")}>
            {description}
          </p>
        ) : null}
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
