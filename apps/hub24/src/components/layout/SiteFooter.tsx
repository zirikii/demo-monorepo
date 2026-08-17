import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/data/nav";
import { SITE } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-hub-navy-deep text-white">
      <div className="container-hub-wide grid gap-10 py-14 lg:grid-cols-[1.1fr_3fr]">
        <div className="flex flex-col gap-5">
          <BrandLogo tone="light" descriptor="Platform · Technology · Data" />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">{SITE.intro}</p>
          <div className="flex flex-col gap-1 text-sm text-white/70">
            <span>
              Advisers{" "}
              <a
                href={`tel:${SITE.phones.advisers.replace(/\s/g, "")}`}
                className="focus-hub font-bold text-white"
              >
                {SITE.phones.advisers}
              </a>
            </span>
            <span>
              Investors{" "}
              <a
                href={`tel:${SITE.phones.investors.replace(/\s/g, "")}`}
                className="focus-hub font-bold text-white"
              >
                {SITE.phones.investors}
              </a>
            </span>
            <span>{SITE.hours}</span>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            {SITE.socials.map((social) => (
              <Link
                key={social.label}
                to={social.to}
                className="focus-hub rounded-full border border-white/25 px-3 py-1 font-semibold text-white/80 transition hover:border-hub-teal-soft hover:text-white"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <p className="text-xs font-extrabold tracking-[0.14em] text-hub-teal-soft uppercase">
                {column.heading}
              </p>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="focus-hub text-sm text-white/75 transition hover:text-white"
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

      <div className="border-t border-white/10">
        <div className="container-hub-wide flex flex-col gap-4 py-8 text-xs leading-relaxed text-white/55">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="focus-hub font-semibold text-white/75 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p>{SITE.disclaimer}</p>
          <p>{SITE.regulatory}</p>
          <p>
            © {new Date().getFullYear()} {SITE.legalName} demo build ({SITE.ticker}, {SITE.abn}).
            Figures shown across this site are illustrative demo data.
          </p>
        </div>
      </div>
    </footer>
  );
}
