import { cn } from "@/lib/cn";

export function StatTile({
  value,
  label,
  detail,
  tone = "light",
}: {
  value: string;
  label: string;
  detail?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 rounded-go-lg p-6",
        tone === "dark" ? "bg-white/5 ring-1 ring-white/10" : "bg-surface-tint",
      )}
    >
      <span
        className={cn(
          "display-go text-4xl sm:text-5xl",
          tone === "dark" ? "text-white" : "text-ink-strong",
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "text-sm font-extrabold tracking-wide uppercase",
          tone === "dark" ? "text-go-green-soft" : "text-go-green",
        )}
      >
        {label}
      </span>
      {detail ? (
        <span className={cn("text-sm", tone === "dark" ? "text-white/60" : "text-ink-soft")}>
          {detail}
        </span>
      ) : null}
    </div>
  );
}
