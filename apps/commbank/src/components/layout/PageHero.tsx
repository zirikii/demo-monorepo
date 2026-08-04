import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  tone = "yellow",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  tone?: "yellow" | "dark" | "light";
}) {
  const tones = {
    yellow: "bg-cba-yellow text-ink",
    dark: "bg-ink text-surface",
    light: "bg-surface-tint text-ink",
  } as const;

  return (
    <section className={cn("py-12 sm:py-16", tones[tone])}>
      <div className="container-cba max-w-3xl">
        {eyebrow ? (
          <p className="text-[13px] font-bold uppercase tracking-wider opacity-70">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-[42px]">{title}</h1>
        {intro ? <p className="mt-4 text-lg leading-relaxed opacity-90">{intro}</p> : null}
        {children ? <div className="mt-6 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </section>
  );
}
