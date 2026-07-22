import { Smartphone } from "lucide-react";

export function AppDownloadCta() {
  return (
    <section className="bg-optus-ink text-white">
      <div className="container grid items-center gap-8 py-14 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-optus-yellow">
            My Optus app
          </p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">Manage everything in one place</h2>
          <p className="mt-3 max-w-lg text-white/80">
            Check your usage, pay bills, recharge prepaid, and manage add-ons — all from the My
            Optus app. Get real-time alerts before you run out of data.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex h-11 items-center rounded-md border border-white/30 px-5 text-sm font-semibold">
              App Store
            </span>
            <span className="inline-flex h-11 items-center rounded-md border border-white/30 px-5 text-sm font-semibold">
              Google Play
            </span>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="flex h-48 w-48 items-center justify-center rounded-3xl bg-optus-yellow">
            <Smartphone className="h-20 w-20 text-optus-ink" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
