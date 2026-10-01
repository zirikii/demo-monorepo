import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CheckList } from "@/components/marketing";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const PROPERTY_TYPES = [
  "Hotel",
  "Boutique hotel",
  "Resort",
  "Motel",
  "Serviced apartments",
  "B&B / Guesthouse",
  "Hostel",
  "Group or chain",
];
const ROOM_BANDS = ["1–10", "11–30", "31–80", "81–150", "151+"];
const COUNTRIES = [
  "Australia",
  "New Zealand",
  "United Kingdom",
  "United States",
  "Thailand",
  "Indonesia",
  "Spain",
  "Italy",
  "Other",
];

type Variant = "demo" | "trial";

const COPY: Record<
  Variant,
  { eyebrow: string; title: string; body: string; points: string[]; cta: string; done: string }
> = {
  demo: {
    eyebrow: "Get a demo",
    title: "See how SiteMinder puts your hotel in demand",
    body: "A product specialist will walk you through the platform using your own property, channels and markets.",
    points: [
      "A tailored 30-minute walkthrough",
      "Connect 450+ channels and your PMS",
      "Pricing that fits your property",
      "Live Q&A with a hotel commerce expert",
    ],
    cta: "Book my demo",
    done: "A product specialist will be in touch within one business day to lock in a time.",
  },
  trial: {
    eyebrow: "Free 14-day trial",
    title: "Try SiteMinder free for 14 days",
    body: "No credit card. No setup fees. Get your channel manager and booking engine live in as little as a day.",
    points: [
      "Full platform access for 14 days",
      "Free onboarding with a specialist",
      "Cancel any time",
      "24/7 multilingual support",
    ],
    cta: "Start free trial",
    done: "Check your inbox — your trial login and onboarding schedule are on the way.",
  },
};

function LeadForm({ variant }: { variant: Variant }) {
  const copy = COPY[variant];
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card animate-pop-in p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto size-12 text-positive" aria-hidden />
        <h2 className="mt-4 text-2xl font-bold">Thanks — you&apos;re all set</h2>
        <p className="mt-2 text-ink-soft">{copy.done}</p>
        <Link to="/" className="btn-outline mt-6">
          Back to homepage
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="card grid gap-4 p-6 sm:grid-cols-2 md:p-8"
      aria-label={copy.cta}
    >
      {[
        ["First name", "given-name", "text"],
        ["Last name", "family-name", "text"],
        ["Work email", "email", "email"],
        ["Phone", "tel", "tel"],
      ].map(([label, auto, type]) => (
        <label key={label} className="block text-sm font-semibold text-heading">
          {label}
          <input className="field mt-1.5" name={auto} type={type} autoComplete={auto} required />
        </label>
      ))}
      <label className="block text-sm font-semibold text-heading sm:col-span-2">
        Property name
        <input className="field mt-1.5" name="property" autoComplete="organization" required />
      </label>
      <label className="block text-sm font-semibold text-heading">
        Property type
        <select className="field mt-1.5" name="type" defaultValue="Hotel">
          {PROPERTY_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-semibold text-heading">
        Number of rooms
        <select className="field mt-1.5" name="rooms" defaultValue="31–80">
          {ROOM_BANDS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-semibold text-heading sm:col-span-2">
        Country
        <select className="field mt-1.5" name="country" defaultValue="Australia">
          {COUNTRIES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <p className="text-xs text-ink-faint sm:col-span-2">
        This is a demo form. Nothing is sent anywhere.
      </p>
      <button type="submit" className="btn-primary py-3 sm:col-span-2">
        <CalendarCheck className="size-4" aria-hidden /> {copy.cta}
      </button>
    </form>
  );
}

function LeadPage({ variant }: { variant: Variant }) {
  const copy = COPY[variant];
  useDocumentTitle(copy.eyebrow);
  return (
    <section className="bg-canvas">
      <div className="container-sm grid gap-12 py-16 md:grid-cols-[1fr_1.1fr] md:py-20">
        <div className="animate-fade-up">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">{copy.title}</h1>
          <p className="mt-4 text-lg text-ink-soft">{copy.body}</p>
          <div className="mt-8">
            <CheckList items={copy.points} />
          </div>
          <p className="mt-10 text-sm text-ink-faint">
            Trusted by 47,000+ hotels in 150 countries.
          </p>
        </div>
        <LeadForm variant={variant} />
      </div>
    </section>
  );
}

export function DemoPage() {
  return <LeadPage variant="demo" />;
}

export function GetStartedPage() {
  return <LeadPage variant="trial" />;
}
