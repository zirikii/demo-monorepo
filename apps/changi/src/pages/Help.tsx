import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { AppPromo } from "@/components/shared/AppPromo";
import { Card } from "@/components/ui/Card";
import { helpTopics } from "@/data/services";

export function HelpPage() {
  return (
    <PageLayout>
      <PageHero eyebrow="App & Help" title="Assistance, Changi App, and Contact Information" description="Find support topics, app download information, and contact pathways for passenger assistance." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-4">
          {helpTopics.map((topic) => <Card key={topic}><h2 className="text-lg font-bold">{topic}</h2><p className="mt-2 text-sm leading-6 text-[#665448]">Helpful guidance for {topic.toLowerCase()}.</p></Card>)}
        </div>
        <div className="mt-10"><AppPromo /></div>
      </section>
    </PageLayout>
  );
}
