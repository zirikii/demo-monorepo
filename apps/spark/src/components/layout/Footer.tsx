import { footerGroups } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="spark-container py-12">
        <div className="grid gap-8 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <img src="/brand/logo.svg" alt="Spark NZ" className="h-12 w-auto brightness-0 invert" />
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/70">
              Unofficial demo page for visual fidelity testing. Not affiliated with, endorsed by, or connected to Spark New Zealand.
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white/80">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#top" className="text-sm text-white/65 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Spark NZ travel page demo. All interactions are simulated.</p>
          <p>Assets are self-hosted from public Spark web assets for demo fidelity only.</p>
        </div>
      </div>
    </footer>
  );
}
