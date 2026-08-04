import { Link } from "react-router-dom";
import { CalendarClock, MapPin, MessageSquare, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/Card";

const channels = [
  {
    Icon: MessageSquare,
    title: "Message us",
    description: "Get instant help from Ceba, or connect to a specialist in the CommBank app.",
    to: "/support",
  },
  {
    Icon: Phone,
    title: "Contact us",
    description: "Fast-track your call and see expected wait times before you dial.",
    to: "/support",
  },
  {
    Icon: MapPin,
    title: "Find a branch",
    description: "Find a branch, ATM or specialist near you and check opening hours.",
    to: "/locate-us",
  },
  {
    Icon: CalendarClock,
    title: "Book an appointment",
    description: "Book time with a home lending or business banking specialist.",
    to: "/support",
  },
];

export function HelpSection() {
  return (
    <section className="border-t border-line bg-surface-tint py-14">
      <div className="container-page">
        <SectionHeading title="We're here to help" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ Icon, title, description, to }) => (
            <li key={title}>
              <Link
                to={to}
                className="focus-ring flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-shadow hover:shadow-card"
              >
                <Icon aria-hidden="true" className="mb-3 h-6 w-6 text-black" />
                <span className="text-base font-bold text-black">{title}</span>
                <span className="mt-1.5 text-sm text-ink-soft">{description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
