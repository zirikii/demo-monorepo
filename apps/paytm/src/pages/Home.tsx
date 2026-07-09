import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageLayout } from "../components/layout/PageLayout";
import { RechargesCard } from "../components/home/RechargesCard";
import { QuickPayStrip } from "../components/home/QuickPayStrip";
import { AppPromoRow } from "../components/home/AppPromoRow";
import { TravelWidget } from "../components/home/TravelWidget";
import { UpiHero } from "../components/home/UpiHero";
import { SupportRibbon } from "../components/home/SupportRibbon";
import { DuoPromoCards } from "../components/home/DuoPromoCards";
import { MoneySection } from "../components/home/MoneySection";
import { BusinessSection } from "../components/home/BusinessSection";
import { SeoTextBlock } from "../components/shared/SeoTextBlock";
import { homeInfoSections } from "../data/home";

export function HomePage() {
  useDocumentTitle("Secure UPI Payments, Recharges & Bill Payments");

  return (
    <PageLayout>
      <h1 className="sr-only">
        Paytm demo — UPI payments, money transfers, recharges, and online bill payments
      </h1>
      <RechargesCard />
      <QuickPayStrip />
      <AppPromoRow />
      <TravelWidget />
      <UpiHero />
      <SupportRibbon />
      <DuoPromoCards />
      <MoneySection />
      <BusinessSection />
      <div className="pt-12">
        <SeoTextBlock sections={homeInfoSections} />
      </div>
    </PageLayout>
  );
}
