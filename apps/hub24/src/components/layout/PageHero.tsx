import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { cn } from "@/lib/cn";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
  aside?: ReactNode;
  tone?: "navy" | "tint" | "white";
  className?: string;
}

const TONES = {
  navy: "bg-h24-navy text-white",
  tint: "bg-h24-tint text-ink",
  white: "bg-white text-ink",
} as const;

export function PageHero({
  eyebrow,
  title,
  body,
  crumbs,
  actions,
  aside,
  tone = "navy",
  className,
}: PageHeroProps) {
  const dark = tone === "navy";

  return (
    <header className={cn("py-12 md:py-18", TONES[tone], className)}>
      <div className="container-h24">
        {crumbs ? <Breadcrumb items={crumbs} tone={dark ? "dark" : "light"} className="mb-6" /> : null}
        <div className={cn("grid items-center gap-10", aside && "lg:grid-cols-[1.15fr_0.85fr]")}>
          <div className="flex flex-col gap-5">
            {eyebrow ? (
              <span
                className={cn(
                  "text-xs font-bold tracking-[0.16em] uppercase",
                  dark ? "text-h24-aqua" : "text-h24-teal-dark",
                )}
              >
                {eyebrow}
              </span>
            ) : null}
            <h1 className="text-balance-h24 font-display text-4xl font-semibold md:text-[3.2rem] md:leading-[1.06]">
              {title}
            </h1>
            {body ? (
              <p
                className={cn(
                  "max-w-2xl text-lg leading-relaxed",
                  dark ? "text-h24-sky" : "text-ink-soft",
                )}
              >
                {body}
              </p>
            ) : null}
            {actions ? <div className="mt-2 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </div>
    </header>
  );
}
