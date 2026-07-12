import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { NavMenu } from "@/data/nav";

interface MegaMenuProps {
  menu: NavMenu;
  onClose: () => void;
}

/** Dropdown panel for a top-nav item, styled like the changiairport.com menu. */
export function MegaMenu({ menu, onClose }: MegaMenuProps) {
  return (
    <div className="absolute inset-x-0 top-full pt-2" role="region" aria-label={`${menu.label} menu`}>
      <div className="overflow-hidden rounded-card border border-sand-deep bg-card shadow-float">
        <div className="grid gap-8 p-8 lg:grid-cols-[2fr_1fr]">
          <ul className="grid gap-1 sm:grid-cols-2">
            {menu.links.map((link) => (
              <li key={link.to + link.label}>
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="group block rounded-xl p-3 hover:bg-sand-alt"
                >
                  <span className="block text-sm font-semibold text-ink group-hover:text-magenta">
                    {link.label}
                  </span>
                  {link.description && (
                    <span className="mt-0.5 block text-sm leading-snug text-ink-soft">
                      {link.description}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to={menu.to}
            onClick={onClose}
            className="changi-gradient group flex flex-col justify-between rounded-card p-6 text-white"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/80">{menu.label}</p>
              <p className="mt-2 text-lg font-semibold leading-snug">{menu.blurb}</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold group-hover:underline">
              Explore {menu.label}
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
