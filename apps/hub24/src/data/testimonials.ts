export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Moving the book onto managed portfolios gave every adviser here about a day a week back. The rebalance that used to be forty records of authority is now one approval.",
    name: "Daniel Okonjo",
    role: "Senior Financial Adviser, Kembla Advice Partners",
  },
  {
    quote:
      "For our high-net-worth clients the deciding factor was Engage. Being able to show one number that includes the property and the private holdings changed the review meeting entirely.",
    name: "Ruth Callaghan",
    role: "Principal, Brightwater Advice Group",
  },
  {
    quote:
      "The transition was the part I was dreading. The exception mapping happened before we signed a single form, and the timeline actually held.",
    name: "Simone Kaur",
    role: "Head of Advice, Coolabah Wealth",
  },
];
