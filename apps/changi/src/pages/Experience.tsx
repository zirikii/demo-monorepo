import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { experiences } from "@/data/experiences";

export function ExperiencePage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Experience"
        title="An airport worth arriving early for"
        copy="Jewel's Rain Vortex, indoor gardens, kinetic art and playful attractions turn every visit into a destination of its own."
        crumbs={[{ label: "Home", to: "/" }, { label: "Experience" }]}
      />

      <section className="bg-sand py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Attractions" title="Things to see and do" className="mb-12" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((experience) => (
              <Link
                key={experience.slug}
                to={`/experience/${experience.slug}`}
                className="group flex flex-col overflow-hidden rounded-card border border-sand-deep bg-card shadow-card transition-shadow hover:shadow-float"
              >
                <div className={cn("changi-aurora relative flex h-44 items-start justify-between bg-gradient-to-br p-4", experience.tint)}>
                  <Badge tint={experience.admission === "Free" ? "green" : "amber"}>
                    {experience.admission}
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-ink group-hover:text-magenta">
                    {experience.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {experience.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-soft">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-magenta" aria-hidden />
                      {experience.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-magenta" aria-hidden />
                      {experience.duration}
                    </span>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-magenta group-hover:underline">
                    Learn more
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
