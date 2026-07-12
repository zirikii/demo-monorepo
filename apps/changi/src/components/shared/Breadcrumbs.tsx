import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface Crumb {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center gap-1.5 text-sm", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Fragment key={item.label}>
            {item.to && !isLast ? (
              <Link to={item.to} className="text-white/70 hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-semibold text-white" : "text-white/70"}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="size-4 text-white/40" aria-hidden />}
          </Fragment>
        );
      })}
    </nav>
  );
}
