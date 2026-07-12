import { Link } from "react-router-dom";
import { ArrowRight, Plane, Building2, ShoppingBag, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

interface SectionEntry {
  label: string;
  to: string;
  copy: string;
  icon: typeof Plane;
  tint: string;
}

const entries: SectionEntry[] = [
  {
    label: "Fly",
    to: "/fly",
    copy: "Flight info, airline details and guides for every stage of your journey.",
    icon: Plane,
    tint: "from-magenta to-plum",
  },
  {
    label: "At Changi",
    to: "/at-changi",
    copy: "Find your way around four terminals, Jewel and everything in between.",
    icon: Building2,
    tint: "from-flame to-amber",
  },
  {
    label: "Dine & Shop",
    to: "/dine-and-shop",
    copy: "260+ places to eat, drink and shop, from local hawker to duty-free.",
    icon: ShoppingBag,
    tint: "from-purple-600 to-magenta",
  },
  {
    label: "Experience",
    to: "/experience",
    copy: "Jewel, the Rain Vortex, gardens and attractions worth the trip alone.",
    icon: Sparkles,
    tint: "from-amber to-flame",
  },
];

export function SectionGrid() {
  return (
    <section className="bg-sand py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map((entry) => {
            const Icon = entry.icon;
            return (
              <Link
                key={entry.label}
                to={entry.to}
                className="group flex flex-col rounded-card border border-sand-deep bg-card p-6 shadow-card transition-shadow hover:shadow-float"
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white",
                    entry.tint,
                  )}
                >
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">{entry.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{entry.copy}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-magenta group-hover:underline">
                  Explore
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
