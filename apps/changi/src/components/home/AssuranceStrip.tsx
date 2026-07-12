import { assuranceTiles } from "@/data/directions";

export function AssuranceStrip() {
  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        {assuranceTiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <div key={tile.title} className="rounded-[2rem] bg-[#2f271f] p-6 text-white">
              <Icon className="text-[#f5a400]" />
              <h3 className="mt-4 text-xl font-bold">{tile.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{tile.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
