export type Horoscope = {
  sign: string;
  dates: string;
  blurb: string;
};

export const horoscopes: Horoscope[] = [
  { sign: "Aries", dates: "Mar 21 – Apr 19", blurb: "A workplace conversation clears fog you have been politely ignoring." },
  { sign: "Taurus", dates: "Apr 20 – May 20", blurb: "Money admin pays off — schedule the call you keep postponing." },
  { sign: "Gemini", dates: "May 21 – Jun 20", blurb: "Two invites clash; choose the one that stretches you socially." },
  { sign: "Cancer", dates: "Jun 21 – Jul 22", blurb: "Home projects love short bursts. Finish one shelf, not the whole room." },
  { sign: "Leo", dates: "Jul 23 – Aug 22", blurb: "Your idea lands better in writing than in a rushed pitch." },
  { sign: "Virgo", dates: "Aug 23 – Sep 22", blurb: "A health habit sticks if you attach it to an existing morning cue." },
  { sign: "Libra", dates: "Sep 23 – Oct 22", blurb: "Balance a favour you owe with one you are ready to ask for." },
  { sign: "Scorpio", dates: "Oct 23 – Nov 21", blurb: "Curiosity about a colleague’s process unlocks a cleaner workflow." },
  { sign: "Sagittarius", dates: "Nov 22 – Dec 21", blurb: "Book the weekend escape before calendars fill — even a day trip counts." },
  { sign: "Capricorn", dates: "Dec 22 – Jan 19", blurb: "Long-term planning loves today’s boring spreadsheet hour." },
  { sign: "Aquarius", dates: "Jan 20 – Feb 18", blurb: "A group chat debate needs your calm summary, not another hot take." },
  { sign: "Pisces", dates: "Feb 19 – Mar 20", blurb: "Creative energy returns when you protect an evening offline." },
];
