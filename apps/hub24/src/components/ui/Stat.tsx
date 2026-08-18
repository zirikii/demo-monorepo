import { cn } from "@/lib/cn";

interface StatProps {
  value: string;
  label: string;
  note?: string;
  tone?: "dark" | "light";
  className?: string;
}

export function Stat({ value, label, note, tone = "dark", className }: StatProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "text-3xl font-extrabold tracking-tight md:text-4xl",
          tone === "dark" ? "text-hub-blue" : "text-hub-teal-soft",
        )}
      >
        {value}
      </span>
      <span className={cn("font-bold", tone === "dark" ? "text-ink-strong" : "text-white")}>
        {label}
      </span>
      {note ? (
        <span className={cn("text-sm", tone === "dark" ? "text-ink-faint" : "text-white/70")}>
          {note}
        </span>
      ) : null}
    </div>
  );
}
