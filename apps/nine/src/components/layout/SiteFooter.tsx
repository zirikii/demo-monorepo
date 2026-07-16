import { Link } from "react-router-dom";
import { NineLogo } from "@/components/brand/NineLogo";
import { footerColumns } from "@/data/nav";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-nine-line bg-nine-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-5">
        <div className="md:col-span-1">
          <Link to="/" className="inline-flex text-white no-underline" aria-label="nine.com.au home">
            <NineLogo className="h-6 w-auto" />
          </Link>
          <p className="mt-4 text-sm text-white/65">
            Australia’s home for news, sport, lifestyle, travel, entertainment and shopping.
          </p>
          <p className="mt-3 text-xs text-white/45">Unofficial demo — not affiliated with Nine Entertainment.</p>
        </div>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-nine-cyan">{col.title}</h2>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.to + l.label}>
                  <Link to={l.to} className="text-sm text-white/75 no-underline hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/45">
        © {new Date().getFullYear()} nine.com.au demo
      </div>
    </footer>
  );
}
