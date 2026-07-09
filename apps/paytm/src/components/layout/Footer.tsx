import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import {
  footerGroups,
  trustBadges,
  paymentNetworks,
  socialLinks,
} from "../../data/footerLinks";

/** Mega-footer: trust tiles, accordion link groups, networks, socials, cyan/navy stripe. */
export function Footer() {
  return (
    <footer className="mt-16 border-t border-hairline bg-card">
      <TrustRow />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FooterAccordions />
        <div className="flex flex-col items-start justify-between gap-6 border-t border-hairline py-8 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <img src="/brand/paytm-logo.svg" alt="Paytm" className="h-7" />
            <p className="text-xs text-ink-soft">
              Unofficial demo build — not affiliated with Paytm or One97 Communications.
            </p>
          </div>
          <ul className="flex items-center gap-3" aria-label="Payment networks">
            {paymentNetworks.map((n) => (
              <li key={n.label}>
                <img src={n.icon} alt={n.label} title={n.label} className="h-6 w-auto" />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-hairline py-6 md:flex-row md:items-center">
          <p className="text-xs text-ink-faint">© 2026 Paytm Demo · Built for internal demos only</p>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-ink-soft">Follow Us</span>
            <ul className="flex items-center gap-3" aria-label="Social media">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="block rounded-full opacity-80 transition-opacity hover:opacity-100"
                  >
                    <img src={s.icon} alt="" aria-hidden="true" className="h-6 w-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="h-1.5 bg-paytm-cyan" />
      <div aria-hidden="true" className="h-2.5 bg-paytm-navy" />
    </footer>
  );
}

function TrustRow() {
  return (
    <div className="border-b border-hairline bg-surface-soft">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
        {trustBadges.map((badge) => (
          <div key={badge.title} className="flex items-start gap-4">
            <img src={badge.icon} alt="" aria-hidden="true" className="h-10 w-10 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-paytm-navy">{badge.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">{badge.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterAccordions() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-hairline py-2">
      {footerGroups.map((group) => {
        const open = openId === group.id;
        return (
          <div key={group.id}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`footer-${group.id}`}
              onClick={() => setOpenId(open ? null : group.id)}
              className="flex w-full items-center gap-3 py-3.5 text-left text-sm font-semibold text-ink hover:text-paytm-navy"
            >
              {open ? (
                <Minus aria-hidden="true" className="h-3.5 w-3.5 text-paytm-cyan" />
              ) : (
                <Plus aria-hidden="true" className="h-3.5 w-3.5 text-ink-faint" />
              )}
              {group.heading}
            </button>
            {open ? (
              <div id={`footer-${group.id}`} className="flex flex-wrap gap-x-6 gap-y-2 pb-4 pl-6">
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-[13px] text-ink-soft hover:text-paytm-cyan"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
