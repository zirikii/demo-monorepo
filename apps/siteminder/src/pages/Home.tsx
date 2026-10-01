import { ArrowRight, BarChart3, BedDouble, CalendarDays, Check, Compass, Globe2, HeartHandshake, MousePointerClick, RefreshCw, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CtaBand, ResourceCard, SectionHeading, Testimonials } from "@/components/marketing";
import { HERO_WORDS, INTEGRATIONS, PRODUCTS, RESOURCES, STATS } from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { asset } from "@/lib/asset";

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % HERO_WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span key={index} className="sm-gradient-text inline-block animate-word pb-1">
      {HERO_WORDS[index]}.
    </span>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-lavender via-mint to-butter opacity-80 blur-2xl" aria-hidden />
      <img src={asset("brand/media/hero-portrait.webp")} alt="Hotelier smiling at a new booking on her phone" className="ml-auto aspect-[47/72] w-[78%] rounded-panel object-cover shadow-lift" />
      <div className="absolute left-0 top-10 w-56 animate-pop-in rounded-card bg-white/95 p-4 shadow-lift backdrop-blur">
        <div className="flex items-center gap-3">
          <BedDouble className="size-6 text-heading" aria-hidden />
          <span className="text-3xl font-semibold text-heading">$430</span>
        </div>
        <span className="mt-3 flex items-center justify-center gap-2 rounded-full bg-lime py-2 text-sm font-bold tracking-wide text-royal">
          <Check className="size-4" strokeWidth={3} aria-hidden /> BOOKED
        </span>
      </div>
      <div className="absolute -left-4 bottom-24 w-64 animate-pop-in rounded-card bg-white p-4 shadow-lift [animation-delay:150ms]">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-royal">
          <CalendarDays className="size-4" aria-hidden /> Demand calendar
        </p>
        <p className="mt-2 text-sm font-semibold text-heading">Stadium concert · Sat</p>
        <p className="text-xs text-ink-faint">Similar events sold out 21 days out</p>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-royal-tint px-3 py-2 text-sm">
          <span className="text-ink-soft">Suggested</span>
          <span className="font-bold text-royal">+35% · 2-night min</span>
        </div>
      </div>
      <div className="absolute -right-2 bottom-6 flex animate-pop-in items-center gap-2 rounded-full bg-stratos px-4 py-2.5 text-sm font-semibold text-white shadow-lift [animation-delay:300ms]">
        <RefreshCw className="size-4 text-lime" aria-hidden /> Synced to 9 channels in 0.8s
      </div>
    </div>
  );
}

const PILLARS = [
  {
    group: "Distribution" as const,
    icon: Globe2,
    title: "Be everywhere guests are looking",
    body: "Sell on 450+ channels, your own website and metasearch, with rates and availability that are always in sync.",
    tone: "bg-royal-tint",
  },
  {
    group: "Revenue" as const,
    icon: BarChart3,
    title: "Price every night with confidence",
    body: "Event-aware revenue management, competitor rates and payments that get you paid faster.",
    tone: "bg-mint",
  },
  {
    group: "Guest experience" as const,
    icon: HeartHandshake,
    title: "Delight guests before they arrive",
    body: "Pre-arrival upsells, online check-in and messaging that grow revenue per stay.",
    tone: "bg-butter",
  },
];

const CONTROL = [
  { icon: Compass, title: "Navigate decisively", body: "See demand building around local events weeks before your competitors do." },
  { icon: MousePointerClick, title: "Act effortlessly", body: "Apply a recommended rate to every room and channel in one click." },
  { icon: ShieldCheck, title: "Operate confidently", body: "Get alerted the moment a channel stops selling, and fix it with Support in seconds." },
];

export function HomePage() {
  useDocumentTitle("The Hotel Commerce Platform");
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-sm grid items-center gap-14 pb-16 pt-12 md:grid-cols-[1.05fr_1fr] md:pb-24 md:pt-20">
          <div className="animate-fade-up">
            <span className="pill bg-lavender text-heading">
              <Sparkles className="size-3.5 text-royal" aria-hidden /> Dynamic Revenue Plus now with event insights
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.02] md:text-7xl">
              We put you
              <br />
              in <RotatingWord />
            </h1>
            <p className="mt-6 max-w-lg text-lg text-ink-soft md:text-xl">
              SiteMinder is the hotel commerce platform that helps you attract, convert and delight guests, wherever they are.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/get-started" className="btn-primary px-6 py-3 text-base">
                Try for free
              </Link>
              <Link to="/demo" className="btn-outline px-6 py-3 text-base">
                Get a demo
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink-faint">14-day free trial · No credit card · Cancel any time</p>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="border-y border-line-soft bg-canvas">
        <div className="container-sm grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-heading md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-sm py-20">
        <SectionHeading eyebrow="One platform" title="Everything you need to win more bookings" body="Distribution, revenue and guest experience, connected by one source of truth." center />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PILLARS.map((p) => (
            <article key={p.group} className="card flex flex-col p-7">
              <span className={`grid size-12 place-items-center rounded-2xl ${p.tone}`}>
                <p.icon className="size-6 text-heading" aria-hidden />
              </span>
              <p className="eyebrow mt-6">{p.group}</p>
              <h3 className="mt-2 text-2xl font-bold leading-tight">{p.title}</h3>
              <p className="mt-3 text-ink-soft">{p.body}</p>
              <ul className="mt-5 space-y-1.5 border-t border-line-soft pt-5">
                {PRODUCTS.filter((x) => x.group === p.group).map((x) => (
                  <li key={x.slug}>
                    <Link to={`/platform/${x.slug}`} className="group flex items-center justify-between text-sm font-semibold text-heading hover:text-royal">
                      {x.name}
                      <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="sm-night py-20 text-white">
        <div className="container-sm grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime">The Revenue Control Centre</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">Turn every local event into revenue</h2>
            <p className="mt-4 text-lg text-white/70">
              SiteMinder learns from the concerts, conferences and sporting events you&apos;ve already traded through, so next time you price earlier and sell out higher.
            </p>
            <div className="mt-8 space-y-5">
              {CONTROL.map((c) => (
                <div key={c.title} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10">
                    <c.icon className="size-5 text-lime" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold text-white">{c.title}</span>
                    <span className="block text-sm text-white/65">{c.body}</span>
                  </span>
                </div>
              ))}
            </div>
            <Link to="/platform/dynamic-revenue-plus" className="btn-lime mt-8">
              Explore Dynamic Revenue Plus
            </Link>
          </div>
          <div className="rounded-panel border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="rounded-card bg-white p-5 text-ink">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-heading">Demand calendar · Sydney</p>
                <span className="pill bg-positive-bg text-positive">Live</span>
              </div>
              <ul className="mt-4 space-y-3">
                {[
                  ["Stadium concert", "Accor Stadium · 3 days", "+35%", "High"],
                  ["Medical conference", "ICC Sydney · 12 days", "+15%", "Medium"],
                  ["City marathon", "CBD · 19 days", "+20%", "High"],
                ].map(([name, where, uplift, level]) => (
                  <li key={name} className="flex items-center justify-between rounded-xl border border-line-soft p-3">
                    <span>
                      <span className="block text-sm font-semibold text-heading">{name}</span>
                      <span className="block text-xs text-ink-faint">{where}</span>
                    </span>
                    <span className="text-right">
                      <span className="block text-sm font-bold text-royal">{uplift}</span>
                      <span className="block text-xs text-ink-faint">{level} demand</span>
                    </span>
                  </li>
                ))}
              </ul>
              <button type="button" className="btn-primary mt-4 w-full">
                <Zap className="size-4" aria-hidden /> Apply all recommendations
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-sm py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <img src={asset("brand/media/hero-booked.webp")} alt="A hotelier gets a booking notification" loading="lazy" className="rounded-panel shadow-lift" />
          <div>
            <SectionHeading eyebrow="24/7 support" title="Help that already knows your hotel" body="SiteMinder Support sees your channels, bookings and events, so it can fix a mapping error or price next week's concert while you're still on the call. Chat or talk, any time." />
            <Link to="/login" className="btn-dark mt-8">
              Log in to try SiteMinder Support
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-canvas py-20">
        <div className="container-sm">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Integrations" title="Works with the tools you already use" body="Hundreds of PMS, payments, revenue and guest-experience partners." />
            <Link to="/integrations" className="btn-outline">
              Browse the marketplace
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {INTEGRATIONS.slice(0, 12).map((i) => (
              <div key={i.name} className="flex h-20 items-center justify-center rounded-card border border-line-soft bg-white px-3 text-center text-sm font-bold text-heading">
                {i.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="container-sm py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Resources" title="Insights to stay ahead" />
          <Link to="/resources" className="link inline-flex items-center gap-1">
            View all resources <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {RESOURCES.slice(0, 3).map((r) => (
            <ResourceCard key={r.slug} resource={r} />
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
