import { ArrowRight, Check, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ButtonLink } from "@/components/ui/Button";
import { publicPages, type PublicPage } from "@/data/publicPages";

export function ContentPage({ page }: { page: PublicPage }) {
  const parentPath = page.path.split("/").slice(0, -1).join("/") || "/";
  const related = publicPages
    .filter(
      (candidate) =>
        candidate.path !== page.path &&
        (candidate.path.startsWith(`${page.path}/`) ||
          (parentPath !== "/" && candidate.path.startsWith(`${parentPath}/`))),
    )
    .slice(0, 3);
  return (
    <PublicLayout>
      <div className="border-b border-cba-line bg-cba-neutral">
        <nav aria-label="Breadcrumb" className="container-page flex items-center gap-2 py-4 text-sm text-cba-muted">
          <Link to="/">Home</Link><ChevronRight aria-hidden="true" className="h-4 w-4" />
          {parentPath !== "/" ? (
            <><Link to={parentPath}>Explore</Link><ChevronRight aria-hidden="true" className="h-4 w-4" /></>
          ) : null}
          <span aria-current="page" className="text-cba-ink">{page.eyebrow}</span>
        </nav>
      </div>
      <section className="bg-white">
        <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="font-semibold text-cba-positive">{page.eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{page.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cba-ink-soft">{page.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to={page.path.includes("netbank") ? "/netbank/logon" : "/contact"}>{page.cta}</ButtonLink>
              <ButtonLink to="/support" variant="outline">Get help</ButtonLink>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-cba-yellow p-8 sm:p-12">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/35" />
            <Sparkles aria-hidden="true" className="h-9 w-9" />
            <h2 className="mt-8 text-2xl font-bold">Made for real life</h2>
            <p className="mt-3 leading-7">Clear choices, useful digital tools and support when you need it.</p>
            <div className="mt-8 rounded-2xl bg-white/80 p-4 text-sm font-semibold">
              Illustrative demo information — not a current offer or financial advice.
            </div>
          </div>
        </div>
      </section>
      <section className="bg-cba-neutral py-16">
        <div className="container-page">
          <h2 className="text-3xl font-bold">At a glance</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {page.highlights.map((highlight) => (
              <article key={highlight} className="surface-card p-6">
                <span className="inline-flex rounded-full bg-cba-positive-soft p-2 text-cba-positive">
                  <Check aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{highlight}</h3>
                <p className="mt-2 text-sm leading-6 text-cba-ink-soft">
                  Simple, transparent information to help you compare fictional demo options.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container-page grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <ShieldCheck aria-hidden="true" className="h-9 w-9 text-cba-positive" />
          <h2 className="mt-4 text-3xl font-bold">Good to know</h2>
          <p className="mt-3 leading-7 text-cba-ink-soft">
            Rates, fees, eligibility and cover shown here are invented for this demonstration.
            Review official product information before making a financial decision.
          </p>
        </div>
        <div className="space-y-3">
          {["What information should I compare?", "Can I try this product in NetBank?", "Where is my data stored?"].map(
            (question, index) => (
              <details key={question} className="surface-card group p-5">
                <summary className="cursor-pointer list-none font-semibold">{question}</summary>
                <p className="mt-3 text-sm leading-6 text-cba-ink-soft">
                  {index === 2
                    ? "Demo preferences stay in localStorage in this browser. No banking data is sent anywhere."
                    : "Use the features and figures as a UI demonstration only. They are not real product terms."}
                </p>
              </details>
            ),
          )}
        </div>
      </section>
      {related.length > 0 ? (
        <section className="border-t border-cba-line bg-cba-neutral py-14">
          <div className="container-page">
            <h2 className="text-2xl font-bold">Keep exploring</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.path} to={item.path} className="surface-card p-5">
                  <p className="text-sm text-cba-positive">{item.eyebrow}</p>
                  <h3 className="mt-2 font-bold">{item.title}</h3>
                  <span className="mt-4 flex items-center gap-2 text-sm font-semibold">
                    Learn more <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="bg-cba-yellow py-12">
        <div className="container-page flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div><h2 className="text-2xl font-bold">Need a hand?</h2><p className="mt-1">Explore guidance and fictional contact options.</p></div>
          <Link className="flex items-center gap-2 font-semibold" to="/support">Visit support <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </section>
    </PublicLayout>
  );
}
