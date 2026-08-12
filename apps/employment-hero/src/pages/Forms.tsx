import { useState, type FormEvent } from "react";
import { Check, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useLocation } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function FormPage() {
  const location = useLocation();
  const isDemo = location.pathname === "/book-a-demo";
  const [sent, setSent] = useState(false);
  useDocumentTitle(isDemo ? "Book a demo" : "Contact");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("eh-demo-enquiry", new Date().toISOString());
    setSent(true);
  };

  return (
    <PageLayout>
      <section className={isDemo ? "bg-violet-soft" : "bg-green-soft"}>
        <div className="container-hero grid gap-14 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">{isDemo ? "Personalised walkthrough" : "Talk to our team"}</p>
            <h1 className="mt-6 text-6xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">
              {isDemo ? "See Employment OS in action." : "How can we help?"}
            </h1>
            <p className="mt-7 text-xl leading-8 text-ink-soft">
              {isDemo
                ? "Tell us about your team and we’ll tailor a tour to the employment moments that matter most."
                : "Whether you’re exploring the platform, already a customer or looking to partner, we’ll point you in the right direction."}
            </p>
            <ul className="mt-8 space-y-4 text-sm font-semibold text-ink-soft">
              {(isDemo
                ? ["Explore your priorities", "See connected workflows", "Get clear next steps"]
                : ["Australian business support", "Product specialists", "Partner enquiries"]
              ).map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/70">
                    <Check aria-hidden="true" className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Card className="border-0 p-7 sm:p-10">
            {sent ? (
              <div className="grid min-h-[520px] place-items-center text-center">
                <div>
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-soft">
                    <Check aria-hidden="true" className="h-8 w-8 text-positive" />
                  </span>
                  <h2 className="mt-6 text-3xl font-semibold">Thanks, we&rsquo;ve got it.</h2>
                  <p className="mt-3 max-w-md text-ink-soft">
                    This is a demo, so nothing was sent. Your submission was saved only in this
                    browser.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h2 className="text-2xl font-semibold">
                  {isDemo ? "Tell us about your business" : "Send an enquiry"}
                </h2>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {[
                    ["First name", "Avery", "text"],
                    ["Last name", "Chen", "text"],
                    ["Work email", "avery@acmedigital.com.au", "email"],
                    ["Phone", "0412 345 678", "tel"],
                  ].map(([label, placeholder, type]) => (
                    <label key={label} className="text-sm font-bold">
                      {label}
                      <input
                        required
                        type={type}
                        placeholder={placeholder}
                        className="focus-hero mt-2 min-h-12 w-full rounded-xl border border-line px-4 font-normal"
                      />
                    </label>
                  ))}
                </div>
                <label className="mt-5 block text-sm font-bold">
                  Company name
                  <input
                    required
                    placeholder="Acme Digital"
                    className="focus-hero mt-2 min-h-12 w-full rounded-xl border border-line px-4 font-normal"
                  />
                </label>
                <label className="mt-5 block text-sm font-bold">
                  Team size
                  <select
                    defaultValue="51–100"
                    className="focus-hero mt-2 min-h-12 w-full rounded-xl border border-line bg-white px-4 font-normal"
                  >
                    <option>1–20</option>
                    <option>21–50</option>
                    <option>51–100</option>
                    <option>101–500</option>
                    <option>500+</option>
                  </select>
                </label>
                <label className="mt-5 block text-sm font-bold">
                  What would you like help with?
                  <textarea
                    rows={4}
                    defaultValue={
                      isDemo
                        ? "We want to simplify onboarding, payroll and leave."
                        : "I’d like to learn more about Employment OS."
                    }
                    className="focus-hero mt-2 w-full rounded-xl border border-line p-4 font-normal"
                  />
                </label>
                <Button type="submit" className="mt-6 w-full">
                  {isDemo ? "Request my demo" : "Send enquiry"}
                </Button>
                <p className="mt-4 text-center text-xs leading-5 text-ink-faint">
                  Demo only. No information leaves your browser.
                </p>
              </form>
            )}
          </Card>
        </div>
      </section>

      {!isDemo ? (
        <section className="py-20">
          <div className="container-hero grid gap-5 md:grid-cols-3">
            {[
              [Phone, "Sales", "1300 084 847"],
              [MessageCircle, "Customer help", "Visit the Help Centre"],
              [Mail, "Partnerships", "partners@demo.example"],
            ].map(([Icon, label, detail]) => (
              <Card key={String(label)} className="p-6">
                <Icon aria-hidden="true" className="h-6 w-6" />
                <h2 className="mt-8 text-xl font-bold">{label}</h2>
                <p className="mt-2 text-sm text-ink-soft">{detail}</p>
              </Card>
            ))}
          </div>
          <div className="container-hero mt-5 flex items-center gap-3 rounded-hero-lg bg-neutral-soft p-6 text-sm text-ink-soft">
            <MapPin aria-hidden="true" className="h-5 w-5" />
            Sydney, New South Wales · Demo company location
          </div>
        </section>
      ) : null}
    </PageLayout>
  );
}
