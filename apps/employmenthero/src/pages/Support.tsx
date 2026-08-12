import { useMemo, useState } from "react";
import { BookOpen, LifeBuoy, MessageSquare, Wrench } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { TextInput } from "@/components/ui/Field";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SUPPORT_ARTICLES, SUPPORT_FAQS } from "@/data/support";

const CHANNELS = [
  {
    icon: BookOpen,
    title: "Help centre",
    body: "Step-by-step articles for every module, updated with each release.",
  },
  {
    icon: MessageSquare,
    title: "In-product chat",
    body: "Open from any screen in Employment OS, 8am–7pm AEST on business days.",
  },
  {
    icon: Wrench,
    title: "Implementation hub",
    body: "Guided setup plans for HR, payroll and hiring rollouts.",
  },
  {
    icon: LifeBuoy,
    title: "Priority support",
    body: "Named support contact and a one-hour response target on Employment Unlimited.",
  },
];

export default function SupportPage() {
  const [query, setQuery] = useState("");

  const articles = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return SUPPORT_ARTICLES;
    return SUPPORT_ARTICLES.filter(
      (article) =>
        article.title.toLowerCase().includes(needle) ||
        article.summary.toLowerCase().includes(needle) ||
        article.category.toLowerCase().includes(needle),
    );
  }, [query]);

  return (
    <PageLayout title="Service centre">
      <PageHero
        eyebrow="Service centre"
        title="How can we help?"
        body="Search the help centre, or pick the channel that suits the question."
        crumbs={[{ label: "Home", to: "/" }, { label: "Support" }]}
        actions={
          <TextInput
            type="search"
            aria-label="Search help articles"
            placeholder="Search help articles"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full max-w-md text-ink"
          />
        }
      />

      <Section tone="white">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((channel) => (
            <Card key={channel.title} className="flex flex-col gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-eh bg-eh-tint text-eh-purple">
                <channel.icon aria-hidden className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-extrabold tracking-tight text-ink-strong">{channel.title}</h2>
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">{channel.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading
          eyebrow="Popular articles"
          title={query ? `Results for “${query}”` : "What people look up most"}
          className="mb-10"
        />
        {articles.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.title} className="flex flex-col gap-2">
                <span className="text-xs font-extrabold tracking-[0.12em] text-eh-purple uppercase">
                  {article.category}
                </span>
                <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">
                  {article.title}
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-ink-soft">{article.summary}</p>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No articles match that search"
            body="Try a shorter keyword, or start a chat from inside Employment OS."
          />
        )}
      </Section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="FAQs" title="Common support questions" />
          <Accordion items={SUPPORT_FAQS} />
        </div>
      </Section>
    </PageLayout>
  );
}
