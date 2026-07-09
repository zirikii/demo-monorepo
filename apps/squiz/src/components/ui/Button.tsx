import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "primary-dark" | "secondary" | "secondary-dark" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-pop disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Light surfaces: navy pill with mint text (squiz.net primary style)
  primary: "bg-navy text-mint hover:bg-navy/90",
  // Dark surfaces: mint pill with navy text
  "primary-dark": "bg-mint text-navy hover:bg-cream",
  secondary: "border-2 border-navy text-navy hover:bg-navy hover:text-mint",
  "secondary-dark": "border-2 border-white text-white hover:bg-white hover:text-navy",
  ghost: "text-navy underline-offset-4 hover:underline",
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
  const {
    variant = "primary",
    size = "md",
    withArrow = false,
    className,
    children,
    ...rest
  } = props;
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
