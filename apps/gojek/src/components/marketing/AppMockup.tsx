import { Bike, CreditCard, Package, UtensilsCrossed } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandLogo";

const TILES = [
  { label: "Ride", icon: Bike, accent: "var(--color-go-green)" },
  { label: "Food", icon: UtensilsCrossed, accent: "var(--color-go-food)" },
  { label: "Send", icon: Package, accent: "var(--color-go-green-dark)" },
  { label: "Pay", icon: CreditCard, accent: "var(--color-go-pay)" },
];

/** Illustrative app frame drawn entirely in markup — no product screenshots are used. */
export function AppMockup() {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[2.5rem] border border-white/15 bg-white/5 p-3 shadow-go-menu">
      <div className="rounded-[2rem] bg-white p-5">
        <div className="flex items-center justify-between">
          <BrandMark className="h-5 text-go-green" />
          <span className="rounded-full bg-go-green-tint px-2 py-0.5 text-[0.6rem] font-extrabold tracking-wide text-go-green-deep uppercase">
            Demo
          </span>
        </div>

        <p className="mt-5 text-[0.7rem] font-bold tracking-wide text-ink-ghost uppercase">
          Good afternoon
        </p>
        <p className="text-lg font-extrabold tracking-tight text-ink-strong">Where to today?</p>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {TILES.map((tile) => (
            <div key={tile.label} className="flex flex-col items-center gap-1.5">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-go-sm"
                style={{ backgroundColor: `color-mix(in srgb, ${tile.accent} 14%, white)` }}
              >
                <tile.icon aria-hidden="true" className="h-5 w-5" style={{ color: tile.accent }} />
              </span>
              <span className="text-[0.65rem] font-bold text-ink-soft">{tile.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-go-sm border border-line p-3">
          <p className="text-[0.65rem] font-bold tracking-wide text-ink-ghost uppercase">
            Trip in progress
          </p>
          <p className="mt-1 text-sm font-extrabold text-ink-strong">Arriving in 4 min</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-deep">
            <div className="h-full w-2/3 rounded-full bg-go-green" />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-go-sm bg-surface-tint p-3">
          <span className="text-[0.7rem] font-bold text-ink-soft">Wallet balance</span>
          <span className="text-sm font-extrabold text-ink-strong">Rp 248,500</span>
        </div>
      </div>
    </div>
  );
}
