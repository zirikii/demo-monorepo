import type { Metadata } from "next";
import { readJson } from "@/lib/data/json-store";
import type { Store } from "@/lib/types";
import { StoreFinder } from "@/components/marketing/store-finder";

export const metadata: Metadata = { title: "Store finder" };

export default async function StoresPage() {
  const stores = await readJson<Store[]>("stores.json");
  return (
    <div className="container py-14">
      <h1 className="text-4xl font-bold text-spark-ink">Find a Spark store</h1>
      <p className="mt-4 max-w-2xl text-spark-ink/80">
        Travel Packs are available in store, including Auckland and Christchurch Airports. This demo
        lists {stores.length}+ locations with local search.
      </p>
      <div className="mt-8">
        <StoreFinder stores={stores} />
      </div>
    </div>
  );
}
