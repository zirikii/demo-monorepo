import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { lifeBenefits } from "@/data/benefits";

export function CareersTeaser() {
  return (
    <section className="bg-ink py-16 text-white sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-gojek-tint">
            Life at Gojek
          </p>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Unlock your talent and help strengthen the digital economy
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/75">
            We look after our people the way we look after our partners — with benefits that
            support you and your family.
          </p>
          <ButtonLink to="/careers" variant="white" size="lg" className="mt-8">
            View open roles
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lifeBenefits.map((benefit) => (
            <div key={benefit.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{benefit.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
