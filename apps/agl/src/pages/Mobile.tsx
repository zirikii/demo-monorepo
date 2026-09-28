import { Check, Globe } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { mobileInclusions, mobilePlans } from "@/data/plans";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatCurrency } from "@/lib/format";

export function MobilePage() {
  useDocumentTitle("SIM only mobile plans");
  const { open } = useAssistant();
  return (
    <PageLayout>
      <PageHero
        crumbs={[{ label: "Mobile" }]}
        eyebrow="Mobile"
        title="SIM plans that save you more with AGL energy"
        intro="Get $10/mth off any SIM plan when you have AGL energy, on the Optus Mobile Network."
      />

      <Section>
        <ul className="grid gap-5 md:grid-cols-3" aria-label="SIM plans">
          {mobilePlans.map((plan) => (
            <li key={plan.slug} className="flex flex-col rounded-agl-lg border border-line-soft bg-white p-6 shadow-agl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-agl-blue-dark">{plan.name}</h2>
                {plan.badge && <Badge tone="blue">{plan.badge}</Badge>}
              </div>
              <p className="mt-3 text-5xl font-extrabold text-ink">
                {plan.dataGb}
                <span className="text-2xl">GB</span>
              </p>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-ink">{formatCurrency(plan.bundlePrice, { whole: true })}</span>
                <span className="text-ink-faint">/mth with AGL energy</span>
              </p>
              <p className="text-xs text-ink-faint">{formatCurrency(plan.price, { whole: true })}/mth without</p>
              {plan.promo && <p className="mt-3 rounded-agl bg-agl-sky px-3 py-2 text-sm font-bold text-agl-blue-dark">{plan.promo}</p>}
              <ul className="mt-5 flex-1 space-y-2 text-sm">
                {mobileInclusions.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-positive" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink to="/login" className="mt-6">
                Get {plan.name}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="tint" title="Every SIM plan includes">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mobileInclusions.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-agl bg-white p-4 shadow-agl">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-positive" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="roaming">
        <div className="flex flex-col items-start gap-5 rounded-agl-lg bg-agl-sky p-8 md:flex-row md:items-center">
          <Globe className="h-10 w-10 text-agl-blue" aria-hidden="true" />
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold text-ink">Travelling overseas?</h2>
            <p className="text-ink-soft">Add a $5/day roaming pass with 5GB of data in more than 100 destinations.</p>
          </div>
          <Button onClick={() => open({ step: "mobile.roaming", label: "Set up international roaming" })}>Set up roaming</Button>
        </div>
      </Section>
    </PageLayout>
  );
}
