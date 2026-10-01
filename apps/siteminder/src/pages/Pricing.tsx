import { Check, Minus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CtaBand, SectionHeading } from "@/components/marketing";
import { FAQS, PLAN_FEATURES } from "@/data/site";
import { PLANS } from "@/features/property/views";
import type { PlanId } from "@/features/property/types";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";

const PLAN_IDS: PlanId[] = ["siteminder", "plus", "groups"];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <span className="text-sm font-semibold text-heading">{value}</span>;
  return value ? <Check className="mx-auto size-5 text-royal" aria-label="Included" /> : <Minus className="mx-auto size-5 text-line" aria-label="Not included" />;
}

export function PricingPage() {
  useDocumentTitle("Pricing");
  const [annual, setAnnual] = useState(true);
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section className="bg-canvas">
        <div className="container-sm py-16 text-center md:py-20">
          <p className="eyebrow">Pricing</p>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">Simple pricing. No commission. Ever.</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">Choose the plan that fits your property. Every plan starts with a 14-day free trial.</p>
          <div className="mt-8 inline-flex rounded-full border border-line bg-white p-1" role="group" aria-label="Billing period">
            {[
              [true, "Annual (save 10%)"],
              [false, "Monthly"],
            ].map(([value, label]) => (
              <button
                key={String(value)}
                type="button"
                aria-pressed={annual === value}
                onClick={() => setAnnual(value as boolean)}
                className={cn("rounded-full px-4 py-2 text-sm font-semibold", annual === value ? "bg-stratos text-white" : "text-ink-soft")}
              >
                {label as string}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="container-sm -mt-2 grid gap-5 pb-16 md:grid-cols-3">
        {PLAN_IDS.map((id) => {
          const plan = PLANS[id];
          const featured = id === "plus";
          const price = plan.price && Math.round(plan.price * (annual ? 0.9 : 1));
          return (
            <article key={id} className={cn("card relative flex flex-col p-7", featured && "border-2 border-royal shadow-lift")}>
              {featured && <span className="pill absolute -top-3 left-7 bg-lime text-stratos">Most popular</span>}
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="mt-2 min-h-12 text-sm text-ink-soft">{plan.blurb}</p>
              <p className="mt-6">
                {price ? (
                  <>
                    <span className="text-sm text-ink-faint">From </span>
                    <span className="text-5xl font-bold text-heading">${price}</span>
                    <span className="text-sm text-ink-faint"> AUD / month</span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-heading">Let&apos;s talk</span>
                )}
              </p>
              <Link to={price ? "/get-started" : "/demo"} className={cn("mt-6", featured ? "btn-primary" : "btn-outline")}>
                {price ? "Start free trial" : "Contact sales"}
              </Link>
              <ul className="mt-6 space-y-2.5 border-t border-line-soft pt-6 text-sm">
                {PLAN_FEATURES.filter((f) => f[id]).slice(0, 6).map((f) => (
                  <li key={f.feature} className="flex gap-2 text-ink-soft">
                    <Check className="mt-0.5 size-4 shrink-0 text-royal" aria-hidden /> {f.feature}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>
      <section className="container-sm pb-16">
        <SectionHeading title="Compare plans" />
        <div className="mt-8 overflow-x-auto rounded-card border border-line-soft">
          <table className="w-full min-w-[640px] text-left">
            <thead className="bg-canvas text-sm">
              <tr>
                <th className="p-4 font-semibold">Feature</th>
                {PLAN_IDS.map((id) => (
                  <th key={id} className="p-4 text-center font-semibold">
                    {PLANS[id].name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLAN_FEATURES.map((f) => (
                <tr key={f.feature} className="border-t border-line-soft">
                  <td className="p-4 text-sm text-ink-soft">{f.feature}</td>
                  {PLAN_IDS.map((id) => (
                    <td key={id} className="p-4 text-center">
                      <Cell value={f[id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="bg-canvas py-16">
        <div className="container-sm grid gap-10 md:grid-cols-[1fr_1.6fr]">
          <SectionHeading title="Frequently asked questions" />
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="card">
                <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between p-5 text-left font-semibold text-heading">
                  {f.q}
                  <span className="text-xl text-royal">{open === i ? "−" : "+"}</span>
                </button>
                {open === i && <p className="px-5 pb-5 text-ink-soft">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
