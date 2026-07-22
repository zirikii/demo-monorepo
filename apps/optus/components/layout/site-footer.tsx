import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Shop",
    links: [
      { href: "/mobile-plans", label: "Mobile plans" },
      { href: "/home-internet", label: "Home internet" },
      { href: "/phones", label: "Phones" },
      { href: "/entertainment", label: "Entertainment" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/support", label: "Support" },
      { href: "/pricing", label: "Pricing" },
      { href: "/login", label: "My Optus login" },
      { href: "/settings", label: "Account settings" },
    ],
  },
  {
    title: "My Optus",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/usage", label: "Usage" },
      { href: "/add-ons", label: "Add-ons" },
      { href: "/bills", label: "Bills" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-optus-ink text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div>
          <img src="/brand/logo-white.svg" alt="Optus" className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-white/70">Unofficial demo recreation of an Optus Australia consumer telco site and My Optus portal. Not affiliated with Singtel Optus Pty Limited.</p>
        </div>
        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white/90">{col.title}</h3>
            <ul className="mt-4 space-y-2">
              {col.links.map((link) => (<li key={link.href + link.label}><Link href={link.href} className="text-sm text-white/70 hover:text-white">{link.label}</Link></li>))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10"><div className="container flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Optus Australia demo - for demonstration only.</p><p>Self-hosted demo assets; no external Optus services are contacted.</p></div></div>
    </footer>
  );
}
