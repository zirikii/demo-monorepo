import { Button } from "@/components/ui/Button";

interface CtaBandProps {
  title: string;
  copy: string;
  primaryTo: string;
  primaryLabel: string;
  secondaryTo?: string;
  secondaryLabel?: string;
}

export function CtaBand({
  title,
  copy,
  primaryTo,
  primaryLabel,
  secondaryTo,
  secondaryLabel,
}: CtaBandProps) {
  return (
    <section className="bg-sand py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="changi-aurora relative overflow-hidden rounded-shape bg-plum px-8 py-12 text-white lg:px-14 lg:py-16">
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">{copy}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to={primaryTo} variant="primary-dark" withArrow>
                {primaryLabel}
              </Button>
              {secondaryTo && secondaryLabel && (
                <Button to={secondaryTo} variant="secondary-dark">
                  {secondaryLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
