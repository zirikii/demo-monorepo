import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function TravelHero() {
  return (
    <section id="top" className="overflow-hidden bg-white">
      <div className="spark-container py-8 sm:py-12">
        <a
          href="#travel-packs"
          className="spark-focus inline-flex items-center gap-2 rounded-full text-sm font-extrabold text-spark-purple hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back
        </a>

        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.5rem] bg-spark-purple p-7 text-white shadow-purple sm:p-10 lg:p-12">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-white/75">NZ Travel Packs</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black uppercase leading-[0.92] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Experience New Zealand on a local mobile network
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-bold leading-8 text-white">
              Stay connected while you explore New Zealand. Our plans have plenty of data, texts and minutes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="bg-white text-spark-purple hover:bg-spark-lilac">
                View Travel Packs
              </Button>
              <Button variant="secondary" className="border-white bg-transparent text-white hover:bg-white/10">
                Find a Spark store
              </Button>
            </div>
          </div>

          <div className="grid min-h-[460px] gap-4 sm:grid-cols-2 lg:min-h-full">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-spark-lilac sm:col-span-2">
              <img
                src="/brand/travel-queenstown.png"
                alt="Queenstown lake and mountains"
                className="h-full min-h-56 w-full object-cover"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-3xl bg-white/92 p-4 shadow-card backdrop-blur">
                <p className="inline-flex items-center gap-2 text-sm font-extrabold text-spark-purple">
                  <MapPin className="size-4" />
                  Connect at Auckland or Christchurch Airport
                </p>
              </div>
            </div>
            <img
              src="/brand/travel-beach.png"
              alt="New Zealand beach scene"
              className="h-44 w-full rounded-[2rem] object-cover shadow-card sm:h-full"
            />
            <img
              src="/brand/travel-mount.png"
              alt="New Zealand mountain road"
              className="h-44 w-full rounded-[2rem] object-cover shadow-card sm:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
