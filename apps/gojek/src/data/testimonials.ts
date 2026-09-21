export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Driving with Gojek lets me set my own hours and still bring home a steady income for my family.",
    name: "Budi Santoso",
    role: "GoRide driver-partner, Jakarta",
  },
  {
    quote:
      "GoFood brought my warung to a whole new set of customers. Orders doubled within three months.",
    name: "Sari Dewi",
    role: "GoBiz merchant-partner, Bandung",
  },
  {
    quote:
      "GoPay is how I split bills, pay for transit and top up data — I barely carry cash anymore.",
    name: "Andrew Tan",
    role: "Gojek user, Singapore",
  },
];
