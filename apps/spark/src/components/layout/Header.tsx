import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { DemoRibbon } from "@demo/ui/components/demo-ribbon";
import { primaryNav } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="spark-container flex min-h-20 items-center gap-6">
        <Link to="/" aria-label="Spark NZ home" className="spark-focus flex items-center gap-3">
          <img src="/brand/logo.svg" alt="Spark NZ" className="h-11 w-auto" />
          <DemoRibbon label="demo" />
        </Link>

        <nav aria-label="Main navigation" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {primaryNav.map((group) => (
              <li key={group.label} className="group relative">
                <button
                  type="button"
                  className="spark-focus rounded-full px-4 py-3 text-sm font-extrabold text-ink transition hover:bg-spark-lilac hover:text-spark-purple"
                >
                  {group.label}
                </button>
                <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="rounded-3xl border border-line bg-white p-3 shadow-card">
                    {group.items.map((item) => (
                      <a
                        key={item}
                        href="#travel-packs"
                        className="block rounded-2xl px-4 py-3 text-sm font-semibold text-ink-soft hover:bg-spark-lilac hover:text-spark-purple"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <button className="spark-focus rounded-full p-3 text-ink hover:bg-spark-lilac" type="button" aria-label="Search">
            <Search className="size-5" />
          </button>
          <button
            className="spark-focus inline-flex items-center gap-2 rounded-full bg-spark-lilac px-4 py-3 text-sm font-extrabold text-spark-purple"
            type="button"
          >
            <UserRound className="size-4" />
            MySpark
          </button>
          <button className="spark-focus rounded-full p-3 text-ink hover:bg-spark-lilac" type="button" aria-label="Cart">
            <ShoppingCart className="size-5" />
          </button>
        </div>

        <button
          type="button"
          className="spark-focus ml-auto rounded-full bg-spark-purple p-3 text-white lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-line bg-white px-4 py-4 lg:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <nav aria-label="Mobile navigation" className="space-y-3">
          {primaryNav.map((group) => (
            <details key={group.label} className="rounded-2xl bg-spark-lilac p-4">
              <summary className="cursor-pointer font-extrabold text-spark-purple">{group.label}</summary>
              <div className="mt-3 grid gap-2">
                {group.items.map((item) => (
                  <a key={item} href="#travel-packs" className="text-sm font-semibold text-ink-soft">
                    {item}
                  </a>
                ))}
              </div>
            </details>
          ))}
        </nav>
      </div>
    </header>
  );
}
