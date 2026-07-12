import Link from "next/link";
import { whySpark } from "@/lib/constants/travel-move";

export function WhyChooseSpark() {
  const s = whySpark;
  return (
    <section className="bg-surface-subtle py-16 md:py-20">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight text-spark-ink md:text-4xl">{s.title}</h2>
        <div className="mt-10 space-y-12">
          {s.items.map((item, index) => (
            <article
              key={item.title}
              className={`grid items-center gap-8 md:grid-cols-2 ${index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="overflow-hidden rounded-lg">
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-spark-ink md:text-3xl">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-spark-ink/80">{item.body}</p>
                <Link
                  href={item.cta.href}
                  className="mt-6 inline-flex h-11 items-center rounded-md bg-spark-purple px-5 text-sm font-semibold text-white hover:bg-spark-purple-dark"
                >
                  {item.cta.label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
