import type { BrandLink, NavColumn, PrimaryNavItem } from "./types";

export const primaryNav: PrimaryNavItem[] = [
  {
    id: "news",
    label: "News",
    to: "/news",
    columns: [
      {
        heading: "Australia",
        links: [
          { label: "National", to: "/news" },
          { label: "NSW", to: "/news" },
          { label: "Victoria", to: "/news" },
          { label: "Queensland", to: "/news" },
        ],
      },
      {
        heading: "The world",
        links: [
          { label: "World", to: "/news" },
          { label: "Politics", to: "/news" },
          { label: "Cost of living", to: "/news" },
          { label: "Weather", to: "/weather" },
        ],
      },
      {
        heading: "Money",
        links: [
          { label: "Finance", to: "/news" },
          { label: "Property", to: "/news" },
          { label: "Markets", to: "/news" },
          { label: "Small business", to: "/news" },
        ],
      },
    ],
  },
  {
    id: "sport",
    label: "Sport",
    to: "/sport",
    columns: [
      {
        heading: "Codes",
        links: [
          { label: "AFL", to: "/sport" },
          { label: "NRL", to: "/sport" },
          { label: "Cricket", to: "/sport" },
          { label: "Football", to: "/sport" },
        ],
      },
      {
        heading: "More sport",
        links: [
          { label: "Tennis", to: "/sport" },
          { label: "Motorsport", to: "/sport" },
          { label: "Racing", to: "/sport" },
          { label: "Olympics", to: "/sport" },
        ],
      },
      {
        heading: "Live",
        links: [
          { label: "Scores", to: "/sport" },
          { label: "Wide World of Sports", to: "/sport" },
          { label: "Video", to: "/video" },
        ],
      },
    ],
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    to: "/lifestyle",
    columns: [
      {
        heading: "9Honey",
        links: [
          { label: "Celebrity", to: "/lifestyle" },
          { label: "Royals", to: "/lifestyle" },
          { label: "Relationships", to: "/lifestyle" },
          { label: "Parenting", to: "/lifestyle" },
        ],
      },
      {
        heading: "Living well",
        links: [
          { label: "Health", to: "/lifestyle" },
          { label: "Food & Kitchen", to: "/lifestyle" },
          { label: "Fashion", to: "/lifestyle" },
          { label: "Homes", to: "/lifestyle" },
        ],
      },
    ],
  },
  {
    id: "travel",
    label: "Travel",
    to: "/travel",
    columns: [
      {
        heading: "Destinations",
        links: [
          { label: "Australia", to: "/travel" },
          { label: "Asia Pacific", to: "/travel" },
          { label: "Europe", to: "/travel" },
          { label: "Americas", to: "/travel" },
        ],
      },
      {
        heading: "Plan",
        links: [
          { label: "Flight deals", to: "/travel" },
          { label: "Cruises", to: "/travel" },
          { label: "Guides", to: "/travel" },
          { label: "Tips", to: "/travel" },
        ],
      },
    ],
  },
  {
    id: "entertainment",
    label: "Entertainment",
    to: "/entertainment",
    columns: [
      {
        heading: "TV",
        links: [
          { label: "Married at First Sight", to: "/entertainment" },
          { label: "The Block", to: "/entertainment" },
          { label: "Today", to: "/entertainment" },
          { label: "60 Minutes", to: "/entertainment" },
        ],
      },
      {
        heading: "Watch",
        links: [
          { label: "9Now", to: "/video" },
          { label: "Movies", to: "/entertainment" },
          { label: "Celebrity", to: "/entertainment" },
          { label: "Music", to: "/entertainment" },
        ],
      },
    ],
  },
  {
    id: "shopping",
    label: "Shopping",
    to: "/shopping",
    columns: [
      {
        heading: "Coupons",
        links: [
          { label: "Electronics", to: "/shopping" },
          { label: "Fashion", to: "/shopping" },
          { label: "Home & Garden", to: "/shopping" },
          { label: "Travel", to: "/shopping" },
        ],
      },
      {
        heading: "Guides",
        links: [
          { label: "Best deals today", to: "/shopping" },
          { label: "Reviews", to: "/shopping" },
          { label: "Gift ideas", to: "/shopping" },
        ],
      },
    ],
  },
];

export const brandFamily: BrandLink[] = [
  { label: "nine.com.au", to: "/", active: true },
  { label: "9News", to: "/news" },
  { label: "Wide World of Sports", to: "/sport" },
  { label: "9Honey", to: "/lifestyle" },
  { label: "9Now", to: "/video" },
  { label: "9Finance", to: "/news" },
];

export const footerColumns: NavColumn[] = [
  {
    heading: "Sections",
    links: [
      { label: "News", to: "/news" },
      { label: "Sport", to: "/sport" },
      { label: "Lifestyle", to: "/lifestyle" },
      { label: "Travel", to: "/travel" },
      { label: "Entertainment", to: "/entertainment" },
      { label: "Shopping", to: "/shopping" },
    ],
  },
  {
    heading: "The Nine network",
    links: [
      { label: "9News", to: "/news" },
      { label: "Wide World of Sports", to: "/sport" },
      { label: "9Honey", to: "/lifestyle" },
      { label: "9Now", to: "/video" },
      { label: "Today", to: "/entertainment" },
      { label: "A Current Affair", to: "/entertainment" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Weather", to: "/weather" },
      { label: "Videos", to: "/video" },
      { label: "Search", to: "/search" },
      { label: "My account", to: "/account" },
      { label: "Settings", to: "/settings" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About Nine", to: "/" },
      { label: "Advertise", to: "/" },
      { label: "Privacy policy", to: "/privacy" },
      { label: "Terms of use", to: "/terms" },
    ],
  },
];
