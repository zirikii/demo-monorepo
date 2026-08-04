import { Bell, Lock, Smartphone, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Card";

const features = [
  {
    Icon: Smartphone,
    title: "Cardless Cash",
    description: "Withdraw from a CommBank ATM using just your phone.",
  },
  {
    Icon: Lock,
    title: "Lock, Block, Limit",
    description: "Lock your card, block transaction types and set your own limits instantly.",
  },
  {
    Icon: Bell,
    title: "CallerCheck",
    description: "Verify a call is really from us before you share anything.",
  },
  {
    Icon: Sparkles,
    title: "Benefits finder",
    description: "Find rebates and concessions you may be eligible for.",
  },
];

export function AppPromo() {
  return (
    <section className="border-y border-line bg-surface-tint py-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Digital banking"
          title="Australia's best banking app"
          description="Bank on the go, tap and pay from your phone, and get help from Ceba 24/7."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-line bg-surface p-6">
              <Icon aria-hidden="true" className="mb-3 h-6 w-6 text-black" />
              <h3 className="text-base font-bold text-black">{title}</h3>
              <p className="mt-1.5 text-sm text-ink-soft">{description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/digital-banking/app">Explore the app</ButtonLink>
          <ButtonLink to="/digital-banking/netbank" variant="outline">
            Learn about NetBank
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
