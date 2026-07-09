import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { navMenus } from "@/data/nav";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const [open, setOpen] = useState<string | null>(navMenus[0]?.label ?? null);

  return (
    <nav
      aria-label="Mobile"
      className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-cream-deep bg-cream px-4 pb-8 pt-2 lg:hidden"
    >
      <ul className="divide-y divide-cream-deep">
        {navMenus.map((menu) => {
          const isOpen = open === menu.label;
          return (
            <li key={menu.label}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : menu.label)}
                className="flex w-full items-center justify-between py-4 text-left font-semibold text-navy"
              >
                {menu.label}
                <ChevronDown
                  className={cn("size-5 transition-transform", isOpen && "rotate-180")}
                  aria-hidden
                />
              </button>
              {isOpen && (
                <ul className="space-y-1 pb-4">
                  {menu.columns.flatMap((col) =>
                    col.links.map((link) => (
                      <li key={link.to + link.label}>
                        <Link
                          to={link.to}
                          onClick={onClose}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-cream-alt hover:text-navy"
                        >
                          {link.label}
                          {link.badge && <Badge tint="mint">{link.badge}</Badge>}
                        </Link>
                      </li>
                    )),
                  )}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex flex-col gap-3">
        <Button to="/book-a-call" onClick={onClose}>
          Book a call
        </Button>
        <Button to="/contact" variant="secondary" onClick={onClose}>
          Log In
        </Button>
      </div>
    </nav>
  );
}
