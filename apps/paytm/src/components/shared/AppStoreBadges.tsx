import { Apple, Play } from "lucide-react";

/** Black app-store pills like the ones under the UPI hero. */
export function AppStoreBadges() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="flex items-center gap-2.5 rounded-lg bg-ink px-4 py-2 text-white transition-opacity hover:opacity-85"
      >
        <Apple aria-hidden="true" className="h-5 w-5" />
        <span className="text-left leading-tight">
          <span className="block text-[9px] uppercase tracking-wide opacity-80">Download on the</span>
          <span className="block text-sm font-semibold">App Store</span>
        </span>
      </a>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="flex items-center gap-2.5 rounded-lg bg-ink px-4 py-2 text-white transition-opacity hover:opacity-85"
      >
        <Play aria-hidden="true" className="h-5 w-5 fill-current" />
        <span className="text-left leading-tight">
          <span className="block text-[9px] uppercase tracking-wide opacity-80">Get it on</span>
          <span className="block text-sm font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
