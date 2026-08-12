import { ButtonLink } from "@/components/ui/Button";

export function CtaBand({
  title = "Jump into Employment OS.",
  blurb = "Employment does not have to be hard. Streamline every step of the employment lifecycle so you and your team can run ahead.",
  primaryLabel = "Hop to it",
  primaryTo = "/start-free",
  secondaryLabel = "Request a demo",
  secondaryTo = "/request-a-demo",
}: {
  title?: string;
  blurb?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}) {
  return (
    <section className="bg-eh-ink py-16 text-white md:py-20">
      <div className="container-eh flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight font-bold md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-white/75">{blurb}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to={primaryTo} variant="lime" size="lg">
            {primaryLabel}
          </ButtonLink>
          <ButtonLink
            to={secondaryTo}
            variant="ghost"
            size="lg"
            className="border border-white/35 text-white hover:bg-white/10"
          >
            {secondaryLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
