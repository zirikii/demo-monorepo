import { ButtonLink } from "@/components/ui/Button";

export function CtaBand() {
  return (
    <section className="bg-go-green text-white">
      <div className="container-go-wide flex flex-col gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <h2 className="display-go max-w-2xl text-3xl sm:text-4xl lg:text-[3rem]">
          We build for the millions of people whose day depends on this platform working.
        </h2>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/join-us" variant="inverse" size="lg">
            Join us
          </ButtonLink>
          <ButtonLink
            to="/life-at-gojek"
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/15"
          >
            Life@Gojek
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
