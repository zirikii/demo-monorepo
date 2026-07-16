import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "live";

const styles: Record<Variant, string> = {
  primary: "bg-nine-deep text-white hover:bg-nine-ink",
  secondary: "bg-white text-ink border border-line hover:bg-surface",
  ghost: "bg-transparent text-ink hover:bg-surface",
  live: "bg-live text-white hover:brightness-95",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({ variant = "primary", className, children, ...props }: Props) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nine-deep focus-visible:ring-offset-2 disabled:opacity-50",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
