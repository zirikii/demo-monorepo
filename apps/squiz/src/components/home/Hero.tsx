import { Button } from "@/components/ui/Button";
import { trustedByLogos } from "@/data/company";

/** Homepage hero: oversized Spline Sans headline + dual CTAs + logo strip. */
export function Hero() {
  return (
    <section className="squiz-lines relative overflow-hidden">
      {/* Decorative burst shapes echoing the logo mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-10 hidden size-72 rotate-12 rounded-[48px_0_48px_0] bg-mint/30 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-2 top-64 hidden size-28 -rotate-6 rounded-[24px_0_24px_0] bg-blue-pop/10 lg:block"
      />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:pb-24 lg:pt-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-[1.05] text-navy sm:text-6xl lg:text-7xl">
            Digital experiences that deliver{" "}
            <span className="relative inline-block">
              impact
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 -z-10 h-4 rounded-sm bg-mint sm:h-6"
              />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            Marketing teams ship fast, developers focus on innovation, and visitors find what they
            need — wherever they search.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button to="/book-a-call" size="lg" withArrow>
              Get started
            </Button>
            <Button to="/products/digital-experience-platform" variant="secondary" size="lg">
              Explore Squiz DXP
            </Button>
          </div>
        </div>

        {/* Trusted-by strip */}
        <div className="mt-16 border-t border-cream-deep pt-8">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-faint">
            Trusted by service-led organizations
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-4">
            {trustedByLogos.slice(0, 6).map((name) => (
              <span
                key={name}
                className="font-heading text-sm font-semibold tracking-wide text-ink-faint"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
