import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

export interface Crumb {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
  tone?: "light" | "dark";
  className?: string;
}

export function Breadcrumb({ items, tone = "light", className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.to && !last ? (
                <Link
                  to={item.to}
                  className={cn(
                    "focus-h24 transition hover:underline",
                    tone === "dark" ? "text-h24-aqua" : "text-h24-teal-dark",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={tone === "dark" ? "text-white" : "text-ink-faint"}
                >
                  {item.label}
                </span>
              )}
              {last ? null : (
                <ChevronRight
                  aria-hidden
                  className={cn("h-3.5 w-3.5", tone === "dark" ? "text-h24-sky/60" : "text-ink-ghost")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
