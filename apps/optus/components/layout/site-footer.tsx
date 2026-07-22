import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Shop",
    links: [
      { href: "/mobile", label: "Mobile plans" },
      { href: "/home-internet", label: "Home Internet" },
      { href: "/phones", label: "Phones" },
      { href: "/deals", label: "Deals" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/login", label: "My Optus login" },
      { href: "/entertainment", label: "Entertainment" },
      { href: "/settings", label: "Account settings" },
    ],
  },
  {
    title: "About this demo",
    links: [
      { href: "/", label: "Home" },
      { href: "/signup", label: "Create demo account" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-optus-ink text-white">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-white.svg" alt="Optus" className="h-8 w-auto" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/yes-mark.svg" alt="Yes" className="h-10 w-auto" />
          <p className="text-sm text-white/70">
            Unofficial UI demo for product exploration. Not affiliated with Singtel Optus Pty
            Limited.
          </p>
        </div>
        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-optus-yellow">
              {col.title}
            </h3>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-4 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Optus demo (unofficial). Dummy data only.</p>
          <p>nbn® is a trademark of nbn co limited — used here for demo realism only.</p>
        </div>
      </div>
    </footer>
  );
}
