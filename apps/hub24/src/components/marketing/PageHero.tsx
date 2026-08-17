import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  body: string;
  actions?: ReactNode;
}

export function PageHero({ eyebrow, title, body, actions }: PageHeroProps) {
  return (
    <Section tone="navy" className="py-16 md:py-20">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="mb-3 text-xs font-bold tracking-[0.16em] text-hub-teal-soft uppercase">{eyebrow}</p>
        ) : null}
        <h1 className="font-serif text-4xl leading-tight font-bold text-balance-hub md:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-white/75">{body}</p>
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </Section>
  );
}
