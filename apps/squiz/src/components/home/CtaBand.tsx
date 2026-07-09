import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

/** Full-bleed dark navy CTA band (mirrors the mid-page CTA on squiz.net). */
export function CtaBand() {
  return (
    <section className="bg-navy text-white squiz-lines-dark">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-3xl">
          <Badge tint="mint" className="mb-5">
            Squiz DXP
          </Badge>
          <h2 className="text-3xl font-semibold leading-tight sm:text-5xl">
            Build, test and manage experiences independently.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Sophisticated capabilities without technical complexity. Marketing teams work
            independently, developers focus on innovation, and content performs everywhere — one
            platform delivers it all.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button to="/book-a-call" variant="primary-dark" size="lg" withArrow>
              Get started
            </Button>
            <Button to="/products/digital-experience-platform" variant="secondary-dark" size="lg">
              Explore the DXP
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
