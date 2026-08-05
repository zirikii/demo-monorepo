import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  id,
  title,
  intro,
  children,
  tone = "default",
  className,
}: {
  id?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  tone?: "default" | "tint" | "dark";
  className?: string;
}) {
  const tones = {
    default: "bg-surface text-ink",
    tint: "bg-surface-tint text-ink",
    dark: "bg-ink text-surface",
  } as const;

  return (
    <section id={id} className={cn("scroll-mt-24 py-12 sm:py-16", tones[tone], className)}>
      <div className="container-cba">
        {title ? (
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            {title}
            <span aria-hidden="true" className="mt-2 block h-1 w-16 bg-cba-yellow" />
          </h2>
        ) : null}
        {intro ? (
          <p className="mt-4 max-w-3xl text-[17px] leading-relaxed opacity-80">{intro}</p>
        ) : null}
        <div className={title || intro ? "mt-8" : undefined}>{children}</div>
      </div>
    </section>
  );
}
