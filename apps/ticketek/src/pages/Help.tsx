import { ChevronRight, FileText, Headset, Mic, Search, Sparkles } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getArticle, HELP_ARTICLES, HELP_CATEGORIES, REQUEST_ASSIST, REQUEST_TYPES, type RequestType } from "@/data/help";
import { useAssistant } from "@/features/assistant/AssistantProvider";
import { referenceFor } from "@/features/assistant/engine/forms";
import { popularQuestions } from "@/features/assistant/flows";
import { useFan } from "@/features/fan/FanProvider";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { normaliseQuery } from "@/lib/eventFilters";
import { InfoHero } from "./Info";
import { NotFoundPage } from "./NotFound";

function AssistantBanner() {
  const { open } = useAssistant();
  return (
    <div className="relative overflow-hidden rounded-tk bg-midnight p-6 text-white shadow-tk">
      <div className="tk-gradient absolute -right-10 -top-10 size-44 rounded-full opacity-40 blur-2xl" aria-hidden />
      <Sparkles className="relative size-6 text-tk-pink" aria-hidden />
      <h2 className="relative mt-2 text-lg font-bold">Get an instant answer</h2>
      <p className="relative mt-1 text-sm text-white/80">Ticketek Support can see your orders and sort most questions in a minute — by chat or voice.</p>
      <div className="relative mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => open()} className="btn-tickets">
          <Headset className="size-4" aria-hidden /> Chat now
        </button>
        <button type="button" onClick={() => open({ mode: "voice" })} className="inline-flex items-center gap-2 rounded-tk border border-white/40 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
          <Mic className="size-4" aria-hidden /> Talk
        </button>
      </div>
    </div>
  );
}

export function HelpCentrePage() {
  useDocumentTitle("Help Centre");
  const [query, setQuery] = useState("");
  const { open } = useAssistant();
  const matches = useMemo(() => {
    const q = normaliseQuery(query);
    if (!q) return [];
    const terms = q.split(" ");
    return HELP_ARTICLES.filter((a) => terms.every((t) => normaliseQuery(`${a.title} ${a.body.join(" ")}`).includes(t))).slice(0, 6);
  }, [query]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && matches.length === 0) open({ text: query.trim() });
  };

  return (
    <>
      <InfoHero title="How can we help?" intro="Search help articles, or ask Ticketek Support about your orders.">
        <form onSubmit={submit} role="search" className="relative mt-6 max-w-xl">
          <label htmlFor="help-search" className="sr-only">
            Search help
          </label>
          <input id="help-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. refund, transfer, mobile tickets" className="h-12 w-full rounded-full bg-white pl-5 pr-12 text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-tk-pink" />
          <Search className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-ink-faint" aria-hidden />
        </form>
        {query && (
          <ul className="mt-3 max-w-xl overflow-hidden rounded-tk bg-white text-ink shadow-tk-lift">
            {matches.map((a) => (
              <li key={a.slug}>
                <Link to={`/help/article/${a.slug}`} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-page">
                  <FileText className="size-4 text-ink-faint" aria-hidden /> {a.title}
                </Link>
              </li>
            ))}
            {matches.length === 0 && (
              <li className="px-4 py-3 text-sm">
                No articles found.{" "}
                <button type="button" onClick={() => open({ text: query })} className="link">
                  Ask Ticketek Support instead
                </button>
              </li>
            )}
          </ul>
        )}
      </InfoHero>
      <div className="container-tk mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {HELP_CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={`/help/${c.id}`} className="main-content-box group flex h-full items-start justify-between gap-3 p-5 hover:shadow-tk-lift">
                  <span>
                    <span className="block font-bold group-hover:text-tk-blue">{c.title}</span>
                    <span className="mt-1 block text-sm text-ink-soft">{c.description}</span>
                  </span>
                  <ChevronRight className="mt-1 size-4 shrink-0 text-ink-faint" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="main-content-box mt-6 p-5">
            <h2 className="font-bold">Can&apos;t find what you need?</h2>
            <p className="mt-1 text-sm text-ink-soft">Send our team a request and we&apos;ll reply by email.</p>
            <Link to="/help/request" className="btn-outline mt-3">
              Submit a request
            </Link>
          </div>
        </div>
        <aside className="space-y-4">
          <AssistantBanner />
          <div className="main-content-box p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink-faint">Popular questions</h2>
            <ul className="mt-3 space-y-2">
              {popularQuestions.map((q) => (
                <li key={q.label}>
                  <button type="button" onClick={() => open({ step: q.step, label: q.label })} className="link text-left text-sm">
                    {q.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

export function HelpCategoryPage() {
  const { category = "" } = useParams();
  const cat = HELP_CATEGORIES.find((c) => c.id === category);
  useDocumentTitle(cat?.title ?? "Help");
  if (!cat) return <NotFoundPage />;
  const articles = HELP_ARTICLES.filter((a) => a.category === cat.id);
  return (
    <div className="container-tk py-8">
      <nav aria-label="Breadcrumb" className="mb-3 text-sm text-ink-soft">
        <Link to="/help" className="link">
          Help Centre
        </Link>{" "}
        / {cat.title}
      </nav>
      <h1 className="text-3xl font-extrabold">{cat.title}</h1>
      <ul className="main-content-box mt-6 divide-y divide-line-soft">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link to={`/help/article/${a.slug}`} className="flex items-center justify-between px-5 py-4 hover:bg-page">
              <span className="font-medium">{a.title}</span>
              <ChevronRight className="size-4 text-ink-faint" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HelpArticlePage() {
  const { slug = "" } = useParams();
  const article = getArticle(slug);
  useDocumentTitle(article?.title ?? "Help");
  const { open } = useAssistant();
  if (!article) return <NotFoundPage />;
  const cat = HELP_CATEGORIES.find((c) => c.id === article.category);
  return (
    <div className="container-tk grid gap-6 py-8 lg:grid-cols-[1fr_340px]">
      <article className="main-content-box p-6 md:p-8">
        <nav aria-label="Breadcrumb" className="mb-3 text-sm text-ink-soft">
          <Link to="/help" className="link">
            Help Centre
          </Link>{" "}
          /{" "}
          {cat && (
            <Link to={`/help/${cat.id}`} className="link">
              {cat.title}
            </Link>
          )}
        </nav>
        <h1 className="text-2xl font-extrabold md:text-3xl">{article.title}</h1>
        <div className="mt-4 space-y-4 leading-relaxed text-ink-soft">
          {article.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {article.assist && (
          <button type="button" onClick={() => open({ step: article.assist!.step, label: article.assist!.label })} className="btn-primary mt-6">
            <Headset className="size-4" aria-hidden /> {article.assist.label}
          </button>
        )}
      </article>
      <aside>
        <AssistantBanner />
      </aside>
    </div>
  );
}

export function SubmitRequestPage() {
  useDocumentTitle("Submit a request");
  const fan = useFan();
  const { open } = useAssistant();
  const [params] = useSearchParams();
  const [type, setType] = useState<RequestType | "">((REQUEST_TYPES as readonly string[]).includes(params.get("type") ?? "") ? (params.get("type") as RequestType) : "");
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState(fan.signedIn ? fan.profile.email : "");
  const [details, setDetails] = useState("");
  const [ref, setRef] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!type) return setError("Choose what your request is about.");
    if (details.trim().length < 10) return setError("Tell us a little more so we can help.");
    setError(null);
    setRef(referenceFor("REQ", { type, orderId, email, details }));
  };

  return (
    <div className="container-tk grid gap-6 py-8 lg:grid-cols-[1fr_340px]">
      <div className="main-content-box p-6 md:p-8">
        <h1 className="text-2xl font-extrabold">Submit a request</h1>
        {ref ? (
          <div role="status" className="mt-4 rounded-tk bg-positive-bg p-4 text-positive">
            <p className="font-semibold">Request {ref} received</p>
            <p className="mt-1 text-sm">We&apos;ll reply to {email} within 2 business days.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-5 space-y-4">
            <div>
              <label htmlFor="req-type" className="mb-1 block text-sm font-semibold">
                What&apos;s it about?
              </label>
              <select id="req-type" value={type} onChange={(e) => setType(e.target.value as RequestType)} className="field">
                <option value="">Choose a topic</option>
                {REQUEST_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            {type && (
              <div className="flex flex-wrap items-center gap-3 rounded-tk bg-tk-blue-tint p-3 text-sm text-tk-blue">
                <Sparkles className="size-4" aria-hidden />
                <span className="flex-1">Most “{type}” questions are sorted instantly by Ticketek Support.</span>
                <button type="button" onClick={() => open({ step: REQUEST_ASSIST[type], label: type })} className="font-semibold underline">
                  Try it now
                </button>
              </div>
            )}
            <div>
              <label htmlFor="req-order" className="mb-1 block text-sm font-semibold">
                Order (optional)
              </label>
              {fan.signedIn ? (
                <select id="req-order" value={orderId} onChange={(e) => setOrderId(e.target.value)} className="field">
                  <option value="">Not about a specific order</option>
                  {fan.views.map((v) => (
                    <option key={v.order.id} value={v.order.id}>
                      {v.order.id} · {v.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input id="req-order" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="e.g. TK41882950" className="field" />
              )}
            </div>
            <div>
              <label htmlFor="req-email" className="mb-1 block text-sm font-semibold">
                Your email
              </label>
              <input id="req-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
            </div>
            <div>
              <label htmlFor="req-details" className="mb-1 block text-sm font-semibold">
                Details
              </label>
              <textarea id="req-details" rows={5} value={details} onChange={(e) => setDetails(e.target.value)} className="field" />
            </div>
            {error && (
              <p role="alert" className="text-sm text-critical">
                {error}
              </p>
            )}
            <button type="submit" className="btn-primary">
              Submit request
            </button>
          </form>
        )}
      </div>
      <aside>
        <AssistantBanner />
      </aside>
    </div>
  );
}
