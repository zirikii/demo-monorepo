import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/Card";

type Group = {
  heading: string;
  moreLabel: string;
  moreTo: string;
  links: { label: string; to: string }[];
};

const groups: Group[] = [
  {
    heading: "Banking",
    moreLabel: "More from banking",
    moreTo: "/banking",
    links: [
      { label: "Bank & savings accounts", to: "/banking/bank-accounts" },
      { label: "Credit cards", to: "/banking/credit-cards" },
      { label: "Personal loans & car loans", to: "/banking/personal-loans" },
      { label: "International & travel", to: "/banking/international-travel" },
    ],
  },
  {
    heading: "Home loans",
    moreLabel: "More from home loans",
    moreTo: "/home-loans",
    links: [
      { label: "Compare home loans", to: "/home-loans" },
      { label: "Home loan interest rates", to: "/home-loans/rates" },
      { label: "Repayments calculator", to: "/home-loans/calculator" },
      { label: "Refinancing your home", to: "/home-loans#refinancing" },
    ],
  },
  {
    heading: "Insurance & more",
    moreLabel: "More from insurance",
    moreTo: "/insurance",
    links: [
      { label: "Home & car insurance", to: "/insurance#home-insurance" },
      { label: "Travel insurance", to: "/insurance#travel-insurance" },
      { label: "Investing & Super", to: "/investing-and-super" },
      { label: "Foreign exchange calculator", to: "/banking/international-travel#fx" },
    ],
  },
  {
    heading: "Business",
    moreLabel: "More from business",
    moreTo: "/business",
    links: [
      { label: "Bank accounts & cards", to: "/business#transaction-account" },
      { label: "EFTPOS & eCommerce", to: "/business#eftpos" },
      { label: "Business loans & finance", to: "/business#betterbusiness-loan" },
      { label: "Institutional banking", to: "/institutional" },
    ],
  },
  {
    heading: "Rates & calculators",
    moreLabel: "More rates & calculators",
    moreTo: "/tools-and-calculators",
    links: [
      { label: "Rates & fees", to: "/products/interest-rates-and-fees" },
      { label: "Tools & calculators", to: "/tools-and-calculators" },
      { label: "Borrowing power calculator", to: "/tools-and-calculators#borrowing-power" },
      { label: "Savings goal calculator", to: "/tools-and-calculators#savings-goal" },
    ],
  },
  {
    heading: "Digital banking",
    moreLabel: "More from digital banking",
    moreTo: "/digital-banking",
    links: [
      { label: "NetBank", to: "/digital-banking/netbank" },
      { label: "CommBank app", to: "/digital-banking/app" },
      { label: "Register for NetBank", to: "/register" },
      { label: "CommBank Yello", to: "/commbank-yello" },
    ],
  },
];

export function ProductGrid() {
  return (
    <section className="py-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Explore"
          title="Everything you can do with CommBank"
          description="Personal and business banking, home loans, insurance, investing and the tools to manage it all."
        />
        <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.heading} className="border-t-2 border-black pt-5">
              <h3 className="text-lg font-bold text-black">{group.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="focus-ring rounded text-sm text-ink-soft hover:text-black hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to={group.moreTo}
                className="focus-ring mt-5 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-black hover:underline"
              >
                {group.moreLabel}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
