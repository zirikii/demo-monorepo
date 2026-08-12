import { Fragment, useState } from "react";
import { Check, Minus } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Tabs } from "@/components/ui/Tabs";
import { addOns, featureMatrix, planFamilies, pricingFaqs } from "@/data/pricing";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const hrPlanNames = ["HR Essentials", "HR Engage", "HR Elite", "Employment Unlimited"];

export function PricingPage() {
  useDocumentTitle("Pricing");
  const [family, setFamily] = useState(planFamilies[0]?.id ?? "hr");

  const active = planFamilies.find((item) => item.id === family) ?? planFamilies[0];
  if (!active) return null;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Pricing"
        title="Choose the right plan for your team."
        blurb={`Rated ${site.rating} out of 5 from ${site.ratingCount} reviews. Every plan is billed per employee, per month.`}
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Pricing" }]}
      >
        <Tabs
          items={planFamilies.map((item) => ({ id: item.id, label: item.label }))}
          active={family}
          onChange={(id) => setFamily(id as typeof family)}
          ariaLabel="Choose a product family"
        />
      </PageHero>

      <Section className="pt-10">
        <p className="max-w-3xl text-sm leading-relaxed text-eh-ink-soft">{active.intro}</p>

        <div
          className={cn(
            "mt-10 grid gap-6",
            active.plans.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
          )}
        >
          {active.plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "flex flex-col rounded-eh-lg border bg-white p-7 transition",
                plan.highlighted ? "border-eh-purple shadow-eh-purple" : "border-eh-line shadow-eh",
              )}
            >
              {plan.highlighted ? (
                <span className="mb-4 inline-flex w-fit rounded-full bg-eh-purple px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
                  Most popular
                </span>
              ) : null}
              <h3 className="font-display text-xl font-bold text-eh-ink">{plan.name}</h3>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-bold text-eh-purple">{plan.price}</span>
                <span className="text-xs text-eh-ink-faint">{plan.priceNote}</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-eh-ink-soft">{plan.blurb}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-eh-ink-soft">
                    <Check size={15} className="mt-0.5 shrink-0 text-eh-purple" strokeWidth={3} />
                    {feature}
                  </li>
                ))}
              </ul>
              <ButtonLink
                to={plan.cta === "Start free" ? "/start-free" : "/request-a-demo"}
                variant={plan.highlighted ? "primary" : "secondary"}
                className="mt-7 w-full"
              >
                {plan.cta}
              </ButtonLink>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="Add-ons"
          title="Bolt on what you need, skip what you do not"
          blurb="Each add-on is priced per employee, per month, with its own monthly minimum."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {addOns.map((addOn) => (
            <div
              key={addOn.name}
              className="flex items-start justify-between gap-6 rounded-eh-lg border border-eh-line bg-white p-6"
            >
              <div>
                <h3 className="font-semibold text-eh-ink">{addOn.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-eh-ink-soft">
                  {addOn.description}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-2xl font-bold text-eh-purple">{addOn.price}</p>
                <p className="text-[11px] text-eh-ink-faint">min {addOn.minimum}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Compare" title="Compare all features" />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-3xl border-collapse text-sm">
            <thead>
              <tr className="border-b border-eh-line">
                <th scope="col" className="py-4 pr-4 text-left font-semibold text-eh-ink">
                  Feature
                </th>
                {hrPlanNames.map((name) => (
                  <th
                    key={name}
                    scope="col"
                    className="px-3 py-4 text-center font-semibold text-eh-ink"
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureMatrix.map((group) => (
                <Fragment key={group.group}>
                  <tr className="bg-eh-surface-tint">
                    <th
                      scope="colgroup"
                      colSpan={5}
                      className="px-3 py-2.5 text-left text-xs font-bold tracking-[0.14em] text-eh-ink-faint uppercase"
                    >
                      {group.group}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.feature} className="border-b border-eh-line-soft">
                      <th
                        scope="row"
                        className="py-3.5 pr-4 text-left font-normal text-eh-ink-soft"
                      >
                        {row.feature}
                      </th>
                      {row.plans.map((included, index) => (
                        <td key={`${row.feature}-${index}`} className="px-3 py-3.5 text-center">
                          {included ? (
                            <Check
                              size={16}
                              strokeWidth={3}
                              className="mx-auto text-eh-purple"
                              aria-label="Included"
                            />
                          ) : (
                            <Minus
                              size={16}
                              className="mx-auto text-eh-ink-ghost"
                              aria-label="Not included"
                            />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="wash">
        <SectionHeading title="Pricing questions" align="center" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion items={pricingFaqs} />
        </div>
      </Section>

      <CtaBand />
    </SiteLayout>
  );
}
