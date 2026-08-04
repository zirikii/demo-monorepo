export type Branch = {
  id: string;
  name: string;
  suburb: string;
  state: string;
  postcode: string;
  address: string;
  open: string;
  hasAtm: boolean;
  services: string[];
};

export const branches: Branch[] = [
  { id: "b1", name: "CommBank Martin Place", suburb: "Sydney", state: "NSW", postcode: "2000", address: "48 Martin Place", open: "Mon–Fri 9:00–4:00", hasAtm: true, services: ["Personal", "Home lending", "Business"] },
  { id: "b2", name: "CommBank Bondi Junction", suburb: "Bondi Junction", state: "NSW", postcode: "2022", address: "500 Oxford Street", open: "Mon–Fri 9:00–5:00, Sat 9:00–12:00", hasAtm: true, services: ["Personal", "ATM"] },
  { id: "b3", name: "CommBank Parramatta", suburb: "Parramatta", state: "NSW", postcode: "2150", address: "180 Church Street", open: "Mon–Fri 9:00–5:00", hasAtm: true, services: ["Personal", "Business", "Home lending"] },
  { id: "b4", name: "CommBank Melbourne Central", suburb: "Melbourne", state: "VIC", postcode: "3000", address: "211 La Trobe Street", open: "Mon–Fri 9:00–5:00", hasAtm: true, services: ["Personal", "ATM"] },
  { id: "b5", name: "CommBank Chadstone", suburb: "Chadstone", state: "VIC", postcode: "3148", address: "1341 Dandenong Road", open: "Mon–Wed 9:00–5:00, Thu–Fri 9:00–6:00, Sat 9:00–4:00", hasAtm: true, services: ["Personal", "Home lending"] },
  { id: "b6", name: "CommBank Brisbane City", suburb: "Brisbane", state: "QLD", postcode: "4000", address: "240 Queen Street", open: "Mon–Fri 9:00–4:00", hasAtm: true, services: ["Personal", "Business"] },
  { id: "b7", name: "CommBank Chermside", suburb: "Chermside", state: "QLD", postcode: "4032", address: "395 Hamilton Road", open: "Mon–Fri 9:00–5:00, Sat 9:00–12:30", hasAtm: true, services: ["Personal", "ATM"] },
  { id: "b8", name: "CommBank Adelaide City", suburb: "Adelaide", state: "SA", postcode: "5000", address: "100 King William Street", open: "Mon–Fri 9:00–4:00", hasAtm: true, services: ["Personal", "Home lending"] },
  { id: "b9", name: "CommBank Perth City", suburb: "Perth", state: "WA", postcode: "6000", address: "150 St Georges Terrace", open: "Mon–Fri 9:00–4:00", hasAtm: true, services: ["Personal", "Business", "Institutional"] },
  { id: "b10", name: "CommBank Canberra City", suburb: "Canberra", state: "ACT", postcode: "2601", address: "220 London Circuit", open: "Mon–Fri 9:00–4:00", hasAtm: true, services: ["Personal", "Home lending"] },
  { id: "b11", name: "CommBank Hobart", suburb: "Hobart", state: "TAS", postcode: "7000", address: "81 Elizabeth Street", open: "Mon–Fri 9:00–4:00", hasAtm: true, services: ["Personal"] },
  { id: "b12", name: "CommBank Darwin", suburb: "Darwin", state: "NT", postcode: "0800", address: "35 Smith Street", open: "Mon–Fri 9:00–4:00", hasAtm: true, services: ["Personal", "Business"] },
];
