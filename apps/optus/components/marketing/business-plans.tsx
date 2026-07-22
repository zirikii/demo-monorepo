import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const plans = [
  {
    name: "Business Fleet",
    price: "$0",
    note: "Demo workspace",
    features: ["Fleet Manager", "Billing overview", "Team roles"],
  },
  {
    name: "Insight Plus",
    price: "$0",
    note: "Analytics demo",
    features: ["Inbound call reports", "CSV subscriptions", "Cost centre trends"],
    highlight: true,
  },
  {
    name: "Enterprise Control",
    price: "$0",
    note: "Full hub demo",
    features: ["Service health", "Integrations toggles", "Executive dashboard"],
  },
];
export function BusinessPlans() {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <div className="max-w-2xl">
          <Badge tone="teal">Plans</Badge>
          <h2 className="mt-3 text-4xl font-black text-optus-ink">
            Demo packages for every Optus business story.
          </h2>
          <p className="mt-3 text-optus-muted">
            All plans are fictional and run locally. They exist to make the UI feel complete.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.highlight ? "border-optus-teal p-5 shadow-optus" : "p-5"}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-black text-optus-ink">{plan.name}</h3>
                {plan.highlight ? <Badge tone="yellow">Popular</Badge> : null}
              </div>
              <p className="mt-4 text-4xl font-black text-optus-ink">{plan.price}</p>
              <p className="text-sm text-optus-muted">{plan.note}</p>
              <ul className="mt-5 space-y-3 text-sm text-optus-muted">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-optus-teal" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="mt-6 w-full"
                variant={plan.highlight ? "yellow" : "secondary"}
              >
                <Link href="/signup">Choose demo</Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
