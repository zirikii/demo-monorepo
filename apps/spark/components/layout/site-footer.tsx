import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Shop",
    links: [
      { href: "/travel-packs", label: "Travel Packs" },
      { href: "/mobile-plans", label: "Mobile plans" },
      { href: "/broadband", label: "Broadband" },
      { href: "/phones", label: "Phones" },
      { href: "/deals", label: "Deals" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/stores", label: "Store finder" },
      { href: "/travel-packs", label: "Visiting NZ" },
      { href: "/login", label: "MySpark login" },
      { href: "/settings", label: "Account settings" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/entertainment", label: "Entertainment" },
      { href: "/foundation", label: "Spark Foundation" },
      { href: "/parent-hub", label: "Parent Hub" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-spark-black text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div>
          <img src="/brand/logo-white.svg" alt="Spark NZ" className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Unofficial demo recreation of Spark NZ Travel &amp; Move. Not affiliated with Spark New
            Zealand Trading Limited.
          </p>
        </div>
        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">{col.title}</h3>
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
          <p>© {new Date().getFullYear()} Spark NZ demo — for demonstration only.</p>
          <p>Brand assets sourced from public spark.co.nz pages for visual fidelity.</p>
        </div>
      </div>
    </footer>
  );
}
