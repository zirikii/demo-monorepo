export type Job = {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
};

export const jobTeams = [
  "Engineering",
  "Product",
  "Design",
  "Data",
  "Operations",
  "Marketing",
] as const;

export const jobLocations = ["Jakarta", "Bandung", "Singapore", "Bengaluru", "Remote"] as const;

export const jobs: Job[] = [
  {
    id: "eng-be-1",
    title: "Senior Backend Engineer, Payments",
    team: "Engineering",
    location: "Jakarta",
    type: "Full-time",
    summary: "Build resilient services that move money for millions across GoPay every day.",
  },
  {
    id: "eng-mobile-1",
    title: "Staff Android Engineer, Super App",
    team: "Engineering",
    location: "Singapore",
    type: "Full-time",
    summary: "Own core flows in the flagship consumer app used by tens of millions.",
  },
  {
    id: "eng-platform-1",
    title: "Site Reliability Engineer",
    team: "Engineering",
    location: "Bengaluru",
    type: "Full-time",
    summary: "Keep the on-demand platform fast and reliable at Southeast Asian scale.",
  },
  {
    id: "prod-1",
    title: "Product Manager, Transport",
    team: "Product",
    location: "Jakarta",
    type: "Full-time",
    summary: "Shape the GoRide and GoCar experience for riders and driver-partners.",
  },
  {
    id: "prod-2",
    title: "Group Product Manager, Merchant",
    team: "Product",
    location: "Singapore",
    type: "Full-time",
    summary: "Lead the GoBiz roadmap that helps millions of merchants grow.",
  },
  {
    id: "design-1",
    title: "Senior Product Designer, Payments",
    team: "Design",
    location: "Jakarta",
    type: "Full-time",
    summary: "Craft trustworthy, delightful money experiences inside GoPay.",
  },
  {
    id: "design-2",
    title: "Design Systems Engineer",
    team: "Design",
    location: "Remote",
    type: "Full-time",
    summary: "Evolve Asphalt, our cross-platform design system and component library.",
  },
  {
    id: "data-1",
    title: "Data Scientist, Marketplace",
    team: "Data",
    location: "Bandung",
    type: "Full-time",
    summary: "Model supply and demand to balance the marketplace in real time.",
  },
  {
    id: "data-2",
    title: "Analytics Engineer",
    team: "Data",
    location: "Jakarta",
    type: "Full-time",
    summary: "Build the data models that power decisions across every product cluster.",
  },
  {
    id: "ops-1",
    title: "Regional Operations Lead",
    team: "Operations",
    location: "Jakarta",
    type: "Full-time",
    summary: "Run city operations and partner programs across key regions.",
  },
  {
    id: "ops-2",
    title: "Driver Experience Specialist",
    team: "Operations",
    location: "Bandung",
    type: "Contract",
    summary: "Champion the needs of driver-partners on the ground, every day.",
  },
  {
    id: "mkt-1",
    title: "Brand Marketing Manager",
    team: "Marketing",
    location: "Singapore",
    type: "Full-time",
    summary: "Tell the Gojek story across Southeast Asia with campaigns that stick.",
  },
];

export function filterJobs(
  query: string,
  team: string | "all",
  location: string | "all",
): Job[] {
  const q = query.trim().toLowerCase();
  return jobs.filter((job) => {
    const matchesQuery =
      q === "" ||
      job.title.toLowerCase().includes(q) ||
      job.summary.toLowerCase().includes(q) ||
      job.team.toLowerCase().includes(q);
    const matchesTeam = team === "all" || job.team === team;
    const matchesLocation = location === "all" || job.location === location;
    return matchesQuery && matchesTeam && matchesLocation;
  });
}
