import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/data/nav";
import { DISCLAIMER, LEGAL_FOOTNOTE, SITE } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-hub-navy-deep text-white">
      <div className="container-hub-wide py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.4fr]">
          <div className="flex flex-col gap-5">
            <BrandLogo tone="light" />
            <p className="max-w-xs text-sm leading-relaxed text-white/70">{SITE.descriptor}</p>
            <div className="flex flex-col gap-1 text-sm text-white/70">
              <span className="font-bold text-white">Talk to us</span>
              <a href={`tel:${SITE.supportPhone.replace(/\s/g, "")}`} className="focus-hub hover:underline">
                Advisers {SITE.supportPhone}
              </a>
              <a href={`tel:${SITE.investorPhone.replace(/\s/g, "")}`} className="focus-hub hover:underline">
                Investors {SITE.investorPhone}
              </a>
              <span>{SITE.postal}</span>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading} className="flex flex-col gap-3">
                <p className="text-xs font-bold tracking-[0.14em] text-hub-teal-soft uppercase">
                  {column.heading}
                </p>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link to={link.to} className="focus-hub text-sm text-white/70 transition hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 max-w-4xl text-xs leading-relaxed text-white/50">{LEGAL_FOOTNOTE}</p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60">
          <p>
            © {new Date().getFullYear()} {SITE.name} demo. {DISCLAIMER}
          </p>
          <div className="flex flex-wrap gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="focus-hub transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
