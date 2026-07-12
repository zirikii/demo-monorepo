import Link from "next/link";
import { Logo } from "./Logo";

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Shop",
    links: [
      { label: "Mobile plans", href: "/mobile" },
      { label: "Broadband", href: "/broadband" },
      { label: "Travel & roaming", href: "/roaming" },
      { label: "Promotions", href: "/shop/promotions/travel-and-move" },
    ],
  },
  {
    heading: "My Spark",
    links: [
      { label: "Account overview", href: "/dashboard" },
      { label: "Usage", href: "/usage" },
      { label: "Bills", href: "/bills" },
      { label: "Add-ons", href: "/addons" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About this demo", href: "/" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Store finder", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-spark-ink text-white/90">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo variant="white" height={30} />
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Mobile, broadband and travel — sorted. Bringing New Zealanders together through
              better connections.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-white/15 pt-6 text-xs text-white/60">
          <p>
            Unofficial demo &middot; Not affiliated with, endorsed by, or sponsored by Spark New
            Zealand Trading Limited. Brand logos are sourced from public Spark web pages for
            UI/UX fidelity only; all copy and data are fictional.
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} Spark NZ demo. Built for demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
