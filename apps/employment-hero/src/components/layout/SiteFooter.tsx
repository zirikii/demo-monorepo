import { Link } from "react-router-dom";
import { footerColumns } from "@/data/nav";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="container-eh grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <img src="/brand/logo-white.svg" alt="Employment Hero" className="h-8 w-auto" />
          <p className="mt-4 text-sm leading-relaxed text-white/70">{site.tagline}</p>
          <p className="mt-6 text-xs text-white/45">{site.disclaimer}</p>
        </div>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/55">{col.title}</h2>
            <ul className="mt-4 space-y-2">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="focus-eh text-sm text-white/85 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-eh flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-white/45">
          <p>© {new Date().getFullYear()} Employment Hero demo. Not affiliated with Employment Hero Pty Ltd.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="focus-eh hover:text-white">Privacy</Link>
            <Link to="/terms" className="focus-eh hover:text-white">Terms</Link>
            <Link to="/security" className="focus-eh hover:text-white">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
