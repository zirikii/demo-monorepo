import { AppDownloadCta } from "@/components/marketing/app-download-cta";
import { CoverageTeaser } from "@/components/marketing/coverage-teaser";
import { EntertainmentTeaser } from "@/components/marketing/entertainment-teaser";
import { FeaturedPlans } from "@/components/marketing/featured-plans";
import { HelpfulThings } from "@/components/marketing/helpful-things";
import { HeroBanner } from "@/components/marketing/hero-banner";
import { HomeInternetTeaser } from "@/components/marketing/home-internet-teaser";
import { PromoStrip } from "@/components/marketing/promo-strip";
import { QuickLinkGrid } from "@/components/marketing/quick-link-grid";
import { UtilityActions } from "@/components/marketing/utility-actions";
import { WhyOptus } from "@/components/marketing/why-optus";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <PromoStrip />
      <UtilityActions />
      <QuickLinkGrid />
      <FeaturedPlans />
      <HomeInternetTeaser />
      <EntertainmentTeaser />
      <WhyOptus />
      <AppDownloadCta />
      <CoverageTeaser />
      <HelpfulThings />
    </>
  );
}
