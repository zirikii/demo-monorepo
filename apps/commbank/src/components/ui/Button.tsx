import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-cba-yellow text-cba-ink hover:bg-cba-yellow-deep",
  secondary: "bg-cba-ink text-white hover:bg-cba-ink-soft",
  outline: "border border-cba-ink bg-white text-cba-ink hover:bg-cba-neutral",
  danger: "bg-cba-critical text-white hover:opacity-90",
};

export function buttonClasses(variant: Variant = "primary"): string {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
  );
}

export function Button({
  variant = "primary",
  type = "button",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <button type={type} className={cn(buttonClasses(variant), className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  to,
  children,
  variant = "primary",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link to={to} className={cn(buttonClasses(variant), className)}>
      {children}
    </Link>
  );
}
