import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { tintPanel, type Tint } from "@/lib/tints";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export interface SpotlightProps {
  eyebrow: string;
  eyebrowTint: Tint;
  title: string;
  copy: string;
  primaryCta: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  story?: { text: string; to: string };
  illustration: { icon: string; caption: string; bullets: string[] };
  reversed?: boolean;
}

/** Alternating product feature band used three times on the homepage. */
export function ProductSpotlight({
  eyebrow,
  eyebrowTint,
  title,
  copy,
  primaryCta,
  secondaryCta,
  story,
  illustration,
  reversed = false,
}: SpotlightProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <div
        className={cn(
          "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
          reversed && "lg:[&>*:first-child]:order-2",
        )}
      >
        <div>
          <Badge tint={eyebrowTint} className="mb-4">
            {eyebrow}
          </Badge>
          <h2 className="text-3xl font-semibold leading-tight text-navy sm:text-4xl">{title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{copy}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to={primaryCta.to} withArrow>
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button to={secondaryCta.to} variant="secondary">
                {secondaryCta.label}
              </Button>
            )}
          </div>
          {story && (
            <Link
              to={story.to}
              className="group mt-8 flex items-start gap-3 rounded-2xl border border-cream-deep bg-card p-5 shadow-card transition-shadow hover:shadow-float"
            >
              <span className="mt-1 size-2 shrink-0 rounded-full bg-mint" aria-hidden />
              <span>
                <span className="text-sm leading-relaxed text-ink-soft">{story.text}</span>
                <span className="mt-1 flex items-center gap-1 text-sm font-semibold text-navy group-hover:underline">
                  Read the story <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </span>
            </Link>
          )}
        </div>

        {/* Stylised product illustration */}
        <div className={cn("shape-card-lg p-8 sm:p-10", tintPanel[eyebrowTint])}>
          <div className="rounded-2xl bg-card p-6 shadow-float">
            <div className="flex items-center gap-3 border-b border-cream-deep pb-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-navy text-mint">
                <Icon name={illustration.icon} className="size-5" />
              </span>
              <p className="font-heading font-semibold text-navy">{illustration.caption}</p>
            </div>
            <ul className="mt-4 space-y-3">
              {illustration.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-ink-soft">
                  <span className="size-1.5 shrink-0 rounded-full bg-mint" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-2">
              <span className="h-2 w-24 rounded-full bg-cream-deep" aria-hidden />
              <span className="h-2 w-12 rounded-full bg-mint" aria-hidden />
              <span className="h-2 w-16 rounded-full bg-cream-deep" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
