export type VerticalId =
  | "transport"
  | "food"
  | "payments"
  | "daily"
  | "business"
  | "entertainment";

export type Vertical = {
  id: VerticalId;
  label: string;
  short: string;
  color: string;
  blurb: string;
};

export const verticals: Vertical[] = [
  {
    id: "transport",
    label: "Transport & Logistics",
    short: "Transport",
    color: "#00AA13",
    blurb: "Moving people and packages from A to B. Our hero cluster, green since 2010.",
  },
  {
    id: "food",
    label: "Food & Shopping",
    short: "Food",
    color: "#EE2737",
    blurb: "Groceries, medicine, food or stationery — we paint the town red.",
  },
  {
    id: "payments",
    label: "Payments",
    short: "Payments",
    color: "#00AED6",
    blurb: "Banking, finance, deals and cashless transactions in one wallet.",
  },
  {
    id: "daily",
    label: "Daily Needs",
    short: "Daily Needs",
    color: "#EF6A00",
    blurb: "Everyday lifestyle services that come to your doorstep.",
  },
  {
    id: "business",
    label: "Business",
    short: "Business",
    color: "#93328E",
    blurb: "Tools that help millions of merchant-partners grow.",
  },
  {
    id: "entertainment",
    label: "News & Entertainment",
    short: "Entertainment",
    color: "#DF1995",
    blurb: "Stream, watch, play and stay in the loop.",
  },
];

/**
 * Literal Tailwind class strings per vertical. Tailwind v4 scans source for class
 * literals, so these must be written out (not built dynamically from the hex above).
 */
export const verticalStyles: Record<
  VerticalId,
  { chip: string; chipActive: string; iconWrap: string; dot: string; text: string; bar: string }
> = {
  transport: {
    chip: "border-line text-ink-soft hover:border-transport hover:text-transport",
    chipActive: "border-transport bg-transport text-white",
    iconWrap: "bg-transport/10 text-transport",
    dot: "bg-transport",
    text: "text-transport",
    bar: "bg-transport",
  },
  food: {
    chip: "border-line text-ink-soft hover:border-food hover:text-food",
    chipActive: "border-food bg-food text-white",
    iconWrap: "bg-food/10 text-food",
    dot: "bg-food",
    text: "text-food",
    bar: "bg-food",
  },
  payments: {
    chip: "border-line text-ink-soft hover:border-payments hover:text-payments",
    chipActive: "border-payments bg-payments text-white",
    iconWrap: "bg-payments/10 text-payments",
    dot: "bg-payments",
    text: "text-payments",
    bar: "bg-payments",
  },
  daily: {
    chip: "border-line text-ink-soft hover:border-daily hover:text-daily",
    chipActive: "border-daily bg-daily text-white",
    iconWrap: "bg-daily/10 text-daily",
    dot: "bg-daily",
    text: "text-daily",
    bar: "bg-daily",
  },
  business: {
    chip: "border-line text-ink-soft hover:border-business hover:text-business",
    chipActive: "border-business bg-business text-white",
    iconWrap: "bg-business/10 text-business",
    dot: "bg-business",
    text: "text-business",
    bar: "bg-business",
  },
  entertainment: {
    chip: "border-line text-ink-soft hover:border-entertainment hover:text-entertainment",
    chipActive: "border-entertainment bg-entertainment text-white",
    iconWrap: "bg-entertainment/10 text-entertainment",
    dot: "bg-entertainment",
    text: "text-entertainment",
    bar: "bg-entertainment",
  },
};

export function getVertical(id: VerticalId): Vertical {
  const found = verticals.find((v) => v.id === id);
  if (!found) throw new Error(`Unknown vertical: ${id}`);
  return found;
}
