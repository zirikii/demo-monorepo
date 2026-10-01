import { Link } from "react-router-dom";
import { LogoMark, Logo } from "@/components/Logo";
import { PRODUCTS, SOLUTIONS } from "@/data/site";

const COLUMNS: { title: string; links: [string, string][] }[] = [
  { title: "Platform", links: PRODUCTS.slice(0, 7).map((p) => [p.name, `/platform/${p.slug}`]) },
  { title: "Solutions", links: SOLUTIONS.map((s) => [s.name, `/solutions/${s.slug}`]) },
  {
    title: "Resources",
    links: [
      ["Resource hub", "/resources"],
      ["Hotel Booking Trends", "/resources/risk-resilience-revenue-australia"],
      ["Customer stories", "/customers"],
      ["Integrations", "/integrations"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About us", "/about"],
      ["Contact us", "/contact"],
      ["Get a demo", "/demo"],
      ["Login", "/login"],
      ["Support Studio (demo)", "/admin"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-stratos text-white">
      <div className="container-sm grid gap-10 py-14 md:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <Logo tone="white" className="h-6" />
          <p className="mt-4 max-w-xs text-sm text-white/65">
            The hotel commerce platform. We put 53,000+ hotels in demand with distribution, revenue and guest experience in one place.
          </p>
          <Link to="/get-started" className="btn-lime mt-6">
            Try for free
          </Link>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-white">{col.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              {col.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-sm flex flex-col gap-3 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <span className="flex items-center gap-2">
            <LogoMark tone="white" className="h-4 opacity-60" />© {new Date().getFullYear()} SiteMinder demo. Unofficial recreation, not affiliated with SiteMinder Limited.
          </span>
          <span className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookie settings</span>
            <span>Modern slavery statement</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
