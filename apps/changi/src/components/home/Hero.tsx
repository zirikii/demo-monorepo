import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PlaneLanding, PlaneTakeoff, Repeat, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";

type Mode = "arriving" | "departing" | "transiting" | "visiting";

interface ModeConfig {
  id: Mode;
  label: string;
  icon: typeof PlaneLanding;
  intro: string;
  links: { label: string; to: string }[];
}

const MODES: ModeConfig[] = [
  {
    id: "arriving",
    label: "Arriving",
    icon: PlaneLanding,
    intro: "Welcome to Singapore. Here's what you need on the way in.",
    links: [
      { label: "Arrival guide & immigration", to: "/fly" },
      { label: "Baggage & transport options", to: "/at-changi" },
      { label: "Getting into the city", to: "/at-changi" },
    ],
  },
  {
    id: "departing",
    label: "Departing",
    icon: PlaneTakeoff,
    intro: "Flying off soon? Breeze through check-in and make time for Changi.",
    links: [
      { label: "Departure & check-in guide", to: "/fly" },
      { label: "Flight information board", to: "/fly/flights" },
      { label: "Duty-free & dining airside", to: "/dine-and-shop" },
    ],
  },
  {
    id: "transiting",
    label: "Transiting",
    icon: Repeat,
    intro: "Between flights? Turn your layover into a highlight.",
    links: [
      { label: "Transiting guide & lounges", to: "/fly" },
      { label: "Things to do in transit", to: "/experience" },
      { label: "Rest, shower & relax", to: "/at-changi" },
    ],
  },
  {
    id: "visiting",
    label: "Visiting",
    icon: MapPin,
    intro: "Not flying today? Jewel and the terminals are open to everyone.",
    links: [
      { label: "Explore Jewel & attractions", to: "/experience" },
      { label: "Dining & shopping", to: "/dine-and-shop" },
      { label: "What's happening now", to: "/happenings" },
    ],
  },
];

export function Hero() {
  const [mode, setMode] = useState<Mode>("arriving");
  const active = MODES.find((m) => m.id === mode) ?? MODES[0];

  return (
    <section className="changi-aurora relative overflow-hidden bg-plum text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">I am…</p>
          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Passenger type">
            {MODES.map((m) => {
              const Icon = m.icon;
              const isActive = m.id === mode;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setMode(m.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-white text-magenta"
                      : "bg-white/10 text-white hover:bg-white/20",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                  {m.label}
                </button>
              );
            })}
          </div>

          <h1 className="mt-8 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            The world&apos;s most awarded airport
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{active.intro}</p>
        </div>

        <div className="rounded-shape border border-white/15 bg-white/10 p-6 backdrop-blur-sm lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Useful information for {active.label.toLowerCase()} passengers
          </p>
          <ul className="mt-5 space-y-3">
            {active.links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="group flex items-center justify-between gap-4 rounded-2xl bg-white/10 px-5 py-4 text-left font-semibold transition-colors hover:bg-white hover:text-magenta"
                >
                  {link.label}
                  <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
