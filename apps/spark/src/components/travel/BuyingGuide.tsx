import { SectionHeading } from "@/components/ui/SectionHeading";
import { buyingSteps } from "@/data/actions";

export function BuyingGuide() {
  return (
    <section id="buy" className="bg-white py-16 sm:py-20">
      <div className="spark-container">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <SectionHeading eyebrow="In store only" title="Where to buy your NZ Travel Pack">
            <p>
              Travel Packs are designed for visitors arriving in New Zealand. We don't ship Travel Packs overseas.
            </p>
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-3">
            {buyingSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="rounded-[2rem] border border-line bg-spark-lilac p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-white text-spark-purple shadow-card">
                      <Icon className="size-6" />
                    </span>
                    <span className="text-4xl font-black tracking-[-0.08em] text-spark-purple/20">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-black text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{step.body}</p>
                  <a href="#faq" className="mt-5 inline-block text-sm font-black text-spark-purple hover:underline">
                    {step.cta}
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
