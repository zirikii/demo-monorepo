import { AppDownloadCta } from "@/components/marketing/app-download-cta";
import { CoverageTeaser } from "@/components/marketing/coverage-teaser";
import { EntertainmentTeaser } from "@/components/marketing/entertainment-teaser";
import { FeaturedPlans } from "@/components/marketing/featured-plans";
import { HelpfulThings } from "@/components/marketing/helpful-things";
import { HeroBanner } from "@/components/marketing/hero-banner";
import { HomeInternetTeaser } from "@/components/marketing/home-internet-teaser";
import { QuickLinkGrid } from "@/components/marketing/quick-link-grid";
import { WhyOptus } from "@/components/marketing/why-optus";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <QuickLinkGrid />
      <FeaturedPlans />
      <HomeInternetTeaser />
      <EntertainmentTeaser />
      <AppDownloadCta />
      <CoverageTeaser />
      <HelpfulThings />
      <WhyOptus />
    </>
  );
}
