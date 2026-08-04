import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; to?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line-soft bg-surface-tint">
      <ol className="container-cba flex flex-wrap items-center gap-1 py-2.5 text-[13px] text-ink-soft">
        <li>
          <Link to="/" className="focus-cba hover:text-ink hover:underline">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <Fragment key={`${item.label}-${index}`}>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              {item.to ? (
                <Link to={item.to} className="focus-cba hover:text-ink hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-bold text-ink">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
