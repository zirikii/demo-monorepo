import { ButtonLink } from "@/components/ui/Button";
import { SITE } from "@/data/site";

export function JoinUsBand() {
  return (
    <section className="border-y border-white/8 bg-go-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">{SITE.joinBand}</h2>
        <ButtonLink to="/careers" size="lg">
          Join Us
        </ButtonLink>
      </div>
    </section>
  );
}
