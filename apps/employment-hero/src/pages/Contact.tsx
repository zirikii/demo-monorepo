import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function ContactPage() {
  useDocumentTitle("Contact us");
  const [message, setMessage] = useState("I'd like help choosing a plan for a 80-person team.");
  const [sent, setSent] = useState(false);
  return (
    <PageLayout>
      <PageHero title="Contact us" description="Sales, support and partnerships — demo form only." />
      <section className="container-eh max-w-xl py-12">
        {sent ? (
          <p className="rounded-eh-lg bg-eh-purple-tint p-6 font-semibold">Message stored locally. No email was sent.</p>
        ) : (
          <form className="space-y-5 rounded-eh-lg border border-line bg-white p-8 shadow-eh" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <TextField label="Email" type="email" defaultValue="admin@example.com" />
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Message</span>
              <textarea className="focus-eh min-h-32 w-full rounded-eh-md border border-line px-3.5 py-2.5 text-[15px]" value={message} onChange={(e) => setMessage(e.target.value)} />
            </label>
            <Button type="submit">Send message</Button>
          </form>
        )}
      </section>
    </PageLayout>
  );
}
