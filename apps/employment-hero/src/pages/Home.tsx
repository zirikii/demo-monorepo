import { ArrowRight, Check, Quote, Sparkles, Star } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductMockup } from "@/components/marketing/ProductMockup";
import { ButtonLink } from "@/components/ui/Button";
import { Card, SectionHeading } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { products, resources } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Link } from "react-router-dom";

export function HomePage() {
  useDocumentTitle("Employment. Intelligently Run.");

  return (
    <PageLayout>
      <section className="overflow-hidden bg-violet-soft">
        <div className="container-hero grid min-h-[720px] items-center gap-14 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
          <div className="animate-fade-up">
            <Badge tone="violet" className="bg-white/70">
              <Sparkles aria-hidden="true" className="mr-1.5 h-3.5 w-3.5" />
              Australia&rsquo;s AI Employment Operating System
            </Badge>
            <h1 className="mt-7 max-w-3xl text-6xl font-semibold leading-[0.95] tracking-[-0.065em] text-ink sm:text-7xl xl:text-[5.7rem]">
              Employment.
              <span className="block font-normal italic">Intelligently Run.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-ink-soft sm:text-xl">
              Payroll, HR, recruitment and benefits in one system—with intelligent agents that help
              your team move faster.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/book-a-demo">Book a demo</ButtonLink>
              <ButtonLink to="/products" variant="secondary">
                Explore Employment OS
              </ButtonLink>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-ink-soft">
              {["No credit card", "Local support", "Built for Australian employment"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check aria-hidden="true" className="h-4 w-4 text-positive" /> {item}
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="animate-fade-up [animation-delay:120ms]">
            <ProductMockup />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-8">
        <div className="container-hero">
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-ink-faint">
            Trusted by ambitious teams across Australia
          </p>
          <div className="mt-6 grid grid-cols-2 gap-5 text-center sm:grid-cols-3 lg:grid-cols-6">
            {["Koala", "Linktree", "Camilla", "Hub Australia", "R.M.Williams", "Culture Amp"].map(
              (name) => (
                <span key={name} className="text-base font-bold tracking-tight text-ink/55">
                  {name}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-hero">
          <SectionHeading
            eyebrow="One system. Every employment moment."
            title="The AI Employment Operating System that runs employment for you."
            body="From the first candidate conversation to every payday, give your team connected tools that understand what comes next."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => {
              const Icon = product.icon;
              return (
                <Link
                  key={product.slug}
                  to={`/products/${product.slug}`}
                  className={`focus-hero group rounded-hero-xl p-7 transition-transform hover:-translate-y-1 tone-${product.tone}`}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/70">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-ink-soft">
                    {product.eyebrow}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                    {product.title}
                  </h3>
                  <p className="mt-4 min-h-20 leading-7 text-ink-soft">{product.summary}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold">
                    Explore{" "}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white sm:py-28">
        <div className="container-hero grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow text-violet">Hero AI</p>
            <h2 className="mt-5 max-w-xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">
              Less searching. Less checking. More getting things done.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
              Employment-aware agents answer questions, prepare work and flag what needs human
              attention—right where your people already work.
            </p>
            <ButtonLink to="/products/hero-ai" variant="violet" className="mt-8">
              Meet Hero AI
            </ButtonLink>
          </div>
          <div className="rounded-hero-xl bg-white/8 p-4 sm:p-7">
            <Card className="border-0 p-6 text-ink sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet">
                  <Sparkles aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold">Ask Hero</p>
                  <p className="text-xs text-ink-faint">Employment intelligence for your team</p>
                </div>
              </div>
              <div className="mt-7 rounded-2xl bg-neutral-soft p-5 text-sm leading-6">
                Who needs attention before Friday&rsquo;s pay run?
              </div>
              <div className="mt-4 rounded-2xl bg-violet-soft p-5">
                <p className="text-sm font-bold">I found 3 items to review</p>
                <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                  <li>2 timesheets are missing manager approval</li>
                  <li>1 expense is above the team policy threshold</li>
                  <li>No award interpretation conflicts detected</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-coral-soft py-20 sm:py-28">
        <div className="container-hero">
          <SectionHeading
            eyebrow="Customer stories"
            title="Big change starts with one easier day."
            body="Teams use Employment OS to replace fragmented admin with connected, confident moments."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <Card className="border-0 bg-white p-8 sm:p-12">
              <Quote aria-hidden="true" className="h-10 w-10 text-coral" />
              <blockquote className="mt-8 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-4xl">
                “Our managers stopped chasing forms and started having better conversations with
                their people.”
              </blockquote>
              <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
                <div>
                  <p className="font-bold">Sasha Morgan</p>
                  <p className="text-sm text-ink-soft">People Director, Koala Labs</p>
                </div>
                <div className="flex text-coral">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} aria-hidden="true" className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </Card>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ["11 hrs", "saved each week on people admin"],
                ["2 weeks", "faster from offer to productive"],
              ].map(([value, label]) => (
                <div key={value} className="rounded-hero-xl bg-ink p-8 text-white">
                  <p className="text-5xl font-semibold tracking-[-0.05em] text-violet">{value}</p>
                  <p className="mt-4 max-w-xs text-base leading-7 text-white/65">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-hero">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Big ideas. At your fingertips."
              title="Tools for better employment."
              body="Practical guides, current thinking and ready-to-use templates."
            />
            <ButtonLink to="/resources" variant="secondary">
              See all resources
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {resources.slice(0, 3).map((resource) => (
              <Card key={resource.title} className="group overflow-hidden">
                <div className={`h-44 tone-${resource.color} grid place-items-center`}>
                  <span className="grid h-20 w-20 rotate-6 place-items-center rounded-3xl bg-white/65 text-4xl font-semibold transition-transform group-hover:rotate-0">
                    {resource.type[0]}
                  </span>
                </div>
                <div className="p-6">
                  <Badge tone={resource.color as "violet" | "coral" | "green" | "blue" | "yellow"}>
                    {resource.type}
                  </Badge>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">
                    {resource.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{resource.summary}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-4">
        <div className="container-hero rounded-hero-xl bg-green px-6 py-16 text-center sm:px-12 sm:py-20">
          <p className="eyebrow">Jump into Employment OS</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">
            Ready to run ahead?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
            See how connected hiring, HR and payroll can give your team more room to grow.
          </p>
          <ButtonLink to="/book-a-demo" className="mt-8">
            Book your personalised demo
          </ButtonLink>
        </div>
      </section>
    </PageLayout>
  );
}
