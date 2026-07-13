import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  tone?: "ok" | "warn" | "info" | "muted" | "purple";
  className?: string;
};

const tones = {
  ok: "bg-green/10 text-green",
  warn: "bg-danger/10 text-danger",
  info: "bg-purple/10 text-purple",
  muted: "bg-surface text-ink-soft",
  purple: "bg-purple text-white",
};

export function Badge({ children, tone = "muted", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
