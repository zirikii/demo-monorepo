import { useState } from "react";
import { cn } from "@/lib/cn";
import { tintBg } from "@/lib/tints";
import { personas } from "@/data/personas";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Tabbed persona section ("Empowering teams across your organization"). */
export function PersonaTabs() {
  const [active, setActive] = useState(personas[0].id);
  const current = personas.find((p) => p.id === active) ?? personas[0];

  return (
    <section className="bg-cream-alt py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="For every team" title="Empowering teams across your organization" />

        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Teams">
          {personas.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={active === p.id}
              id={`persona-tab-${p.id}`}
              aria-controls={`persona-panel-${p.id}`}
              onClick={() => setActive(p.id)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                active === p.id
                  ? "bg-navy text-mint"
                  : "bg-card text-navy hover:bg-cream-deep/60",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`persona-panel-${current.id}`}
          aria-labelledby={`persona-tab-${current.id}`}
          className="mt-8 grid items-center gap-8 rounded-3xl bg-card p-8 shadow-card sm:p-10 lg:grid-cols-[1fr_auto]"
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl font-semibold text-navy">{current.title}</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{current.copy}</p>
            <Button to={current.cta.to} className="mt-7" withArrow>
              {current.cta.label}
            </Button>
          </div>
          <div
            className={cn(
              "hidden size-40 shrink-0 items-center justify-center shape-card lg:flex",
              tintBg[current.tint],
            )}
          >
            <Icon name={current.icon} className="size-14 text-navy" />
          </div>
        </div>
      </div>
    </section>
  );
}
