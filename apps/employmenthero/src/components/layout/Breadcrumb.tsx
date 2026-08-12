import { Fragment } from "react";
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
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm",
        tone === "dark" ? "text-eh-violet-soft" : "text-ink-faint",
        className,
      )}
    >
      {items.map((item, index) => (
        <Fragment key={`${item.label}-${index}`}>
          {index > 0 ? <ChevronRight aria-hidden className="h-3.5 w-3.5 opacity-60" /> : null}
          {item.to ? (
            <Link to={item.to} className="focus-eh hover:underline">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="font-semibold">
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
