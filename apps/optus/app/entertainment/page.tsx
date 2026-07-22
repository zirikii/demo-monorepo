import type { Metadata } from "next";

export const metadata: Metadata = { title: "Entertainment" };

export default function EntertainmentPage() {
  const cards = [
    ["Optus Sport", "Football, highlights and sports extras represented as demo add-ons."],
    ["Streaming extras", "Entertainment partner toggles are simulated in My Optus integrations."],
    ["Roaming and data", "Add travel and data boosts without real carrier activation."],
  ];
  return (
    <div>
      <section className="optus-pattern text-white"><div className="container py-20"><p className="text-sm font-bold uppercase tracking-wide text-optus-yellow">Entertainment</p><h1 className="mt-3 text-4xl font-black">Optus Sport, streaming and extras</h1><p className="mt-4 max-w-2xl text-white/90">Showcase sport, streaming and add-on experiences without connecting to real Optus services.</p></div></section>
      <section className="container grid gap-6 py-14 md:grid-cols-3">{cards.map(([name, description]) => (<article key={name} className="rounded-xl border border-line bg-white p-6 shadow-sm"><h2 className="text-xl font-black text-optus-ink">{name}</h2><p className="mt-3 text-sm text-optus-ink/70">{description}</p></article>))}</section>
    </div>
  );
}
