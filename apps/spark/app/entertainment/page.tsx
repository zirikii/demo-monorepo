import type { Metadata } from "next";

export const metadata: Metadata = { title: "Entertainment" };

export default function EntertainmentPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-spark-black text-white">
        <img
          src="/brand/photos/entertainment.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative py-20">
          <h1 className="text-4xl font-bold">Entertainment</h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Unlock deals on Netflix, Spotify Premium, NEON and more. Get closer to epic music and
            gaming experiences, with live events, pre-sales and other perks.
          </p>
        </div>
      </section>
      <section className="container grid gap-6 py-14 md:grid-cols-3">
        {["Netflix", "Spotify Premium", "NEON"].map((name) => (
          <article key={name} className="rounded-lg border border-line p-6">
            <h2 className="text-xl font-bold text-spark-ink">{name}</h2>
            <p className="mt-3 text-sm text-spark-ink/70">
              Eligible Spark plans can include {name} benefits. This demo simulates connect/disconnect
              toggles in MySpark settings.
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
