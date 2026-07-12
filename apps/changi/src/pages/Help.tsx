import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";

const topics = [
  { title: "Assistance", body: "Special assistance, medical help, and passenger meeting services." },
  { title: "Changi App", body: "Pin flights, receive alerts, and unlock exclusive in-app features." },
  { title: "Contact Information", body: "Reach airport information counters and customer care." },
];

export function HelpPage() {
  useDocumentTitle("App & Help");
  return (
    <PageLayout>
      <PageHero
        title="App & Help"
        subtitle="Get assistance, download the Changi App, and find contact information."
        crumbs={[{ label: "App & Help" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {topics.map((t) => (
            <article key={t.title} className="rounded-2xl border border-line bg-card p-5">
              <h2 className="text-lg font-black text-ink-deep">{t.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{t.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-2xl bg-ink-deep p-6 text-white">
          <h2 className="text-xl font-black">Download Changi App</h2>
          <p className="mt-2 text-sm text-white/70">Stay up to date on your flight status and more.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <img src="/brand/icons/app-store.svg" alt="App Store" className="h-10" />
            <img src="/brand/icons/google-play.svg" alt="Google Play" className="h-10" />
          </div>
          <Link to="/signup" className="mt-5 inline-block text-sm font-bold text-[#f7c651] hover:underline">
            Or create a Changi Account on the web →
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
