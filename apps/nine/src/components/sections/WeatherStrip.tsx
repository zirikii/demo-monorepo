import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { forecasts } from "@/data/weather";
import { weatherGlyph } from "@/lib/format";

export function WeatherStrip() {
  const cities = forecasts.slice(0, 6);
  return (
    <section className="rounded-xl border border-line bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-wide text-ink">Weather</h2>
        <Link to="/weather" className="inline-flex items-center gap-0.5 text-xs font-bold text-nine-deep hover:underline">
          Full forecast
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
      <ul className="grid grid-cols-3 gap-2">
        {cities.map((c) => (
          <li key={c.city}>
            <Link
              to="/weather"
              className="flex flex-col items-center rounded-lg bg-surface px-2 py-3 text-center transition-colors hover:bg-surface-deep"
            >
              <span className="text-xl" aria-hidden="true">
                {weatherGlyph(c.icon)}
              </span>
              <span className="mt-1 text-xs font-bold text-ink">{c.city}</span>
              <span className="text-sm font-black text-nine-deep">{c.now}°</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
