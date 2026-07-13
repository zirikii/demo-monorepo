export type PersonaId = "arriving" | "departing" | "transiting" | "visiting";

export type QuickLink = {
  id: string;
  title: string;
  description: string;
  to: string;
};

export const personaOptions: { id: PersonaId; label: string }[] = [
  { id: "arriving", label: "ARRIVING" },
  { id: "departing", label: "DEPARTING" },
  { id: "transiting", label: "TRANSITING" },
  { id: "visiting", label: "VISITING" },
];

export const quickLinksByPersona: Record<PersonaId, QuickLink[]> = {
  arriving: [
    { id: "a1", title: "Flight Information", description: "Track arriving flights in real time.", to: "/fly/flights?dir=arrival" },
    { id: "a2", title: "Immigration & Customs", description: "What to prepare before you land.", to: "/fly" },
    { id: "a3", title: "Baggage Services", description: "Belts, oversized bags, and lost luggage.", to: "/fly" },
    { id: "a4", title: "Leaving Changi", description: "MRT, taxi, private hire, and coaches.", to: "/at-changi" },
    { id: "a5", title: "Getting Started in Singapore", description: "SIM, transport, and first-day tips.", to: "/help" },
    { id: "a6", title: "Jewel Changi Airport", description: "HSBC Rain Vortex, Canopy Park, and more.", to: "/at-changi" },
  ],
  departing: [
    { id: "d1", title: "Flight Information", description: "Check departure gates and timing.", to: "/fly/flights?dir=departure" },
    { id: "d2", title: "Getting to Changi", description: "Plan your journey to the airport.", to: "/at-changi" },
    { id: "d3", title: "Check-in Options", description: "Early, fast, and off-airport check-in.", to: "/fly" },
    { id: "d4", title: "Security Screening", description: "What you can pack and how to prepare.", to: "/fly" },
    { id: "d5", title: "Tax Refund", description: "Claim GST refunds before you fly.", to: "/dine-and-shop" },
    { id: "d6", title: "Lounges", description: "Airline and pay-per-use lounge options.", to: "/fly" },
  ],
  transiting: [
    { id: "t1", title: "Transiting Guide", description: "Connections, minimum times, and tips.", to: "/fly" },
    { id: "t2", title: "Free Singapore Tours", description: "See the city during a longer layover.", to: "/experience" },
    { id: "t3", title: "Transit Hotels", description: "Rest airside without clearing immigration.", to: "/at-changi" },
    { id: "t4", title: "Terminal Transfers", description: "Skytrain and shuttle between terminals.", to: "/at-changi" },
    { id: "t5", title: "Dine & Shop Airside", description: "Outlets open for transit passengers.", to: "/dine-and-shop" },
    { id: "t6", title: "Rest Areas", description: "Free-to-use rest zones and quiet spaces.", to: "/fly" },
  ],
  visiting: [
    { id: "v1", title: "Plan Your Visit", description: "Hours, access, and getting here.", to: "/at-changi" },
    { id: "v2", title: "Jewel Attractions", description: "Rain Vortex, Canopy Park, Hedge Maze.", to: "/experience" },
    { id: "v3", title: "Dine at Changi", description: "Homegrown favourites and global brands.", to: "/dine-and-shop" },
    { id: "v4", title: "Shop & Collect", description: "GST-absorbed shopping and Changi Pay.", to: "/dine-and-shop" },
    { id: "v5", title: "Happenings", description: "Seasonal events and limited-time pops.", to: "/happenings" },
    { id: "v6", title: "Parking", description: "Rates, locations, and electric charging.", to: "/at-changi" },
  ],
};
