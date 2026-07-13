import { Link } from "react-router-dom";
import { footerColumns } from "@/data/nav";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-line bg-ink-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-black tracking-wide">{col.heading}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-white/70 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h3 className="text-lg font-black">Download Changi App</h3>
            <p className="mt-2 max-w-md text-sm text-white/70">
              Stay up to date on flight status, pin flights, and unlock exclusive in-app features.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <img src="/brand/icons/app-store.svg" alt="Download on the App Store" className="h-10 w-auto" />
              <img src="/brand/icons/google-play.svg" alt="Get it on Google Play" className="h-10 w-auto" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-black">Follow us</h3>
            <p className="mt-2 text-sm text-white/70">
              Sign up for a Changi Account to receive the latest updates
            </p>
            <Link
              to="/signup"
              className="mt-4 inline-flex rounded-md bg-purple px-4 py-2.5 text-sm font-bold text-white hover:bg-purple-deep"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            <span>Changi Sites : Airport</span>
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              By-laws & Conditions of Use
            </Link>
          </div>
          <p>© {year} Changi Airport — Unofficial demo</p>
        </div>
      </div>
    </footer>
  );
}
