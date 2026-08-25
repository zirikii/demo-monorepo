import { useEffect, useRef, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { AppMark } from "@/components/brand/AppMark";
import { PRODUCT_APPS } from "@/data/apps";

export function AppSwitcher() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-label="Switch apps"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
        className="focus-atl flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-surface-deep"
      >
        <LayoutGrid aria-hidden className="h-4.5 w-4.5" />
      </button>
      {open ? (
        <div
          role="menu"
          aria-label="Atlassian apps"
          className="absolute top-full left-0 z-30 mt-1 w-72 overflow-hidden rounded-atl-lg border border-line bg-white py-1 shadow-atl-menu"
        >
          {PRODUCT_APPS.map((app) => (
            <Link
              key={app.portal}
              role="menuitem"
              to={app.path}
              onClick={() => setOpen(false)}
              className="focus-atl flex items-center gap-3 px-3 py-2 text-sm hover:bg-surface-tint"
            >
              <AppMark slug={app.mark} size={20} />
              <span className="flex min-w-0 flex-col">
                <span className="font-semibold text-ink-strong">{app.name}</span>
                <span className="truncate text-xs text-ink-faint">{app.blurb}</span>
              </span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function AccountMenu({
  email,
  name,
  onSignOut,
}: {
  email: string;
  name: string;
  onSignOut: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={name}
        onClick={() => setOpen((current) => !current)}
        className="focus-atl ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-atl-ember text-[0.65rem] font-bold text-white"
      >
        {initials}
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-atl-lg border border-line bg-white py-1 shadow-atl-menu"
        >
          <p className="truncate px-3 py-2 text-xs text-ink-faint">{email}</p>
          <button
            type="button"
            role="menuitem"
            className="focus-atl w-full px-3 py-2 text-left text-sm font-medium text-ink-strong hover:bg-surface-tint"
            onClick={() => {
              setOpen(false);
              onSignOut();
            }}
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
