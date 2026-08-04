import { useState } from "react";
import { heroSlides } from "@/data/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "../ui/Button";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const slide = heroSlides[index] ?? heroSlides[0];
  if (!slide) return null;

  return (
    <section aria-label="Featured offers" className="bg-cba-yellow">
      <div className="container-cba grid gap-8 py-12 sm:py-16 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div key={slide.id} className="animate-fade-up">
          <p className="text-[13px] font-bold uppercase tracking-wider text-ink/70">
            {slide.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-ink sm:text-[44px]">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink/85">{slide.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink to={slide.primary.to} variant="dark" size="lg">
              {slide.primary.label}
            </ButtonLink>
            {slide.secondary ? (
              <ButtonLink to={slide.secondary.to} variant="secondary" size="lg">
                {slide.secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>

        {slide.stat ? (
          <div className="rounded-cba-lg bg-ink p-8 text-surface shadow-cba-lift">
            <p className="text-5xl font-extrabold text-cba-yellow">{slide.stat.value}</p>
            <p className="mt-2 text-[15px] text-surface/80">{slide.stat.label}</p>
            <p className="mt-6 border-t border-surface/20 pt-4 text-[13px] leading-relaxed text-surface/60">
              Rates and offers shown are illustrative demo values. Terms, conditions, fees, charges
              and lending criteria apply.
            </p>
          </div>
        ) : null}
      </div>

      <div className="container-cba pb-8">
        <div role="tablist" aria-label="Featured offers" className="flex gap-2">
          {heroSlides.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={item.title}
              onClick={() => setIndex(itemIndex)}
              className={cn(
                "focus-cba h-1.5 w-12 rounded-full transition-colors",
                itemIndex === index ? "bg-ink" : "bg-ink/25 hover:bg-ink/50",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
