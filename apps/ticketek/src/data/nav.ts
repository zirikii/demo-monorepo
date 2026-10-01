import type { CategoryId, RegionId } from "./types";

export type NavLink = { label: string; to: string };

export type CategoryNavItem = {
  id: CategoryId | "featured" | "premium" | "last-minute";
  label: string;
  to: string;
  children?: NavLink[];
};

export const CATEGORY_NAV: CategoryNavItem[] = [
  { id: "featured", label: "Featured", to: "/" },
  {
    id: "sports",
    label: "Sports",
    to: "/category/sports",
    children: [
      { label: "Basketball", to: "/category/sports?genre=basketball" },
      { label: "Motorsport", to: "/category/sports?genre=motorsport" },
      { label: "Netball", to: "/category/sports?genre=netball" },
      { label: "Football", to: "/category/sports?genre=football" },
      { label: "Rugby League", to: "/category/sports?genre=rugby%20league" },
      { label: "Golf", to: "/category/sports?genre=golf" },
      { label: "Cricket", to: "/category/sports?genre=cricket" },
      { label: "Horse Racing", to: "/category/sports?genre=racing" },
      { label: "Wrestling", to: "/category/sports?genre=wrestling" },
    ],
  },
  {
    id: "concerts",
    label: "Concerts",
    to: "/category/concerts",
    children: [
      { label: "Rock & Pop", to: "/category/concerts?genre=rock" },
      { label: "Country", to: "/category/concerts?genre=country" },
      { label: "Electronic & Dance", to: "/category/concerts?genre=electronic" },
      { label: "Festivals", to: "/category/concerts?genre=festival" },
      { label: "Indie & Alternative", to: "/category/concerts?genre=indie" },
      { label: "Tribute Shows", to: "/category/concerts?genre=tribute" },
      { label: "Classical & Opera", to: "/category/concerts?genre=classical" },
    ],
  },
  {
    id: "theatre",
    label: "Theatre & Arts",
    to: "/category/theatre",
    children: [
      { label: "Musicals", to: "/category/theatre?genre=musical" },
      { label: "Ballet & Dance", to: "/category/theatre?genre=ballet" },
      { label: "Cabaret & Circus", to: "/category/theatre?genre=cabaret" },
    ],
  },
  {
    id: "family",
    label: "Family",
    to: "/category/family",
    children: [
      { label: "Family Shows", to: "/category/family?genre=family" },
      { label: "Christmas", to: "/category/family?genre=christmas" },
      { label: "Motorsport & Stunts", to: "/category/family?genre=motorsport" },
    ],
  },
  {
    id: "comedy",
    label: "Comedy",
    to: "/category/comedy",
    children: [
      { label: "Stand-up", to: "/category/comedy?genre=comedy" },
      { label: "Comedy Festivals", to: "/category/comedy?genre=festival" },
    ],
  },
  { id: "premium", label: "Premium Tickets", to: "/whats-on?filter=premium" },
  { id: "last-minute", label: "Last Minute", to: "/whats-on?filter=last-minute" },
];

export type DateRangeId = "today" | "weekend" | "7days" | "30days";

export const DATE_SHORTCUTS: { id: DateRangeId; label: string }[] = [
  { id: "today", label: "What's On Today" },
  { id: "weekend", label: "This Weekend" },
  { id: "7days", label: "Next 7 Days" },
  { id: "30days", label: "Next 30 Days" },
];

export const REGIONS: { id: RegionId; label: string }[] = [
  { id: "national", label: "National" },
  { id: "nsw", label: "NSW/ACT" },
  { id: "qld", label: "QLD/NT" },
  { id: "sa", label: "SA" },
  { id: "vic", label: "VIC/TAS" },
  { id: "wa", label: "WA" },
];

export function regionLabel(id: RegionId): string {
  return REGIONS.find((r) => r.id === id)?.label ?? "National";
}

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  concerts: "Concerts",
  sports: "Sports",
  theatre: "Theatre & Arts",
  family: "Family",
  comedy: "Comedy",
};

export const MAIN_MENU_LINKS: NavLink[] = [
  { label: "My Account", to: "/account" },
  { label: "Order History", to: "/account/orders" },
  { label: "Where's My Ticket", to: "/wheres-my-ticket" },
  { label: "Gift Vouchers", to: "/gift-vouchers" },
  { label: "Agencies", to: "/agencies" },
  { label: "Groups", to: "/groups" },
  { label: "Accessible Ticketing", to: "/accessible-ticketing" },
  { label: "Help", to: "/help" },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Ticketek",
    links: [
      { label: "About Ticketek", to: "/help/article/about-ticketek" },
      { label: "Venues", to: "/venues" },
      { label: "Agencies", to: "/agencies" },
      { label: "Gift Vouchers", to: "/gift-vouchers" },
      { label: "Groups", to: "/groups" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Help Centre", to: "/help" },
      { label: "Where's My Ticket", to: "/wheres-my-ticket" },
      { label: "Accessible Ticketing", to: "/accessible-ticketing" },
      { label: "Submit a request", to: "/help/request" },
      { label: "Marketplace (Fan to Fan)", to: "/help/article/marketplace-fan-to-fan" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Purchase Policy", to: "/help/article/purchase-policy" },
      { label: "Privacy Policy", to: "/help/article/privacy-policy" },
      { label: "Terms of Use", to: "/help/article/terms-of-use" },
      { label: "Accessibility Statement", to: "/accessible-ticketing" },
    ],
  },
];
