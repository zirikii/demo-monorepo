import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "danger" | "soft";

const variants: Record<Variant, string> = {
  primary:
    "bg-optus text-noc-bg hover:bg-optus-bright shadow-[0_0_24px_rgb(0_196_184_/_25%)]",
  soft: "bg-noc-elevated text-noc-fg border border-noc-line hover:border-optus/50",
  ghost: "bg-transparent text-noc-fg border border-noc-line hover:border-optus/60",
  danger: "bg-sev-critical/90 text-white hover:bg-sev-critical",
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
