import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

interface CardProps {
  to?: string;
  className?: string;
  children: ReactNode;
}

/** Rounded, shadowed surface. Renders as a link when `to` is provided. */
export function Card({ to, className, children }: CardProps) {
  const classes = cn(
    "group block overflow-hidden rounded-card border border-sand-deep bg-card shadow-card transition-shadow",
    to && "hover:shadow-float",
    className,
  );
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}
