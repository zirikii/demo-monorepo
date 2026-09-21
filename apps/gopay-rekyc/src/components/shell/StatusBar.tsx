import { cn } from "../../lib/cn";

export function StatusBar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-static-white" : "text-text-title";
  return (
    <div className={cn("flex h-[54px] items-end justify-between px-6 pb-2", color)} aria-hidden="true">
      <span className="text-[15px] font-semibold tracking-tight">9:41</span>
      <span className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
          <rect x="0" y="7" width="3" height="5" rx="0.5" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" />
          <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 3.2c1.7 0 3.2.7 4.3 1.8l1-1.1A7.4 7.4 0 0 0 8 1.6 7.4 7.4 0 0 0 2.7 3.9l1 1.1A6 6 0 0 1 8 3.2Z" />
          <path d="M8 6.2c.9 0 1.7.4 2.3 1l1-1.1A4.6 4.6 0 0 0 8 4.6c-1.2 0-2.3.5-3.1 1.4l1 1.1c.5-.6 1.3-1 2.1-1Z" />
          <circle cx="8" cy="10" r="1.3" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" fill="none" stroke="currentColor" />
          <rect x="2" y="2" width="16" height="8" rx="1.2" />
          <rect x="22.5" y="3.5" width="1.5" height="5" rx="0.5" />
        </svg>
      </span>
    </div>
  );
}
