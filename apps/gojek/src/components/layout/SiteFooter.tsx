import { Link } from "react-router-dom";
import { Apple, AtSign, Globe, Play, Rss, Send } from "lucide-react";
import { footerColumns } from "@/data/nav";
import { Container } from "@/components/ui/Container";

const socials = [
  { label: "Instagram", icon: AtSign },
  { label: "X (Twitter)", icon: Send },
  { label: "LinkedIn", icon: Globe },
  { label: "YouTube", icon: Rss },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <img src="/brand/logo-white.svg" alt="Gojek" className="h-7 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              One app for ride-hailing, food delivery, payments and dozens more services
              across Southeast Asia.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="rounded-full border border-white/20 p-2 text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-white/50">
                {col.heading}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-white"
          >
            <Apple aria-hidden="true" className="h-5 w-5" />
            App Store
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-white"
          >
            <Play aria-hidden="true" className="h-5 w-5" />
            Google Play
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gojek demo. Unofficial — not affiliated with Gojek / GoTo.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
