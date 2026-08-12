import { Link } from "react-router-dom";
import { Logo } from "@/components/brand/Logo";
import { footerGroups, legalLinks } from "@/data/nav";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-eh-ink text-white">
      <div className="container-eh py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2.8fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              The Employment Operating System for hiring, HR, payroll and employee benefits.
            </p>
            <p className="mt-6 text-sm text-white/70">
              {site.phone}
              <br />
              {site.address}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.heading}>
                <p className="text-xs font-bold tracking-[0.14em] text-white/50 uppercase">
                  {group.heading}
                </p>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link
                        to={link.to}
                        className="focus-eh text-sm text-white/80 transition hover:text-white"
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

        <div className="mt-12 rounded-eh-lg border border-white/12 bg-white/5 p-6">
          <p className="text-xs font-bold tracking-[0.14em] text-white/50 uppercase">
            Acknowledgement of Country
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/75">
            {site.acknowledgement}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/12 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            Unofficial demo build. Not affiliated with, endorsed by, or connected to Employment
            Hero Pty Ltd.
          </p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
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
