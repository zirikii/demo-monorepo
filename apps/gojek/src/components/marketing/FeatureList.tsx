import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function FeatureList({
  items,
  tone = "light",
  className,
}: {
  items: string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
              tone === "dark"
                ? "bg-go-green/25 text-go-green-soft"
                : "bg-go-green-tint text-go-green-deep",
            )}
          >
            <Check className="h-3 w-3" />
          </span>
          <span
            className={cn(
              "text-sm leading-relaxed",
              tone === "dark" ? "text-white/70" : "text-ink-soft",
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
