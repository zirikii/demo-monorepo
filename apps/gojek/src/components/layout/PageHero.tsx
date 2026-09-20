import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function PageHero({
  eyebrow,
  title,
  body,
  actions,
  aside,
  className,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("bg-night text-white", className)}>
      <div
        className={cn(
          "container-go-wide grid gap-10 py-16 sm:py-20 lg:py-24",
          aside && "lg:grid-cols-[1.35fr_1fr] lg:items-center",
        )}
      >
        <div className="animate-go-rise flex max-w-3xl flex-col gap-5">
          {eyebrow ? (
            <span className="text-xs font-extrabold tracking-[0.2em] text-go-green-soft uppercase">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="display-go text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
          {body ? <p className="text-lg leading-relaxed text-white/70">{body}</p> : null}
          {actions ? <div className="mt-2 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {aside ? <div className="animate-go-fade">{aside}</div> : null}
      </div>
    </section>
  );
}
