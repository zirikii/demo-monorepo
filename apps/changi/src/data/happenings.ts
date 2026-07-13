export type Happening = {
  id: string;
  title: string;
  summary: string;
  image: string;
  href: string;
  tag: "Event" | "Promotion" | "Deal";
};

export const happenings: Happening[] = [
  {
    id: "outlet-deals",
    title: "Outlet Deals",
    summary: "Shop and save: check out the latest deals!",
    image: "/brand/happenings/outlet-deals.jpg",
    href: "/happenings",
    tag: "Deal",
  },
  {
    id: "cr-sia",
    title: "Fly with Changi Rewards x Singapore Airlines",
    summary: "Land yourself at your dream destination when you spend with Changi Rewards.",
    image: "/brand/happenings/changi-rewards-sia.jpg",
    href: "/rewards",
    tag: "Promotion",
  },
  {
    id: "peanuts",
    title: "Ready, Sweat, Go! with Snoopy & his Siblings",
    summary: "Get active with adorable Peanuts premiums, exciting play activities, photo spots and more！",
    image: "/brand/happenings/peanuts.jpg",
    href: "/happenings",
    tag: "Event",
  },
  {
    id: "lego",
    title: "Celebrate Jewel Blooms with LEGO® Botanicals",
    summary: "Bloom into a floral wonderland with the largest LEGO Botanicals activation at Jewel!",
    image: "/brand/happenings/jewel-blooms-lego.jpg",
    href: "/happenings",
    tag: "Event",
  },
];
