import Link from "next/link";
import { ArrowRight, Bell, BriefcaseBusiness, Building2, Sparkles, Target } from "lucide-react";
import { getContent, listContent } from "@/lib/content/markdown";
import { getEmployers } from "@/lib/data/employers";
import { QUICK_SEARCH_CHIPS, CLASSIFICATIONS } from "@/lib/constants/taxonomy";
import { SearchBar } from "@/components/search/SearchBar";
import { QuickSearchChips } from "@/components/marketing/QuickSearchChips";
import { EmployerLogo } from "@/components/common/EmployerLogo";
import { Card, CardContent } from "@/components/ui/card";

interface HeroFrontmatter {
  headline: string;
  subhead: string;
  valueProps: { title: string; body: string }[];
}

interface ArticleFrontmatter {
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
}

const valuePropIcons = [Target, Bell, Sparkles];

const workflowCards = [
  {
    icon: BriefcaseBusiness,
    title: "122 mock roles",
    body: "Filter by title, location, work type and salary.",
  },
  {
    icon: Building2,
    title: "Company discovery",
    body: "Explore fictional employer profiles and open roles.",
  },
];

export default async function MarketingHome() {
  const [hero, employers, articles] = await Promise.all([
    getContent<HeroFrontmatter>("landing", "hero"),
    getEmployers(),
    listContent<ArticleFrontmatter>("career-advice"),
  ]);

  const fm = hero?.frontmatter;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-seek-blue">
        <div className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-seek-pink/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="container-page relative py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white ring-1 ring-white/20">
              SEEK jobs marketplace demo
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              {fm?.headline ?? "Find your next job on SEEK"}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">{fm?.subhead}</p>
          </div>

          <div className="mt-8 max-w-4xl">
            <SearchBar variant="hero" />
          </div>

          <div className="mt-6">
            <QuickSearchChips chips={QUICK_SEARCH_CHIPS} />
          </div>

          <div className="mt-8 grid max-w-4xl gap-3 text-white sm:grid-cols-3">
            {[
              ["122,000+", "fictional roles across Australia"],
              ["14", "top-level classifications"],
              ["Daily", "mock job alerts and saved searches"],
            ].map(([value, label]) => (
              <div key={value} className="rounded-xl bg-white/10 p-4 ring-1 ring-white/15">
                <p className="text-2xl font-bold">{value}</p>
                <p className="mt-1 text-sm text-white/75">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by classification */}
      <section className="container-page py-14">
        <h2 className="text-2xl font-bold text-seek-navy">Explore jobs by classification</h2>
        <p className="mt-1 text-ink-secondary">
          Browse thousands of roles across Australia&apos;s biggest industries.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CLASSIFICATIONS.slice(0, 12).map((c) => (
            <Link
              key={c}
              href={`/jobs?classification=${encodeURIComponent(c)}`}
              className="focus-ring group flex items-center justify-between rounded-lg border border-line bg-white px-4 py-3.5 text-sm font-medium text-seek-navy shadow-card transition-all hover:border-seek-pink hover:shadow-card-hover"
            >
              <span className="line-clamp-1">{c}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-ink-muted transition-colors group-hover:text-seek-pink" />
            </Link>
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="bg-surface-subtle py-14">
        <div className="container-page">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-seek-pink">
                SEEK account tools
              </p>
              <h2 className="mt-2 text-2xl font-bold text-seek-navy">
                Everything candidates expect after signing in
              </h2>
            </div>
            <Link
              href="/oauth/register"
              className="inline-flex items-center gap-1 text-sm font-semibold text-seek-pink hover:underline"
            >
              Create a free profile <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {(fm?.valueProps ?? []).map((vp, i) => {
              const Icon = valuePropIcons[i % valuePropIcons.length] ?? Target;
              return (
                <Card key={vp.title} className="border-line">
                  <CardContent className="pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-seek-pink-light text-seek-pink">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-seek-navy">{vp.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-secondary">{vp.body}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-4 rounded-2xl border border-line bg-white p-6 shadow-card md:grid-cols-[1.15fr_0.85fr] md:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-seek-pink">
              Job seeker workflow
            </p>
            <h2 className="mt-2 text-2xl font-bold text-seek-navy">
              Search, save, apply, and track every opportunity
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-secondary">
              The authenticated demo mirrors SEEK candidate habits with saved roles, application
              history, profile strength, alert frequency, and settings that persist to local JSON.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            {workflowCards.map(({ icon: ItemIcon, title, body }) => {
              return (
                <div key={title} className="rounded-xl bg-surface-subtle p-4">
                  <ItemIcon className="h-5 w-5 text-seek-pink" aria-hidden="true" />
                  <p className="mt-3 font-semibold text-seek-navy">{title}</p>
                  <p className="mt-1 text-sm text-ink-secondary">{body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Employer grid */}
      <section className="container-page py-14">
        <h2 className="text-2xl font-bold text-seek-navy">Find your next employer</h2>
        <p className="mt-1 text-ink-secondary">
          Discover companies hiring now across Australia. (All employers shown are fictional.)
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {employers.map((emp) => (
            <Link
              key={emp.id}
              href={`/companies/${emp.slug}`}
              className="focus-ring flex items-center gap-3 rounded-lg border border-line bg-white p-4 shadow-card transition-all hover:border-line-strong hover:shadow-card-hover"
            >
              <EmployerLogo src={emp.logo} name={emp.name} size={44} />
              <div className="min-w-0">
                <p className="truncate font-semibold text-seek-navy">{emp.name}</p>
                <p className="truncate text-xs text-ink-muted">{emp.industry}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Career advice */}
      <section className="bg-surface-subtle py-14">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-seek-navy">Career advice</h2>
              <p className="mt-1 text-ink-secondary">
                Expert tips to help you land your next role.
              </p>
            </div>
            <Link
              href="/career-advice"
              className="hidden items-center gap-1 text-sm font-semibold text-seek-pink hover:underline sm:inline-flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <Link key={a.slug} href={`/career-advice/${a.slug}`}>
                <Card className="h-full transition-all hover:shadow-card-hover">
                  <CardContent className="pt-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-seek-pink">
                      {a.frontmatter.category}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-seek-navy">
                      {a.frontmatter.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-secondary">
                      {a.frontmatter.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-ink-muted">{a.frontmatter.readingTime}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-seek-pink">
        <div className="container-page flex flex-col items-center gap-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to take the next step?
          </h2>
          <p className="max-w-xl text-white/90">
            Create your free profile, save jobs, set up alerts and apply in just a few clicks.
          </p>
          <Link
            href="/oauth/register"
            className="focus-ring mt-2 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 font-semibold text-seek-pink transition-colors hover:bg-white/90"
          >
            Create your free profile
          </Link>
        </div>
      </section>
    </div>
  );
}
