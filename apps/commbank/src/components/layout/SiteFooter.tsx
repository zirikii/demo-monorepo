import { Link } from "react-router-dom";
import { footerColumns } from "@/data/nav";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-cba-black text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {footerColumns.map((col) => (
          <div key={col.heading}>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-cba-yellow">{col.heading}</p>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.to + link.label}>
                  <Link to={link.to} className="text-sm text-white/80 hover:text-cba-yellow">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-white/60 sm:px-6">
          <p>
            Unofficial demo — not affiliated with Commonwealth Bank of Australia. No real banking, payments, or
            advice. Product names and branding are used for demonstration only.
          </p>
          <p>Things you should know: rates, fees, and offers shown are illustrative dummy data for this demo.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="hover:text-cba-yellow">
              Privacy
            </Link>
            <Link to="/accessibility" className="hover:text-cba-yellow">
              Accessibility
            </Link>
            <Link to="/security" className="hover:text-cba-yellow">
              Security
            </Link>
            <Link to="/sitemap" className="hover:text-cba-yellow">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
