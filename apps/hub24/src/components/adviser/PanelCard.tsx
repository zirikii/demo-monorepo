import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

interface PanelCardProps {
  title: string;
  action?: { label: string; to: string };
  children: ReactNode;
  className?: string;
}

export function PanelCard({ title, action, children, className }: PanelCardProps) {
  return (
    <section className={cn("rounded-hub-lg border border-line bg-white shadow-hub", className)}>
      <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <h2 className="text-sm font-extrabold tracking-[0.1em] text-ink-faint uppercase">
          {title}
        </h2>
        {action ? (
          <Link
            to={action.to}
            className="focus-hub text-sm font-bold text-hub-blue hover:underline"
          >
            {action.label}
          </Link>
        ) : null}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}
