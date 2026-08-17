import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/data/nav";
import { FOOTER_DISCLAIMER, SITE } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-h24-navy-deep text-h24-sky">
      <div className="container-h24-wide py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.4fr]">
          <div className="flex flex-col gap-5">
            <Link to="/" className="focus-h24 w-fit" aria-label="HUB24 home">
              <BrandLogo tone="light" className="h-8" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed">{SITE.purpose}</p>
            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex gap-2">
                <dt className="text-h24-aqua">Advisers</dt>
                <dd className="font-semibold text-white">{SITE.adviserPhone}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-h24-aqua">Investors</dt>
                <dd className="font-semibold text-white">{SITE.investorPhone}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-h24-aqua">Head office</dt>
                <dd className="text-white">{SITE.headOffice}</dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <nav key={column.heading} aria-label={column.heading} className="flex flex-col gap-3">
                <p className="text-xs font-bold tracking-[0.16em] text-h24-aqua uppercase">
                  {column.heading}
                </p>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="focus-h24 text-sm transition hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-h24-wide flex flex-col gap-4 py-8 text-xs leading-relaxed">
          {FOOTER_DISCLAIMER.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            {SITE.legalName} (ABN {SITE.abn}, {SITE.ticker}) is referenced here for demonstration
            purposes only. HUB24 Custodial Services Ltd is the operator of HUB24 Invest and the
            promoter of the HUB24 Super Fund; the trustee of HUB24 Super is HTFS Nominees Pty Limited.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="focus-h24 font-semibold transition hover:text-white">
                {link.label}
              </Link>
            ))}
            <span className="ml-auto">© {new Date().getFullYear()} HUB24 demo build</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
