import { useParams } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/Button";
import { happenings } from "@/data/happenings";
import { NotFoundPage } from "./NotFound";

export function HappeningDetailPage() {
  const { slug } = useParams();
  const happening = happenings.find((h) => h.slug === slug);

  if (!happening) return <NotFoundPage />;

  return (
    <PageLayout>
      <PageHero
        eyebrow={happening.type === "events" ? "Event" : "Promotion"}
        title={happening.title}
        copy={happening.summary}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Happenings", to: "/happenings" },
          { label: happening.title },
        ]}
      >
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-medium text-white">
            <CalendarDays className="size-4" aria-hidden />
            {happening.period}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-medium text-white">
            <MapPin className="size-4" aria-hidden />
            {happening.location}
          </span>
        </div>
      </PageHero>

      <section className="bg-sand py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-lg leading-relaxed text-ink-soft">{happening.description}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Changi Rewards members enjoy the most from every happening — sign up for free to unlock
            member pricing, early access and exclusive collectibles.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/rewards" withArrow>
              Join Changi Rewards
            </Button>
            <Button to="/happenings" variant="secondary">
              Back to Happenings
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
