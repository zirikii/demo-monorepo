import { cn } from "@/lib/cn";

export function Stat({
  value,
  label,
  tone = "dark",
  className,
}: {
  value: string;
  label: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <p
        className={cn(
          "font-display text-3xl font-bold md:text-4xl",
          tone === "light" ? "text-white" : "text-eh-purple",
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-1 text-sm",
          tone === "light" ? "text-white/75" : "text-eh-ink-faint",
        )}
      >
        {label}
      </p>
    </div>
  );
}
