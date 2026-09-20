import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold transition focus-go disabled:cursor-not-allowed disabled:opacity-50 rounded-full";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-go-green text-black hover:bg-go-green-hover",
  secondary: "border border-white/25 bg-transparent text-white hover:border-white hover:bg-white/5",
  ghost: "text-white hover:text-go-green",
  inverse: "bg-white text-black hover:bg-white/90",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return cn(BASE, VARIANTS[variant], SIZES[size]);
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonClasses(variant, size), className)} {...props}>
      {children}
    </button>
  );
}

interface ButtonLinkProps {
  to: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ to, variant = "primary", size = "md", className, children }: ButtonLinkProps) {
  return (
    <Link to={to} className={cn(buttonClasses(variant, size), className)}>
      {children}
    </Link>
  );
}
