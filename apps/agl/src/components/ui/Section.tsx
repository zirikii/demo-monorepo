import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  tone?: "white" | "tint" | "sky";
  className?: string;
  children: ReactNode;
};

const tones = { white: "bg-white", tint: "bg-surface-tint", sky: "bg-agl-sky" };

export function Section({ id, eyebrow, title, intro, tone = "white", className, children }: Props) {
  return (
    <section id={id} className={cn("py-14 lg:py-20", tones[tone], className)}>
      <div className="container-agl">
        {(title || eyebrow) && (
          <header className="mb-10 max-w-3xl">
            {eyebrow && <p className="mb-2 text-sm font-bold uppercase tracking-wider text-agl-teal-ink">{eyebrow}</p>}
            {title && <h2 className="text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">{title}</h2>}
            {intro && <p className="mt-3 text-lg text-ink-soft">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
