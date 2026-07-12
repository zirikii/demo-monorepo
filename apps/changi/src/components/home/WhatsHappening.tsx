import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PromoCard } from "@/components/shared/PromoCard";
import { promos } from "@/data/promos";

export function WhatsHappening() {
  return (
    <section className="bg-sand py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What's Happening"
            title="Deals, events and experiences on now"
            copy="From member-only offers to family activations at Jewel — there's always something new at Changi."
          />
          <Button to="/happenings" variant="secondary" withArrow>
            View all
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {promos.map((promo) => (
            <PromoCard key={promo.title} promo={promo} />
          ))}
        </div>
      </div>
    </section>
  );
}
