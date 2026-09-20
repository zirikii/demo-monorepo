import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { verticals } from "@/data/categories";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gojek-dark text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gojek/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-gojek/20 blur-3xl"
      />
      <Container className="relative py-20 sm:py-28">
        <div className="max-w-3xl">
          <img src="/brand/logo-white.svg" alt="Gojek" className="mb-8 h-8 w-auto" />
          <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            3 countries.
            <br />
            20+ products.
            <br />
            <span className="text-gojek-tint">1 leading on-demand platform.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            Gojek is Southeast Asia&apos;s super-app — ride-hailing, food delivery, payments
            and dozens more services that move millions of people and businesses every day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/products" variant="white" size="lg">
              Explore products
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink
              to="/drivers"
              size="lg"
              className="border border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              Partner with us
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/70">
            {verticals.map((v) => (
              <li key={v.id} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: v.color }}
                />
                {v.label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
