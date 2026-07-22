import Link from "next/link";

export function AppDownloadCta() {
  return (
    <section className="container py-14">
      <div className="overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-optus-teal to-optus-teal-dark p-8 text-white md:p-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold">Manage it all in My Optus</h2>
          <p className="mt-3 text-white/90">
            Track usage, pay bills, boost data, and tweak network features. This demo uses mock
            auth — any email and password works.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex h-11 items-center rounded-md bg-white px-5 text-sm font-bold text-optus-teal"
            >
              Sign in to My Optus
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-11 items-center rounded-md border border-white/60 px-5 text-sm font-semibold text-white"
            >
              Create demo account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
