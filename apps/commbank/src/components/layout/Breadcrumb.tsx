import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; to?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-page py-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
        <li>
          <Link to="/" className="focus-ring rounded hover:text-black hover:underline">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden="true" className="h-3 w-3" />
            {item.to && index < items.length - 1 ? (
              <Link to={item.to} className="focus-ring rounded hover:text-black hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
