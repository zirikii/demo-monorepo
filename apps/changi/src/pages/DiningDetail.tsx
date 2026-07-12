import { Link, useParams } from "react-router-dom";
import { Clock, MapPin, Tag } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { OutletCard } from "@/components/shared/OutletCard";
import { outlets } from "@/data/dine";
import { NotFoundPage } from "./NotFound";

export function DiningDetailPage() {
  const { slug } = useParams();
  const outlet = outlets.find((o) => o.slug === slug);

  if (!outlet) return <NotFoundPage />;

  const related = outlets
    .filter((o) => o.category === outlet.category && o.slug !== outlet.slug)
    .slice(0, 3);

  return (
    <PageLayout>
      <PageHero
        eyebrow={outlet.kind}
        title={outlet.name}
        copy={outlet.blurb}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Dine & Shop", to: "/dine-and-shop" },
          { label: outlet.name },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          {outlet.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="bg-sand py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-ink">About {outlet.name}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{outlet.blurb}</p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Find {outlet.name} at {outlet.location}. This {outlet.category === "dine" ? "dining spot" : "store"} is
              one of more than 260 outlets across the terminals and Jewel — part of what makes a
              visit to Changi a destination in itself.
            </p>
            <div className="mt-8">
              <Button to="/dine-and-shop" variant="secondary">
                Back to directory
              </Button>
            </div>
          </div>

          <aside className="rounded-card border border-sand-deep bg-card p-7 shadow-card">
            <h2 className="text-lg font-semibold text-ink">Good to know</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-magenta" aria-hidden />
                <div>
                  <dt className="font-semibold text-ink">Location</dt>
                  <dd className="text-ink-soft">{outlet.location}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-magenta" aria-hidden />
                <div>
                  <dt className="font-semibold text-ink">Opening hours</dt>
                  <dd className="text-ink-soft">{outlet.hours}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Tag className="mt-0.5 size-4 shrink-0 text-magenta" aria-hidden />
                <div>
                  <dt className="font-semibold text-ink">Category</dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">
                    <Badge tint={outlet.category === "dine" ? "amber" : "purple"} className="capitalize">
                      {outlet.category}
                    </Badge>
                  </dd>
                </div>
              </div>
            </dl>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-7xl px-6">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-semibold text-ink">You might also like</h2>
              <Link to="/dine-and-shop" className="text-sm font-semibold text-magenta hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <OutletCard key={item.slug} outlet={item} />
              ))}
            </div>
          </div>
        )}
      </section>
    </PageLayout>
  );
}
