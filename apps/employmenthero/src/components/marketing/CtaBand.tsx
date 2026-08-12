import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";

interface CtaBandProps {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export function CtaBand({
  title = "Jump into Employment OS",
  body = "Employment doesn't have to be hard. Streamline every step of the employment lifecycle so you and your team can run ahead.",
  primaryLabel = "Request a demo",
  primaryTo = "/request-a-demo",
  secondaryLabel = "See pricing",
  secondaryTo = "/pricing",
}: CtaBandProps) {
  return (
    <Section tone="purple">
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-balance-eh max-w-3xl text-3xl font-extrabold tracking-tight md:text-[2.8rem] md:leading-[1.08]">
          {title}
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-white/85">{body}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <ButtonLink to={primaryTo} variant="inverse" size="lg">
            {primaryLabel}
          </ButtonLink>
          <ButtonLink
            to={secondaryTo}
            variant="secondary"
            size="lg"
            className="border-white/40 bg-transparent text-white hover:border-white hover:text-white"
          >
            {secondaryLabel}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
