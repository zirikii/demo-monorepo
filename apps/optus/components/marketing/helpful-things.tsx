import Link from "next/link";

const helpfulThings = [
  { title: "Roaming", description: "Add international roaming packs before you fly.", href: "/add-ons" },
  { title: "Bills", description: "Review recent bills and due dates in My Optus.", href: "/bills" },
  { title: "Support", description: "Find demo support topics for mobile, NBN and account help.", href: "/support" },
];

export function HelpfulThings() {
  return (
    <section className="container py-14"><h2 className="text-3xl font-black tracking-tight text-optus-ink md:text-4xl">Helpful things</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{helpfulThings.map((item) => (<Link key={item.href} href={item.href} className="group rounded-xl border border-line bg-surface-subtle p-6 transition hover:border-optus-teal"><h3 className="text-lg font-black text-optus-ink group-hover:text-optus-teal-dark">{item.title}</h3><p className="mt-2 text-sm text-optus-ink/70">{item.description}</p></Link>))}</div></section>
  );
}
