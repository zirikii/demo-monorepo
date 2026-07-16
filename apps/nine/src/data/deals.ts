export type Deal = {
  id: string;
  title: string;
  price: string;
  was?: string;
  merchant: string;
  blurb: string;
};

export const deals: Deal[] = [
  {
    id: "d1",
    title: "Noise-cancelling over-ear headphones",
    price: "$89",
    was: "$199",
    merchant: "Amazon",
    blurb: "Solid commute companion under $100.",
  },
  {
    id: "d2",
    title: "Cast-iron grill pan 26cm",
    price: "$42",
    was: "$79",
    merchant: "Kitchen Warehouse",
    blurb: "Weekend steaks without the smoke alarm encore.",
  },
  {
    id: "d3",
    title: "Trail runners — mixed sizes",
    price: "$74",
    was: "$180",
    merchant: "Rebel",
    blurb: "Clearance colourways for spring trails.",
  },
  {
    id: "d4",
    title: "Robot vacuum mid-tier",
    price: "$299",
    was: "$549",
    merchant: "The Good Guys",
    blurb: "App mapping and decent pet-hair pickup.",
  },
  {
    id: "d5",
    title: "Insulated bottle 1L",
    price: "$24",
    was: "$45",
    merchant: "Decathlon",
    blurb: "Keeps ice from desk to footy sideline.",
  },
  {
    id: "d6",
    title: "Linen sheet set queen",
    price: "$159",
    was: "$249",
    merchant: "Sheridan",
    blurb: "Washes softer every cycle — worth the wait.",
  },
];
