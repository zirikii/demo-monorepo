import { Mail, MapPin, Phone } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OFFICES } from "@/data/company";
import { SITE } from "@/data/site";

const BDMS = [
  { region: "New South Wales & ACT", name: "Rachel Kim", phone: "0412 004 118" },
  { region: "Victoria & Tasmania", name: "Josh Tanner", phone: "0433 552 907" },
  { region: "Queensland", name: "Leila Haddad", phone: "0407 118 664" },
  { region: "Western Australia", name: "Sam Whitfield", phone: "0421 880 553" },
  { region: "South Australia & NT", name: "Elena Petrova", phone: "0455 220 174" },
];

export default function ContactUsPage() {
  return (
    <PageLayout title="Contact us">
      <PageHero
        eyebrow="Contact"
        title="Contacting HUB24"
        body="Talk to your local business development manager, call our client service team, or send us an enquiry."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact us" }]}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="flex flex-col gap-3">
            <Phone aria-hidden className="h-6 w-6 text-hub-blue" />
            <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">Advisers</h2>
            <a
              href={`tel:${SITE.phones.advisers.replace(/\s/g, "")}`}
              className="focus-hub text-2xl font-extrabold text-hub-blue"
            >
              {SITE.phones.advisers}
            </a>
            <p className="text-sm text-ink-faint">{SITE.hours}</p>
          </Card>
          <Card className="flex flex-col gap-3">
            <Phone aria-hidden className="h-6 w-6 text-hub-blue" />
            <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">Investors</h2>
            <a
              href={`tel:${SITE.phones.investors.replace(/\s/g, "")}`}
              className="focus-hub text-2xl font-extrabold text-hub-blue"
            >
              {SITE.phones.investors}
            </a>
            <p className="text-sm text-ink-faint">International {SITE.phones.international}</p>
          </Card>
          <Card className="flex flex-col gap-3" id="media">
            <Mail aria-hidden className="h-6 w-6 text-hub-blue" />
            <h2 className="text-xl font-extrabold tracking-tight text-ink-strong">
              Media enquiries
            </h2>
            <p className="text-ink-soft">Fiona Harris, Senior Content &amp; Partnerships Manager</p>
            <a href={`mailto:${SITE.email}`} className="focus-hub font-bold text-hub-blue">
              {SITE.email}
            </a>
          </Card>
        </div>
      </Section>

      <Section id="demo" tone="tint">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Enquiries"
              title="Have questions? Contact us today."
              body="Submit your details and one of our team will be in touch. In the real world HUB24 would use these details to respond to your enquiry, in line with its privacy policy."
            />
            <Card className="flex flex-col gap-3">
              <h3 className="font-extrabold text-ink-strong">{SITE.headOffice.label}</h3>
              <p className="flex items-start gap-2 text-ink-soft">
                <MapPin aria-hidden className="mt-1 h-4 w-4 shrink-0 text-hub-blue" />
                <span>
                  {SITE.headOffice.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  {SITE.headOffice.postal.map((line) => (
                    <span key={line} className="block text-ink-faint">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
            </Card>
          </div>
          <ContactForm />
        </div>
      </Section>

      <Section id="bdm">
        <SectionHeading
          eyebrow="Business development"
          title="Chat to your local BDM"
          body="Every region has a dedicated business development manager who supports practices through transition and beyond."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BDMS.map((bdm) => (
            <Card key={bdm.region} className="flex flex-col gap-1.5">
              <span className="text-xs font-extrabold tracking-[0.14em] text-hub-teal-dark uppercase">
                {bdm.region}
              </span>
              <span className="text-lg font-extrabold text-ink-strong">{bdm.name}</span>
              <span className="font-semibold text-hub-blue">{bdm.phone}</span>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Offices" title="Office locations" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {OFFICES.map((office) => (
            <Card key={office.city} className="flex flex-col gap-2">
              <h3 className="text-lg font-extrabold tracking-tight text-ink-strong">
                {office.city}
              </h3>
              {office.address.map((line) => (
                <span key={line} className="text-ink-soft">
                  {line}
                </span>
              ))}
              <span className="mt-1 font-semibold text-hub-blue">{office.phone}</span>
              <span className="text-sm text-ink-faint">{office.hours}</span>
            </Card>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
