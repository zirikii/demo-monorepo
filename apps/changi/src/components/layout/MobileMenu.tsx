import { Link, useLocation } from "react-router-dom";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation();
  if (!open) return null;
  return (
    <div className="border-t border-[#eadfd3] bg-white px-4 py-4 lg:hidden">
      <nav aria-label="Mobile navigation" className="grid gap-2">
        {navItems.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link key={item.href} to={item.href} onClick={onClose} className={cn("rounded-2xl px-4 py-3 text-sm font-bold", active ? "bg-[#f2e7dc] text-[#806d5d]" : "text-[#3b3028]")}>{item.label}</Link>
          );
        })}
      </nav>
    </div>
  );
}
