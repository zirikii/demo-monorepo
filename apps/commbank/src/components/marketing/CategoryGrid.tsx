import { Link } from "react-router-dom";
import { homeCategories } from "@/data/home";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Explore products</h2>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Personal, home lending, insurance, investing, and business — mirrored from the CommBank site map.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {homeCategories.map((cat, i) => (
          <Link
            key={cat.to}
            to={cat.to}
            className="group rounded-xl border border-line bg-card p-5 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-cba-yellow hover:shadow-card"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="mb-3 h-1.5 w-12 rounded-full bg-cba-yellow transition-all group-hover:w-20" />
            <h3 className="text-lg font-bold text-ink">{cat.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{cat.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
