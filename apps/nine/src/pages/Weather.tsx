import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { forecasts } from "@/data/weather";
import { weatherGlyph } from "@/lib/format";

export function WeatherPage() {
  useDocumentTitle("Weather");
  const today = new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <PageLayout>
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
        <header className="mb-6 border-b border-line pb-5">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-travel" />
            <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">Weather</h1>
          </div>
          <p className="mt-2 text-[15px] text-ink-soft">Capital city forecasts for {today}.</p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {forecasts.map((c) => (
            <article
              key={c.city}
              className="rounded-xl border border-line bg-card p-5 shadow-card"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-black text-ink">{c.city}</h2>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                    {c.state}
                  </p>
                </div>
                <span className="text-4xl" aria-hidden="true">
                  {weatherGlyph(c.icon)}
                </span>
              </div>
              <p className="mt-3 text-5xl font-black tabular-nums text-nine-deep">{c.now}°</p>
              <p className="mt-1 text-sm text-ink-soft">{c.summary}</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3 text-center text-sm">
                <div>
                  <dt className="text-[11px] font-semibold uppercase text-ink-faint">Min</dt>
                  <dd className="font-bold text-ink">{c.min}°</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase text-ink-faint">Max</dt>
                  <dd className="font-bold text-ink">{c.max}°</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase text-ink-faint">Rain</dt>
                  <dd className="font-bold text-ink">{c.rain}%</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
