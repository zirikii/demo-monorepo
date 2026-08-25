import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";

interface CtaBandProps {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryTo?: string;
}

export function CtaBand({
  title = "Power up your teams today",
  body = "Join millions unleashing the power of teamwork.",
  primaryLabel = "Get started",
  primaryTo = "/try",
}: CtaBandProps) {
  return (
    <Section tone="blue">
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-balance-atl max-w-4xl text-4xl font-semibold tracking-tight md:text-[4rem] md:leading-[1.06]">
          {title}
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-white/85">{body}</p>
        <ButtonLink to={primaryTo} variant="inverse" size="lg">
          {primaryLabel}
        </ButtonLink>
      </div>
    </Section>
  );
}
