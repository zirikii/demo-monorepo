import { useState } from "react";
import { Gauge, Router, Wrench } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { internetPlans } from "@/data/plans";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/format";

export function InternetPage() {
  useDocumentTitle("nbn® internet plans");
  const { open } = useAssistant();
  const [bundle, setBundle] = useState(true);

  return (
    <PageLayout>
      <PageHero
        crumbs={[{ label: "Internet" }]}
        eyebrow="nbn® internet"
        title="Fast, reliable nbn® plans"
        intro="Save $15/mth on any nbn® plan when you have AGL energy. Unlimited data, no lock-in contract and a free modem when you stay 36 months."
        actions={
          <Button variant="secondary" onClick={() => open({ step: "internet.down", label: "My internet isn't working" })}>
            <Wrench className="h-4 w-4" aria-hidden="true" /> Troubleshoot my internet
          </Button>
        }
      />

      <Section>
        <div className="mb-6 inline-flex rounded-full bg-surface-tint p-1" role="group" aria-label="Pricing">
          {[
            { label: "With AGL energy", value: true },
            { label: "Internet only", value: false },
          ].map((opt) => (
            <button
              key={opt.label}
              type="button"
              aria-pressed={bundle === opt.value}
              onClick={() => setBundle(opt.value)}
              className={cn("rounded-full px-5 py-2 text-sm font-bold", bundle === opt.value ? "bg-white text-agl-blue shadow-agl" : "text-ink-soft")}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="nbn plans">
          {internetPlans.map((plan) => (
            <li key={plan.slug} className="flex flex-col rounded-agl-lg border border-line-soft bg-white p-6 shadow-agl">
              <div className="flex items-center justify-between">
                <p className="text-sm font-extrabold text-agl-teal-ink">{plan.speedTier}</p>
                {plan.badge && <Badge tone="blue">{plan.badge}</Badge>}
              </div>
              <h2 className="mt-1 text-2xl font-extrabold text-agl-blue-dark">{plan.name}</h2>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-ink">{formatCurrency(bundle ? plan.bundlePrice : plan.price, { whole: true })}</span>
                <span className="text-ink-faint">/mth</span>
              </p>
              {bundle && <p className="text-xs text-ink-faint">Was {formatCurrency(plan.price, { whole: true })}/mth without AGL energy</p>}
              <div className="mt-5 flex items-center gap-3 rounded-agl bg-surface-tint p-3">
                <Gauge className="h-5 w-5 text-agl-blue" aria-hidden="true" />
                <p className="text-sm">
                  <strong>{plan.typicalEveningDown} Mbps</strong> typical evening download · {plan.upload} Mbps upload
                </p>
              </div>
              <p className="mt-4 flex-1 text-sm text-ink-soft">{plan.bestFor}</p>
              {plan.fibreOnly && <p className="mt-2 text-xs text-caution">Requires nbn® Fibre to the Premises or Fibre upgrade</p>}
              <ButtonLink to="/login" className="mt-5">
                Choose {plan.name}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sky" id="fibre" title="Upgrade to full fibre for free" intro="Eligible homes on FTTN or FTTC can get a free nbn® Fibre Connect upgrade when ordering a 500 Mbps or faster plan.">
        <div className="grid gap-4 sm:grid-cols-3">
          {["Check your address is eligible", "Choose Home Fast Fibre or faster", "nbn installs fibre to your home — free"].map((step, i) => (
            <div key={step} className="rounded-agl bg-white p-5 shadow-agl">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-agl-blue font-extrabold text-white">{i + 1}</span>
              <p className="mt-3 font-bold text-ink">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-start gap-5 rounded-agl-lg bg-agl-navy p-8 text-white md:flex-row md:items-center">
          <Router className="h-10 w-10 text-ray-light" aria-hidden="true" />
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold">Internet playing up?</h2>
            <p className="text-white/80">The AGL Assistant can check for nbn® outages, run a line test and walk you through a modem restart.</p>
          </div>
          <Button variant="white" onClick={() => open({ step: "netmob", label: "Internet & mobile" })}>
            Get help now
          </Button>
        </div>
      </Section>
    </PageLayout>
  );
}
