import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { FOOTER_COLUMNS, LEGAL_LINKS } from "@/data/nav";
import { ACKNOWLEDGEMENT, DISCLAIMER, REGIONS, SITE } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-eh-purple-night text-white">
      <div className="container-eh-wide py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.4fr]">
          <div className="flex flex-col gap-5">
            <BrandLogo tone="light" />
            <p className="max-w-xs text-sm leading-relaxed text-eh-violet-soft">
              {SITE.descriptor}
            </p>
            <div className="flex flex-col gap-1 text-sm text-eh-violet-soft">
              <span className="font-bold text-white">Talk to us</span>
              <a href={`tel:${SITE.supportPhone.replace(/\s/g, "")}`} className="focus-eh hover:underline">
                {SITE.supportPhone}
              </a>
              <a href={`mailto:${SITE.salesEmail}`} className="focus-eh hover:underline">
                {SITE.salesEmail}
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading} className="flex flex-col gap-3">
                <p className="text-xs font-extrabold tracking-[0.14em] text-eh-violet uppercase">
                  {column.heading}
                </p>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link
                        to={link.to}
                        className="focus-eh text-sm text-eh-violet-soft transition hover:text-white"
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

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-8">
          <span className="text-xs font-extrabold tracking-[0.14em] text-eh-violet uppercase">
            Pick your region
          </span>
          {REGIONS.map((region) => (
            <Link
              key={region.code}
              to={region.to}
              className="focus-eh text-sm text-eh-violet-soft transition hover:text-white"
            >
              {region.name}
            </Link>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-eh-violet-soft">{ACKNOWLEDGEMENT}</p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-eh-violet-soft">
          <p>
            © {new Date().getFullYear()} {SITE.name} demo. {DISCLAIMER}
          </p>
          <div className="flex flex-wrap gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="focus-eh transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
