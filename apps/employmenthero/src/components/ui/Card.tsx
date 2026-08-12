import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function Card({ children, className, padded = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-eh-lg border border-line bg-white shadow-eh",
        padded && "p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface LinkCardProps extends CardProps {
  to: string;
}

export function LinkCard({ to, children, className, padded = true }: LinkCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        "focus-eh block rounded-eh-lg border border-line bg-white shadow-eh transition hover:-translate-y-0.5 hover:border-eh-violet-soft hover:shadow-eh-lift",
        padded && "p-6",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function CardHeading({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-bold text-ink-strong", className)}>{children}</h3>;
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[0.95rem] leading-relaxed text-ink-soft", className)}>{children}</p>;
}
