import { PageHero } from "@/components/marketing/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Section } from "@/components/layout/Section";
import { CardBody, CardHeading, LinkCard } from "@/components/ui/Card";
import { NEWS } from "@/data/news";
import { formatDate } from "@/lib/format";

export default function NewsPage() {
  return (
    <PageLayout title="News">
      <PageHero
        eyebrow="News & press"
        title="Latest news from HUB24"
        body="Dummy ASX-style announcements and people stories for the demo. Not a real newsroom."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {NEWS.map((post) => (
            <LinkCard key={post.slug} to={`/news/${post.slug}`}>
              <p className="text-xs font-bold tracking-[0.12em] text-hub-teal uppercase">
                {post.category} · {formatDate(post.date)}
              </p>
              <CardHeading className="mt-2">{post.title}</CardHeading>
              <CardBody className="mt-2">{post.excerpt}</CardBody>
            </LinkCard>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
