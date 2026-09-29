import { Car, Moon, PlugZap } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { energyPlans } from "@/data/plans";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function ElectricVehiclesPage() {
  useDocumentTitle("Electric vehicle plans and chargers");
  const plan = energyPlans.find((p) => p.slug === "night-saver-ev");
  return (
    <PageLayout>
      <PageHero
        tone="blue"
        crumbs={[{ label: "Electric vehicles" }]}
        eyebrow="Electric vehicles"
        title="Charge your EV for 8c/kWh overnight"
        intro="Our Night Saver EV plan gives you a super off-peak rate between midnight and 6am, when most EVs sit in the driveway."
        actions={
          <ButtonLink to="/energy?state=NSW#night-saver-ev" variant="white">
            View Night Saver EV
          </ButtonLink>
        }
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { Icon: Moon, title: "8c/kWh 12am–6am", body: "Charge overnight at our lowest rate." },
            { Icon: Car, title: "About $4 for 300km", body: "Based on a typical EV using 15kWh per 100km." },
            { Icon: PlugZap, title: plan?.highlight ?? "Online credit", body: "When you join online with a smart meter." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="rounded-agl-lg border border-line-soft p-6">
              <Icon className="h-8 w-8 text-agl-blue" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-extrabold text-ink">{title}</h2>
              <p className="mt-1 text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="tint" id="chargers" title="Home EV chargers" intro="7kW smart chargers installed by licensed electricians, with scheduling built into the AGL app.">
        <p className="text-ink-soft">Supply and standard installation from $1,890. Off-peak scheduling works with Night Saver EV.</p>
      </Section>
    </PageLayout>
  );
}
