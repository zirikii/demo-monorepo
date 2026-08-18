import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface CheckListProps {
  items: string[];
  tone?: "dark" | "light";
  className?: string;
}

export function CheckList({ items, tone = "dark", className }: CheckListProps) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className={cn(
              "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
              tone === "dark"
                ? "bg-hub-teal-tint text-hub-teal-dark"
                : "bg-white/15 text-hub-teal-soft",
            )}
          >
            <Check aria-hidden className="h-3.5 w-3.5" />
          </span>
          <span className={tone === "dark" ? "text-ink-soft" : "text-white/80"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
