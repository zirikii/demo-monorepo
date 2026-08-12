import { trustedBy } from "@/data/site";

export function LogoMarquee() {
  const row = [...trustedBy, ...trustedBy];

  return (
    <section className="border-y border-eh-line bg-white py-10">
      <p className="text-center text-xs font-bold tracking-[0.18em] text-eh-ink-faint uppercase">
        Trusted by 350k+ happy customers
      </p>
      <div className="mt-6 overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-marquee items-center gap-12 px-6">
          {row.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="font-display text-xl font-semibold whitespace-nowrap text-eh-ink-ghost"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">
        Customers include {trustedBy.slice(0, -1).join(", ")} and {trustedBy.at(-1)}.
      </p>
    </section>
  );
}
