import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nine-cyan disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-nine-ink text-white hover:bg-nine-ink/90",
  secondary: "border border-nine-ink/20 bg-white text-nine-ink hover:border-nine-cyan hover:text-nine-blue",
  ghost: "text-nine-ink hover:bg-nine-wash",
  danger: "bg-nine-live text-white hover:bg-nine-live/90",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { to: string } & Omit<ComponentProps<typeof Link>, "to" | "className" | "children">;
type AsButton = Common & { to?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  if ("to" in rest && rest.to !== undefined) {
    const { to, ...linkRest } = rest as AsLink;
    return (
      <Link to={to} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...(rest as AsButton)}>
      {children}
    </button>
  );
}
