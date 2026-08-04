import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";

export function PageHero({
  eyebrow,
  title,
  summary,
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string;
  title: string;
  summary: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-cba-yellow-soft via-card to-surface-warm">
      <div
        className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rotate-45 rounded-sm bg-cba-yellow/40 blur-0"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {eyebrow ? <Badge className="mb-4">{eyebrow}</Badge> : null}
        <h1 className="max-w-3xl animate-fade-up text-3xl font-extrabold tracking-tight text-cba-black sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl animate-fade-up text-base text-ink-soft sm:text-lg" style={{ animationDelay: "80ms" }}>
          {summary}
        </p>
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "140ms" }}>
            {primaryCta ? (
              <Link
                to={primaryCta.to}
                className="inline-flex rounded-md bg-cba-yellow px-5 py-3 text-sm font-bold text-cba-black hover:bg-cba-yellow-deep"
              >
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link
                to={secondaryCta.to}
                className="inline-flex rounded-md border border-line bg-card px-5 py-3 text-sm font-semibold text-ink hover:bg-surface"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
