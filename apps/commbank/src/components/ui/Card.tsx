import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn("rounded-cba-lg border border-line-soft bg-surface p-6 shadow-cba", className)}
    >
      {children}
    </div>
  );
}

export function LinkCard({
  to,
  title,
  body,
  className,
  eyebrow,
}: {
  to: string;
  title: string;
  body: string;
  className?: string;
  eyebrow?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "focus-cba group flex h-full flex-col rounded-cba-lg border border-line-soft bg-surface p-6 shadow-cba transition-shadow hover:shadow-cba-lift",
        className,
      )}
    >
      {eyebrow ? (
        <span className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-faint">
          {eyebrow}
        </span>
      ) : null}
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-ink underline underline-offset-4 group-hover:text-ink-soft">
        Learn more
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
