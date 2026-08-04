import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BranchLocator } from "@/components/tools/BranchLocator";
import { HelpSection } from "@/components/marketing/HelpSection";
import { ThingsYouShouldKnow } from "@/components/marketing/ThingsYouShouldKnow";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function LocateUsPage() {
  useDocumentTitle("Locate us");

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Locate us" }]} />
      <PageHero
        eyebrow="Locate us"
        title="Find a branch, ATM or specialist near you"
        description="Search by suburb or postcode, then filter by location type and the services you need."
        tone="light"
      />

      <section className="py-14">
        <div className="container-page">
          <BranchLocator />
        </div>
      </section>

      <HelpSection />
      <ThingsYouShouldKnow>
        <p>
          Locations, addresses and opening hours in this demo are fabricated and do not correspond
          to real CommBank branches or ATMs.
        </p>
      </ThingsYouShouldKnow>
    </PageLayout>
  );
}
