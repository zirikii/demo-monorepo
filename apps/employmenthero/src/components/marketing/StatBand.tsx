import { Stat } from "@/components/ui/Stat";
import { HEADLINE_STATS } from "@/data/site";

export function StatBand() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {HEADLINE_STATS.map((stat) => (
        <Stat key={stat.label} value={stat.value} label={stat.label} tone="dark" />
      ))}
    </div>
  );
}
