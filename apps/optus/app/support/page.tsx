import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Support" };

const topics = [
  ["Mobile support", "Check data usage, plan details and roaming add-ons.", "/usage"],
  ["Home internet", "Run a demo address check and compare NBN or 5G Home plans.", "/home-internet"],
  ["Billing help", "Review payment status and due dates in My Optus.", "/bills"],
  ["Account settings", "Update mock profile, team and integration preferences.", "/settings"],
];

export default function SupportPage() {
  return (
    <div className="container py-14">
      <p className="text-sm font-bold uppercase tracking-wide text-optus-teal-dark">Support</p>
      <h1 className="mt-2 text-4xl font-black text-optus-ink">How can we help?</h1>
      <p className="mt-4 max-w-3xl text-optus-ink/75">Demo support topics for Australian mobile, home internet, billing and account self-service.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">{topics.map(([title, description, href]) => (<Link key={href} href={href} className="rounded-xl border border-line bg-white p-6 hover:border-optus-teal"><h2 className="text-xl font-black text-optus-ink">{title}</h2><p className="mt-3 text-sm text-optus-ink/70">{description}</p></Link>))}</div>
      <section className="mt-10 rounded-xl bg-optus-teal-light p-6"><h2 className="text-xl font-black text-optus-ink">Demo contact options</h2><p className="mt-2 text-sm text-optus-ink/75">Live chat, call centre and store booking flows are placeholders only. No external Optus systems are contacted.</p></section>
    </div>
  );
}
