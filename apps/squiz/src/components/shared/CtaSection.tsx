import { Button } from "@/components/ui/Button";

interface CtaSectionProps {
  title?: string;
  copy?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

/** Reusable end-of-page CTA band on interior pages. */
export function CtaSection({
  title = "Start your DXP journey",
  copy = "A 30-minute chat with an expert helps you scope your first next step.",
  primaryLabel = "Book a call",
  primaryTo = "/book-a-call",
  secondaryLabel = "Watch demo videos",
  secondaryTo = "/demos",
}: CtaSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:pb-24">
      <div className="rounded-3xl bg-navy px-8 py-12 text-white squiz-lines-dark sm:px-12 lg:py-16">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-white/70">{copy}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button to={primaryTo} variant="primary-dark" size="lg" withArrow>
              {primaryLabel}
            </Button>
            <Button to={secondaryTo} variant="secondary-dark" size="lg">
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
