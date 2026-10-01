import { ArrowLeft, Mail, MapPin, Phone, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckList, CtaBand, PageHero, ResourceCard, SectionHeading } from "@/components/marketing";
import {
  INTEGRATIONS,
  OFFICES,
  RESOURCES,
  resourceBySlug,
  SOLUTIONS,
  solutionBySlug,
  STATS,
  TESTIMONIALS,
  type Integration,
} from "@/data/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { NotFoundPage } from "./NotFound";

export function SolutionPage() {
  const { slug } = useParams();
  const solution = solutionBySlug(slug);
  useDocumentTitle(solution?.name ?? "Solutions");
  if (!solution) return <NotFoundPage />;
  return (
    <>
      <PageHero
        eyebrow={`For ${solution.name.toLowerCase()}`}
        title={solution.headline}
        body={solution.body}
        image={solution.image}
      >
        <Link to="/get-started" className="btn-primary px-6 py-3">
          Try for free
        </Link>
        <Link to="/demo" className="btn-outline px-6 py-3">
          Get a demo
        </Link>
      </PageHero>
      <section className="container-sm grid gap-10 py-16 md:grid-cols-2">
        <SectionHeading eyebrow="What you get" title={`Built for ${solution.name.toLowerCase()}`} />
        <CheckList items={solution.points} />
      </section>
      <section className="bg-canvas py-16">
        <div className="container-sm">
          <SectionHeading title="Other property types" />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {SOLUTIONS.filter((s) => s.slug !== solution.slug).map((s) => (
              <Link key={s.slug} to={`/solutions/${s.slug}`} className="card p-5 hover:shadow-lift">
                <h3 className="font-bold">{s.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{s.headline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function CustomersPage() {
  useDocumentTitle("Customer stories");
  return (
    <>
      <PageHero
        eyebrow="Customer stories"
        title="Hoteliers in demand"
        body="See how properties of every size use SiteMinder to sell more rooms at better rates."
        image="media/hotelier-interview.webp"
      />
      <section className="container-sm grid gap-6 py-16 md:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <figure key={t.property} className="card flex flex-col p-8">
            <span className="pill w-fit bg-lime text-stratos">{t.stat}</span>
            <blockquote className="mt-5 flex-1 text-lg font-medium text-heading">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 border-t border-line-soft pt-5">
              <span className="block font-bold text-heading">{t.property}</span>
              <span className="block text-sm text-ink-faint">
                {t.name}, {t.role} · {t.location}
              </span>
            </figcaption>
          </figure>
        ))}
      </section>
      <CtaBand />
    </>
  );
}

const KINDS = ["All", "Report", "Guide", "Article", "Podcast", "News"] as const;

export function ResourcesPage() {
  useDocumentTitle("Resources");
  const [kind, setKind] = useState<(typeof KINDS)[number]>("All");
  const list = kind === "All" ? RESOURCES : RESOURCES.filter((r) => r.kind === kind);
  return (
    <>
      <PageHero
        eyebrow="Resource hub"
        title="Ideas and data to grow your hotel"
        body="Reports, guides and the Standard Room with Breakfast podcast, from the team behind Hotel Booking Trends."
      />
      <section className="container-sm py-14">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter resources">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold",
                kind === k
                  ? "border-stratos bg-stratos text-white"
                  : "border-line text-heading hover:bg-canvas",
              )}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {list.map((r) => (
            <ResourceCard key={r.slug} resource={r} />
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function ResourceArticlePage() {
  const { slug } = useParams();
  const resource = resourceBySlug(slug);
  useDocumentTitle(resource?.title ?? "Resources");
  if (!resource) return <NotFoundPage />;
  return (
    <article className="container-sm max-w-3xl py-14">
      <Link to="/resources" className="link inline-flex items-center gap-1 text-sm">
        <ArrowLeft className="size-4" aria-hidden /> All resources
      </Link>
      <p className="eyebrow mt-8">
        {resource.kind} · {resource.minutes} min read
      </p>
      <h1 className="mt-3 text-4xl font-bold leading-tight">{resource.title}</h1>
      <p className="mt-4 text-lg text-ink-soft">{resource.summary}</p>
      <img src={asset(`brand/${resource.image}`)} alt="" className="mt-8 w-full rounded-panel" />
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
        {resource.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-6">
        <span className="font-semibold text-heading">
          See how SiteMinder puts these ideas to work.
        </span>
        <Link to="/demo" className="btn-primary">
          Get a demo
        </Link>
      </div>
    </article>
  );
}

const CATEGORIES: ("All" | Integration["category"])[] = [
  "All",
  "PMS",
  "OTA",
  "Payments",
  "Revenue",
  "Metasearch",
  "Guest experience",
];

export function IntegrationsPage() {
  useDocumentTitle("Integrations marketplace");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const list = useMemo(
    () =>
      INTEGRATIONS.filter(
        (i) =>
          (category === "All" || i.category === category) &&
          `${i.name} ${i.description}`.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [category, query],
  );
  return (
    <>
      <PageHero
        eyebrow="SiteMinder Marketplace"
        title="Connect the apps that run your hotel"
        body="1,400+ integrations across PMS, payments, revenue, distribution and guest experience."
      />
      <section className="container-sm py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="relative w-full md:max-w-sm">
            <span className="sr-only">Search integrations</span>
            <Search
              className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-faint"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search integrations"
              className="field pl-10"
            />
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-semibold",
                  category === c
                    ? "border-royal bg-royal text-white"
                    : "border-line text-heading hover:bg-canvas",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-6 text-sm text-ink-faint">{list.length} integrations</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((i) => (
            <div key={i.name} className="card flex items-start gap-4 p-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-royal-tint text-lg font-bold text-royal">
                {i.name.charAt(0)}
              </span>
              <span>
                <span className="block font-bold text-heading">{i.name}</span>
                <span className="pill mt-1 bg-canvas text-ink-soft">{i.category}</span>
                <span className="mt-2 block text-sm text-ink-soft">{i.description}</span>
              </span>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function AboutPage() {
  useDocumentTitle("About us");
  return (
    <>
      <PageHero
        eyebrow="About SiteMinder"
        title="Unlocking the full revenue potential of hotels"
        body="Founded in Sydney in 2006, SiteMinder is the world's leading open hotel commerce platform, trusted by more than 53,000 hotels in 150 countries."
        image="media/who-is-siteminder.webp"
      />
      <section className="container-sm grid grid-cols-2 gap-6 py-14 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="card p-6">
            <p className="text-3xl font-bold text-heading">{s.value}</p>
            <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
          </div>
        ))}
      </section>
      <section className="bg-canvas py-16">
        <div className="container-sm grid items-center gap-10 md:grid-cols-2">
          <img
            src={asset("brand/media/one-team.webp")}
            alt="One team, endless potential"
            className="rounded-panel"
            loading="lazy"
          />
          <SectionHeading
            eyebrow="Our people"
            title="One team, endless potential"
            body="1,000+ people across 9 offices, united by a love of hotels and the people who run them."
          />
        </div>
      </section>
      <section className="container-sm py-16">
        <SectionHeading title="Our offices" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {OFFICES.map((o) => (
            <div key={o.city} className="card p-5">
              <p className="font-bold text-heading">{o.city}</p>
              <p className="text-sm text-royal">{o.region}</p>
              <p className="mt-2 text-sm text-ink-soft">{o.address}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function ContactPage() {
  useDocumentTitle("Contact us");
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="We're here 24/7"
        body="Talk to sales, get support or find an office near you."
      />
      <section className="container-sm grid gap-6 py-14 md:grid-cols-3">
        <div className="card p-6">
          <Phone className="size-6 text-royal" aria-hidden />
          <h2 className="mt-4 text-xl font-bold">Sales</h2>
          <p className="mt-2 text-sm text-ink-soft">Find the right plan for your property.</p>
          <p className="mt-4 font-semibold text-heading">1800 000 211 (demo)</p>
          <Link to="/demo" className="btn-primary mt-4">
            Get a demo
          </Link>
        </div>
        <div className="card p-6">
          <Mail className="size-6 text-royal" aria-hidden />
          <h2 className="mt-4 text-xl font-bold">Customer support</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Already a customer? SiteMinder Support is available 24/7 in the platform, by chat or
            voice.
          </p>
          <p className="mt-4 font-semibold text-heading">1800 000 312 (demo)</p>
          <Link to="/login" className="btn-outline mt-4">
            Log in for support
          </Link>
        </div>
        <div className="card p-6">
          <MapPin className="size-6 text-royal" aria-hidden />
          <h2 className="mt-4 text-xl font-bold">Global headquarters</h2>
          <p className="mt-2 text-sm text-ink-soft">{OFFICES[0]!.address}</p>
          <Link to="/about" className="link mt-4 inline-block text-sm">
            See all offices
          </Link>
        </div>
      </section>
    </>
  );
}
