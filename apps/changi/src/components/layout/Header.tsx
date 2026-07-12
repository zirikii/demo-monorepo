import { Menu, Search, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChangiLogo } from "@/components/brand/ChangiLogo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return (
    <header className="sticky top-0 z-40 border-b border-[#eadfd3]/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Changi Airport home" className="focus-ring rounded-xl">
          <ChangiLogo className="h-14 w-auto sm:h-16" />
        </Link>
        <nav aria-label="Main navigation" className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href} aria-current={active ? "page" : undefined} className={cn("rounded-full px-3 py-2 text-sm font-semibold text-[#3b3028] transition hover:bg-[#f2e7dc] hover:text-[#806d5d]", active && "bg-[#f2e7dc] text-[#806d5d]")}>{item.label}</Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button aria-label="Search" className="focus-ring rounded-full p-2 text-[#806d5d] hover:bg-[#f2e7dc]"><Search size={20} /></button>
          <button aria-label="Changi account" className="focus-ring hidden rounded-full p-2 text-[#806d5d] hover:bg-[#f2e7dc] sm:inline-flex"><UserRound size={20} /></button>
          <span className="hidden rounded-full border border-[#eadfd3] px-3 py-2 text-xs font-bold text-[#806d5d] sm:inline-flex">AU | EN</span>
          <button aria-label="Toggle menu" className="focus-ring rounded-full p-2 text-[#806d5d] hover:bg-[#f2e7dc] lg:hidden" onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
