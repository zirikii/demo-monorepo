import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function SignupPage() {
  useDocumentTitle("Sign up");
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("Alex Nguyen");
  const [email, setEmail] = useState("alex.nguyen@harbourco.example");
  const [company, setCompany] = useState("Harbour & Co");

  return (
    <PageLayout>
      <PageHero title="Start your Employment Hero trial" description="Demo signup stores a local session only — no real account is created." />
      <section className="container-eh max-w-xl py-12">
        <form
          className="space-y-5 rounded-eh-lg border border-line bg-white p-8 shadow-eh"
          onSubmit={(e) => {
            e.preventDefault();
            register(name, email);
            navigate("/portal", { replace: true });
          }}
        >
          <TextField label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Work email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
          <Button type="submit" size="lg" className="w-full">Create demo account</Button>
          <p className="text-sm text-ink-soft">
            Already have access? <Link to="/login?portal=employer" className="font-semibold text-eh-purple underline">Log in</Link>
          </p>
        </form>
      </section>
    </PageLayout>
  );
}
