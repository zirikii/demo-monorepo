import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

interface PanelCardProps {
  title: string;
  subtitle?: string;
  action?: { label: string; to: string };
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function PanelCard({
  title,
  subtitle,
  action,
  children,
  className,
  bodyClassName,
}: PanelCardProps) {
  return (
    <section className={cn("rounded-eh-lg border border-line bg-white", className)}>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <h2 className="text-base font-extrabold tracking-tight text-ink-strong">{title}</h2>
          {subtitle ? <p className="text-sm text-ink-faint">{subtitle}</p> : null}
        </div>
        {action ? (
          <Link
            to={action.to}
            className="focus-eh text-sm font-bold text-eh-purple hover:underline"
          >
            {action.label}
          </Link>
        ) : null}
      </header>
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}
