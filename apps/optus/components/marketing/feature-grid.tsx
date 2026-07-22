import { BarChart3, FileText, ReceiptText, ShieldCheck, Smartphone, Wifi } from "lucide-react";
import { Card } from "@/components/ui/card";
const features = [
  {
    icon: Smartphone,
    title: "Fleet control",
    body: "View active mobile services, devices, plans, data usage, and roaming risk by cost centre.",
  },
  {
    icon: BarChart3,
    title: "Insight Plus analytics",
    body: "Model billing, inbound calling, and report subscriptions in one familiar analytics workspace.",
  },
  {
    icon: ReceiptText,
    title: "Cost allocation",
    body: "Track invoices and unbilled usage across Finance, Retail Ops, Logistics, and Support.",
  },
  {
    icon: Wifi,
    title: "Service health",
    body: "Monitor mobile, NBN, voice, and 5G business services with operational status badges.",
  },
  {
    icon: FileText,
    title: "Report delivery",
    body: "Subscribe teams to CSV-ready monthly reports with local JSON persistence.",
  },
  {
    icon: ShieldCheck,
    title: "Mock admin model",
    body: "Demo sessions use signed cookies, protected routes, and role-based team seed data.",
  },
];
export function FeatureGrid() {
  return (
    <section id="solutions" className="container py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wide text-optus-teal">
          Business solutions
        </p>
        <h2 className="mt-2 text-4xl font-black tracking-tight text-optus-ink">
          A customer-grade Optus dashboard without real integrations.
        </h2>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="p-5">
              <div className="mb-4 inline-flex rounded-md bg-optus-teal-soft p-3">
                <Icon className="h-5 w-5 text-optus-teal-dark" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-black text-optus-ink">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-optus-muted">{feature.body}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
