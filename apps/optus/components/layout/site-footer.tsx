import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Shop",
    links: [
      { href: "/mobile-plans", label: "Mobile plans" },
      { href: "/phones", label: "Phones" },
      { href: "/internet", label: "nbn & 5G Home Internet" },
      { href: "/prepaid", label: "Prepaid" },
      { href: "/deals", label: "Deals" },
    ],
  },
  {
    title: "Entertainment",
    links: [
      { href: "/entertainment", label: "Optus Sport" },
      { href: "/entertainment", label: "Optus SubHub" },
      { href: "/deals", label: "Bundle offers" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/stores", label: "Store finder" },
      { href: "/login", label: "My Optus login" },
      { href: "/settings", label: "Account settings" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-optus-ink text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-white.svg" alt="Optus" className="h-6 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Unofficial demo recreation of the Optus website and My Optus account. Not affiliated
            with Singtel Optus Pty Limited.
          </p>
        </div>
        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {col.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Optus demo — for demonstration only.</p>
          <p>Yes is a demo. Brand palette approximates public optus.com.au styling.</p>
        </div>
      </div>
    </footer>
  );
}
