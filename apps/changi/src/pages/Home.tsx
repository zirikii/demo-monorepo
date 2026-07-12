import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/home/Hero";
import { WhatsHappening } from "@/components/home/WhatsHappening";
import { DestinationExplorer } from "@/components/home/DestinationExplorer";
import { SectionGrid } from "@/components/home/SectionGrid";
import { RewardsTeaser } from "@/components/home/RewardsTeaser";
import { AppPromo } from "@/components/home/AppPromo";
import { NewsletterSignup } from "@/components/shared/NewsletterSignup";

export function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <WhatsHappening />
      <DestinationExplorer />
      <SectionGrid />
      <RewardsTeaser />
      <AppPromo />
      <NewsletterSignup />
    </PageLayout>
  );
}
