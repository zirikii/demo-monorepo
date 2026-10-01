import { Camera, Play, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { FOOTER_COLUMNS } from "@/data/nav";
import { asset } from "@/lib/asset";

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-midnight text-white">
      <div className="container-tk grid gap-10 py-12 md:grid-cols-[1.2fr_repeat(3,1fr)]">
        <div>
          <img src={asset("brand/ticketek-logo-white.svg")} alt="Ticketek" className="h-8 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Australia&apos;s leading ticketing company, getting fans to the concerts, sport, theatre and family events they love.
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { label: "Ticketek on Facebook", Icon: ThumbsUp },
              { label: "Ticketek on Instagram", Icon: Camera },
              { label: "Ticketek on YouTube", Icon: Play },
            ].map(({ label, Icon }) => (
              <a key={label} href="#top" aria-label={label} className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <Icon className="size-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-tk-pink">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/80 hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-midnight-line">
        <div className="container-tk py-6 text-xs leading-relaxed text-white/60">
          <p>
            Ticketek acknowledges the Traditional Owners of Country throughout Australia and recognises their continuing connection to land, waters and
            culture. We pay our respects to Elders past and present.
          </p>
          <p className="mt-3">
            © {new Date().getFullYear()} Demo site — an unofficial look-alike built for a product demonstration. Not affiliated with or endorsed by Ticketek
            Pty Ltd or TEG. Orders, payments and accounts are simulated.
          </p>
        </div>
      </div>
    </footer>
  );
}
