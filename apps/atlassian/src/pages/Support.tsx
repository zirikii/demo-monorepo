import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";

const CHANNELS = [
  {
    to: "/resources",
    title: "Resource library",
    body: "Reports, ebooks, and events on agents, collections, and the Teamwork Graph.",
  },
  {
    to: "/community",
    title: "Community",
    body: "Ask, learn, and share with other teams using Jira, Confluence, and Rovo.",
  },
  {
    to: "/contact",
    title: "Contact us",
    body: "Talk to sales or support. Messages stay in this browser — nobody will reply.",
  },
] as const;

export default function SupportPage() {
  return (
    <PageLayout title="Support">
      <PageHero
        eyebrow="Support"
        title="How can we help?"
        body="This is a short help hub for the demo. There is no live ticket queue behind it."
        crumbs={[{ label: "Home", to: "/" }, { label: "Support" }]}
      />
      <Section>
        <ul className="grid gap-4 md:grid-cols-3">
          {CHANNELS.map((channel) => (
            <li key={channel.to}>
              <Link
                to={channel.to}
                className="focus-atl flex h-full flex-col gap-3 rounded-atl-lg border border-line p-6 hover:border-atl-blue"
              >
                <h2 className="text-xl font-extrabold text-ink-strong">{channel.title}</h2>
                <p className="text-sm leading-relaxed text-ink-soft">{channel.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </PageLayout>
  );
}
