import type { Metadata } from "next";
import { readJson } from "@/lib/data/json-store";
import type { Phone } from "@/lib/types";
import { PageHero } from "@/components/marketing/page-hero";
import { PhoneCard } from "@/components/plans/phone-card";

export const metadata: Metadata = {
  title: "Phones",
  description: "The latest iPhone, Samsung Galaxy and Google Pixel devices on Optus.",
};

export default async function PhonesPage() {
  const phones = await readJson<Phone[]>("phones.json");

  return (
    <>
      <PageHero
        eyebrow="Phones"
        title="The latest phones, paid your way"
        description="Pay off a new device interest-free over 36 months on an eligible plan, or buy outright."
      />
      <section className="container py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {phones.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </section>
    </>
  );
}
