import { useParams } from "react-router-dom";
import { Check, Clock, MapPin, Ticket } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/Button";
import { experiences } from "@/data/experiences";
import { NotFoundPage } from "./NotFound";

export function ExperienceDetailPage() {
  const { slug } = useParams();
  const experience = experiences.find((e) => e.slug === slug);

  if (!experience) return <NotFoundPage />;

  return (
    <PageLayout>
      <PageHero
        eyebrow="Experience"
        title={experience.name}
        copy={experience.summary}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Experience", to: "/experience" },
          { label: experience.name },
        ]}
      >
        <Button to="/experience" variant="primary-dark" withArrow>
          Explore more attractions
        </Button>
      </PageHero>

      <section className="bg-sand py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-ink">About {experience.name}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{experience.description}</p>

            <h3 className="mt-10 text-xl font-semibold text-ink">Highlights</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {experience.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-2xl border border-sand-deep bg-card p-4 text-sm text-ink-soft shadow-card"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-magenta" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-card border border-sand-deep bg-card p-7 shadow-card">
            <h2 className="text-lg font-semibold text-ink">Visitor information</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-magenta" aria-hidden />
                <div>
                  <dt className="font-semibold text-ink">Location</dt>
                  <dd className="text-ink-soft">{experience.location}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Ticket className="mt-0.5 size-4 shrink-0 text-magenta" aria-hidden />
                <div>
                  <dt className="font-semibold text-ink">Admission</dt>
                  <dd className="text-ink-soft">{experience.admission}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-magenta" aria-hidden />
                <div>
                  <dt className="font-semibold text-ink">Suggested time</dt>
                  <dd className="text-ink-soft">{experience.duration}</dd>
                </div>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
