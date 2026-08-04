import { AtSign, Globe2, MessageCircle, Phone, Radio } from "lucide-react";
import { Link } from "react-router-dom";

const groups = [
  {
    title: "Products",
    links: [
      ["Bank accounts", "/banking"],
      ["Credit cards", "/credit-cards"],
      ["Home loans", "/home-loans"],
      ["Insurance", "/insurance"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Help centre", "/support"],
      ["Contact us", "/contact"],
      ["Find a branch", "/locations"],
      ["Security", "/support/security"],
    ],
  },
  {
    title: "About",
    links: [
      ["About this demo", "/about"],
      ["News and insights", "/news"],
      ["Legal disclosure", "/legal"],
      ["Accessibility", "/legal"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-cba-ink text-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.2fr_2fr]">
        <div>
          <img className="h-12 rounded-lg bg-white px-2" src="/brand/commbank-logo.svg" alt="CommBank" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/75">
            This is an unofficial demonstration. It is not affiliated with CommBank and cannot
            access accounts, move money or provide financial advice.
          </p>
          <div className="mt-6 flex gap-3" aria-label="Display-only social links">
            <Globe2 aria-hidden="true" className="h-5 w-5" />
            <AtSign aria-hidden="true" className="h-5 w-5" />
            <Radio aria-hidden="true" className="h-5 w-5" />
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="font-semibold text-cba-yellow">{group.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                {group.links.map(([label, to]) => (
                  <li key={`${label}-${to}`}><Link className="hover:text-white" to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Unofficial CommBank demo. All data and rates are fictional.</p>
          <div className="flex gap-5">
            <span className="flex items-center gap-1"><Phone aria-hidden="true" className="h-3.5 w-3.5" /> 13 22 21 (display only)</span>
            <span className="flex items-center gap-1"><MessageCircle aria-hidden="true" className="h-3.5 w-3.5" /> Demo support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
