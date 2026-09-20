export type Article = {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readMinutes: number;
};

export const news: Article[] = [
  {
    id: "landing-page",
    title: "How we created Gojek's new landing page",
    category: "Engineering",
    date: "2024-11-18",
    excerpt:
      "A look at the component-driven page builder that lets every business unit ship on-brand landing pages fast.",
    readMinutes: 7,
  },
  {
    id: "gogreener-trees",
    title: "GoGreener helped plant 200,000 trees in 2024",
    category: "Impact",
    date: "2024-12-02",
    excerpt:
      "Our carbon-offset feature absorbed nearly 15,000 tonnes of CO2e thanks to millions of small choices.",
    readMinutes: 4,
  },
  {
    id: "transit-integration",
    title: "GoTransit brings integrated public transport to more riders",
    category: "Product",
    date: "2024-10-09",
    excerpt:
      "Plan trains, buses and last-mile rides in one journey, and pay for it all with GoPay.",
    readMinutes: 5,
  },
  {
    id: "merchant-6m",
    title: "6.4 million merchants now grow with the GoTo ecosystem",
    category: "Business",
    date: "2024-09-21",
    excerpt:
      "New GoBiz tools are helping small businesses reach customers and manage operations in one place.",
    readMinutes: 6,
  },
  {
    id: "fortune-list",
    title: "Gojek makes Fortune's 'Change the World' list — twice",
    category: "Company",
    date: "2023-08-30",
    excerpt:
      "Recognised for social impact as the first Southeast Asian company to make the list a second time.",
    readMinutes: 3,
  },
  {
    id: "asphalt-design",
    title: "Inside Asphalt, the design system behind the super-app",
    category: "Design",
    date: "2024-07-14",
    excerpt:
      "How a shared component library keeps dozens of products consistent across platforms.",
    readMinutes: 8,
  },
];
