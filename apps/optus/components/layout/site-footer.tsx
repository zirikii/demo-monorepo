import Link from "next/link";

const groups = [
  { title: "Shop", links: ["Mobile", "Prepaid", "Internet", "Support"] },
  { title: "My Optus", links: ["Dashboard", "Usage", "Bills", "Add-ons"] },
  { title: "About", links: ["Network", "Stores", "Contact", "Privacy"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-optus-navy text-white">
      <div className="container grid gap-8 py-10 md:grid-cols-[1.4fr_2fr]">
        <div>
          <img src="/brand/logo-white.svg" alt="Optus" className="h-10 w-auto" />
          <p className="mt-4 max-w-md text-sm text-white/75">
            Unofficial demo recreation of the Optus website and My Optus dashboard. Not affiliated
            with Singtel Optus Pty Limited.
          </p>
          <p className="mt-4 text-xs text-white/60">
            Optus acknowledges the Traditional Custodians of lands, waters and skies across
            Australia.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-bold">{group.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="hover:text-white">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
