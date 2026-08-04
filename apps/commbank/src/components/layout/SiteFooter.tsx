import { Link } from "react-router-dom";
import { CommBankLogo } from "@/components/brand/CommBankLogo";
import { footerColumns, legalNav } from "@/data/nav";

const socials = ["Facebook", "Instagram", "LinkedIn", "YouTube"];

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-black text-white">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_3fr]">
          <div>
            <CommBankLogo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              An unofficial UI demo of commbank.com.au. Not affiliated with, endorsed by, or
              connected to the Commonwealth Bank of Australia.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {socials.map((label) => (
                <li key={label}>
                  <span className="inline-flex rounded-full border border-white/25 px-3 py-1 text-xs font-medium text-white/70">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {footerColumns.map((column) => (
              <div key={column.heading}>
                <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-cba-yellow">
                  {column.heading}
                </h2>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={`${column.heading}-${link.to}`}>
                      <Link
                        to={link.to}
                        className="focus-ring rounded text-sm text-white/75 hover:text-white hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="focus-ring rounded hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="max-w-2xl leading-relaxed">
            Demo content only. In the real world: Commonwealth Bank of Australia ABN 48 123 123 124
            AFSL and Australian credit licence 234945. Rates, fees and product details shown here
            are fabricated for demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}
