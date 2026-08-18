import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { FAQS } from "@/data/company";

const AUDIENCES = ["Advisers", "Investors", "Shareholders"];

export default function FaqsPage() {
  const [audience, setAudience] = useState("Advisers");
  const items = FAQS.filter((faq) => faq.audience === audience).map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <PageLayout title="Frequently asked questions">
      <PageHero
        eyebrow="Support"
        title="Frequently asked questions"
        body="Answers to the questions we hear most often from advisers, advised clients and shareholders."
        crumbs={[{ label: "Home", to: "/" }, { label: "FAQs" }]}
      />

      <Section>
        <SectionHeading eyebrow="Help" title="Choose your audience" />
        <Tabs
          className="mt-6"
          label="Filter questions by audience"
          tabs={AUDIENCES}
          active={audience}
          onChange={setAudience}
        />
        <Accordion className="mt-8" items={items} />
      </Section>

      <CtaBand
        title="Still need a hand?"
        body="Call the adviser or investor line, or send us an enquiry and we'll get back to you."
        primary={{ label: "Contact us", to: "/contact-us" }}
        secondary={{ label: "Product documents", to: "/product-documents" }}
      />
    </PageLayout>
  );
}
