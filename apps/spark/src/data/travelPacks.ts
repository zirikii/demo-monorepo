export type TravelPack = {
  id: string;
  price: number;
  name: string;
  data: string;
  dataNote?: string;
  talkNz: string;
  talkInternational: string;
  textNz: string;
  textInternational: string;
  highlight?: string;
};

export const travelPacks: TravelPack[] = [
  {
    id: "starter",
    price: 29,
    name: "Visitor starter",
    data: "2GB",
    talkNz: "200 NZ only",
    talkInternational: "100 International*",
    textNz: "200 NZ only",
    textInternational: "100 International*",
  },
  {
    id: "explorer",
    price: 49,
    name: "Explorer",
    data: "10GB",
    talkNz: "200 NZ only",
    talkInternational: "200 International*",
    textNz: "200 NZ only",
    textInternational: "200 International*",
  },
  {
    id: "adventurer",
    price: 79,
    name: "Adventurer",
    data: "50GB",
    talkNz: "Unlimited NZ only",
    talkInternational: "200 International*",
    textNz: "Unlimited NZ only",
    textInternational: "200 International*",
    highlight: "Popular for road trips",
  },
  {
    id: "endless",
    price: 129,
    name: "Endless",
    data: "Endless data",
    dataNote: "Speed reduced after 100GB**",
    talkNz: "Unlimited NZ only",
    talkInternational: "300 International*",
    textNz: "Unlimited NZ only",
    textInternational: "300 International*",
    highlight: "Maximum data",
  },
];

export const internationalCountries =
  "USA, Canada, China, Hong Kong, India, South Africa, UK, Ireland, Australia, France, Germany, Italy, Portugal, Spain, Philippines, Japan, Thailand, Singapore, Malaysia and South Korea";
