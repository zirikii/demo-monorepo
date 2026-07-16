export type TvShow = {
  slug: string;
  title: string;
  network: string;
  airs: string;
  blurb: string;
  tone: string;
};

export const tvShows: TvShow[] = [
  {
    slug: "married-at-first-sight",
    title: "Married at First Sight",
    network: "Channel 9",
    airs: "Sunday–Wednesday 7:30pm",
    blurb: "Strangers say I do, then navigate life under the experts’ watch.",
    tone: "#c9184a",
  },
  {
    slug: "the-block",
    title: "The Block",
    network: "Channel 9",
    airs: "Sunday–Wednesday 7:00pm",
    blurb: "Renovators race the clock to flip rooms — and win over auction day.",
    tone: "#fb8500",
  },
  {
    slug: "a-current-affair",
    title: "A Current Affair",
    network: "Channel 9",
    airs: "Weeknights 7:00pm",
    blurb: "Investigations and consumer stories that hold power to account.",
    tone: "#9d0208",
  },
  {
    slug: "60-minutes",
    title: "60 Minutes",
    network: "Channel 9",
    airs: "Sunday 7:30pm",
    blurb: "Long-form journalism from Australia and around the world.",
    tone: "#001d3d",
  },
  {
    slug: "today",
    title: "Today",
    network: "Channel 9",
    airs: "Weekdays from 5:30am",
    blurb: "News, weather and conversations to start the national day.",
    tone: "#48cae4",
  },
  {
    slug: "wide-world-of-sports",
    title: "Wide World of Sports",
    network: "9Gem / Stan Sport",
    airs: "Weekends & live events",
    blurb: "NRL, tennis, cricket and more — the home of Nine sport.",
    tone: "#003087",
  },
];

export function getShow(slug: string): TvShow | undefined {
  return tvShows.find((s) => s.slug === slug);
}
