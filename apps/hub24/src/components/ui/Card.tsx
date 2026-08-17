import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  tone?: "surface" | "tint" | "navy";
  id?: string;
}

const TONES = {
  surface: "border-line bg-white",
  tint: "border-transparent bg-surface-tint",
  navy: "border-transparent bg-hub-navy text-white",
} as const;

export function Card({ children, className, tone = "surface", id }: CardProps) {
  return (
    <div id={id} className={cn("rounded-hub-lg border p-6 shadow-hub", TONES[tone], className)}>
      {children}
    </div>
  );
}

interface LinkCardProps extends CardProps {
  to: string;
}

export function LinkCard({ to, children, className, tone = "surface" }: LinkCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        "focus-hub block rounded-hub-lg border p-6 shadow-hub transition hover:-translate-y-0.5 hover:shadow-hub-lift",
        TONES[tone],
        className,
      )}
    >
      {children}
    </Link>
  );
}
