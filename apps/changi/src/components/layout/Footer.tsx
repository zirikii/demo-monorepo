import { Link } from "react-router-dom";
import { company } from "@/data/company";
import { ChangiLogo } from "@/components/brand/ChangiLogo";

export function Footer() {
  return (
    <footer className="bg-plum text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <ChangiLogo light globeSize={48} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {company.footerBlurb}
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-white/50">
              {company.brandPromise}
            </p>

            <div className="mt-6">
              <p className="text-sm font-semibold text-white/90">Follow us</p>
              <ul className="mt-3 flex flex-wrap gap-3">
                {company.socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                    >
                      <img src={social.icon} alt="" aria-hidden className="size-4 brightness-0 invert" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {company.footerColumns.map((col) => (
              <div key={col.heading}>
                <p className="text-sm font-bold uppercase tracking-wider text-white/90">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label + link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-white/70 transition-colors hover:text-white"
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

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name} — unofficial demo. Not affiliated with Changi Airport Group.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/help" className="hover:text-white">
              By-laws & Conditions of Use
            </Link>
            <Link to="/help" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
