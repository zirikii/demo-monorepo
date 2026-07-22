import { cn } from "@/lib/utils/cn";
const toneClasses = {
  success: "bg-optus-success",
  warning: "bg-optus-warning",
  danger: "bg-optus-danger",
  neutral: "bg-slate-400",
};
export function StatusDot({ tone = "neutral" }: { tone?: keyof typeof toneClasses }) {
  return (
    <span
      className={cn("inline-block h-2.5 w-2.5 rounded-full", toneClasses[tone])}
      aria-hidden="true"
    />
  );
}
