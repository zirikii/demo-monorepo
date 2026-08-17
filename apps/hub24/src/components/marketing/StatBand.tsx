import { Stat } from "@/components/ui/Stat";
import { PLATFORM_STATS } from "@/data/site";

export function StatBand({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {PLATFORM_STATS.map((stat) => (
        <Stat key={stat.label} value={stat.value} label={stat.label} note={stat.note} tone={tone} />
      ))}
    </div>
  );
}
