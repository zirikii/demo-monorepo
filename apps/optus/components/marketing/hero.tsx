import Link from "next/link";
import { ArrowRight, BadgeCheck, BarChart3, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/formatters";
const mockRows = [
  { label: "Mobile fleet", value: "1,284 services" },
  { label: "Unbilled usage", value: formatCurrency(48210) },
  { label: "Inbound answer rate", value: "94.8%" },
];
export function MarketingHero() {
  return (
    <section className="relative overflow-hidden bg-optus-page">
      <div
        className="absolute right-0 top-0 h-80 w-80 rounded-full bg-optus-yellow/40 blur-3xl"
        aria-hidden="true"
      />
      <div className="container grid gap-10 py-16 md:grid-cols-[1fr_0.9fr] md:py-24">
        <div className="relative z-10 max-w-3xl">
          <Badge tone="yellow">Optus Enterprise & Business demo</Badge>
          <h1 className="mt-5 text-5xl font-black tracking-tight text-optus-ink md:text-6xl">
            One Optus view for fleet, billing, and service insight.
          </h1>
          <p className="mt-5 text-lg leading-8 text-optus-muted">
            A realistic self-service hub inspired by Optus Insight Plus and My Fleet Manager, using
            local data to show how enterprise teams control spend, usage, and service health.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="yellow">
              <Link href="/signup">
                Start the demo <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/login">Log in as admin</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-optus-muted sm:grid-cols-3">
            <span className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-optus-teal" aria-hidden="true" /> Mock auth
            </span>
            <span className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-optus-teal" aria-hidden="true" /> Local fleet data
            </span>
            <span className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-optus-teal" aria-hidden="true" /> Insight reporting
            </span>
          </div>
        </div>
        <Card className="relative z-10 p-5 shadow-optus">
          <div className="rounded-lg bg-optus-teal-dark p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Business Hub</p>
                <p className="text-2xl font-black">Executive summary</p>
              </div>
              <Badge tone="yellow">Live demo</Badge>
            </div>
            <div className="mt-6 grid gap-3">
              {mockRows.map((row) => (
                <div key={row.label} className="rounded-md bg-white/10 p-4">
                  <p className="text-sm text-white/65">{row.label}</p>
                  <p className="mt-1 text-2xl font-black">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-optus-line p-4">
              <p className="text-sm font-bold text-optus-muted">Roaming alerts</p>
              <p className="mt-2 text-3xl font-black text-optus-ink">7</p>
            </div>
            <div className="rounded-md border border-optus-line p-4">
              <p className="text-sm font-bold text-optus-muted">Service uptime</p>
              <p className="mt-2 text-3xl font-black text-optus-ink">99.92%</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
