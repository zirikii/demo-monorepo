import Link from "next/link";
import { helpfulThings } from "@/lib/constants/travel-move";

export function HelpfulThings() {
  const s = helpfulThings;
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight text-spark-ink md:text-4xl">{s.title}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-lg border border-line bg-surface-subtle transition hover:border-spark-purple"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-spark-ink group-hover:text-spark-purple">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-spark-ink/70">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
