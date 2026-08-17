import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

interface PanelCardProps {
  title: string;
  description?: string;
  action?: { label: string; to: string };
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function PanelCard({
  title,
  description,
  action,
  children,
  className,
  bodyClassName,
}: PanelCardProps) {
  return (
    <section className={cn("rounded-h24-lg border border-line bg-white shadow-h24", className)}>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <h2 className="font-display text-base font-semibold text-ink-strong">{title}</h2>
          {description ? <p className="text-sm text-ink-faint">{description}</p> : null}
        </div>
        {action ? (
          <Link
            to={action.to}
            className="focus-h24 text-sm font-semibold text-h24-teal-dark hover:underline"
          >
            {action.label}
          </Link>
        ) : null}
      </header>
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}
