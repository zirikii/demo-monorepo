import { cn } from "@/lib/cn";

interface StatProps {
  value: string;
  label: string;
  invert?: boolean;
}

export function Stat({ value, label, invert = false }: StatProps) {
  return (
    <div>
      <p className={cn("font-serif text-3xl font-bold", invert ? "text-white" : "text-hub-navy")}>
        {value}
      </p>
      <p className={cn("mt-1 text-sm", invert ? "text-white/70" : "text-ink-soft")}>{label}</p>
    </div>
  );
}
