import { BatteryCharging, Network, Sun } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const bundles = [
  { name: "6.6kW solar", price: "$6,490", detail: "Ideal for 2–3 bedroom homes. 16 x 415W panels, Fronius inverter.", Icon: Sun },
  { name: "10kW solar", price: "$9,290", detail: "For larger homes and heavy daytime use. 24 x 415W panels.", Icon: Sun },
  { name: "6.6kW solar + 13.5kWh battery", price: "$19,990", detail: "Store your solar for the evening and join our Virtual Power Plant.", Icon: BatteryCharging },
];

export function SolarPage() {
  useDocumentTitle("Solar panels and home batteries");
  const { open } = useAssistant();
  return (
    <PageLayout>
      <PageHero
        crumbs={[{ label: "Solar & batteries" }]}
        eyebrow="Solar & batteries"
        title="Make the most of the sun"
        intro="Solar and battery bundles installed by accredited partners, with interest-free payment options and a 25-year panel warranty."
        actions={<Button onClick={() => open({ step: "solar.quote", label: "Get a solar quote" })}>Get a free quote</Button>}
      />
      <Section title="Solar and battery bundles" intro="Indicative prices after the federal STC rebate, fully installed in metro NSW.">
        <ul className="grid gap-5 md:grid-cols-3">
          {bundles.map(({ name, price, detail, Icon }) => (
            <li key={name} className="rounded-agl-lg border border-line-soft bg-white p-6 shadow-agl">
              <Icon className="h-8 w-8 text-agl-blue" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-extrabold text-ink">{name}</h2>
              <p className="mt-1 text-3xl font-extrabold text-agl-blue-dark">
                {price}
                <span className="ml-1 text-sm font-semibold text-ink-faint">from</span>
              </p>
              <p className="mt-3 text-ink-soft">{detail}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="sky" id="vpp">
        <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
          <Network className="h-12 w-12 text-agl-blue" aria-hidden="true" />
          <div>
            <h2 className="text-3xl font-extrabold text-ink">AGL Virtual Power Plant</h2>
            <p className="mt-2 text-ink-soft">
              Connect an eligible battery and we’ll use a little of its stored energy when the grid needs it most. You’ll get a $100 sign-up
              credit and ongoing bill credits.
            </p>
          </div>
          <Button variant="secondary" onClick={() => open({ step: "solar.battery", label: "Home batteries and VPP" })}>
            Ask about VPP
          </Button>
        </div>
      </Section>
    </PageLayout>
  );
}
