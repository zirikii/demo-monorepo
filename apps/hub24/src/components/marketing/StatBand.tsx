import { Stat } from "@/components/ui/Stat";
import { Section } from "@/components/layout/Section";
import { STATS } from "@/data/site";

export function StatBand() {
  return (
    <Section tone="tint" className="py-12 md:py-14">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Stat key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </Section>
  );
}
