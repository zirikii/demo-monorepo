import { Stat } from "@/components/ui/Stat";
import { cn } from "@/lib/cn";

export interface StatBandItem {
  value: string;
  label: string;
  note?: string;
}

interface StatBandProps {
  items: StatBandItem[];
  tone?: "light" | "dark";
  columns?: 3 | 4;
  className?: string;
}

export function StatBand({ items, tone = "light", columns = 4, className }: StatBandProps) {
  return (
    <div
      className={cn(
        "grid gap-8 sm:grid-cols-2",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <Stat key={item.label} tone={tone} value={item.value} label={item.label} note={item.note} />
      ))}
    </div>
  );
}
