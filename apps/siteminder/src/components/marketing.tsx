import { ArrowRight, Check, Quote } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { TESTIMONIALS, type Resource } from "@/data/site";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  body,
  center,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-bold leading-tight md:text-[44px]">{title}</h2>
      {body && <p className="mt-4 text-lg text-ink-soft">{body}</p>}
    </div>
  );
}

export function CtaBand({
  title = "Ready to put your hotel in demand?",
  body = "Try SiteMinder free for 14 days. No credit card, no setup fees.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="container-sm py-20">
      <div className="sm-night relative overflow-hidden rounded-panel px-8 py-14 text-white md:px-14">
        <div className="relative max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-white/70">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/get-started" className="btn-lime px-6 py-3">
              Try for free
            </Link>
            <Link to="/demo" className="btn-ghost-white px-6 py-3">
              Get a demo
            </Link>
          </div>
        </div>
        <span
          className="pointer-events-none absolute -right-10 -top-10 hidden size-72 rounded-full border-[28px] border-royal-bright/30 md:block"
          aria-hidden
        />
      </div>
    </section>
  );
}

export function CheckList({ items, tone = "dark" }: { items: string[]; tone?: "dark" | "light" }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "flex items-start gap-3",
            tone === "light" ? "text-white/85" : "text-ink-soft",
          )}
        >
          <span
            className={cn(
              "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
              tone === "light" ? "bg-lime text-stratos" : "bg-royal-tint text-royal",
            )}
          >
            <Check className="size-3.5" strokeWidth={3} aria-hidden />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[index]!;
  return (
    <section className="bg-lavender/60 py-20">
      <div className="container-sm grid items-center gap-10 md:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          eyebrow="Customer stories"
          title="Hoteliers who are always in demand"
          body="From 10-room motels to 160-property groups."
        />
        <figure className="card relative p-8 md:p-10">
          <Quote className="size-8 text-royal" aria-hidden />
          <blockquote
            key={index}
            className="mt-4 animate-fade-up text-xl font-medium leading-relaxed text-heading"
          >
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <span>
              <span className="block font-semibold text-heading">{t.name}</span>
              <span className="block text-sm text-ink-faint">
                {t.role}, {t.property} · {t.location}
              </span>
            </span>
            <span className="pill bg-lime text-stratos">{t.stat}</span>
          </figcaption>
          <div className="mt-6 flex gap-2" role="tablist" aria-label="Testimonials">
            {TESTIMONIALS.map((x, i) => (
              <button
                key={x.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${x.property} story`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-8 bg-royal" : "w-4 bg-line",
                )}
              />
            ))}
          </div>
        </figure>
      </div>
    </section>
  );
}

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      to={`/resources/${resource.slug}`}
      className="group card overflow-hidden transition-shadow hover:shadow-lift"
    >
      <img
        src={asset(`brand/${resource.image}`)}
        alt=""
        loading="lazy"
        className="aspect-video w-full object-cover"
      />
      <div className="p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-royal">
          {resource.kind} · {resource.minutes} min
        </span>
        <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-royal">
          {resource.title}
        </h3>
        <p className="mt-2 text-sm text-ink-soft">{resource.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-royal">
          Read more{" "}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
  children,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  children?: ReactNode;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-canvas">
      <div
        className={cn(
          "container-sm grid items-center gap-10 py-16 md:py-20",
          image && "md:grid-cols-2",
        )}
      >
        <div className="animate-fade-up">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.05] md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">{body}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <img
            src={asset(`brand/${image}`)}
            alt=""
            className="w-full animate-fade-up rounded-panel object-cover shadow-lift"
          />
        )}
      </div>
    </section>
  );
}
