import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BuyingGuide } from "@/components/travel/BuyingGuide";
import { ExistingSimActions } from "@/components/travel/ExistingSimActions";
import { FaqSection } from "@/components/travel/FaqSection";
import { TravelHero } from "@/components/travel/TravelHero";
import { TravelPackSection } from "@/components/travel/TravelPackSection";

export function TravelAndMovePage() {
  return (
    <>
      <Header />
      <main>
        <TravelHero />
        <TravelPackSection />
        <BuyingGuide />
        <ExistingSimActions />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
