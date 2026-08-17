import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";

interface CtaBandProps {
  title?: string;
  body?: string;
}

export function CtaBand({
  title = "Let’s talk about how our market-leading platform can help you.",
  body = "Submit your details and a local BDM will be in touch. Demo only — nothing is sent to HUB24.",
}: CtaBandProps) {
  return (
    <Section tone="teal">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-bold">{title}</h2>
          <p className="mt-3 text-white/85">{body}</p>
        </div>
        <ButtonLink to="/contact" variant="inverse" size="lg">
          Contact us
        </ButtonLink>
      </div>
    </Section>
  );
}
