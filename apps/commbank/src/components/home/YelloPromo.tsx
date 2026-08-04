import { ButtonLink } from "@/components/ui/Button";
import { yelloStats } from "@/data/yello";

export function YelloPromo() {
  return (
    <section className="bg-black py-16 text-white">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-cba-yellow">
            CommBank Yello
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Value that grows with your banking
          </h2>
          <p className="mt-4 max-w-lg text-lg text-white/75">
            Our customer recognition program gives eligible customers tailored cashback, discounts
            on essentials, and access to experiences — all through the CommBank app.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/commbank-yello" size="lg">
              How Yello works
            </ButtonLink>
            <ButtonLink
              to="/commbank-yello#tiers"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-black"
              variant="ghost"
            >
              See the tiers
            </ButtonLink>
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {yelloStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/15 p-6">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-bold text-cba-yellow">{stat.value}</span>
                <span className="mt-1 block text-sm text-white/70">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
