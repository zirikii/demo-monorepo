import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { cn } from "@/lib/cn";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  body?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  body,
  crumbs,
  actions,
  aside,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("bg-hub-navy text-white", className)}>
      <div className="container-hub grid gap-10 py-14 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="animate-hub-rise flex flex-col gap-5">
          {crumbs ? <Breadcrumb items={crumbs} /> : null}
          {eyebrow ? (
            <span className="text-xs font-extrabold tracking-[0.18em] text-hub-teal-soft uppercase">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="text-balance-hub text-4xl leading-[1.05] font-extrabold tracking-tight md:text-5xl">
            {title}
          </h1>
          {body ? <p className="max-w-2xl text-lg leading-relaxed text-white/80">{body}</p> : null}
          {actions ? <div className="flex flex-wrap items-center gap-3 pt-1">{actions}</div> : null}
        </div>
        {aside ? <div className="animate-hub-fade">{aside}</div> : null}
      </div>
    </section>
  );
}
