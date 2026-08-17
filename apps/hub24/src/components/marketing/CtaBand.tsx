import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface CtaBandProps {
  eyebrow?: string;
  title: string;
  body: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
}

export function CtaBand({
  eyebrow = "Get in touch",
  title,
  body,
  primary = { label: "Contact us", to: "/contact-us/" },
  secondary = { label: "Find your BDM", to: "/contact-us/find-a-bdm/" },
}: CtaBandProps) {
  return (
    <Section tone="navy">
      <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <SectionHeading eyebrow={eyebrow} title={title} body={body} tone="dark" />
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <ButtonLink to={primary.to} size="lg">
            {primary.label}
          </ButtonLink>
          <ButtonLink to={secondary.to} variant="outline" size="lg">
            {secondary.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
