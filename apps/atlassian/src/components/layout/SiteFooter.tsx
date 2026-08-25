import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/data/nav";
import { DISCLAIMER, REGIONS, SITE } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white text-ink">
      <div className="container-atl-wide py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.4fr]">
          <div className="flex flex-col gap-5">
            <BrandLogo />
            <p className="max-w-xs text-sm leading-relaxed text-ink-faint">{SITE.descriptor}</p>
            <a
              href={`mailto:${SITE.salesEmail}`}
              className="focus-atl text-sm text-ink-faint hover:text-atl-blue"
            >
              {SITE.salesEmail}
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading} className="flex flex-col gap-3">
                <p className="text-xs font-bold tracking-[0.14em] text-ink-strong uppercase">
                  {column.heading}
                </p>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link
                        to={link.to}
                        className="focus-atl text-sm text-ink-soft transition hover:text-atl-blue"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line-soft pt-8">
          <span className="text-xs font-bold tracking-[0.14em] text-ink-strong uppercase">Region</span>
          {REGIONS.map((region) => (
            <Link
              key={region.code}
              to={region.to}
              className="focus-atl text-sm text-ink-soft transition hover:text-atl-blue"
            >
              {region.name}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-8 text-sm text-ink-faint">
          <p>
            © {new Date().getFullYear()} {SITE.name} demo. {DISCLAIMER}
          </p>
          <div className="flex flex-wrap gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="focus-atl transition hover:text-atl-blue">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
