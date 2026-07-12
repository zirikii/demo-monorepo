import { SectionHeading } from "@/components/ui/SectionHeading";
import { happenings } from "@/data/happenings";
import { HappeningCard } from "./HappeningCard";

export function WhatsHappening() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="What's Happening" description="Events, promotions, rewards, and seasonal highlights around Changi Airport and Jewel." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {happenings.map((happening) => <HappeningCard key={happening.title} happening={happening} />)}
        </div>
      </div>
    </section>
  );
}
