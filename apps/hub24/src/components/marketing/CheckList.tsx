import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface CheckListProps {
  items: string[];
  tone?: "light" | "dark";
  className?: string;
}

export function CheckList({ items, tone = "light", className }: CheckListProps) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
              tone === "dark" ? "bg-white/15 text-h24-aqua" : "bg-h24-tint text-h24-teal-dark",
            )}
          >
            <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
          </span>
          <span className={cn("text-[0.95rem] leading-relaxed", tone === "dark" ? "text-h24-sky" : "text-ink-soft")}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
