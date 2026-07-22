import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Entertainment" };

export default function EntertainmentPage() {
  return (
    <div className="container py-12">
      <div className="overflow-hidden rounded-2xl bg-optus-ink p-8 text-white md:p-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/yes-mark.svg" alt="" className="h-12 w-auto" aria-hidden="true" />
        <h1 className="mt-6 text-4xl font-extrabold">Optus Sport</h1>
        <p className="mt-3 max-w-2xl text-white/80">
          Watch live A-League, football, and more on eligible plans. This demo simulates Sport
          entitlement — no real streaming credentials are issued.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-white/85">
          <li>• Live matches and on-demand highlights (demo copy)</li>
          <li>• Included on selected Choice Plus style plans</li>
          <li>• Manage entitlement from My Optus → Integrations</li>
        </ul>
        <Link
          href="/mobile"
          className="mt-8 inline-flex h-11 items-center rounded-full bg-optus-yellow px-6 text-sm font-bold text-optus-ink"
        >
          Shop eligible plans
        </Link>
      </div>
    </div>
  );
}
