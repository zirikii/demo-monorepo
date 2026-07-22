import { AppDownloadCta } from "@/components/marketing/app-download-cta";
import { EntertainmentBand } from "@/components/marketing/entertainment-band";
import { FeaturedPlans } from "@/components/marketing/featured-plans";
import { HeroBanner } from "@/components/marketing/hero-banner";
import { HomeInternetTeaser } from "@/components/marketing/home-internet-teaser";
import { QuickLinkGrid } from "@/components/marketing/quick-link-grid";
import { readJson } from "@/lib/data/json-store";
import type { MobilePlan } from "@/lib/types";

export default async function HomePage() {
  const plans = await readJson<MobilePlan[]>("mobile-plans.json");

  return (
    <>
      <HeroBanner />
      <QuickLinkGrid />
      <FeaturedPlans plans={plans} />
      <HomeInternetTeaser />
      <EntertainmentBand />
      <AppDownloadCta />
    </>
  );
}
