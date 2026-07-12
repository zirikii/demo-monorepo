import { Link } from "react-router-dom";
import { ArrowRight, Train, TramFront, Car, Bus } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { terminals } from "@/data/terminals";

const transport = [
  { icon: Train, title: "By MRT", copy: "The Changi Airport station on the East-West Line links you to the city in about 45 minutes." },
  { icon: TramFront, title: "By Skytrain", copy: "Free automated Skytrains connect Terminals 1, 2 and 3 within minutes." },
  { icon: Car, title: "By taxi & private hire", copy: "Taxis and ride-hailing pick-ups are available kerbside at every terminal." },
  { icon: Bus, title: "By bus", copy: "Public buses and a free inter-terminal shuttle keep you moving across the airport." },
];

export function AtChangiPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="At Changi"
        title="Find your way around Changi"
        copy="Four terminals and Jewel, all seamlessly connected. Explore each terminal's highlights, facilities and how to get around."
        crumbs={[{ label: "Home", to: "/" }, { label: "At Changi" }]}
      />

      <section className="bg-sand py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Terminals" title="Explore the terminals" className="mb-12" />
          <div className="grid gap-6 sm:grid-cols-2">
            {terminals.map((terminal) => (
              <Link
                key={terminal.slug}
                to={`/at-changi/${terminal.slug}`}
                className="group overflow-hidden rounded-card border border-sand-deep bg-card shadow-card transition-shadow hover:shadow-float"
              >
                <div className={cn("changi-aurora flex h-36 items-end bg-gradient-to-br p-6", terminal.tint)}>
                  <span className="text-3xl font-bold text-white">{terminal.code}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-ink">{terminal.name}</h3>
                  <p className="mt-1 text-sm font-medium text-magenta">{terminal.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{terminal.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-magenta group-hover:underline">
                    Discover {terminal.code}
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-alt py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Getting around"
            title="Getting to and from Changi"
            copy="However you travel, Changi keeps Singapore and every terminal within easy reach."
            className="mb-12"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {transport.map((mode) => {
              const Icon = mode.icon;
              return (
                <div
                  key={mode.title}
                  className="rounded-card border border-sand-deep bg-card p-6 shadow-card"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-badge-purple text-magenta">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{mode.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{mode.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
