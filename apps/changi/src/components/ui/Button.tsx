import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "primary-dark" | "secondary" | "secondary-dark" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Light surfaces: magenta pill with white text
  primary: "bg-magenta text-white hover:bg-magenta-deep",
  // Dark surfaces: white pill with magenta text
  "primary-dark": "bg-white text-magenta hover:bg-sand",
  secondary: "border-2 border-magenta text-magenta hover:bg-magenta hover:text-white",
  "secondary-dark": "border-2 border-white text-white hover:bg-white hover:text-magenta",
  ghost: "text-magenta underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = ButtonBaseProps & { to: string } & Omit<
    ComponentProps<typeof Link>,
    "to" | "className" | "children"
  >;
type ButtonAsButton = ButtonBaseProps & { to?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", withArrow = false, className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {withArrow && <ArrowRight className="size-4" aria-hidden />}
    </>
  );

  if ("to" in rest && rest.to !== undefined) {
    const { to, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link to={to} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }
  return (
    <button className={classes} {...(rest as Omit<ButtonAsButton, keyof ButtonBaseProps>)}>
      {content}
    </button>
  );
}
