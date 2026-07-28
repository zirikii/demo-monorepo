import Link from "next/link";
import { ArrowRight, Bell, Sparkles, Target } from "lucide-react";
import { getContent, listContent } from "@/lib/content/markdown";
import { getEmployers } from "@/lib/data/employers";
import { QUICK_SEARCH_CHIPS, CLASSIFICATIONS } from "@/lib/constants/taxonomy";
import { SearchBar } from "@/components/search/SearchBar";
import { QuickSearchChips } from "@/components/marketing/QuickSearchChips";
import { EmployerCarousel } from "@/components/marketing/EmployerCarousel";
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
  const [hero, employers, articles] = await Promise.all([
    getContent<HeroFrontmatter>("landing", "hero"),
    getEmployers(),
    listContent<ArticleFrontmatter>("career-advice"),
  ]);

  const fm = hero?.frontmatter;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-seek-navy">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 10%, rgba(230,2,120,0.55) 0%, rgba(46,56,73,0) 60%)",
          }}
        />
        <div className="container-page relative py-16 sm:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              {fm?.headline ?? "Australia's no. 1 jobs site"}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">{fm?.subhead}</p>
          </div>

          <div className="mt-8 max-w-4xl">
            <SearchBar variant="hero" />
          </div>

          <div className="mt-6">
            <QuickSearchChips chips={QUICK_SEARCH_CHIPS} />
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

      {/* Find the best job matches (personalised teaser) */}
      <section className="bg-surface-subtle py-14">
        <div className="container-page">
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <div className="grid items-center gap-8 p-8 md:grid-cols-[1.2fr_1fr] md:p-10">
              <div>
                <p className="inline-flex items-center gap-1.5 rounded-full bg-seek-pink-light px-3 py-1 text-xs font-semibold text-seek-pink-dark">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Personalised for you
                </p>
                <h2 className="mt-4 text-2xl font-bold text-seek-navy sm:text-3xl">
                  Find the best job matches
                </h2>
                <p className="mt-2 max-w-xl text-ink-secondary">
                  Sign in to see roles matched to your profile, skills and search history — plus
                  saved jobs, alerts and one-click Quick Apply.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/oauth/register"
                    className="focus-ring inline-flex h-11 items-center justify-center rounded-full bg-seek-pink px-6 font-semibold text-white transition-colors hover:bg-seek-pink-dark"
                  >
                    Create your free profile
                  </Link>
                  <Link
                    href="/oauth/login"
                    className="focus-ring inline-flex h-11 items-center justify-center rounded-full border border-line px-6 font-semibold text-seek-navy transition-colors hover:border-seek-pink hover:text-seek-pink"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
              <div className="rounded-xl bg-surface-subtle p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Recommended searches
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {QUICK_SEARCH_CHIPS.slice(0, 5).map((chip) => (
                    <li key={chip}>
                      <Link
                        href={`/jobs?keywords=${encodeURIComponent(chip)}`}
                        className="focus-ring group flex items-center justify-between rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-medium text-seek-navy transition-all hover:border-seek-pink hover:shadow-card"
                      >
                        <span className="line-clamp-1">{chip}</span>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-ink-muted transition-colors group-hover:text-seek-pink"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-surface-subtle py-14">
        <div className="container-page">
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

      {/* Find your next employer (carousel) */}
      <EmployerCarousel employers={employers} />

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
