import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 ? <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" /> : null}
            {item.to ? (
              <Link to={item.to} className="focus-go font-semibold hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-white">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
