export type Pillar =
  | "news"
  | "sport"
  | "lifestyle"
  | "travel"
  | "entertainment"
  | "shopping"
  | "tv";

export type Article = {
  slug: string;
  title: string;
  dek: string;
  body: string[];
  pillar: Pillar;
  category: string;
  author: string;
  publishedAt: string;
  isBreaking?: boolean;
  isLive?: boolean;
  imageTone: string;
  imageLabel: string;
};

/** Hours-ago helper relative to a fixed demo "now" of 2026-07-16T03:00:00Z */
function hoursAgo(h: number): string {
  const base = Date.parse("2026-07-16T03:00:00.000Z");
  return new Date(base - h * 3_600_000).toISOString();
}

export const articles: Article[] = [
  {
    slug: "uranium-deal-india-signed",
    title: "Albanese signs historic uranium deal with India",
    dek: "The Prime Minister hailed closer energy ties after talks in New Delhi overnight.",
    body: [
      "Prime Minister Anthony Albanese has signed a landmark civil nuclear cooperation agreement with India, clearing the way for Australian uranium exports under strict safeguards.",
      "Officials said the pact had been years in the making and would create new opportunities for miners in South Australia and the Northern Territory.",
      "Opposition MPs welcomed the commercial upside but pressed for more detail on enrichment restrictions and transport security.",
      "Energy analysts expect first shipments could leave Australian ports within two years if state approvals land on schedule.",
    ],
    pillar: "news",
    category: "Politics",
    author: "Sarah Mitchell",
    publishedAt: hoursAgo(1),
    isBreaking: true,
    imageTone: "#0a3d62",
    imageLabel: "Parliament",
  },
  {
    slug: "pilot-jumps-student-lands-plane",
    title: "Pilot jumps from aircraft, leaving student alone to land plane",
    dek: "Emergency services scrambled after a mid-air incident over regional Queensland.",
    body: [
      "A flying student safely landed a light aircraft after their instructor exited the plane mid-flight, police confirmed this morning.",
      "Air traffic controllers talked the trainee through the approach to a regional strip west of Brisbane.",
      "Authorities are investigating how the instructor left the aircraft and whether the jump was intentional.",
      "The student was treated for shock but was otherwise unhurt.",
    ],
    pillar: "news",
    category: "Australia",
    author: "Tom Reyes",
    publishedAt: hoursAgo(2),
    imageTone: "#1a4a3a",
    imageLabel: "Aviation",
  },
  {
    slug: "state-of-origin-blues-boilover",
    title: "State of Origin III: Blues cause boilover in Suncorp decider",
    dek: "New South Wales snatch an ‘incredible victory’ to deny Queensland at home.",
    body: [
      "The Blues stunned a packed Suncorp Stadium with a late try that sealed Origin III and the series narrative for 2026.",
      "Coach Laurie Daley praised a defensive stand that held Queensland scoreless in the final 12 minutes.",
      "Maroons skipper admitted his side left points on the table after a frantic first half.",
      "Wide World of Sports will air full highlights and coach pressers tonight on 9Now.",
    ],
    pillar: "sport",
    category: "NRL",
    author: "Jess Park",
    publishedAt: hoursAgo(3),
    isLive: true,
    imageTone: "#003087",
    imageLabel: "Origin",
  },
  {
    slug: "luai-tigers-dramatic-action",
    title: "Luai bombshell dropped as Tigers take dramatic action",
    dek: "Westwards shake-up continues as the club moves on playmaking depth.",
    body: [
      "West Tigers officials confirmed a surprise roster move involving five-eighth Jarome Luai after weeks of speculation.",
      "Sources close to the club said negotiations over a contract extension stalled late last week.",
      "Fans reacted swiftly on social media, splitting between calls for patience and demands for a rebuild.",
      "The NRL declined to comment on player contracts still under review.",
    ],
    pillar: "sport",
    category: "NRL",
    author: "Marcus Cole",
    publishedAt: hoursAgo(5),
    imageTone: "#1b4332",
    imageLabel: "NRL",
  },
  {
    slug: "wimbledon-teen-star-kicked",
    title: "Teen star kicked out of Wimbledon after heated exchange",
    dek: "Officials cite code-of-conduct breach following a disputed line call.",
    body: [
      "A rising Australian junior was defaulted from Wimbledon’s junior draw after an on-court altercation.",
      "Tournament officials said the decision followed a review of umpire reports and video.",
      "Tennis Australia said it would support the player through the appeal window.",
      "Former champions urged cooler heads as social clips of the incident spread.",
    ],
    pillar: "sport",
    category: "Tennis",
    author: "Priya Nair",
    publishedAt: hoursAgo(8),
    imageTone: "#2d6a4f",
    imageLabel: "Tennis",
  },
  {
    slug: "afl-trade-whispers-heat-up",
    title: "AFL trade whispers heat up as midfielders eye moves",
    dek: "Agents circle ahead of the exchange period with three clubs short on clearance.",
    body: [
      "List managers across Victoria are sounding out midfield options as the AFL trade period approaches.",
      "One All-Australian candidate is understood to have requested a meeting with his current club.",
      "Salary-cap gymnastics will decide whether blockbuster swaps can be completed.",
    ],
    pillar: "sport",
    category: "AFL",
    author: "Dan Walsh",
    publishedAt: hoursAgo(12),
    imageTone: "#d00000",
    imageLabel: "AFL",
  },
  {
    slug: "cricket-ashes-warm-up-squad",
    title: "Selectors name Ashes warm-up squad with youth push",
    dek: "Two uncapped quicks earn tickets as Australia fine-tunes for England.",
    body: [
      "Cricket Australia unveiled a 16-player warm-up squad that mixes Test regulars with emerging pace.",
      "The coaching group wants match intensity before the first Ashes fixture Down Under.",
      "Veteran batters will rotate through middle-order experiments in the intra-squad games.",
    ],
    pillar: "sport",
    category: "Cricket",
    author: "Ellie Grant",
    publishedAt: hoursAgo(18),
    imageTone: "#01497c",
    imageLabel: "Cricket",
  },
  {
    slug: "matildas-olympic-qualifier-win",
    title: "Matildas cruise in Olympic qualifier under lights",
    dek: "Clinical finishing seals a statement win in front of a sold-out Sydney crowd.",
    body: [
      "The Matildas brushed aside their qualifier opponents with three first-half goals.",
      "Coach praised midfield control and a cleaner pressing structure than last month’s friendlies.",
      "Fans lingered for autographs as the squad eyes the next hurdle in the road to the Games.",
    ],
    pillar: "sport",
    category: "Football",
    author: "Amelia Cho",
    publishedAt: hoursAgo(28),
    imageTone: "#ff6b35",
    imageLabel: "Football",
  },
  {
    slug: "fashion-week-red-carpet-look",
    title: "She’s one of the world’s most famous faces — and that was all she put on show",
    dek: "Paris Fashion Week delivered another viral red-carpet moment.",
    body: [
      "Street-style photographers swarmed outside the venue as the star arrived in a daring minimal look.",
      "Designers later called the choice a deliberate statement about confidence over ornament.",
      "Australian stylists weighed in on how to translate the vibe for spring events at home.",
    ],
    pillar: "lifestyle",
    category: "Fashion",
    author: "Hannah Lee",
    publishedAt: hoursAgo(4),
    imageTone: "#6a4c93",
    imageLabel: "Fashion",
  },
  {
    slug: "british-chip-flavours-aldi",
    title: "Three iconic British chip flavours just landed at Aldi. Are they worth the hype?",
    dek: "We taste-tested the limited run so you don’t have to fight the freezer aisle alone.",
    body: [
      "Aldi’s latest Special Buys drop includes three UK crisp flavours rarely seen in Australian aisles.",
      "Our panel ranked salt & vinegar highest, with a surprise second place for the curry option.",
      "Stock is expected to sell through within days in metro stores.",
    ],
    pillar: "lifestyle",
    category: "Food",
    author: "Chloe Burns",
    publishedAt: hoursAgo(6),
    imageTone: "#bc6c25",
    imageLabel: "Food",
  },
  {
    slug: "japanese-cars-love-affair",
    title: "Is Australia’s love affair with Japanese cars over?",
    dek: "EV incentives and Korean rivals are reshaping the driveway.",
    body: [
      "New vehicle registration data shows Japanese brands losing share in key segments for the first time in a decade.",
      "Dealers say shoppers are cross-shopping Korean EVs and Chinese SUVs more aggressively.",
      "Analysts caution that hybrids could still reverse the trend if fuel prices spike again.",
    ],
    pillar: "lifestyle",
    category: "Motoring",
    author: "Ben Ortiz",
    publishedAt: hoursAgo(10),
    imageTone: "#495057",
    imageLabel: "Cars",
  },
  {
    slug: "wellness-cold-plunge-trend",
    title: "Cold plunges are everywhere — but are they worth the shiver?",
    dek: "GPs urge caution as boutique ice baths boom across Australian cities.",
    body: [
      "Wellness studios from Melbourne to Brisbane are booking out cold-plunge sessions weeks ahead.",
      "Sports scientists say recovery benefits exist for trained athletes but evidence for casual users is thinner.",
      "Start slow, avoid plunging alone, and skip the trend entirely if you have heart conditions, doctors say.",
    ],
    pillar: "lifestyle",
    category: "Wellness",
    author: "Nina Patel",
    publishedAt: hoursAgo(14),
    imageTone: "#0077b6",
    imageLabel: "Wellness",
  },
  {
    slug: "road-trip-bookings-surge",
    title: "The Aussie region seeing an unexpected surge in road trip bookings",
    dek: "Coastal hinterland stays are filling up as travellers chase milder winter escapes.",
    body: [
      "Booking platforms report a sharp lift in midweek stays across a once-quiet regional corridor.",
      "Tourism boards credit new walking trails and café openings for the rediscovery.",
      "Operators warn peak weekends are nearly sold out through August.",
    ],
    pillar: "travel",
    category: "Australia",
    author: "Olivia Hart",
    publishedAt: hoursAgo(7),
    imageTone: "#2a9d8f",
    imageLabel: "Road trip",
  },
  {
    slug: "medieval-travel-trend",
    title: "Elves, knights and trolls: Inside the medieval travel trend taking over",
    dek: "Theme stays and castle tours are booking out for spring school holidays.",
    body: [
      "Travel agents say fantasy-coded itineraries are the surprise hit of the year.",
      "From Scottish castle weekends to local renaissance fairs, demand is outpacing inventory.",
      "Families are pairing costume days with history workshops for kids.",
    ],
    pillar: "travel",
    category: "Trends",
    author: "Will Anders",
    publishedAt: hoursAgo(11),
    imageTone: "#6d4c41",
    imageLabel: "Castles",
  },
  {
    slug: "tokyo-stopover-guide",
    title: "The 36-hour Tokyo stopover locals actually recommend",
    dek: "Skip the longest queues with a neighbourhood-first plan.",
    body: [
      "Transit travellers often burn a day on the same three attractions — locals suggest a different loop.",
      "Start in Yanaka for temples without the crush, then ride across for evening food alleys.",
      "Our map includes luggage lockers and the quietest airport train timing.",
    ],
    pillar: "travel",
    category: "Asia",
    author: "Mei Tanaka",
    publishedAt: hoursAgo(20),
    imageTone: "#e63946",
    imageLabel: "Tokyo",
  },
  {
    slug: "taylor-travis-wedding-guest",
    title: "Guest reveals one thing missing from Taylor and Travis’ wedding",
    dek: "A ceremony detail has fans talking after weekend photos circulated.",
    body: [
      "An unnamed guest told entertainment reporters a surprise omission from the reception playlist.",
      "Social feeds filled with theories, while reps declined to confirm the account.",
      "Meanwhile Australian fans are planning watch parties for the next tour documentary drop.",
    ],
    pillar: "entertainment",
    category: "Showbiz",
    author: "Zoe Marks",
    publishedAt: hoursAgo(3.5),
    imageTone: "#9b2226",
    imageLabel: "Showbiz",
  },
  {
    slug: "aussie-stars-social-scourge",
    title: "Aussie stars targeted by social media scourge",
    dek: "Deepfake clips and scam accounts are proliferating, managers warn.",
    body: [
      "Talent agencies report a spike in impersonation accounts pitching fake charity drives.",
      "Platforms say they are accelerating takedowns, but creators say response times still lag.",
      "Stars are urging fans to verify links through official channels only.",
    ],
    pillar: "entertainment",
    category: "Showbiz",
    author: "Rita Gomez",
    publishedAt: hoursAgo(9),
    imageTone: "#240046",
    imageLabel: "Social",
  },
  {
    slug: "hollywood-snub-personal",
    title: "Why Hollywood’s latest snub is clearly personal",
    dek: "Awards chatter turns sharp after an Australian director was overlooked.",
    body: [
      "Industry watchers say the omission surprised peers who previewed the film on the festival circuit.",
      "The director posted a gracious note while producers hinted at a longer awards campaign.",
      "Streaming numbers remain strong heading into the local awards season.",
    ],
    pillar: "entertainment",
    category: "Film",
    author: "Sam Quinn",
    publishedAt: hoursAgo(15),
    imageTone: "#3c096c",
    imageLabel: "Film",
  },
  {
    slug: "mafs-reunion-recap",
    title: "MAFS reunion night: the moment that broke the internet",
    dek: "Couples faced the experts as studio reactions went viral within minutes.",
    body: [
      "Last night’s Married at First Sight reunion delivered a confrontation producers had teased for weeks.",
      "Clips topped trending lists before the East Coast broadcast even ended.",
      "9Now streams remain available with extras for logged-in viewers.",
    ],
    pillar: "tv",
    category: "Reality",
    author: "Tess Morgan",
    publishedAt: hoursAgo(4.5),
    imageTone: "#c9184a",
    imageLabel: "MAFS",
  },
  {
    slug: "the-block-room-reveal",
    title: "The Block: judges split on daring living-room reveal",
    dek: "One pair’s risk almost paid off — almost.",
    body: [
      "Contestants unveiled living spaces that pushed colour theory to the limit.",
      "Judges praised craftsmanship but docked points for layout flow.",
      "Auction estimates are already circulating among agent tipsters.",
    ],
    pillar: "tv",
    category: "Reality",
    author: "Grace Kim",
    publishedAt: hoursAgo(16),
    imageTone: "#fb8500",
    imageLabel: "The Block",
  },
  {
    slug: "prime-day-deals-under-100",
    title: "The best Amazon Prime Day deals under $100",
    dek: "Headphones, kitchen kits and kid gadgets that are actually worth a click.",
    body: [
      "We filtered the noise to shortlist deals that stay useful after the sale ends.",
      "Audio accessories dominate the sub-$100 band this year.",
      "Prices checked at publish time — expect them to move quickly.",
    ],
    pillar: "shopping",
    category: "Deals",
    author: "Alex Rivera",
    publishedAt: hoursAgo(2.5),
    imageTone: "#023e8a",
    imageLabel: "Deals",
  },
  {
    slug: "sneakers-mega-sale",
    title: "Save 60% on sneakers and other sporty gear in mega sale",
    dek: "Retailers clear winter stock ahead of spring racing and footy finals.",
    body: [
      "Major chains have stacked running and training footwear at steep discounts.",
      "Size runs are patchy in popular colourways — shop early.",
      "Our picks prioritise cushioning reviews over logo hype.",
    ],
    pillar: "shopping",
    category: "Sport",
    author: "Chris Vale",
    publishedAt: hoursAgo(13),
    imageTone: "#212529",
    imageLabel: "Sneakers",
  },
  {
    slug: "economy-rate-hold-signals",
    title: "RBA hold keeps mortgage relief on ice for another month",
    dek: "Markets had priced a cut; households will wait again.",
    body: [
      "The Reserve Bank left the cash rate unchanged, citing sticky services inflation.",
      "Bank economists pushed rate-cut forecasts further into spring.",
      "First-home buyers said the decision keeps pressure on deposit timelines.",
    ],
    pillar: "news",
    category: "Business",
    author: "Helen Park",
    publishedAt: hoursAgo(6.5),
    imageTone: "#1d3557",
    imageLabel: "Economy",
  },
  {
    slug: "city-rail-disruption-morning",
    title: "Peak-hour rail chaos after signalling fault hits CBD",
    dek: "Commuters urged onto buses while crews work through the morning.",
    body: [
      "A signalling fault cascaded across inner-city lines just after 7am.",
      "Transport officials apologised and activated replacement buses.",
      "On-time running is expected to normalise after the midday peak.",
    ],
    pillar: "news",
    category: "Australia",
    author: "Luke Ferris",
    publishedAt: hoursAgo(0.8),
    isBreaking: true,
    imageTone: "#457b9d",
    imageLabel: "Transport",
  },
  {
    slug: "supercar-special-permit",
    title: "This extreme supercar needs a special permit to be legal in Australia",
    dek: "Importers navigate noise and emissions rules for a limited run.",
    body: [
      "Only a handful of the hypercars will be registered locally under individual permits.",
      "Compliance engineers spent months adapting lighting and speed-limiter firmware.",
      "Expect to see one on display at the next major motor show.",
    ],
    pillar: "lifestyle",
    category: "Motoring",
    author: "Ben Ortiz",
    publishedAt: hoursAgo(22),
    imageTone: "#e85d04",
    imageLabel: "Supercar",
  },
  {
    slug: "today-show-weather-viral",
    title: "Today show weather segment goes delightfully off-script",
    dek: "Studio laughter took over when a forecast graphic glitched live.",
    body: [
      "Viewers loved the unfiltered moment as presenters recovered mid-sentence.",
      "Clips racked up shares before breakfast had finished.",
      "The network joked it was the most accurate ‘chaos index’ all week.",
    ],
    pillar: "tv",
    category: "Breakfast",
    author: "Mia Collins",
    publishedAt: hoursAgo(9.5),
    imageTone: "#48cae4",
    imageLabel: "Today",
  },
  {
    slug: "60-minutes-investigation-tease",
    title: "60 Minutes teases investigation into supermarket pricing",
    dek: "Sunday’s episode promises whistleblower testimony from supply chains.",
    body: [
      "Producers confirmed months of reporting into shelf pricing and supplier contracts.",
      "Retail giants were invited to respond on camera.",
      "A companion podcast drops Monday with extended interviews.",
    ],
    pillar: "tv",
    category: "Current affairs",
    author: "Noah Blake",
    publishedAt: hoursAgo(26),
    imageTone: "#001d3d",
    imageLabel: "60 Minutes",
  },
  {
    slug: "domain-auction-clearance",
    title: "Weekend auction clearance jumps as vendors adjust reserves",
    dek: "Buyers return to inspections after a softer autumn.",
    body: [
      "Preliminary clearance rates improved in Sydney and Melbourne over the weekend.",
      "Agents say vendors who revised reserves early fared best.",
      "Regional lifestyle listings continue to attract tree-change interest.",
    ],
    pillar: "news",
    category: "Property",
    author: "Emma Shaw",
    publishedAt: hoursAgo(30),
    imageTone: "#2b2d42",
    imageLabel: "Property",
  },
  {
    slug: "stan-sport-boxing-card",
    title: "Stan Sport locks in stacked domestic boxing card",
    dek: "Undercard talent gets a prime-time window next month.",
    body: [
      "Promoters confirmed a Sydney arena date with a local title fight headlining.",
      "Stan Sport will stream the full card exclusively.",
      "Tickets go on sale to the general public Friday.",
    ],
    pillar: "sport",
    category: "Boxing",
    author: "Marcus Cole",
    publishedAt: hoursAgo(36),
    imageTone: "#7f0000",
    imageLabel: "Boxing",
  },
  {
    slug: "honey-kitchen-winter-soups",
    title: "Five winter soups that freeze beautifully for busy weeks",
    dek: "Batch-cook once, thaw all month — our test kitchen favourites.",
    body: [
      "We stress-tested freezer performance for texture and flavour after two weeks.",
      "Lentil and roasted pumpkin took top marks for reheating.",
      "Download the printable shopping list at the end of the piece.",
    ],
    pillar: "lifestyle",
    category: "Food",
    author: "Chloe Burns",
    publishedAt: hoursAgo(40),
    imageTone: "#bc4749",
    imageLabel: "Kitchen",
  },
  {
    slug: "great-ocean-road-shoulder",
    title: "Why locals say shoulder season is the time for the Great Ocean Road",
    dek: "Fewer coaches, softer light, and café tables you can actually get.",
    body: [
      "Tourism operators prefer May–August for a calmer coastal drive.",
      "Weather windows still favour lookouts mid-morning.",
      "Book clifftop stays early — winter weekends fill quietly.",
    ],
    pillar: "travel",
    category: "Australia",
    author: "Olivia Hart",
    publishedAt: hoursAgo(44),
    imageTone: "#007f5f",
    imageLabel: "Coast",
  },
  {
    slug: "streaming-wars-local-drama",
    title: "Local drama renewals signal streaming’s next bet on Australian stories",
    dek: "Two series locked for new seasons after strong completion rates.",
    body: [
      "Platforms cited completion metrics above global averages for the renewed titles.",
      "Writers’ rooms are already staffing for late-year production.",
      "State screen agencies welcomed the pipeline boost.",
    ],
    pillar: "entertainment",
    category: "TV",
    author: "Sam Quinn",
    publishedAt: hoursAgo(50),
    imageTone: "#5a189a",
    imageLabel: "Drama",
  },
  {
    slug: "household-essentials-prime-day",
    title: "Why Prime Day is the best time to stock up on household essentials",
    dek: "Pantry, cleaning and bathroom staples beat gadget impulse buys for real savings.",
    body: [
      "Unit-price maths still wins — we compared multipacks versus supermarket shelves.",
      "Subscribe-and-save stacked with lightning deals for the deepest cuts.",
      "Set a list before you browse to avoid novelty clutter.",
    ],
    pillar: "shopping",
    category: "Home",
    author: "Alex Rivera",
    publishedAt: hoursAgo(17),
    imageTone: "#126782",
    imageLabel: "Home",
  },
  {
    slug: "aca-school-zone-safety",
    title: "A Current Affair investigates school-zone speeding loopholes",
    dek: "Hidden camera work captures close calls outside suburban gates.",
    body: [
      "Parents described near-misses during afternoon pick-up peaks.",
      "Councils say camera enforcement is expanding but funding lags.",
      "The full report airs Monday at 7pm on Channel 9 and 9Now.",
    ],
    pillar: "tv",
    category: "Current affairs",
    author: "Noah Blake",
    publishedAt: hoursAgo(33),
    imageTone: "#9d0208",
    imageLabel: "ACA",
  },
  {
    slug: "petrol-giant-price-cycle",
    title: "Aussie petrol giant defends price-cycle timing claims",
    dek: "Motorists app data sparked fresh scrutiny of weekly swings.",
    body: [
      "The retailer said wholesale movements — not collusion — drive pump boards.",
      "Consumer groups want clearer disclosure of cycle peaks.",
      "Drivers can still save by filling mid-week in most metros, analysts say.",
    ],
    pillar: "news",
    category: "Business",
    author: "Helen Park",
    publishedAt: hoursAgo(19),
    imageTone: "#6c757d",
    imageLabel: "Fuel",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getByPillar(pillar: Pillar): Article[] {
  return articles
    .filter((a) => a.pillar === pillar)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getLatest(limit = 8): Article[] {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, limit);
}

export function getBreaking(): Article[] {
  return articles.filter((a) => a.isBreaking || a.isLive);
}

export function searchArticles(q: string): Article[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return getLatest(12);
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(needle) ||
      a.dek.toLowerCase().includes(needle) ||
      a.category.toLowerCase().includes(needle) ||
      a.author.toLowerCase().includes(needle),
  );
}

export function relatedArticles(article: Article, limit = 4): Article[] {
  return articles
    .filter((a) => a.slug !== article.slug && (a.pillar === article.pillar || a.category === article.category))
    .slice(0, limit);
}

/**
 * DEMO BUG (intentional): Sport hub "Latest" sort is ascending (oldest first)
 * instead of descending. Used only by the Sport page. See Jira DR ticket.
 */
export function getSportArticlesBuggyLatest(): Article[] {
  return articles
    .filter((a) => a.pillar === "sport")
    .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
}
