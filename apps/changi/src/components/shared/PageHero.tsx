import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  className?: string;
}

/** Reusable interior-page hero on the plum gradient band. */
export function PageHero({ eyebrow, title, copy, crumbs, children, className }: PageHeroProps) {
  return (
    <section className={cn("changi-aurora relative overflow-hidden bg-plum text-white", className)}>
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
        {crumbs && <Breadcrumbs items={crumbs} className="mb-6" />}
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        {copy && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{copy}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
