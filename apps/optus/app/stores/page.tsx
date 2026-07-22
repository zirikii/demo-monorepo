import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { StoreFinder } from "@/components/marketing/store-finder";
import { readJson } from "@/lib/data/json-store";
import type { Store } from "@/lib/types";

export const metadata: Metadata = {
  title: "Store finder",
  description: "Find an Optus store near you across Australia.",
};

export default async function StoresPage() {
  const stores = await readJson<Store[]>("stores.json");

  return (
    <>
      <PageHero
        eyebrow="Stores"
        title="Find an Optus store"
        description="Get hands-on help, shop devices, or book an appointment at a store near you."
      />
      <section className="container py-12">
        <StoreFinder stores={stores} />
      </section>
    </>
  );
}
