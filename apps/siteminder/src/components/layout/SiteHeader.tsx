import { DemoRibbon } from "@demo/ui";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { PRODUCTS, RESOURCES, SOLUTIONS } from "@/data/site";
import { useAuth } from "@/hooks/useAuth";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

type MenuId = "platform" | "solutions" | "resources";

const MENUS: { id: MenuId; label: string }[] = [
  { id: "platform", label: "Platform" },
  { id: "solutions", label: "Solutions" },
  { id: "resources", label: "Resources" },
];

function PlatformMenu() {
  const groups = ["Distribution", "Revenue", "Guest experience"] as const;
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1fr_1fr_280px]">
      {groups.map((group) => (
        <div key={group}>
          <p className="eyebrow">{group}</p>
          <ul className="mt-3 space-y-1">
            {PRODUCTS.filter((p) => p.group === group).map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/platform/${p.slug}`}
                  className="group block rounded-xl px-3 py-2 hover:bg-canvas"
                >
                  <span className="block text-sm font-semibold text-heading group-hover:text-royal">
                    {p.name}
                  </span>
                  <span className="block text-xs text-ink-faint">{p.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link
        to="/platform"
        className="sm-night flex flex-col justify-between rounded-card p-5 text-white"
      >
        <span className="pill w-fit bg-lime text-stratos">New</span>
        <span>
          <span className="block text-lg font-bold leading-tight">The Revenue Control Centre</span>
          <span className="mt-1 block text-sm text-white/70">
            Navigate decisively. Act effortlessly. Operate confidently.
          </span>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-lime">
            Explore the platform <ArrowRight className="size-4" aria-hidden />
          </span>
        </span>
      </Link>
    </div>
  );
}

function SolutionsMenu() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {SOLUTIONS.map((s) => (
        <Link
          key={s.slug}
          to={`/solutions/${s.slug}`}
          className="group rounded-card border border-line-soft p-4 hover:border-royal/30 hover:bg-royal-tint/40"
        >
          <span className="block text-sm font-semibold text-heading group-hover:text-royal">
            {s.name}
          </span>
          <span className="mt-1 block text-xs text-ink-faint">{s.headline}</span>
        </Link>
      ))}
    </div>
  );
}

function ResourcesMenu() {
  return (
    <div className="grid gap-8 md:grid-cols-[220px_1fr]">
      <ul className="space-y-1 text-sm font-semibold">
        {[
          ["Resource hub", "/resources"],
          ["Customer stories", "/customers"],
          ["Integrations marketplace", "/integrations"],
          ["About SiteMinder", "/about"],
          ["Contact us", "/contact"],
        ].map(([label, to]) => (
          <li key={to}>
            <Link
              to={to!}
              className="block rounded-xl px-3 py-2 text-heading hover:bg-canvas hover:text-royal"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="grid gap-4 sm:grid-cols-3">
        {RESOURCES.slice(0, 3).map((r) => (
          <Link key={r.slug} to={`/resources/${r.slug}`} className="group">
            <img
              src={asset(`brand/${r.image}`)}
              alt=""
              className="aspect-video w-full rounded-xl object-cover"
              loading="lazy"
            />
            <span className="mt-2 block text-xs font-semibold uppercase tracking-wide text-royal">
              {r.kind}
            </span>
            <span className="block text-sm font-semibold text-heading group-hover:underline">
              {r.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const MENU_BODY: Record<MenuId, () => React.JSX.Element> = {
  platform: PlatformMenu,
  solutions: SolutionsMenu,
  resources: ResourcesMenu,
};

export function SiteHeader() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [menu, setMenu] = useState<MenuId | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setMenu(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const Body = menu ? MENU_BODY[menu] : null;

  return (
    <header
      ref={ref}
      className="sticky top-0 z-40 border-b border-line-soft bg-white/95 backdrop-blur"
    >
      <div className="container-sm flex h-[72px] items-center gap-4">
        <Link to="/" aria-label="SiteMinder home" className="shrink-0">
          <Logo className="h-[22px]" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 whitespace-nowrap lg:flex">
          {MENUS.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-expanded={menu === m.id}
              onClick={() => setMenu((cur) => (cur === m.id ? null : m.id))}
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-2 text-sm font-semibold text-heading hover:bg-canvas",
                menu === m.id && "bg-canvas text-royal",
              )}
            >
              {m.label}
              <ChevronDown
                className={cn("size-4 transition-transform", menu === m.id && "rotate-180")}
                aria-hidden
              />
            </button>
          ))}
          <Link
            to="/integrations"
            className="shrink-0 rounded-full px-2.5 py-2 text-sm font-semibold whitespace-nowrap text-heading hover:bg-canvas"
          >
            Partners
          </Link>
          <Link
            to="/pricing"
            className="shrink-0 rounded-full px-2.5 py-2 text-sm font-semibold whitespace-nowrap text-heading hover:bg-canvas"
          >
            Pricing
          </Link>
        </nav>
        <div className="ml-auto hidden shrink-0 items-center gap-2 whitespace-nowrap lg:flex">
          <DemoRibbon
            label="Unofficial demo"
            className="hidden shrink-0 border-line text-ink-faint xl:inline-flex"
          />
          <Link
            to={user ? "/app" : "/login"}
            className="shrink-0 rounded-full px-2.5 py-2 text-sm font-semibold whitespace-nowrap text-heading hover:bg-canvas"
          >
            {user ? "Go to platform" : "Login"}
          </Link>
          <Link to="/demo" className="btn-outline shrink-0 px-4 whitespace-nowrap">
            Get a demo
          </Link>
          <Link to="/get-started" className="btn-primary shrink-0 px-4 whitespace-nowrap">
            Try for free
          </Link>
        </div>
        <button
          type="button"
          className="ml-auto grid size-10 place-items-center rounded-full hover:bg-canvas lg:hidden"
          aria-label={mobile ? "Close menu" : "Open menu"}
          onClick={() => setMobile((v) => !v)}
        >
          {mobile ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>
      {Body && (
        <div className="absolute inset-x-0 top-full hidden animate-fade-in border-b border-line-soft bg-white shadow-lift lg:block">
          <div className="container-sm py-8">
            <Body />
          </div>
        </div>
      )}
      {mobile && (
        <nav aria-label="Mobile" className="border-t border-line-soft bg-white lg:hidden">
          <div className="container-sm space-y-1 py-4">
            {[
              ["Platform", "/platform"],
              ["Solutions", "/solutions/independent-hotels"],
              ["Resources", "/resources"],
              ["Partners", "/integrations"],
              ["Pricing", "/pricing"],
              [user ? "Go to platform" : "Login", user ? "/app" : "/login"],
            ].map(([label, to]) => (
              <Link
                key={to}
                to={to!}
                className="block rounded-xl px-3 py-2.5 font-semibold text-heading hover:bg-canvas"
              >
                {label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link to="/demo" className="btn-outline flex-1">
                Get a demo
              </Link>
              <Link to="/get-started" className="btn-primary flex-1">
                Try for free
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
