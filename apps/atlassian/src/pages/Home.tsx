import { useState } from "react";
import { ArrowRight, Shield, Globe2, Server } from "lucide-react";
import { Link } from "react-router-dom";
import { AppMark } from "@/components/brand/AppMark";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { GraphStage } from "@/components/marketing/GraphStage";
import { ProductTile } from "@/components/marketing/ProductTile";
import { StatBand } from "@/components/marketing/StatBand";
import { ButtonLink } from "@/components/ui/Button";
import { COLLECTIONS } from "@/data/collections";
import { getProduct } from "@/data/products";
import { RESOURCES } from "@/data/resources";
import type { Resource } from "@/data/types";
import { cn } from "@/lib/cn";

const GRAPH_STEPS = [
  {
    title: "Uniting knowledge across teams",
    body: "Connect work across teams and tools in Confluence whiteboards.",
    caption: "Marketing / Veronica · Meeting recordings · Campaign ad refresh",
  },
  {
    title: "For insights that matter",
    body: "Partner with Rovo to update your strategy, specs, and tasks from the latest meeting.",
    caption: "Strategy brief · Portal repo 2.0 · Portal feature gates",
  },
  {
    title: "Keeping everyone in sync",
    body: "Pull context from connected tools to turn demos and ideas into work items.",
    caption: "Portal redesign brainstorm · Designs · [O1.KR2] Add 300k accounts",
  },
  {
    title: "To accelerate teamwork",
    body: "Let Rovo update Jira proactively if plans change.",
    caption: "Partner calls · FIN-300: Account microservice · Design walkthrough",
  },
];

const TRUST_PILLARS = [
  {
    icon: Shield,
    title: "Secure by design",
    body: "Engineered to protect your business with security designed for how teams collaborate.",
    tint: "bg-[#E9F2FF]",
    ink: "text-atl-blue",
  },
  {
    icon: Globe2,
    title: "Compliant across the globe",
    body: "Designed to support evolving standards so you can meet obligations without slowing teams down.",
    tint: "bg-[#F3E8FF]",
    ink: "text-[#6B5CE7]",
  },
  {
    icon: Server,
    title: "Reliable at scale",
    body: "Scale to match your most complex structures, processes, and teams, with reliability baked in.",
    tint: "bg-[#DCFFF1]",
    ink: "text-positive",
  },
] as const;

/* Resource card surfaces mirror atlassian.com category colours:
 * video green, report orange, ebook purple, event blue. */
const RESOURCE_TINT: Record<Resource["type"], string> = {
  Guide: "#4C6B1F",
  Report: "#C75300",
  Ebook: "#803FA5",
  Event: "#357DE8",
  Announcement: "#101214",
  Podcast: "#1D9E75",
};

const HERO_CONSTELLATION = [
  "radial-gradient(ellipse 80% 55% at 12% 18%, rgba(53,125,232,0.30), transparent 58%)",
  "radial-gradient(ellipse 70% 50% at 88% 10%, rgba(191,99,243,0.24), transparent 52%)",
  "radial-gradient(ellipse 65% 48% at 78% 88%, rgba(242,172,0,0.22), transparent 54%)",
  "radial-gradient(ellipse 50% 40% at 8% 86%, rgba(130,181,54,0.16), transparent 50%)",
  "radial-gradient(circle at 48% 42%, rgba(255,255,255,0.55), transparent 42%)",
].join(",");

const HERO_STARS = [
  { cx: 8, cy: 22, r: 1.1 },
  { cx: 16, cy: 68, r: 0.8 },
  { cx: 28, cy: 14, r: 0.7 },
  { cx: 41, cy: 78, r: 1 },
  { cx: 62, cy: 12, r: 0.9 },
  { cx: 74, cy: 64, r: 1.15 },
  { cx: 86, cy: 28, r: 0.75 },
  { cx: 92, cy: 72, r: 1 },
] as const;

export default function HomePage() {
  const [collectionSlug, setCollectionSlug] = useState(COLLECTIONS[0]!.slug);
  const [graphStep, setGraphStep] = useState(0);
  const collection = COLLECTIONS.find((item) => item.slug === collectionSlug) ?? COLLECTIONS[0]!;
  const collectionProducts = collection.productSlugs
    .map((slug) => getProduct(slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));
  const step = GRAPH_STEPS[graphStep] ?? GRAPH_STEPS[0]!;

  return (
    <PageLayout title="Collaboration software for software, IT and business teams">
      <section
        className="relative overflow-hidden py-20 md:py-32"
        style={{ backgroundImage: HERO_CONSTELLATION }}
      >
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
        >
          <line
            x1="8"
            y1="22"
            x2="28"
            y2="14"
            stroke="#357DE8"
            strokeOpacity="0.18"
            strokeWidth="0.18"
          />
          <line
            x1="28"
            y1="14"
            x2="62"
            y2="12"
            stroke="#BF63F3"
            strokeOpacity="0.16"
            strokeWidth="0.18"
          />
          <line
            x1="62"
            y1="12"
            x2="86"
            y2="28"
            stroke="#357DE8"
            strokeOpacity="0.14"
            strokeWidth="0.18"
          />
          <line
            x1="16"
            y1="68"
            x2="41"
            y2="78"
            stroke="#F2AC00"
            strokeOpacity="0.16"
            strokeWidth="0.18"
          />
          <line
            x1="41"
            y1="78"
            x2="74"
            y2="64"
            stroke="#82B536"
            strokeOpacity="0.14"
            strokeWidth="0.18"
          />
          <line
            x1="74"
            y1="64"
            x2="92"
            y2="72"
            stroke="#BF63F3"
            strokeOpacity="0.14"
            strokeWidth="0.18"
          />
          {HERO_STARS.map((star) => (
            <circle
              key={`${star.cx}-${star.cy}`}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="#357DE8"
              fillOpacity="0.35"
            />
          ))}
        </svg>
        <div className="container-atl relative flex flex-col items-center gap-7 text-center">
          <h1 className="text-balance-atl max-w-5xl text-5xl font-semibold tracking-tight text-ink-strong md:text-[5.25rem] md:leading-[1]">
            Unleash your teams <em className="italic text-[#BF63F3]">and</em> their agents
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Everyone. Working on the right things. In Jira, teams and AI agents plan, execute, and
            deliver outcomes together.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <ButtonLink to="/try" size="lg">
              Get started with Jira
            </ButtonLink>
            <Link
              to="/contact"
              className="focus-atl text-base font-semibold text-atl-blue hover:underline"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <Section tone="tint" className="pt-10">
        <div className="flex flex-col gap-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink-strong md:text-[3.25rem] md:leading-[1.12]">
              Transform how your teams work
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Discover collections — curated apps and AI agents on a secure, compliant, and reliable
              platform.
            </p>
          </div>

          <div className="grid gap-0 lg:grid-cols-[0.32fr_1fr]">
            <div
              className="flex flex-col gap-1 self-start"
              role="tablist"
              aria-label="Collections"
              aria-orientation="vertical"
            >
              {COLLECTIONS.map((item) => {
                const selected = item.slug === collection.slug;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setCollectionSlug(item.slug)}
                    className={cn(
                      "focus-atl flex flex-col gap-0.5 rounded-l-[8px] px-4 py-3 text-left transition",
                      selected
                        ? "bg-white text-atl-blue"
                        : "bg-transparent text-ink-soft hover:bg-white/60 hover:text-ink-strong",
                    )}
                  >
                    <span className="text-sm font-bold">{item.name} Collection</span>
                    <span className={cn("text-xs", selected ? "text-ink-soft" : "text-ink-faint")}>
                      {item.headline}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="grid gap-8 border border-line bg-white p-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="flex flex-col gap-5">
                <h3 className="text-2xl font-semibold tracking-tight text-ink-strong md:text-3xl">
                  {collection.headline}
                </h3>
                <p className="leading-relaxed text-ink-soft">{collection.body}</p>
                <div>
                  <p className="text-sm font-semibold text-ink-faint">Includes</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                    {collectionProducts.map((product) => (
                      <li key={product.slug} className="flex items-center gap-2.5">
                        <AppMark slug={product.slug} size={36} />
                        <span className="text-sm font-semibold text-ink-strong">
                          {product.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={`/collections/${collection.slug}`}
                  className="focus-atl inline-flex items-center gap-1 text-sm font-bold text-atl-blue hover:underline"
                >
                  Explore the {collection.name} Collection
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {collectionProducts.map((product) => (
                  <ProductTile key={product.slug} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="blue">
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-white/80 uppercase">
              Fueled by Atlassian’s latest AI innovations
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-[3.25rem] md:leading-[1.12]">
              Discover best practices for building unstoppable teams with AI.
            </h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((resource) => (
              <li key={resource.slug}>
                <Link
                  to={`/resources/${resource.slug}`}
                  className="focus-atl flex min-h-[200px] h-full flex-col justify-between gap-6 p-6 text-white transition hover:shadow-atl-lift hover:brightness-110"
                  style={{ backgroundColor: RESOURCE_TINT[resource.type] }}
                >
                  <span className="inline-flex w-fit rounded-[20px] bg-white/20 px-2.5 py-0.5 text-[0.65rem] font-bold tracking-[0.12em] uppercase">
                    {resource.type === "Guide" ? "Video" : resource.type}
                  </span>
                  <h3 className="text-xl font-semibold leading-snug md:text-2xl">
                    {resource.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-bold tracking-[0.14em] text-atl-blue uppercase">
              Discover the power of the Teamwork Graph
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-ink-strong md:text-[3.25rem] md:leading-[1.12]">
              It all starts with context…
            </h2>
            <p className="text-lg leading-relaxed text-ink-soft">
              When teams, work, and goals are linked, you can unlock Rovo’s AI with a simple prompt.
            </p>
            <div className="flex flex-col gap-3">
              {GRAPH_STEPS.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setGraphStep(index)}
                  className={cn(
                    "focus-atl border px-4 py-3 text-left",
                    index === graphStep
                      ? "border-atl-blue bg-white shadow-atl"
                      : "border-transparent bg-transparent hover:bg-surface-tint",
                  )}
                >
                  <p className="font-bold text-ink-strong">{item.title}</p>
                  <p className="mt-1 text-sm text-ink-soft">{item.body}</p>
                </button>
              ))}
            </div>
          </div>
          <GraphStage caption={step.caption} />
        </div>
      </Section>

      <Section tone="tint">
        <div className="flex flex-col gap-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink-strong md:text-[3.25rem] md:leading-[1.12]">
              Built for how real teams work
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              The Atlassian platform is secure, compliant, and reliable by design.
            </p>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {TRUST_PILLARS.map((item) => (
              <li
                key={item.title}
                className="border border-line bg-white p-7 transition hover:shadow-atl-lift"
              >
                <span className={cn("inline-flex p-3", item.tint)}>
                  <item.icon aria-hidden className={cn("h-6 w-6", item.ink)} />
                </span>
                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
              </li>
            ))}
          </ul>
          <ButtonLink to="/trust" variant="secondary">
            Explore our platform
          </ButtonLink>
        </div>
      </Section>

      <StatBand />

      <CtaBand />
    </PageLayout>
  );
}
