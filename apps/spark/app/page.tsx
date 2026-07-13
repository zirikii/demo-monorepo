import { HeroBanner } from "@/components/marketing/hero-banner";
import { QuickLinkGrid } from "@/components/marketing/quick-link-grid";
import { TravelPacksPromo } from "@/components/marketing/travel-packs-promo";
import { MovingToNz } from "@/components/marketing/moving-to-nz";
import { AppDownloadCta } from "@/components/marketing/app-download-cta";
import { CoverageTeaser } from "@/components/marketing/coverage-teaser";
import { HelpfulThings } from "@/components/marketing/helpful-things";
import { WhyChooseSpark } from "@/components/marketing/why-choose-spark";

export default function TravelMovePage() {
  return (
    <>
      <HeroBanner />
      <QuickLinkGrid />
      <TravelPacksPromo />
      <MovingToNz />
      <AppDownloadCta />
      <CoverageTeaser />
      <HelpfulThings />
      <WhyChooseSpark />
    </>
  );
}
