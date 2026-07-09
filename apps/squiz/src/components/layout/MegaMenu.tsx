import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { NavMenu } from "@/data/nav";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

interface MegaMenuProps {
  menu: NavMenu;
  onClose: () => void;
}

/** Dropdown panel for a top-nav item, styled like squiz.net's mega menu. */
export function MegaMenu({ menu, onClose }: MegaMenuProps) {
  return (
    <div className="absolute inset-x-0 top-full pt-2" role="region" aria-label={`${menu.label} menu`}>
      <div className="overflow-hidden rounded-2xl border border-cream-deep bg-card shadow-float">
        <div className="grid gap-8 p-8 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-8 sm:grid-cols-2">
            {menu.columns.map((col, idx) => (
              <div key={col.heading ?? idx}>
                {col.heading && (
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-faint">
                    {col.heading}
                  </p>
                )}
                <ul className="space-y-1">
                  {col.links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link
                        to={link.to}
                        onClick={onClose}
                        className="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-cream-alt"
                      >
                        {link.icon && (
                          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-mint-tint text-navy">
                            <Icon name={link.icon} className="size-4.5" />
                          </span>
                        )}
                        <span>
                          <span className="flex items-center gap-2 text-sm font-semibold text-navy group-hover:underline">
                            {link.label}
                            {link.badge && <Badge tint="mint">{link.badge}</Badge>}
                          </span>
                          {link.description && (
                            <span className="mt-0.5 block text-sm leading-snug text-ink-soft">
                              {link.description}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {menu.promo && (
            <Link
              to={menu.promo.to}
              onClick={onClose}
              className="group flex flex-col justify-between rounded-2xl bg-navy p-6 text-white squiz-lines-dark"
            >
              <div>
                <Badge tint="mint" className="mb-3">
                  Featured
                </Badge>
                <p className="text-lg font-semibold leading-snug">{menu.promo.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{menu.promo.copy}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mint group-hover:underline">
                {menu.promo.cta}
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
