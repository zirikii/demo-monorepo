import { CalendarDays, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CATEGORY_NAV, DATE_SHORTCUTS } from "@/data/nav";
import { cn } from "@/lib/cn";

function isActive(pathname: string, search: string, to: string): boolean {
  const [path, query] = to.split("?");
  if (path === "/") return pathname === "/";
  if (query) return pathname === path && search.includes(query);
  return pathname.startsWith(path ?? "");
}

export function CategoryNav() {
  const { pathname, search } = useLocation();
  const [openId, setOpenId] = useState<string | null>(null);
  useEffect(() => setOpenId(null), [pathname, search]);

  return (
    <nav aria-label="Categories" className="border-t border-midnight-line bg-midnight">
      <div className="container-tk flex items-center gap-1 overflow-x-auto md:overflow-visible">
        <ul className="flex items-center">
          {CATEGORY_NAV.map((item) => {
            const active = isActive(pathname, search, item.to);
            const open = openId === item.id;
            return (
              <li
                key={item.id}
                className="relative"
                onMouseEnter={() => item.children && setOpenId(item.id)}
                onMouseLeave={() => setOpenId((id) => (id === item.id ? null : id))}
              >
                <div className="flex items-center">
                  <Link
                    to={item.to}
                    className={cn(
                      "relative block whitespace-nowrap px-3 py-3 text-sm font-medium text-white/85 transition-colors hover:text-white",
                      active && "text-white after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:rounded-full after:bg-tk-pink",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      aria-label={`${item.label} categories`}
                      aria-expanded={open}
                      onClick={() => setOpenId(open ? null : item.id)}
                      className="-ml-2 hidden p-1 text-white/70 hover:text-white md:block"
                    >
                      <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} aria-hidden />
                    </button>
                  )}
                </div>
                {item.children && open && (
                  <div className="absolute left-0 top-full z-50 hidden min-w-56 animate-fade-in rounded-b-tk bg-white py-2 text-ink shadow-tk-lift md:block">
                    <Link to={item.to} className="block px-4 py-2 text-sm font-semibold text-tk-blue hover:bg-page">
                      All {item.label}
                    </Link>
                    {item.children.map((c) => (
                      <Link key={c.to} to={c.to} className="block px-4 py-2 text-sm hover:bg-page">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div
          className="relative ml-auto hidden md:block"
          onMouseEnter={() => setOpenId("dates")}
          onMouseLeave={() => setOpenId((id) => (id === "dates" ? null : id))}
        >
          <button
            type="button"
            aria-expanded={openId === "dates"}
            onClick={() => setOpenId(openId === "dates" ? null : "dates")}
            className="flex items-center gap-1.5 whitespace-nowrap px-3 py-3 text-sm font-medium text-white/85 hover:text-white"
          >
            <CalendarDays className="size-4" aria-hidden />
            Dates
            <ChevronDown className="size-3.5" aria-hidden />
          </button>
          {openId === "dates" && (
            <div className="absolute right-0 top-full z-50 min-w-48 animate-fade-in rounded-b-tk bg-white py-2 text-ink shadow-tk-lift">
              {DATE_SHORTCUTS.map((d) => (
                <Link key={d.id} to={`/whats-on?range=${d.id}`} className="block px-4 py-2 text-sm hover:bg-page">
                  {d.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
