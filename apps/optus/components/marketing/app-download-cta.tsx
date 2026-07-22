import Link from "next/link";
import { Smartphone } from "lucide-react";

export function AppDownloadCta() {
  return (
    <section className="bg-optus-yellow">
      <div className="container grid gap-8 py-14 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-optus-ink">Manage it all in the My Optus app</h2>
          <p className="mt-3 max-w-md text-optus-ink/80">
            Track your data, pay bills, recharge prepaid and get support — all in one place. Sign in
            to the demo My Optus dashboard to take a look.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-md bg-optus-ink px-5 text-sm font-semibold text-white hover:bg-optus-black"
            >
              <Smartphone className="h-5 w-5" aria-hidden="true" />
              Open My Optus
            </Link>
            <Link
              href="/login"
              className="focus-ring inline-flex h-11 items-center rounded-md border border-optus-ink/30 px-5 text-sm font-semibold text-optus-ink hover:bg-optus-yellow-dark"
            >
              Sign in
            </Link>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-xs rounded-3xl border-4 border-optus-ink bg-white p-4 shadow-xl">
            <div className="rounded-2xl bg-optus-teal-light p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-optus-teal-darker">
                My Optus
              </p>
              <p className="mt-2 text-3xl font-extrabold text-optus-teal-darker">62%</p>
              <p className="text-sm text-optus-teal-darker/80">of 100GB used</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                <div className="h-full w-[62%] rounded-full bg-optus-teal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
