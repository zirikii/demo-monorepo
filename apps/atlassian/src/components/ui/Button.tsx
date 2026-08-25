import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse" | "danger";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "pill" | "box";

const BASE =
  "inline-flex items-center justify-center gap-2 font-medium transition focus-atl disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-atl-blue text-white hover:bg-atl-blue-hover",
  secondary: "border border-ink-strong bg-transparent text-ink-strong hover:bg-surface-deep",
  ghost: "text-atl-blue hover:bg-atl-tint",
  inverse: "bg-white text-ink-strong hover:bg-atl-tint",
  danger: "bg-critical text-white hover:brightness-110",
};

const PRODUCT_PRIMARY = "bg-atl-blue-deep text-white hover:brightness-110";

const SIZES: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-4.5 py-2.5 text-[0.95rem]",
  lg: "px-6 py-3.5 text-base",
};

const SHAPES: Record<ButtonShape, string> = {
  pill: "rounded-full",
  box: "rounded-atl-sm",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  shape: ButtonShape = "pill",
) {
  const tone = shape === "box" && variant === "primary" ? PRODUCT_PRIMARY : VARIANTS[variant];
  return cn(BASE, tone, SIZES[size], SHAPES[shape]);
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  shape = "pill",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonClasses(variant, size, shape), className)} {...props}>
      {children}
    </button>
  );
}

interface ButtonLinkProps {
  to: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  to,
  variant = "primary",
  size = "md",
  shape = "pill",
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link to={to} className={cn(buttonClasses(variant, size, shape), className)}>
      {children}
    </Link>
  );
}
