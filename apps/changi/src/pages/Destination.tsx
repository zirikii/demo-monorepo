import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { Card } from "@/components/ui/Card";
import { destinations } from "@/data/destinations";

export function DestinationPage() {
  const { slug } = useParams();
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) return <Navigate to="/" replace />;
  return (
    <PageLayout>
      <PageHero eyebrow={destination.region} title={`${destination.city}: ${destination.tagline}`} description={`Explore ${destination.city} from Changi Airport with a guide-style card inspired by the live destination tiles.`}>
        <Card><span className="block h-2 w-24 rounded-full" style={{ backgroundColor: destination.accent }} /><p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#806d5d]">Estimated flight time</p><p className="mt-2 text-4xl font-black">{destination.flightTime}</p></Card>
      </PageHero>
    </PageLayout>
  );
}
