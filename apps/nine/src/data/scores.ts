import type { Match } from "./types";

/**
 * Live sport scoreboard data. Note the final fixture is an *upcoming* match, so
 * it legitimately has no `scores` array yet — consumers must guard for that.
 */
export const matches: Match[] = [
  {
    id: "afl-1",
    competition: "AFL — Round 18",
    status: "LIVE",
    clock: "Q3 12:40",
    venue: "MCG",
    scores: [
      { team: "Magpies", short: "COLL", score: 74 },
      { team: "Demons", short: "MELB", score: 68 },
    ],
  },
  {
    id: "nrl-1",
    competition: "NRL — Round 20",
    status: "LIVE",
    clock: "2nd 58'",
    venue: "Accor Stadium",
    scores: [
      { team: "Panthers", short: "PEN", score: 18 },
      { team: "Broncos", short: "BRI", score: 22 },
    ],
  },
  {
    id: "afl-2",
    competition: "AFL — Round 18",
    status: "FT",
    clock: "Full time",
    venue: "Adelaide Oval",
    scores: [
      { team: "Crows", short: "ADEL", score: 96 },
      { team: "Power", short: "PORT", score: 89 },
    ],
  },
  {
    id: "cricket-1",
    competition: "ODI Series — Game 2",
    status: "LIVE",
    clock: "Innings 2 · 34.2 ov",
    venue: "The Gabba",
    scores: [
      { team: "Australia", short: "AUS", score: 271 },
      { team: "England", short: "ENG", score: 188 },
    ],
  },
  {
    id: "football-1",
    competition: "Matildas Friendly",
    status: "Upcoming",
    clock: "Tonight 7:45pm AEST",
    venue: "Suncorp Stadium",
    startsAt: "2026-07-16T19:45:00+10:00",
    // Upcoming fixture — no scores yet.
  },
];
