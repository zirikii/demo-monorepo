import type { NavLink } from "./navigation";

export interface FooterGroup {
  id: string;
  heading: string;
  links: NavLink[];
}

/** Accordion groups in the mega-footer (collapsed by default, like paytm.com). */
export const footerGroups: FooterGroup[] = [
  {
    id: "recharge",
    heading: "Recharge & pay bills",
    links: [
      { label: "Mobile Recharge", to: "/recharge" },
      { label: "Electricity Bill Payment", to: "/electricity-bill-payment" },
      { label: "DTH Recharge", to: "/dth-recharge" },
      { label: "FASTag Recharge", to: "/fastag-recharge" },
      { label: "Broadband Bill Payment", to: "/broadband-bill-payment" },
      { label: "Loan EMI Payment", to: "/loan-emi-payment" },
      { label: "All Bill Categories", to: "/bill-payments" },
    ],
  },
  {
    id: "travel",
    heading: "Book travel & entertainment",
    links: [
      { label: "Flight Tickets", to: "/flights" },
      { label: "Train Tickets", to: "/train-tickets" },
      { label: "Bus Tickets", to: "/bus-tickets" },
      { label: "Movie Tickets", to: "/movies" },
      { label: "Offers", to: "/offers" },
    ],
  },
  {
    id: "financial",
    heading: "Loans, cards & insurance",
    links: [
      { label: "Credit Cards", to: "/credit-cards" },
      { label: "Personal Loan", to: "/personal-loan" },
      { label: "Insurance Marketplace", to: "/insurance" },
      { label: "Loan EMI Payment", to: "/loan-emi-payment" },
    ],
  },
  {
    id: "wealth",
    heading: "Investments & wealth",
    links: [
      { label: "Paytm Money", to: "/paytm-money" },
      { label: "Digital Gold", to: "/gold" },
      { label: "EMI Calculator", to: "/personal-loan#emi-calculator" },
    ],
  },
  {
    id: "business",
    heading: "Paytm for Business",
    links: [
      { label: "Business Overview", to: "/business" },
      { label: "Paytm QR", to: "/business#qr" },
      { label: "Soundbox", to: "/business#soundbox" },
      { label: "Payment Gateway", to: "/business#gateway" },
    ],
  },
  {
    id: "company",
    heading: "Company",
    links: [
      { label: "About Us", to: "/about-us" },
      { label: "Careers", to: "/careers" },
      { label: "Investor Relations", to: "/investor-relations" },
      { label: "Blog", to: "/blog" },
      { label: "24x7 Help", to: "/support" },
      { label: "Security & Trust", to: "/security" },
    ],
  },
];

export interface TrustBadge {
  icon: string;
  title: string;
  body: string;
}

/** Three assurance tiles shown above the footer accordion. */
export const trustBadges: TrustBadge[] = [
  {
    icon: "/brand/icons/help.svg",
    title: "24x7 Help",
    body: "Round-the-clock support in the app and on the web whenever you need a hand.",
  },
  {
    icon: "/brand/icons/assurance.svg",
    title: "100% Assurance",
    body: "Every payment is protected — failed transactions are auto-reversed to source.",
  },
  {
    icon: "/brand/icons/trust.svg",
    title: "Trusted by Millions",
    body: "Bank-grade security and RBI-regulated partners keep your money safe.",
  },
];

export interface IconLink {
  icon: string;
  label: string;
  href: string;
}

export const paymentNetworks: IconLink[] = [
  { icon: "/brand/icons/visa.svg", label: "Visa", href: "#" },
  { icon: "/brand/icons/mastercard.svg", label: "Mastercard", href: "#" },
  { icon: "/brand/icons/rupay.svg", label: "RuPay", href: "#" },
  { icon: "/brand/icons/american-express.png", label: "American Express", href: "#" },
  { icon: "/brand/icons/diners-club.svg", label: "Diners Club", href: "#" },
  { icon: "/brand/icons/pci.svg", label: "PCI DSS Certified", href: "#" },
];

export const socialLinks: IconLink[] = [
  { icon: "/brand/icons/social-facebook.svg", label: "Facebook", href: "#" },
  { icon: "/brand/icons/social-twitter.svg", label: "X (Twitter)", href: "#" },
  { icon: "/brand/icons/social-youtube.svg", label: "YouTube", href: "#" },
  { icon: "/brand/icons/social-linkedin.svg", label: "LinkedIn", href: "#" },
  { icon: "/brand/icons/social-instagram.svg", label: "Instagram", href: "#" },
];
