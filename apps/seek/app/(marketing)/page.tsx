import Link from "next/link";
import { ArrowRight, Bell, Building2, Sparkles, Star, Target } from "lucide-react";
import { getContent, listContent } from "@/lib/content/markdown";
import { getEmployers } from "@/lib/data/employers";
import { getJobsWithEmployers } from "@/lib/data/jobs";
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

export default async function MarketingHome() {
  const [hero, employers, articles, jobs] = await Promise.all([
    getContent<HeroFrontmatter>("landing", "hero"),
    getEmployers(),
    listContent<ArticleFrontmatter>("career-advice"),
    getJobsWithEmployers(),
  ]);

  const fm = hero?.frontmatter;
  const jobCountByEmployer = new Map<string, number>();
  for (const job of jobs) {
    jobCountByEmployer.set(job.employerId, (jobCountByEmployer.get(job.employerId) ?? 0) + 1);
  }

  return (
    <div>
      {/* Hero — seek.com.au style: light search-first surface */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-seek-pink-light/40 via-surface-subtle to-white">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-seek-pink/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-seek-navy/5 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-page relative py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-seek-pink">SEEK</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-seek-navy sm:text-4xl lg:text-5xl">
              {fm?.headline ?? "Perform a job search"}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-ink-secondary sm:text-lg">{fm?.subhead}</p>
          </div>

          <div className="mt-8 max-w-4xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <SearchBar variant="hero" />
          </div>

          <div className="mt-6">
            <QuickSearchChips chips={QUICK_SEARCH_CHIPS} variant="light" />
          </div>
        </div>
      </section>

      {/* Browse by classification */}
      <section className="container-page py-14">
        <h2 className="text-2xl font-bold text-seek-navy">Classifications</h2>
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
              <ArrowRight
                className="h-4 w-4 shrink-0 text-ink-muted transition-colors group-hover:text-seek-pink"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="bg-surface-subtle py-14">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {(fm?.valueProps ?? []).map((vp, i) => {
              const Icon = valuePropIcons[i % valuePropIcons.length] ?? Target;
              return (
                <div key={vp.title} className="rounded-lg border border-line bg-white p-6 shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-seek-pink-light text-seek-pink">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-seek-navy">{vp.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-secondary">{vp.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Employer carousel / grid */}
      <section className="container-page py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-seek-navy">Find your next employer</h2>
            <p className="mt-1 text-ink-secondary">
              Explore company profiles — reviews, culture, perks and open roles. (All employers
              shown are fictional.)
            </p>
          </div>
          <Link
            href="/companies"
            className="hidden items-center gap-1 text-sm font-semibold text-seek-pink hover:underline sm:inline-flex"
          >
            See more <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {employers.slice(0, 8).map((emp) => {
            const openJobs = jobCountByEmployer.get(emp.id) ?? 0;
            return (
              <Link
                key={emp.id}
                href={`/companies/${emp.slug}`}
                className="focus-ring flex flex-col gap-3 rounded-lg border border-line bg-white p-4 shadow-card transition-all hover:border-line-strong hover:shadow-card-hover"
              >
                <div className="flex items-center gap-3">
                  <EmployerLogo src={emp.logo} name={emp.name} size={48} />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-seek-navy">{emp.name}</p>
                    <p className="truncate text-xs text-ink-muted">{emp.industry}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-ink-secondary">
                  <span className="inline-flex items-center gap-1">
                    <Star
                      className="h-3.5 w-3.5 fill-tone-caution text-tone-caution"
                      aria-hidden="true"
                    />
                    {emp.rating.toFixed(1)}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-seek-pink">
                    <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {openJobs} {openJobs === 1 ? "job" : "jobs"}
                  </span>
                </div>
              </Link>
            );
          })}
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
              View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/oauth/register"
              className="focus-ring inline-flex h-12 items-center justify-center rounded-full bg-white px-8 font-semibold text-seek-pink transition-colors hover:bg-white/90"
            >
              Create your free profile
            </Link>
            <Link
              href="/employers"
              className="focus-ring inline-flex h-12 items-center justify-center rounded-full border-2 border-white/80 px-8 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Advertise a job
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
