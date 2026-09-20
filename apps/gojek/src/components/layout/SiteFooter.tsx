import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { FOOTER_NAV } from "@/data/nav";
import { SITE, SOCIAL_LINKS } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-night text-white">
      <div className="container-go-wide grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div className="flex flex-col gap-5">
          <BrandLogo className="h-8" />
          <p className="max-w-sm text-sm leading-relaxed text-white/60">{SITE.description}</p>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-extrabold tracking-[0.18em] text-white/50 uppercase">
              Connect with us
            </span>
            <ul className="flex flex-wrap gap-4">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <Link
                    to={social.to}
                    className="focus-go text-sm font-bold text-white/75 underline-offset-4 hover:text-white hover:underline"
                  >
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {FOOTER_NAV.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <span className="text-xs font-extrabold tracking-[0.18em] text-white/50 uppercase">
                {column.heading}
              </span>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="focus-go text-sm font-semibold text-white/75 transition hover:text-white"
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

      <div className="border-t border-night-line">
        <div className="container-go-wide flex flex-col gap-2 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {SITE.copyright} | {new Date().getFullYear()}
          </p>
          <p className="max-w-xl sm:text-right">{SITE.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
