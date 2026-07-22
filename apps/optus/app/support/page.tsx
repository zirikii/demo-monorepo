import Link from "next/link";

const topics = [
  "Billing and payments",
  "Mobile data usage",
  "nbn setup",
  "Outage checker",
  "Roaming",
  "SIM activation",
];

export const metadata = { title: "Support" };

export default function SupportPage() {
  return (
    <div className="bg-surface-subtle">
      <section className="container py-12">
        <div className="rounded-[2rem] bg-optus-navy p-8 text-white md:p-12">
          <p className="text-sm font-black uppercase tracking-wide text-optus-yellow">
            Optus Support
          </p>
          <h1 className="mt-3 max-w-3xl text-5xl font-black">How can we help?</h1>
          <label className="mt-8 block max-w-2xl">
            <span className="sr-only">Search support</span>
            <input
              className="h-14 w-full rounded-full border-0 px-6 text-optus-ink"
              placeholder="Search bills, outages, roaming or activation"
            />
          </label>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {topics.map((topic) => (
            <article key={topic} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <h2 className="font-black text-optus-ink">{topic}</h2>
              <p className="mt-2 text-sm text-optus-ink/65">
                Guided help content with simulated customer support actions.
              </p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-2xl bg-optus-yellow p-6 text-optus-navy">
          <h2 className="text-2xl font-black">Need account help?</h2>
          <p className="mt-2">
            Create a support case from My Optus and track every update in the demo dashboard.
          </p>
          <Link
            href="/support-cases"
            className="mt-4 inline-flex rounded-full bg-optus-navy px-5 py-3 text-sm font-black text-white"
          >
            Open My Optus cases
          </Link>
        </div>
      </section>
    </div>
  );
}
