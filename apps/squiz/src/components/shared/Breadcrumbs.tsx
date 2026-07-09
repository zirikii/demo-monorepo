import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-faint">
        <li>
          <Link to="/" className="hover:text-navy hover:underline">
            Home
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <Fragment key={crumb.label}>
            <ChevronRight className="size-3.5" aria-hidden />
            <li aria-current={crumb.to ? undefined : "page"}>
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-navy hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-navy">{crumb.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
