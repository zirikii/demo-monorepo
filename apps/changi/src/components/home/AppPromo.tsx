import { Smartphone } from "lucide-react";

const features = [
  "Live-style flight tracking & gate alerts",
  "Interactive terminal & Jewel maps",
  "Changi Rewards points at your fingertips",
  "Dining, shopping & attraction discovery",
];

export function AppPromo() {
  return (
    <section className="bg-sand py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="changi-gradient overflow-hidden rounded-shape px-8 py-12 text-white lg:px-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                <Smartphone className="size-4" aria-hidden />
                Download the Changi App
              </span>
              <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                Your travel companion, from kerb to gate
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/85">
                Everything you need for a smoother journey through Changi — free on the App Store
                and Google Play.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-xl bg-black/80 px-5 py-3 text-sm font-semibold">
                  App Store
                </span>
                <span className="rounded-xl bg-black/80 px-5 py-3 text-sm font-semibold">
                  Google Play
                </span>
              </div>
            </div>

            <ul className="grid gap-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-2xl bg-white/15 px-5 py-4 text-sm font-medium backdrop-blur-sm"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
