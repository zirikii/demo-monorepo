import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";

export default function TryPage() {
  const navigate = useNavigate();

  return (
    <PageLayout title="Get started with Jira">
      <PageHero
        eyebrow="Try Jira"
        title="Get started with Jira"
        body="Start a 14-day Cloud trial. No credit card, and nothing you type leaves this browser."
        crumbs={[{ label: "Home", to: "/" }, { label: "Get started" }]}
      />
      <Section>
        <form
          className="mx-auto flex max-w-xl flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            const field = event.currentTarget.elements.namedItem("email");
            const email = field instanceof HTMLInputElement ? field.value : "";
            navigate(`/signup?email=${encodeURIComponent(email)}`);
          }}
        >
          <Field label="Work email" htmlFor="try-email">
            <TextInput
              id="try-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              defaultValue="maya@northline.demo"
            />
          </Field>
          <Button type="submit">Create a free account</Button>
        </form>
      </Section>
    </PageLayout>
  );
}
