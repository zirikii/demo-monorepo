import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { lifeStages } from "@/data/site";

export function LifeStages({ title = "Banking for the stage you're at" }: { title?: string }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-cba">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          {title}
          <span aria-hidden="true" className="mt-2 block h-1 w-16 bg-cba-yellow" />
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lifeStages.map((stage) => (
            <li key={stage.id}>
              <Link
                to={stage.to}
                className="focus-cba group flex h-full flex-col rounded-cba-lg border border-line-soft bg-surface p-5 transition-shadow hover:shadow-cba-lift"
              >
                <h3 className="text-[15px] font-bold text-ink">{stage.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{stage.body}</p>
                <ArrowRight
                  aria-hidden="true"
                  className="mt-3 h-4 w-4 text-ink transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
