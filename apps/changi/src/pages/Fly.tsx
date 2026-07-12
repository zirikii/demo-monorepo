import { Link } from "react-router-dom";
import { ArrowRight, PlaneLanding, PlaneTakeoff, Repeat, Armchair } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { airlines } from "@/data/airlines";

const guides = [
  {
    icon: PlaneLanding,
    title: "Arrival Guide",
    copy: "From immigration and baggage claim to transport into the city — everything for a smooth landing.",
    tint: "from-magenta to-plum",
  },
  {
    icon: PlaneTakeoff,
    title: "Departure Guide",
    copy: "Check-in rows, security, boarding times and how early to arrive before you fly.",
    tint: "from-flame to-amber",
  },
  {
    icon: Repeat,
    title: "Transiting Guide",
    copy: "Connecting through Changi? Make the most of your time between flights.",
    tint: "from-purple-600 to-magenta",
  },
  {
    icon: Armchair,
    title: "Lounges",
    copy: "Rest, dine and freshen up in lounges across every terminal.",
    tint: "from-amber to-flame",
  },
];

export function FlyPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Fly"
        title="Everything you need to fly through Changi"
        copy="Check flight information, find your airline and follow our guides for arriving, departing and transiting."
        crumbs={[{ label: "Home", to: "/" }, { label: "Fly" }]}
      >
        <Button to="/fly/flights" variant="primary-dark" withArrow>
          View flight information
        </Button>
      </PageHero>

      <section className="bg-sand py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Travel guides"
            title="Guides for every stage of your journey"
            className="mb-12"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.title}
                  to="/fly/flights"
                  className="group flex flex-col rounded-card border border-sand-deep bg-card p-6 shadow-card transition-shadow hover:shadow-float"
                >
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white",
                      guide.tint,
                    )}
                  >
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{guide.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{guide.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-magenta group-hover:underline">
                    Read guide
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-sand-alt py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Airline information"
            title="Airlines flying from Changi"
            copy="Find your carrier's home terminal to plan your check-in and arrival."
            className="mb-12"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {airlines.map((airline) => (
              <div
                key={airline.code}
                className="flex items-center justify-between rounded-2xl border border-sand-deep bg-card px-4 py-3 shadow-card"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-badge-purple text-xs font-bold text-magenta">
                    {airline.code}
                  </span>
                  <span className="text-sm font-medium text-ink">{airline.name}</span>
                </span>
                <span className="text-xs font-semibold text-ink-faint">
                  {airline.terminals.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
