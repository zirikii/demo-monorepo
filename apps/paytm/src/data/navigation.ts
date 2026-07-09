export interface NavLink {
  label: string;
  to: string;
}

export interface NavColumn {
  heading: string;
  links: NavLink[];
}

export interface NavMenu {
  id: string;
  label: string;
  columns: NavColumn[];
}

/** Top-level header mega-menus, mirroring paytm.com's five nav groups. */
export const navMenus: NavMenu[] = [
  {
    id: "recharge-bills",
    label: "Recharge & Bills",
    columns: [
      {
        heading: "Recharge & Bills",
        links: [
          { label: "Mobile Recharge", to: "/recharge" },
          { label: "Electricity Bill", to: "/electricity-bill-payment" },
          { label: "DTH Recharge", to: "/dth-recharge" },
          { label: "FASTag Recharge", to: "/fastag-recharge" },
          { label: "Broadband Bill", to: "/broadband-bill-payment" },
          { label: "Loan EMI", to: "/loan-emi-payment" },
          { label: "All Bill Payments", to: "/bill-payments" },
        ],
      },
    ],
  },
  {
    id: "ticket-booking",
    label: "Ticket Booking",
    columns: [
      {
        heading: "Travel",
        links: [
          { label: "Flight Tickets", to: "/flights" },
          { label: "Train Tickets", to: "/train-tickets" },
          { label: "Bus Tickets", to: "/bus-tickets" },
        ],
      },
      {
        heading: "Entertainment",
        links: [
          { label: "Movie Tickets", to: "/movies" },
          { label: "Events", to: "/movies#events" },
        ],
      },
    ],
  },
  {
    id: "payments-services",
    label: "Payments & Services",
    columns: [
      {
        heading: "Payments",
        links: [
          { label: "UPI Money Transfer", to: "/upi" },
          { label: "Bill Payments & Recharges", to: "/bill-payments" },
          { label: "Offers & Cashback", to: "/offers" },
        ],
      },
      {
        heading: "Loans & Credit Cards",
        links: [
          { label: "Credit Cards", to: "/credit-cards" },
          { label: "Personal Loan", to: "/personal-loan" },
          { label: "Insurance", to: "/insurance" },
        ],
      },
      {
        heading: "Wealth",
        links: [
          { label: "Paytm Money", to: "/paytm-money" },
          { label: "Digital Gold", to: "/gold" },
        ],
      },
    ],
  },
  {
    id: "business",
    label: "Paytm for Business",
    columns: [
      {
        heading: "Accept Payments",
        links: [
          { label: "Paytm QR", to: "/business#qr" },
          { label: "Soundbox", to: "/business#soundbox" },
          { label: "Card Machine", to: "/business#pos" },
          { label: "Payment Gateway", to: "/business#gateway" },
        ],
      },
      {
        heading: "Grow",
        links: [
          { label: "Business Overview", to: "/business" },
          { label: "Advertise with Us", to: "/business#advertise" },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    columns: [
      {
        heading: "Company",
        links: [
          { label: "About Us", to: "/about-us" },
          { label: "Careers", to: "/careers" },
          { label: "Investor Relations", to: "/investor-relations" },
          { label: "Blog", to: "/blog" },
        ],
      },
      {
        heading: "Help",
        links: [
          { label: "24x7 Support", to: "/support" },
          { label: "Security & Trust", to: "/security" },
        ],
      },
    ],
  },
];
