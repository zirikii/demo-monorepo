import { ButtonLink } from "@/components/ui/Button";
import { CommBankLogo } from "@/components/brand/CommBankLogo";

export function HomeHero() {
  return (
    <section className="bg-cba-yellow">
      <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div className="animate-fade-up">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-black/60">
            Limited time offer
          </p>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-6xl">
            Earn up to 300,000 Qantas Points
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-black/80">
            Enjoy a low variable rate, unlimited additional repayments and the option to link one
            offset account with a CommBank Digi Home Loan. Apply online by 30 September 2026.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/home-loans" variant="secondary" size="lg">
              Get started
            </ButtonLink>
            <ButtonLink to="/home-loans/calculator" variant="outline" size="lg">
              Calculate repayments
            </ButtonLink>
          </div>
          <p className="mt-5 text-xs text-black/60">
            Eligibility criteria, terms and conditions apply. Demo content only.
          </p>
        </div>

        <div className="animate-fade-up rounded-3xl bg-black p-8 text-white shadow-float">
          <CommBankLogo tone="light" />
          <p className="mt-6 text-sm uppercase tracking-[0.14em] text-cba-yellow">Digi Home Loan</p>
          <p className="mt-2 text-5xl font-bold tracking-tight">5.59%</p>
          <p className="text-sm text-white/70">p.a. variable rate for owner occupiers</p>
          <dl className="mt-8 space-y-4 border-t border-white/15 pt-6 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-white/70">Comparison rate</dt>
              <dd className="font-bold">5.60% p.a.</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-white/70">Offset accounts</dt>
              <dd className="font-bold">1 Everyday Offset</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-white/70">Conditional approval</dt>
              <dd className="font-bold">In as little as 10 min</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
