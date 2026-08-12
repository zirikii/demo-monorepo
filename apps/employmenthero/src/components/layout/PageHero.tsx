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
  tone?: "deep" | "tint" | "white";
  className?: string;
}

const TONES = {
  deep: "bg-eh-purple-deep text-white",
  tint: "bg-eh-tint text-ink",
  white: "bg-white text-ink",
} as const;

export function PageHero({
  eyebrow,
  title,
  body,
  crumbs,
  actions,
  aside,
  tone = "deep",
  className,
}: PageHeroProps) {
  const dark = tone === "deep";

  return (
    <header className={cn("py-14 md:py-20", TONES[tone], className)}>
      <div className="container-eh">
        {crumbs ? <Breadcrumb items={crumbs} tone={dark ? "dark" : "light"} className="mb-6" /> : null}
        <div className={cn("grid items-center gap-10", aside && "lg:grid-cols-[1.15fr_0.85fr]")}>
          <div className="flex flex-col gap-5">
            {eyebrow ? (
              <span
                className={cn(
                  "text-xs font-extrabold tracking-[0.14em] uppercase",
                  dark ? "text-eh-violet-soft" : "text-eh-purple",
                )}
              >
                {eyebrow}
              </span>
            ) : null}
            <h1 className="text-balance-eh text-4xl font-extrabold tracking-tight md:text-[3.4rem] md:leading-[1.05]">
              {title}
            </h1>
            {body ? (
              <p
                className={cn(
                  "max-w-2xl text-lg leading-relaxed",
                  dark ? "text-eh-violet-soft" : "text-ink-soft",
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
