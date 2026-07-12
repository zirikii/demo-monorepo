import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { travelPacks, internationalCountries, type TravelPack } from "@/data/travelPacks";
import { PlanCard } from "./PlanCard";

export function TravelPackSection() {
  const [selectedPack, setSelectedPack] = useState<TravelPack | null>(null);

  return (
    <section id="travel-packs" className="bg-spark-lilac py-16 sm:py-20">
      <div className="spark-container">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading eyebrow="Get connected" title="Get connected with a Spark Travel Pack.">
            <p>
              If you're planning to visit New Zealand for up to three months, make your trip that little bit easier with a Spark Travel Pack.
            </p>
            <p className="mt-3 font-extrabold text-ink">Travel Packs are only available in store.</p>
            <a href="#buy" className="mt-3 inline-block font-extrabold text-spark-purple hover:underline">
              Here for longer? See our range of plans and extras
            </a>
          </SectionHeading>

          {selectedPack && (
            <div role="status" className="rounded-[2rem] border border-spark-lilac-strong bg-white p-5 shadow-card">
              <div className="flex gap-4">
                <CheckCircle2 className="mt-1 size-6 shrink-0 text-spark-purple" />
                <div className="flex-1">
                  <p className="font-black text-ink">Demo only: {selectedPack.name} selected.</p>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">
                    Real Spark Travel Packs are purchased in store after arrival. This demo does not reserve or sell anything.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Dismiss demo message"
                  className="spark-focus rounded-full p-2 text-ink-soft hover:bg-spark-lilac"
                  onClick={() => setSelectedPack(null)}
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="travel-card-grid mt-10 grid gap-5">
          {travelPacks.map((pack) => (
            <PlanCard key={pack.id} pack={pack} onCollect={setSelectedPack} />
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] bg-white p-6 text-xs leading-6 text-ink-soft shadow-card">
          <p>
            * International calling minutes and texts can be used to call or text {internationalCountries}. See standard rates for calls to other countries.
          </p>
          <p className="mt-2">
            Texts include person-to-person messages and exclude texts to short codes and multi-media messaging, such as picture messages.
          </p>
          <p className="mt-2">** 100GB at maximum speeds, then speeds reduce to a maximum of 1.2Mbps. This will impact your experience.</p>
        </div>
      </div>
    </section>
  );
}
