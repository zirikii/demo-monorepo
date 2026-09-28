import { Link } from "react-router-dom";
import { Logo } from "@/components/brand/Logo";
import { footerColumns, legalLinks } from "@/data/nav";

export function SiteFooter() {
  return (
    <footer className="bg-agl-navy text-white">
      <div className="container-agl py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <Logo variant="white" className="h-12 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Electricity, gas, internet and mobile for Australian homes and businesses.
            </p>
            <p className="mt-4 text-sm">
              <span className="block text-white/60">Call us</span>
              <a href="tel:131245" className="text-lg font-extrabold hover:text-ray-light">
                131 245
              </a>
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h2 className="mb-3 text-sm font-extrabold tracking-wide text-ray-light uppercase">{col.heading}</h2>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-white/80 hover:text-white hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-agl-lg bg-white/5 p-6 text-sm text-white/80 ring-1 ring-white/10">
          <p className="font-bold text-white">Acknowledgement of Country</p>
          <p className="mt-1">
            We acknowledge the Traditional Custodians of the lands on which we work and live, and pay our respects to Elders past
            and present.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>Unofficial demo recreation for illustration only. Not affiliated with AGL Energy Limited.</p>
        </div>
      </div>
    </footer>
  );
}
