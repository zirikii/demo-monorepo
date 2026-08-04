import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  tone = "yellow",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "yellow" | "blue" | "neutral" | "success";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide",
        tone === "yellow" && "bg-cba-yellow text-cba-black",
        tone === "blue" && "bg-cba-blue-soft text-cba-blue",
        tone === "neutral" && "bg-surface text-ink-soft",
        tone === "success" && "bg-emerald-50 text-success",
        className,
      )}
    >
      {children}
    </span>
  );
}
