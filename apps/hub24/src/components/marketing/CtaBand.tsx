import { ButtonLink } from "@/components/ui/Button";

interface CtaBandProps {
  title?: string;
  body?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
}

export function CtaBand({
  title = "Let's talk about how our platform can help you",
  body = "Submit your details and one of our team will be in touch, or chat to your local business development manager.",
  primary = { label: "Contact us", to: "/contact-us#demo" },
  secondary = { label: "Find your BDM", to: "/contact-us#bdm" },
}: CtaBandProps) {
  return (
    <section className="bg-hub-blue text-white">
      <div className="container-hub flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="text-balance-hub text-3xl font-extrabold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="text-lg text-white/85">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to={primary.to} variant="inverse" size="lg">
            {primary.label}
          </ButtonLink>
          <ButtonLink
            to={secondary.to}
            variant="ghost"
            size="lg"
            className="border border-white/40 text-white hover:bg-white/10"
          >
            {secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
