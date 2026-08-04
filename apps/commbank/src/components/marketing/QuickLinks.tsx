import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { quickLinkGroups } from "@/data/site";

/** The five-column quick-link grid directly under the homepage hero. */
export function QuickLinks() {
  return (
    <section aria-label="Explore CommBank" className="py-12 sm:py-16">
      <div className="container-cba">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {quickLinkGroups.map((group) => (
            <div key={group.id} className="border-t-4 border-cba-yellow pt-4">
              <h2 className="text-lg font-extrabold text-ink">
                <Link to={group.to} className="focus-cba hover:underline">
                  {group.heading}
                </Link>
              </h2>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="focus-cba inline-flex items-start gap-1 text-[15px] text-ink-soft hover:text-ink hover:underline"
                    >
                      <ChevronRight aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to={group.to}
                className="focus-cba mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-ink underline underline-offset-4"
              >
                {group.moreLabel}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
