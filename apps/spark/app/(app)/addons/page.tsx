import type { Metadata } from "next";
import { getAddOns } from "@/lib/data/addons";
import { PageHeader } from "@/components/layout/PageHeader";
import { AddOnCard } from "@/components/addons/AddOnCard";
import type { AddOn, AddOnCategory } from "@/lib/types";

export const metadata: Metadata = { title: "Add-ons" };

const SECTIONS: { category: AddOnCategory; title: string; description: string }[] = [
  {
    category: "roaming",
    title: "Roaming & travel",
    description: "Stay connected overseas. Connect before you fly.",
  },
  {
    category: "data",
    title: "Data",
    description: "Top up or add a day pass when you need more.",
  },
  {
    category: "entertainment",
    title: "Entertainment",
    description: "Music and streaming, billed to your Spark account.",
  },
];

export default async function AddOnsPage() {
  const addons = await getAddOns();
  const byCategory = (category: AddOnCategory): AddOn[] =>
    addons.filter((a) => a.category === category);

  return (
    <div className="container-page space-y-8 py-8">
      <PageHeader
        title="Add-ons"
        description="Connect extras to your plan. Changes save instantly."
      />

      {SECTIONS.map((section) => {
        const items = byCategory(section.category);
        if (items.length === 0) return null;
        return (
          <section key={section.category}>
            <h2 className="text-lg font-semibold text-spark-ink">{section.title}</h2>
            <p className="text-sm text-ink-secondary">{section.description}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((addon) => (
                <AddOnCard key={addon.id} addon={addon} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
