import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { cn } from "@/lib/cn";
import { happenings, type HappeningType } from "@/data/happenings";

const TABS: { id: HappeningType; label: string }[] = [
  { id: "events", label: "Events" },
  { id: "promotions", label: "Promotions" },
];

export function HappeningsPage() {
  const [searchParams] = useSearchParams();
  const initial = (searchParams.get("tab") as HappeningType) ?? "events";
  const [tab, setTab] = useState<HappeningType>(
    TABS.some((t) => t.id === initial) ? initial : "events",
  );

  const results = useMemo(() => happenings.filter((h) => h.type === tab), [tab]);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Happenings"
        title="What's on at Changi right now"
        copy="Seasonal events, activations and member promotions across the terminals and Jewel."
        crumbs={[{ label: "Home", to: "/" }, { label: "Happenings" }]}
      />

      <section className="bg-sand py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="inline-flex rounded-full border border-sand-deep bg-card p-1"
            role="tablist"
            aria-label="Happening type"
          >
            {TABS.map((option) => (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={tab === option.id}
                onClick={() => setTab(option.id)}
                className={cn(
                  "rounded-full px-6 py-2 text-sm font-semibold transition-colors",
                  tab === option.id ? "bg-magenta text-white" : "text-ink hover:bg-sand-deep/40",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((happening) => (
              <Link
                key={happening.slug}
                to={`/happenings/${happening.slug}`}
                className="group flex flex-col overflow-hidden rounded-card border border-sand-deep bg-card shadow-card transition-shadow hover:shadow-float"
              >
                <div className={cn("changi-aurora h-36 bg-gradient-to-br", happening.tint)} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-ink group-hover:text-magenta">
                    {happening.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {happening.summary}
                  </p>
                  <div className="mt-4 space-y-1.5 text-xs text-ink-soft">
                    <p className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-magenta" aria-hidden />
                      {happening.period}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-magenta" aria-hidden />
                      {happening.location}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-magenta group-hover:underline">
                    Find out more
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
