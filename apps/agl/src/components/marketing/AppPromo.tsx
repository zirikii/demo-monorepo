import { BellRing, ChartColumn, CreditCard, Gauge } from "lucide-react";
import { AglRays } from "@/components/brand/AglRays";

const features = [
  { label: "Track your usage daily", Icon: ChartColumn },
  { label: "Pay bills in a tap", Icon: CreditCard },
  { label: "Submit meter reads", Icon: Gauge },
  { label: "Outage and bill alerts", Icon: BellRing },
];

export function AppPromo() {
  return (
    <div className="grid items-center gap-10 overflow-hidden rounded-agl-xl bg-agl-navy p-8 text-white lg:grid-cols-2 lg:p-14">
      <div>
        <p className="text-sm font-extrabold tracking-wider text-ray-light uppercase">The AGL app</p>
        <h2 className="mt-2 text-3xl font-extrabold lg:text-4xl">Your energy, internet and mobile in one place</h2>
        <p className="mt-3 text-white/80">Manage everything on the go — see what you’re using, pay bills and get help from the AGL Assistant.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {features.map(({ label, Icon }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <Icon className="h-4 w-4 text-ray-light" aria-hidden="true" />
              </span>
              {label}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold">
          <span className="rounded-agl bg-white px-4 py-2.5 text-ink">Download on the App Store</span>
          <span className="rounded-agl bg-white px-4 py-2.5 text-ink">Get it on Google Play</span>
        </div>
      </div>
      <div className="relative mx-auto w-64">
        <div aria-hidden="true" className="absolute inset-0 -z-0 scale-125 rounded-full bg-ray-cyan/20 blur-3xl" />
        <div className="relative rounded-[2.5rem] bg-white p-3 text-ink shadow-agl-panel">
          <div className="rounded-[2rem] bg-surface-tint p-4">
            <div className="flex items-center justify-between">
              <AglRays className="h-6 w-6" />
              <span className="text-xs font-bold text-ink-soft">Hi Alex</span>
            </div>
            <p className="mt-4 text-xs text-ink-soft">Electricity · this bill</p>
            <p className="text-2xl font-extrabold text-agl-blue-dark">$487.35</p>
            <div className="mt-3 flex h-16 items-end gap-1.5" aria-hidden="true">
              {[40, 55, 35, 70, 60, 85, 50].map((h, i) => (
                <span key={i} className="flex-1 rounded-t bg-agl-gradient" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mt-4 rounded-full bg-agl-blue py-2 text-center text-xs font-extrabold text-white">Pay now</div>
          </div>
        </div>
      </div>
    </div>
  );
}
