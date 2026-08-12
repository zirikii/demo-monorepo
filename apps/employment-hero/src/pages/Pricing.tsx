import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const plans = [
  {
    name: "HR Essentials",
    price: 10,
    intro: "Core HR foundations for small, growing teams.",
    tone: "green",
    features: [
      "Employee records",
      "Paperless onboarding",
      "Leave management",
      "Policies and e-signatures",
    ],
  },
  {
    name: "HR Engage",
    price: 14,
    intro: "HR plus engagement, performance and hiring.",
    tone: "violet",
    featured: true,
    features: [
      "Everything in Essentials",
      "Performance reviews",
      "Applicant tracking",
      "Recognition and surveys",
    ],
  },
  {
    name: "HR Elite",
    price: 19,
    intro: "Advanced workflows, reporting and support.",
    tone: "coral",
    features: [
      "Everything in Engage",
      "Custom workflows",
      "Advanced reporting",
      "Priority support",
    ],
  },
  {
    name: "Employment Unlimited",
    price: 29,
    intro: "The complete Employment Operating System.",
    tone: "blue",
    features: ["Everything in Elite", "Intelligent payroll", "Recruitment Agent", "HR advisory"],
  },
];

export function PricingPage() {
  useDocumentTitle("Pricing");
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <PageLayout>
      <section className="bg-violet-soft py-20 sm:py-28">
        <div className="container-hero text-center">
          <Badge tone="violet" className="bg-white/70">
            Simple, flexible plans
          </Badge>
          <h1 className="mx-auto mt-7 max-w-4xl text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">
            Choose how you run employment.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-xl leading-8 text-ink-soft">
            Start with better HR or bring every part of Employment OS together.
          </p>
          <div className="mx-auto mt-9 inline-flex rounded-full border border-ink/15 bg-white p-1">
            <button
              type="button"
              aria-pressed={annual}
              onClick={() => setAnnual(true)}
              className={`focus-hero rounded-full px-5 py-2 text-sm font-bold ${annual ? "bg-ink text-white" : ""}`}
            >
              Annual billing
            </button>
            <button
              type="button"
              aria-pressed={!annual}
              onClick={() => setAnnual(false)}
              className={`focus-hero rounded-full px-5 py-2 text-sm font-bold ${!annual ? "bg-ink text-white" : ""}`}
            >
              Monthly billing
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-hero grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col p-6 ${plan.featured ? "border-ink ring-2 ring-ink" : ""}`}
            >
              {plan.featured ? (
                <Badge tone="violet" className="absolute -top-3 left-6">
                  Most popular
                </Badge>
              ) : null}
              <div
                className={`-mx-6 -mt-6 mb-6 h-3 rounded-t-[calc(var(--radius-hero-lg)-1px)] tone-${plan.tone}`}
              />
              <h2 className="text-2xl font-semibold tracking-[-0.035em]">{plan.name}</h2>
              <p className="mt-3 min-h-16 text-sm leading-6 text-ink-soft">{plan.intro}</p>
              <p className="mt-6 text-4xl font-semibold tracking-[-0.05em]">
                ${annual ? plan.price : Math.round(plan.price * 1.18)}
                <span className="text-sm font-normal tracking-normal text-ink-soft">
                  {" "}
                  / user / month
                </span>
              </p>
              <p className="mt-2 text-xs text-ink-faint">
                {annual ? "Billed annually" : "Billed monthly"} · Minimums apply
              </p>
              <ButtonLink
                to="/book-a-demo"
                variant={plan.featured ? "primary" : "secondary"}
                className="mt-7 w-full"
              >
                Talk to sales
              </ButtonLink>
              <ul className="mt-7 space-y-3 border-t border-line pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-ink-soft">
                    <Check aria-hidden="true" className="h-5 w-5 shrink-0 text-positive" />{" "}
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-neutral-soft py-20 sm:py-28">
        <div className="container-hero grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Compare plans</p>
            <h2 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">
              The detail, made simple.
            </h2>
            <p className="mt-5 leading-7 text-ink-soft">
              All prices and inclusions are illustrative for this demo. Contact Employment Hero for
              current commercial terms.
            </p>
          </div>
          <div className="overflow-x-auto rounded-hero-lg border border-line bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="p-5">Capability</th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="p-5">
                      {plan.name.replace("HR ", "")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Core HR", true, true, true, true],
                  ["Hiring", false, true, true, true],
                  ["Performance", false, true, true, true],
                  ["Custom workflows", false, false, true, true],
                  ["Intelligent payroll", false, false, false, true],
                ].map(([feature, ...included]) => (
                  <tr key={String(feature)} className="border-b border-line last:border-0">
                    <td className="p-5 font-semibold">{feature}</td>
                    {included.map((value, index) => (
                      <td key={index} className="p-5">
                        {value ? (
                          <Check aria-label="Included" className="h-5 w-5 text-positive" />
                        ) : (
                          <Minus aria-label="Not included" className="h-5 w-5 text-ink-faint" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-hero mx-auto max-w-4xl">
          <h2 className="text-center text-5xl font-semibold tracking-[-0.05em]">
            Frequently asked questions
          </h2>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {[
              [
                "Can I change plans later?",
                "Yes. Your team can discuss a plan that matches your current stage and future needs.",
              ],
              [
                "Does payroll cost extra?",
                "Payroll inclusions vary by plan and region. These demo prices are illustrative only.",
              ],
              [
                "Is there a minimum?",
                "Current Australian plans generally include minimum user or monthly commitments.",
              ],
              [
                "Can I see the platform first?",
                "Yes. Book a personalised walkthrough using the demo form.",
              ],
            ].map(([question, answer], index) => (
              <div key={question}>
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="focus-hero flex w-full items-center justify-between py-6 text-left text-lg font-bold"
                >
                  {question}
                  <span aria-hidden="true">{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index ? (
                  <p className="pb-6 leading-7 text-ink-soft">{answer}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
