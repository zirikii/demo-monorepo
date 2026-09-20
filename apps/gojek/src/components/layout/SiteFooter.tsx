import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/data/nav";
import { SITE } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{SITE.joinBand}</h2>
          <ButtonLink to="/careers" size="lg" className="mt-8">
            Join Us
          </ButtonLink>
        </div>
        <div className="mt-16 flex flex-col gap-10 border-t border-white/8 pt-10 lg:flex-row lg:justify-between">
          <div>
            <BrandLogo />
            <p className="mt-4 max-w-xs text-sm text-go-faint">{SITE.copyright}</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-go-faint uppercase">Sitemap</p>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-go-muted hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/legal/cookies" className="text-sm text-go-muted hover:text-white">
                  Cookie Settings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] text-go-faint uppercase">Connect with us</p>
            <ul className="mt-3 space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-go-muted hover:text-white" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
