import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            {index > 0 ? <ChevronRight aria-hidden className="h-3.5 w-3.5" /> : null}
            {item.to ? (
              <Link to={item.to} className="focus-hub hover:text-white hover:underline">
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
