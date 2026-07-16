import { Link } from "react-router-dom";
import { footerColumns } from "@/data/nav";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-line bg-nine-ink text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <img src="/brand/logo-white.svg" alt="nine.com.au" className="h-7 w-auto" />
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Australia&apos;s home for trusted news, sport, lifestyle, travel, entertainment and
              shopping.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-4 md:max-w-2xl">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-white/50">
                  {col.heading}
                </p>
                <ul className="space-y-1.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-white/80 hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} nine.com.au (Demo). Unofficial demo — not affiliated with Nine Entertainment Co.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
