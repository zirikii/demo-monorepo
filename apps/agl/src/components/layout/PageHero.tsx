import type { ReactNode } from "react";
import { AglRays } from "@/components/brand/AglRays";
import { cn } from "@/lib/cn";
import { Breadcrumb, type Crumb } from "./Breadcrumb";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
  aside?: ReactNode;
  tone?: "sky" | "blue";
};

/** Product-page hero: tinted panel with the AGL rays as an oversized watermark and a curved bottom edge. */
export function PageHero({ eyebrow, title, intro, crumbs, actions, aside, tone = "sky" }: Props) {
  const blue = tone === "blue";
  return (
    <section className={cn("relative overflow-hidden", blue ? "bg-agl-blue-dark text-white" : "bg-agl-sky")}>
      <AglRays className={cn("pointer-events-none absolute -top-10 -right-24 h-[420px] w-[420px]", blue ? "opacity-25" : "opacity-20")} />
      <div className="container-agl relative pt-8 pb-16 lg:pt-10 lg:pb-24">
        {crumbs && (
          <div className={cn(blue && "[&_*]:text-white/80")}>
            <Breadcrumb items={crumbs} />
          </div>
        )}
        <div className={cn("mt-8 grid items-center gap-10", aside && "lg:grid-cols-[1.1fr_1fr]")}>
          <div className="max-w-2xl">
            {eyebrow && (
              <p className={cn("mb-3 text-sm font-extrabold tracking-wider uppercase", blue ? "text-ray-light" : "text-agl-teal-ink")}>
                {eyebrow}
              </p>
            )}
            <h1 className={cn("text-4xl leading-[1.08] font-extrabold tracking-tight lg:text-5xl", blue ? "text-white" : "text-agl-blue-dark")}>
              {title}
            </h1>
            {intro && <p className={cn("mt-4 text-lg", blue ? "text-white/85" : "text-ink-soft")}>{intro}</p>}
            {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside}
        </div>
      </div>
      <svg aria-hidden="true" viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-10 w-full text-white">
        <path d="M0 60V32C360 -8 1080 -8 1440 32V60Z" fill="currentColor" />
      </svg>
    </section>
  );
}
