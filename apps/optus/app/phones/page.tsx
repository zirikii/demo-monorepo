import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { PhoneCard } from "@/components/marketing/phone-card";
import { readJson } from "@/lib/data/json-store";
import type { Phone } from "@/lib/types";

export const metadata: Metadata = {
  title: "Phones",
  description: "The latest phones from Apple, Samsung, Google and more on interest-free Optus plans.",
};

export default async function PhonesPage() {
  const phones = await readJson<Phone[]>("phones.json");

  return (
    <>
      <PageHero
        eyebrow="Phones"
        title="The latest phones, interest-free"
        description="Pair a new device with an Optus SIM only plan and pay it off over 24 or 36 months — interest free."
      />
      <section className="container py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {phones.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </section>
    </>
  );
}
