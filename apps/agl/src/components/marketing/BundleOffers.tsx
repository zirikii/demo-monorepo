import { Smartphone, Tv, Wifi } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const offers = [
  {
    badge: "Bundle and save",
    title: "$15/mth off nbn® plans",
    body: "Add internet to your AGL energy account and save every month. Home Fast nbn® 100 from $95/mth.",
    cta: { label: "Compare nbn® plans", to: "/internet" },
    Icon: Wifi,
  },
  {
    badge: "50% off for 6 months",
    title: "SIM plans from $12/mth",
    body: "Small 40GB for $12/mth for your first 6 months when you have AGL energy. Then $25/mth.",
    cta: { label: "Compare SIM plans", to: "/mobile" },
    Icon: Smartphone,
  },
  {
    badge: "Netflix Plan",
    title: "Energy with Netflix included",
    body: "Get Netflix Standard with ads on us with our Netflix Plan for electricity.",
    cta: { label: "View the Netflix Plan", to: "/energy#netflix-plan" },
    Icon: Tv,
  },
];

export function BundleOffers() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {offers.map(({ badge, title, body, cta, Icon }) => (
        <article key={title} className="relative flex flex-col overflow-hidden rounded-agl-lg bg-white p-7 shadow-agl ring-1 ring-line-soft">
          <span aria-hidden="true" className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-agl-gradient opacity-15" />
          <Icon className="h-8 w-8 text-agl-blue" aria-hidden="true" />
          <div className="mt-4">
            <Badge tone="sky">{badge}</Badge>
          </div>
          <h3 className="mt-3 text-2xl font-extrabold text-agl-blue-dark">{title}</h3>
          <p className="mt-2 flex-1 text-ink-soft">{body}</p>
          <ButtonLink to={cta.to} variant="secondary" className="mt-6 self-start">
            {cta.label}
          </ButtonLink>
        </article>
      ))}
    </div>
  );
}
