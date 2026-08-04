import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/Card";
import { SelectField, TextField } from "@/components/ui/Field";
import { HelpSection } from "@/components/marketing/HelpSection";
import { FeedbackBar } from "@/components/marketing/FeedbackBar";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { personalLoans } from "@/data/lending";
import { calculateRepayment } from "@/lib/calculators";
import { formatCurrency, formatCurrencyWhole, formatRate } from "@/lib/format";

export function PersonalLoansPage() {
  useDocumentTitle("Personal loans & car loans");
  const [amount, setAmount] = useState("25000");
  const [term, setTerm] = useState("5");
  const [productId, setProductId] = useState(personalLoans[0]!.id);

  const product = personalLoans.find((loan) => loan.id === productId) ?? personalLoans[0]!;

  const result = useMemo(
    () =>
      calculateRepayment({
        principal: Number(amount) || 0,
        annualRate: product.rateFrom,
        years: Number(term) || 0,
        frequency: "monthly",
      }),
    [amount, term, product],
  );

  return (
    <PageLayout>
      <Breadcrumb
        items={[{ label: "Banking", to: "/banking" }, { label: "Personal loans & car loans" }]}
      />
      <PageHero
        eyebrow="Personal loans"
        title="Personal loans and car loans"
        description="Borrow from $4,000 with fixed or variable rates, and get your funds the same day once approved."
      />

      <section className="py-16">
        <div className="container-page">
          <SectionHeading title="Compare personal loans" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {personalLoans.map((loan) => (
              <ProductCard
                key={loan.id}
                id={loan.id}
                name={loan.name}
                tagline={loan.tagline}
                headline={formatRate(loan.rateFrom)}
                headlineLabel={`Comparison rate ${formatRate(loan.comparisonRate)} · ${loan.amountRange}`}
                features={loan.features}
                badge={loan.badge}
                ctaLabel="Apply now"
                ctaTo="/register"
                footnote={`Loan term ${loan.termRange}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface-tint py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Repayments calculator"
            title="Estimate your personal loan repayments"
            className="mb-10"
          />
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <form
              className="grid gap-5 sm:grid-cols-2"
              onSubmit={(event) => event.preventDefault()}
            >
              <SelectField
                label="Loan type"
                value={productId}
                onChange={(event) => setProductId(event.target.value)}
                className="sm:col-span-2"
              >
                {personalLoans.map((loan) => (
                  <option key={loan.id} value={loan.id}>
                    {loan.name} — from {formatRate(loan.rateFrom)}
                  </option>
                ))}
              </SelectField>
              <TextField
                label="Loan amount"
                prefix="$"
                inputMode="numeric"
                value={amount}
                onChange={(event) => setAmount(event.target.value.replace(/[^0-9.]/g, ""))}
              />
              <SelectField
                label="Loan term"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((years) => (
                  <option key={years} value={years}>
                    {years} {years === 1 ? "year" : "years"}
                  </option>
                ))}
              </SelectField>
            </form>

            <aside
              aria-live="polite"
              className="h-fit rounded-2xl border-2 border-black bg-surface p-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
                Estimated monthly repayment
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight text-black">
                {formatCurrency(result.repayment)}
              </p>
              <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Interest rate</dt>
                  <dd className="font-semibold text-black">{formatRate(product.rateFrom)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Total interest</dt>
                  <dd className="font-semibold text-black tabular-nums">
                    {formatCurrencyWhole(result.totalInterest)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-soft">Total repaid</dt>
                  <dd className="font-semibold text-black tabular-nums">
                    {formatCurrencyWhole(result.totalRepaid)}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-xs leading-relaxed text-ink-muted">
                Excludes the $150 establishment fee and $10 monthly loan service fee. Estimates
                only.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <FeedbackBar />
      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Rates shown are the lowest available and depend on your credit profile and whether the
          loan is secured. All figures are demo content.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
