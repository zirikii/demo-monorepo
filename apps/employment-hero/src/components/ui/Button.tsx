import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "lime";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-eh-purple text-white hover:bg-eh-purple-deep shadow-eh-purple",
  secondary:
    "bg-white text-eh-ink border border-eh-line hover:border-eh-purple hover:text-eh-purple",
  ghost: "bg-transparent text-eh-purple hover:bg-eh-purple-tint",
  inverse: "bg-white text-eh-purple hover:bg-eh-purple-tint",
  lime: "bg-eh-lime text-eh-ink hover:brightness-95",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-eh disabled:cursor-not-allowed disabled:opacity-60";

export type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  to,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonProps & { to: string }) {
  const isExternal = to.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={to}
        className={cn(base, variants[variant], sizes[size], className)}
        rel="noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}
