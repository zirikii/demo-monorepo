import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "white" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-agl-blue text-white hover:bg-agl-blue-hover focus-visible:outline-agl-blue",
  secondary: "border-2 border-agl-blue text-agl-blue hover:bg-agl-sky focus-visible:outline-agl-blue",
  ghost: "text-agl-blue hover:bg-agl-sky focus-visible:outline-agl-blue",
  white: "bg-white text-agl-blue hover:bg-agl-sky focus-visible:outline-white",
  danger: "bg-critical text-white hover:bg-[#a30f27] focus-visible:outline-critical",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[15px]",
  lg: "h-13 px-8 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, type = "button", ...props },
  ref,
) {
  return <button ref={ref} type={type} className={buttonClasses(variant, size, className)} {...props} />;
});

type ButtonLinkProps = LinkProps & { variant?: Variant; size?: Size };

export function ButtonLink({ variant = "primary", size = "md", className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, typeof className === "string" ? className : undefined)} {...props} />;
}
