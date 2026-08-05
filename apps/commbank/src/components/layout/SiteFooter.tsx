import { Link } from "react-router-dom";
import { footerColumns } from "@/data/nav";

const legalLinks = [
  { label: "Important information", to: "/important-info" },
  { label: "Privacy", to: "/privacy" },
  { label: "Accessibility", to: "/accessibility" },
  { label: "CommBank Safe", to: "/support/security" },
  { label: "Contact us", to: "/support/contact-us" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-ink text-surface">
      <div className="container-cba py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-sm font-bold uppercase tracking-wider text-cba-yellow">
                {column.heading}
              </h2>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`}>
                    <Link
                      to={link.to}
                      className="focus-cba text-[14px] text-surface/80 hover:text-cba-yellow hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-surface/20 pt-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <img
              src="/brand/logo-white.svg"
              alt="CommBank"
              width={171}
              height={53}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-surface/60">
              This is an unofficial demo build of commbank.com.au created for engineering
              demonstrations. It is not affiliated with, endorsed by, or connected to Commonwealth
              Bank of Australia. All data is fictional, no real accounts exist, and no money can be
              moved.
            </p>
            <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-surface/60">
              We acknowledge the Traditional Custodians of the lands on which we work, and pay our
              respects to Elders past and present.
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="focus-cba text-[13px] text-surface/70 hover:text-cba-yellow hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-[12px] leading-relaxed text-surface/50">
          Demo content only. Things you should know: applications are subject to credit approval.
          Fees, charges, terms and conditions apply. Comparison rates shown are illustrative and
          calculated on a $150,000 secured loan over a 25 year term. WARNING: a comparison rate is
          true only for the examples given and may not include all fees and charges.
        </p>
      </div>
    </footer>
  );
}
