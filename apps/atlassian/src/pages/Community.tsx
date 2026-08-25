import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { asset } from "@/lib/asset";

const THREADS = [
  { title: "Rovo agent that updates a sprint goal from a Loom", replies: 18, space: "Jira" },
  {
    title: "Migrating a Confluence space without losing page tree order",
    replies: 42,
    space: "Confluence",
  },
  { title: "JSM virtual agent vs a custom Studio agent", replies: 27, space: "Rovo" },
];

export default function CommunityPage() {
  return (
    <PageLayout title="Community">
      <PageHero
        eyebrow="Community"
        title="Learn, connect, and grow"
        body="Threads are invented for the walkthrough. There is no live forum behind this page."
        crumbs={[{ label: "Resources", to: "/resources" }, { label: "Community" }]}
        aside={
          <img
            src={asset("/brand/community.svg")}
            alt="Atlassian Community"
            width={180}
            height={180}
            className="mx-auto h-36 w-36 md:h-44 md:w-44"
          />
        }
      />
      <Section>
        <ul className="flex flex-col divide-y divide-line rounded-atl-lg border border-line">
          {THREADS.map((thread) => (
            <li key={thread.title} className="px-6 py-5">
              <p className="text-xs font-bold tracking-[0.12em] text-atl-blue uppercase">
                {thread.space}
              </p>
              <h2 className="mt-1 font-extrabold">{thread.title}</h2>
              <p className="text-sm text-ink-faint">{thread.replies} replies</p>
            </li>
          ))}
        </ul>
      </Section>
    </PageLayout>
  );
}
