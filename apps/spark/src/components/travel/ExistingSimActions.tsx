import { existingSimActions } from "@/data/actions";

export function ExistingSimActions() {
  return (
    <section className="bg-spark-purple py-16 text-white sm:py-20">
      <div className="spark-container">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-white/70">
              Already have this SIM?
            </p>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Keep going with top ups, the Spark app, and extras.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/75">
              Staying in New Zealand longer? Check out Spark&apos;s range of plans and extras once your Travel Pack term is done.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {existingSimActions.map((action) => {
              const Icon = action.icon;
              return (
                <article key={action.title} className="rounded-[2rem] bg-white p-6 text-ink shadow-purple">
                  <span className="grid size-12 place-items-center rounded-2xl bg-spark-lilac text-spark-purple">
                    <Icon className="size-6" />
                  </span>
                  <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-spark-purple">
                    {action.eyebrow}
                  </p>
                  <h3 className="mt-1 text-2xl font-black">{action.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{action.body}</p>
                  <a href="#faq" className="mt-5 inline-block text-sm font-black text-spark-purple hover:underline">
                    {action.cta}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
