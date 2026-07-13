import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "link" | "purple";

const styles: Record<Variant, string> = {
  primary: "bg-ink-deep text-white hover:bg-ink",
  secondary: "bg-white text-ink border border-line hover:bg-surface",
  ghost: "bg-transparent text-ink hover:bg-sand",
  link: "bg-transparent text-purple underline-offset-4 hover:underline px-0",
  purple: "bg-purple text-white hover:bg-purple-deep",
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
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-bold tracking-wide transition-colors disabled:opacity-50",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
