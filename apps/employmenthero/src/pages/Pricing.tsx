import { Fragment } from "react";
import { Check, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CheckList } from "@/components/marketing/CheckList";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEATURE_MATRIX, PRICING_ADD_ONS, PRICING_FAQS, PRICING_PLANS } from "@/data/pricing";
import { cn } from "@/lib/cn";

function MatrixCell({ included }: { included: boolean }) {
  return included ? (
    <Check aria-label="Included" className="mx-auto h-4 w-4 text-eh-purple" strokeWidth={3} />
  ) : (
    <Minus aria-label="Not included" className="mx-auto h-4 w-4 text-ink-ghost" />
  );
}

export default function PricingPage() {
  return (
    <PageLayout title="Pricing">
      <PageHero
        eyebrow="Pricing"
        title="Pricing to suit your business"
        body="All-in-one solutions for organisations with 10 or 2,000 employees. Rated 4.7 out of 5 across 9,105 reviews."
        crumbs={[{ label: "Home", to: "/" }, { label: "Pricing" }]}
      />

      <Section tone="white">
        <div className="grid gap-6 lg:grid-cols-4">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "flex flex-col gap-5",
                plan.highlight && "border-eh-purple shadow-eh-lift ring-1 ring-eh-purple",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">{plan.name}</h2>
                {plan.highlight ? <Badge>Most popular</Badge> : null}
              </div>
              <div>
                <p className="text-4xl font-extrabold tracking-tight text-ink-strong">{plan.price}</p>
                <p className="text-sm text-ink-faint">{plan.priceNote}</p>
              </div>
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">{plan.positioning}</p>
              <ButtonLink
                to={plan.ctaTo}
                variant={plan.highlight ? "primary" : "secondary"}
                className="w-full"
              >
                {plan.ctaLabel}
              </ButtonLink>
              <div className="border-t border-line-soft pt-5">
                <p className="mb-3 text-sm font-bold text-ink-strong">{plan.inclusionsHeading}</p>
                <CheckList items={plan.inclusions} />
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-faint">
          * Conditions apply. Plans start at a minimum of 10 users and are billed on the higher of your
          contracted or active user count. Prices are in AUD and exclude GST.
        </p>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="Add-ons"
          title="Add only what you need"
          body="Every add-on is priced per employee per month with its own monthly minimum."
          className="mb-10"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PRICING_ADD_ONS.map((addOn) => (
            <Card key={addOn.name} className="flex flex-col gap-2">
              <h3 className="text-base font-extrabold text-ink-strong">{addOn.name}</h3>
              <p className="text-2xl font-extrabold text-eh-purple">
                {addOn.price}
                <span className="text-sm font-semibold text-ink-faint"> /employee/mo</span>
              </p>
              <p className="text-xs text-ink-faint">{addOn.minimum}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{addOn.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Compare plans"
          title="What's in each plan"
          className="mb-10"
        />
        <div className="overflow-x-auto rounded-eh-lg border border-line">
          <table className="w-full min-w-3xl border-collapse text-sm">
            <caption className="sr-only">Feature comparison across Employment Hero plans</caption>
            <thead>
              <tr className="border-b border-line bg-surface-tint">
                <th scope="col" className="px-5 py-4 text-left text-xs font-bold tracking-wide text-ink-faint uppercase">
                  Feature
                </th>
                {["HR Essentials", "HR Engage", "HR Elite", "Employment Unlimited"].map((plan) => (
                  <th
                    key={plan}
                    scope="col"
                    className="px-4 py-4 text-center text-xs font-bold tracking-wide text-ink-faint uppercase"
                  >
                    {plan}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURE_MATRIX.map((group) => (
                <Fragment key={group.group}>
                  <tr className="bg-eh-tint">
                    <th
                      scope="colgroup"
                      colSpan={5}
                      className="px-5 py-2.5 text-left text-xs font-extrabold tracking-wide text-eh-purple-dark uppercase"
                    >
                      {group.group}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={`${group.group}-${row.feature}`} className="border-b border-line-soft">
                      <th scope="row" className="px-5 py-3 text-left font-medium text-ink">
                        {row.feature}
                      </th>
                      <td className="px-4 py-3">
                        <MatrixCell included={row.essentials} />
                      </td>
                      <td className="px-4 py-3">
                        <MatrixCell included={row.engage} />
                      </td>
                      <td className="px-4 py-3">
                        <MatrixCell included={row.elite} />
                      </td>
                      <td className="px-4 py-3">
                        <MatrixCell included={row.unlimited} />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Pricing FAQs" title="Questions about plans and billing" />
          <Accordion items={PRICING_FAQS} />
        </div>
        <div className="mt-12 rounded-eh-xl border border-line bg-white p-8 text-center">
          <h3 className="text-2xl font-extrabold tracking-tight text-ink-strong">
            Hiring outside Australia?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-[0.98rem] leading-relaxed text-ink-soft">
            HeroForce Employer of Record covers 180+ countries on a flat per-employee price.
          </p>
          <Link
            to="/pricing/global-teams"
            className="focus-eh mt-5 inline-flex text-sm font-bold text-eh-purple hover:underline"
          >
            See global teams pricing
          </Link>
        </div>
      </Section>

      <CtaBand
        title="Not sure which plan fits?"
        body="Tell us your headcount, industry and the awards you pay against, and we'll map it for you."
        primaryLabel="Talk to sales"
        primaryTo="/request-a-demo"
        secondaryLabel="Browse products"
        secondaryTo="/products"
      />
    </PageLayout>
  );
}
