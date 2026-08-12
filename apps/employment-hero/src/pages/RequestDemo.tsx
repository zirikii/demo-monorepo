import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function RequestDemoPage() {
  useDocumentTitle("Request a demo");
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  return (
    <PageLayout>
      <PageHero eyebrow="Get started" title="Request a demo" description="Share a few details and we will walk you through Employment OS. Demo submissions stay in this browser." />
      <section className="container-eh max-w-xl py-12">
        {submitted ? (
          <div className="rounded-eh-lg border border-line bg-eh-purple-tint p-8">
            <h2 className="text-xl font-bold">Thanks — demo request captured</h2>
            <p className="mt-2 text-sm text-ink-soft">In this unofficial demo nothing is emailed. Explore the portal via Sign up if you want to click around the product shell.</p>
          </div>
        ) : (
          <form
            className="space-y-5 rounded-eh-lg border border-line bg-white p-8 shadow-eh"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <TextField label="Full name" required value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Work email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Company" required value={company} onChange={(e) => setCompany(e.target.value)} />
            <Button type="submit" size="lg" className="w-full">Submit request</Button>
          </form>
        )}
      </section>
    </PageLayout>
  );
}
