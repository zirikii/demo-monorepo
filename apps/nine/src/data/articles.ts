import type { Article } from "./types";

/**
 * Editorial seed data. All headlines, standfirsts and body copy are original
 * demo content written for this unofficial clone — no text is scraped from
 * nine.com.au. Timestamps are anchored around mid-July 2026 so relative times
 * render realistically.
 */
export const articles: Article[] = [
  // ---------------------------------------------------------------- News
  {
    slug: "reserve-bank-holds-cash-rate-winter-review",
    title: "Reserve Bank holds cash rate as it weighs stubborn services inflation",
    standfirst:
      "The board left the rate unchanged for a third straight meeting, but flagged that a spring cut is 'firmly on the table' if inflation keeps easing.",
    pillar: "news",
    category: "Finance",
    author: "Priya Nair",
    authorTitle: "Economics Correspondent",
    publishedAt: "2026-07-16T05:10:00+10:00",
    readMinutes: 4,
    tags: ["Finance", "Cost of living", "RBA"],
    featured: true,
    live: true,
    body: [
      "The Reserve Bank has left the official cash rate unchanged, ending weeks of speculation that a run of softer inflation data would be enough to deliver relief to mortgage holders before spring.",
      "In a statement accompanying the decision, the board said the labour market remained 'tight but gradually loosening', and that services inflation was proving stickier than goods prices, which have fallen sharply over the past two quarters.",
      "Economists were split ahead of the meeting, with money markets pricing in roughly a one-in-three chance of a cut. Attention now turns to the next quarterly inflation print, which the governor described as 'the number that matters'.",
      "For a household with a $650,000 mortgage, a standard quarter-point cut would trim repayments by a little over $100 a month — modest relief, but symbolically important after the longest period of restrictive settings in more than a decade.",
    ],
  },
  {
    slug: "east-coast-cold-snap-record-lows",
    title: "Polar blast sends east coast shivering to coldest morning in years",
    standfirst:
      "A mass of Antarctic air has driven temperatures below zero across inland NSW and Victoria, with snow falling to unusually low levels.",
    pillar: "news",
    category: "National",
    author: "Tom Hargreaves",
    authorTitle: "Reporter",
    publishedAt: "2026-07-16T06:35:00+10:00",
    readMinutes: 3,
    tags: ["Weather", "NSW", "Victoria"],
    featured: true,
    body: [
      "Millions of Australians woke to their coldest morning in years as a polar air mass swept across the south-east, dragging temperatures well below average from the alps to the coast.",
      "The Bureau recorded sub-zero readings across the central tablelands, while snow dusted towns that rarely see it. Motorists were urged to take care on black ice, and health authorities issued warnings for older residents.",
      "Forecasters say the chill will linger for another 48 hours before a gradual warm-up late in the week, though overnight frosts are expected to persist inland.",
    ],
  },
  {
    slug: "housing-supply-plan-states-agreement",
    title: "States sign up to fast-tracked housing plan in bid to lift supply",
    standfirst:
      "National cabinet has agreed to streamline approvals for medium-density homes near transport hubs, targeting the country's worst rental squeeze in a generation.",
    pillar: "news",
    category: "Politics",
    author: "Alicia Reyes",
    authorTitle: "Political Editor",
    publishedAt: "2026-07-15T18:20:00+10:00",
    readMinutes: 5,
    tags: ["Politics", "Housing", "Property"],
    body: [
      "The states and territories have agreed to a package of planning reforms designed to accelerate the construction of homes close to train stations and major bus corridors.",
      "Under the plan, councils will face tighter statutory timeframes to assess medium-density proposals, with a new independent panel able to step in where approvals stall.",
      "Industry groups welcomed the announcement but cautioned that labour shortages and materials costs remained the biggest handbrake on delivery.",
      "Renters' advocates said the measures were overdue, pointing to vacancy rates below one per cent in several capital cities.",
    ],
  },
  {
    slug: "great-barrier-reef-coral-recovery-study",
    title: "Reef scientists report cautious optimism after two calm summers",
    standfirst:
      "A long-running survey has found signs of coral recovery across parts of the Great Barrier Reef, though researchers warn a single hot summer could reverse the gains.",
    pillar: "news",
    category: "Environment",
    author: "Dr Nadia Whitlock",
    authorTitle: "Science Reporter",
    publishedAt: "2026-07-15T11:00:00+10:00",
    readMinutes: 4,
    tags: ["Environment", "Science", "Queensland"],
    body: [
      "Marine scientists say sections of the Great Barrier Reef have shown encouraging coral regrowth following two relatively mild summers, offering a rare piece of good news for the world's largest reef system.",
      "The survey tracked hundreds of sites, finding that fast-growing branching corals had rebounded strongly in sheltered lagoons, even as more fragile species lagged.",
      "Researchers were quick to temper expectations, noting that recovery remained fragile and that the underlying threat of marine heatwaves had not gone away.",
    ],
  },
  {
    slug: "small-business-energy-rebate-rollout",
    title: "Energy rebate lands for small businesses as bills bite",
    standfirst:
      "Cafes, salons and corner stores will see automatic credits appear on their next quarterly bill under a relief scheme now rolling out nationwide.",
    pillar: "news",
    category: "Small business",
    author: "Marcus Fenn",
    authorTitle: "Business Reporter",
    publishedAt: "2026-07-14T09:45:00+10:00",
    readMinutes: 3,
    tags: ["Finance", "Small business", "Cost of living"],
    body: [
      "Hundreds of thousands of small businesses will receive an automatic energy credit on their next bill, with the rebate applied directly by retailers rather than requiring an application.",
      "Owners in hospitality and retail — among the hardest hit by rising power costs — welcomed the relief, though many said it fell short of the increases they had absorbed over the past year.",
      "The government said the measure was targeted and temporary, and pointed to longer-term investment in grid upgrades to bring wholesale prices down.",
    ],
  },
  {
    slug: "regional-rail-upgrade-funding",
    title: "Billion-dollar regional rail upgrade to slash travel times",
    standfirst:
      "New track, level-crossing removals and faster rolling stock will cut journeys between major regional centres and the capital by up to 40 minutes.",
    pillar: "news",
    category: "National",
    author: "Tom Hargreaves",
    authorTitle: "Reporter",
    publishedAt: "2026-07-13T14:10:00+10:00",
    readMinutes: 4,
    tags: ["Transport", "Regional", "Infrastructure"],
    body: [
      "A major regional rail package will deliver new track, upgraded stations and faster services, with governments pitching it as a way to ease big-city housing pressure by making commuting from the regions viable.",
      "The works include a series of level-crossing removals that authorities say will improve both safety and reliability.",
      "Construction is expected to be staged over several years, with the first faster timetables promised well before the full program is complete.",
    ],
  },

  // ---------------------------------------------------------------- Sport
  {
    slug: "afl-thriller-after-siren-goal",
    title: "After-the-siren goal steals it as finals race tightens",
    standfirst:
      "A composed set shot from 45 metres out sealed a two-point win and threw the top-eight scramble wide open with a month to play.",
    pillar: "sport",
    category: "AFL",
    author: "Jack Corrigan",
    authorTitle: "Chief Football Writer",
    publishedAt: "2026-07-16T04:30:00+10:00",
    readMinutes: 3,
    tags: ["AFL", "Match report"],
    featured: true,
    live: true,
    body: [
      "It came down to the final kick of the day, and the visitors held their nerve — a booming set shot after the siren splitting the middle to snatch a two-point victory in front of a stunned home crowd.",
      "The result blows the finals race wide open, with barely a game and percentage separating fourth from tenth heading into the run home.",
      "The coach praised his side's 'refusal to panic' in a frantic final quarter that swung on turnovers and desperate defensive efforts.",
    ],
  },
  {
    slug: "nrl-origin-decider-preview",
    title: "State of Origin decider shapes as a forward arm-wrestle",
    standfirst:
      "Both camps are talking up their middle rotation ahead of a series finale expected to be won in the trenches.",
    pillar: "sport",
    category: "NRL",
    author: "Bianca Toala",
    authorTitle: "Rugby League Writer",
    publishedAt: "2026-07-15T20:05:00+10:00",
    readMinutes: 4,
    tags: ["NRL", "State of Origin"],
    featured: true,
    body: [
      "The series is level, the venue is sold out, and both coaches agree on one thing: this decider will be won up the middle.",
      "Selectors have loaded their benches with big-minute forwards, signalling an intent to grind rather than gamble.",
      "The halves battle looms as the difference-maker, with both playmakers coming off standout club form.",
    ],
  },
  {
    slug: "cricket-tour-squad-named",
    title: "Selectors spring surprise with uncapped spinner in tour squad",
    standfirst:
      "A breakout domestic season has earned a young tweaker a maiden call-up for the subcontinent tour.",
    pillar: "sport",
    category: "Cricket",
    author: "Sanjay Kohli",
    authorTitle: "Cricket Writer",
    publishedAt: "2026-07-15T12:40:00+10:00",
    readMinutes: 3,
    tags: ["Cricket", "Selection"],
    body: [
      "Selectors have rewarded a standout summer with a maiden squad call-up, backing a young spinner to add control on tracks expected to turn sharply.",
      "The move signals a shift toward specialist spin options for the demanding away schedule.",
      "The captain welcomed the pick, saying the squad had 'the balance to win in all conditions'.",
    ],
  },
  {
    slug: "matildas-friendly-sellout",
    title: "Matildas friendly sells out in record time as fever builds",
    standfirst:
      "Tickets for the marquee fixture were gone within hours, underlining the enduring pull of the national team.",
    pillar: "sport",
    category: "Football",
    author: "Erin Maloney",
    authorTitle: "Football Writer",
    publishedAt: "2026-07-14T16:15:00+10:00",
    readMinutes: 2,
    tags: ["Football", "Matildas"],
    body: [
      "Demand for the upcoming home friendly has smashed expectations, with the fixture selling out in a matter of hours.",
      "Organisers are exploring options to open additional seating to meet the crush of interest.",
      "The coach said the support was 'humbling' and a reminder of the team's role in inspiring the next generation.",
    ],
  },
  {
    slug: "tennis-teen-qualifier-run",
    title: "Teen qualifier's dream run ends in three-set epic",
    standfirst:
      "The 18-year-old wildcard pushed a seeded opponent to the brink before bowing out to a standing ovation.",
    pillar: "sport",
    category: "Tennis",
    author: "Erin Maloney",
    authorTitle: "Football Writer",
    publishedAt: "2026-07-13T22:50:00+10:00",
    readMinutes: 3,
    tags: ["Tennis"],
    body: [
      "A fearless teenage qualifier came within two points of a stunning upset before falling in a three-set thriller that had the crowd on its feet.",
      "The performance marks the arrival of a genuine prospect, with coaches praising a serve well beyond her years.",
      "She said the experience had 'shown me I belong at this level'.",
    ],
  },
  {
    slug: "motorsport-street-circuit-return",
    title: "Roaring return: street circuit revs up for a blockbuster weekend",
    standfirst:
      "Grandstands are sold out and the paddock is buzzing ahead of one of the most anticipated rounds of the season.",
    pillar: "sport",
    category: "Motorsport",
    author: "Jack Corrigan",
    authorTitle: "Chief Football Writer",
    publishedAt: "2026-07-12T13:05:00+10:00",
    readMinutes: 3,
    tags: ["Motorsport"],
    body: [
      "The championship rolls into town for a street-circuit spectacular, with a championship fight tightening at exactly the right time.",
      "Teams have brought significant upgrades, and the tight, walled layout promises to punish the smallest mistake.",
      "Organisers expect one of the biggest crowds in the event's history.",
    ],
  },

  // ------------------------------------------------------------- Lifestyle
  {
    slug: "royals-summer-tour-highlights",
    title: "Every look from the whirlwind royal summer tour",
    standfirst:
      "From tailored coats to a surprise nod to a local designer, the tour delivered no shortage of talking points.",
    pillar: "lifestyle",
    category: "Royals",
    author: "Georgia Sinclair",
    authorTitle: "9Honey Royals",
    publishedAt: "2026-07-16T03:15:00+10:00",
    readMinutes: 4,
    tags: ["Royals", "Celebrity", "Fashion"],
    featured: true,
    body: [
      "The royal summer tour wrapped with a flourish, and — as ever — the wardrobe told its own story of diplomacy and quiet symbolism.",
      "Stylists noted several deliberate choices, including a jewel-toned coat that drew comparisons to a tour of decades past.",
      "A last-day appearance in a piece by an emerging local designer sent the label's website into meltdown.",
    ],
  },
  {
    slug: "one-pan-winter-dinners",
    title: "Five one-pan winter dinners that basically cook themselves",
    standfirst:
      "Minimal washing up, maximum comfort — these hands-off traybakes are built for cold, busy weeknights.",
    pillar: "lifestyle",
    category: "Food & Kitchen",
    author: "Marco Bellini",
    authorTitle: "9Honey Kitchen",
    publishedAt: "2026-07-15T17:30:00+10:00",
    readMinutes: 5,
    tags: ["Food", "Recipes"],
    featured: true,
    body: [
      "When it's cold and you're tired, the last thing you want is a sink full of pots. Enter the humble one-pan dinner: everything on a single tray, into the oven, done.",
      "We've pulled together five reader favourites, from a sticky maple-mustard chicken bake to a smoky chorizo and chickpea number that comes together in under an hour.",
      "Each recipe scales easily and reheats well, making them ideal for batch-cooking on a Sunday.",
    ],
  },
  {
    slug: "sleep-experts-winter-routine",
    title: "Sleep experts say this one evening habit is quietly wrecking your rest",
    standfirst:
      "It's not your phone — at least, not only your phone. Specialists point to a far more common culprit.",
    pillar: "lifestyle",
    category: "Health",
    author: "Dr Hana Osei",
    authorTitle: "9Honey Health",
    publishedAt: "2026-07-15T08:20:00+10:00",
    readMinutes: 4,
    tags: ["Health", "Wellbeing"],
    body: [
      "We asked sleep specialists what they'd change about the average Australian's evening, and the answer surprised us: it's the irregular bedtime, not just the screens.",
      "Going to bed at wildly different times, they say, confuses the body clock as much as a red-eye flight.",
      "The fix is refreshingly boring — pick a window, stick to it, and let light do the rest.",
    ],
  },
  {
    slug: "relationships-long-distance-advice",
    title: "'We made long distance work for three years — here's what nobody tells you'",
    standfirst:
      "Two readers share the small rituals that kept them close across time zones and the mistakes they'd warn others against.",
    pillar: "lifestyle",
    category: "Relationships",
    author: "Georgia Sinclair",
    authorTitle: "9Honey",
    publishedAt: "2026-07-14T19:00:00+10:00",
    readMinutes: 5,
    tags: ["Relationships"],
    body: [
      "Long distance gets a bad rap, but plenty of couples make it work — and the ones who do tend to share a few habits.",
      "Chief among them: a shared calendar, a standing 'no-agenda' call, and a hard rule about never arguing over text.",
      "Their biggest warning? Don't let the countdown to the next visit become the only thing holding you together.",
    ],
  },
  {
    slug: "budget-friendly-home-refresh",
    title: "Interior stylists reveal the $50 swaps that refresh a whole room",
    standfirst:
      "You don't need a renovation — just a few clever, low-cost changes that punch well above their price.",
    pillar: "lifestyle",
    category: "Homes",
    author: "Priya Nair",
    authorTitle: "9Honey Homes",
    publishedAt: "2026-07-13T10:30:00+10:00",
    readMinutes: 3,
    tags: ["Homes", "Interiors"],
    body: [
      "Stylists agree: the fastest way to lift a tired room isn't paint, it's texture — a chunky throw, a woven basket, a single oversized artwork.",
      "Swapping cool-white bulbs for warm ones is another instant upgrade that costs almost nothing.",
      "Their golden rule is to declutter first, then add back only what earns its place.",
    ],
  },
  {
    slug: "parenting-screen-time-guilt",
    title: "Why child psychologists want parents to stop feeling guilty about screen time",
    standfirst:
      "The conversation, experts say, has moved on from 'how much' to 'what kind' — and that changes everything.",
    pillar: "lifestyle",
    category: "Parenting",
    author: "Dr Hana Osei",
    authorTitle: "9Honey Parenting",
    publishedAt: "2026-07-12T15:45:00+10:00",
    readMinutes: 4,
    tags: ["Parenting", "Health"],
    body: [
      "Screen-time guilt is practically a rite of passage for modern parents, but child psychologists say the blanket-limit approach misses the point.",
      "What matters more, they argue, is whether screens are passive or active, solo or shared, and whether they're crowding out sleep and play.",
      "Their advice: co-watch when you can, keep bedrooms screen-free, and go easy on yourself.",
    ],
  },

  // ---------------------------------------------------------------- Travel
  {
    slug: "japan-winter-itinerary",
    title: "The perfect 10-day Japan itinerary for first-timers chasing snow",
    standfirst:
      "From neon-lit cities to powder-covered onsen towns, here's how to see the best of a Japanese winter without rushing.",
    pillar: "travel",
    category: "Asia Pacific",
    author: "Leah Nguyen",
    authorTitle: "Travel Editor",
    publishedAt: "2026-07-16T02:00:00+10:00",
    readMinutes: 6,
    tags: ["Travel", "Japan", "Winter"],
    featured: true,
    body: [
      "A Japanese winter is one of travel's great sweet spots: fewer crowds, crisp blue skies, and some of the best snow on the planet.",
      "Our 10-day plan balances big-city buzz with slow days in onsen country, with plenty of downtime built in so you're not living out of a suitcase.",
      "We've included rail-pass tips, the dishes worth queuing for, and the one booking you should lock in months ahead.",
    ],
  },
  {
    slug: "great-ocean-road-hidden-stops",
    title: "The Great Ocean Road stops most road-trippers drive straight past",
    standfirst:
      "Beyond the famous lookouts lie quiet coves, cellar doors and one of the best bakeries on the coast.",
    pillar: "travel",
    category: "Australia",
    author: "Leah Nguyen",
    authorTitle: "Travel Editor",
    publishedAt: "2026-07-15T13:20:00+10:00",
    readMinutes: 5,
    tags: ["Travel", "Victoria", "Road trip"],
    featured: true,
    body: [
      "Everyone stops for the big-ticket lookouts — and you should too — but the magic of this stretch is in the detours.",
      "We've mapped a handful of under-the-radar stops, from a hidden swimming cove to a cellar door with a view that rivals the coast itself.",
      "Go midweek if you can, and leave room in the boot for a very good vanilla slice.",
    ],
  },
  {
    slug: "airfare-sale-europe-shoulder-season",
    title: "Airlines launch flash sale on Europe fares for shoulder season",
    standfirst:
      "Return fares to several hubs have dropped sharply for travel outside the peak, but the best seats won't last.",
    pillar: "travel",
    category: "Flight deals",
    author: "Marcus Fenn",
    authorTitle: "Travel Deals",
    publishedAt: "2026-07-14T11:05:00+10:00",
    readMinutes: 3,
    tags: ["Travel", "Deals", "Europe"],
    body: [
      "Carriers have kicked off a flash sale on European routes, with the sharpest prices reserved for shoulder-season travel when the crowds thin and the weather still plays nice.",
      "As always, flexibility is your friend — shifting your departure by a day or two can shave hundreds off the fare.",
      "Set a price alert and be ready to book, because the cheapest fare classes tend to vanish first.",
    ],
  },
  {
    slug: "cruise-comeback-south-pacific",
    title: "Why the South Pacific is having a cruising moment",
    standfirst:
      "Shorter itineraries and a wave of refreshed ships are luring first-time cruisers to the islands on our doorstep.",
    pillar: "travel",
    category: "Cruises",
    author: "Leah Nguyen",
    authorTitle: "Travel Editor",
    publishedAt: "2026-07-12T09:15:00+10:00",
    readMinutes: 4,
    tags: ["Travel", "Cruises", "Pacific"],
    body: [
      "The South Pacific is enjoying a cruising renaissance, powered by shorter, more affordable itineraries that make a first cruise an easy yes.",
      "A fleet of recently refurbished ships has raised the bar on dining and entertainment without pushing prices out of reach.",
      "For families, the mix of sea days and island stops hits a comfortable rhythm.",
    ],
  },
  {
    slug: "outback-rail-journey-guide",
    title: "All aboard: the epic outback rail journey worth planning your year around",
    standfirst:
      "Vast horizons, star-filled nights and off-train excursions make this one of the world's great slow-travel experiences.",
    pillar: "travel",
    category: "Guides",
    author: "Tom Hargreaves",
    authorTitle: "Reporter",
    publishedAt: "2026-07-11T14:40:00+10:00",
    readMinutes: 5,
    tags: ["Travel", "Rail", "Outback"],
    body: [
      "There's slow travel, and then there's watching the outback unspool from a panoramic carriage as the sun sinks into an endless red horizon.",
      "The journey's rhythm — long stretches of landscape punctuated by off-train excursions — is precisely the point.",
      "Book the cabin category up early; the best fares and berths go a season ahead.",
    ],
  },

  // -------------------------------------------------------- Entertainment
  {
    slug: "mafs-reunion-explosive-return",
    title: "MAFS reunion delivers its most explosive sit-down yet",
    standfirst:
      "Old alliances crumbled and a few surprise apologies landed as the couches returned for the season's reckoning.",
    pillar: "entertainment",
    category: "Married at First Sight",
    author: "Chloe Baxter",
    authorTitle: "TV Writer",
    publishedAt: "2026-07-16T01:20:00+10:00",
    readMinutes: 4,
    tags: ["MAFS", "TV", "Reality"],
    featured: true,
    body: [
      "The couches are back, and with them the season's biggest confrontations, as the experiment's most talked-about couples reunited for a reckoning.",
      "There were tears, a couple of genuine apologies, and at least one alliance that did not survive the ad break.",
      "Fans lit up social media, making it one of the most-discussed episodes of the year.",
    ],
  },
  {
    slug: "the-block-auction-record",
    title: "The Block delivers a nail-biting auction with a record result",
    standfirst:
      "A late bidding war pushed one couple's result well beyond reserve in a finish nobody saw coming.",
    pillar: "entertainment",
    category: "The Block",
    author: "Chloe Baxter",
    authorTitle: "TV Writer",
    publishedAt: "2026-07-15T21:10:00+10:00",
    readMinutes: 3,
    tags: ["The Block", "TV"],
    featured: true,
    body: [
      "Auction day delivered everything fans could want: a slow start, a flurry of late bids, and a result that rewrote the record books.",
      "One couple, written off midway through the season, walked away with the day's biggest cheque after a dramatic bidding war.",
      "The host called it 'the most extraordinary finish I've seen on this show'.",
    ],
  },
  {
    slug: "today-show-anniversary-special",
    title: "Today marks a milestone with a star-studded anniversary special",
    standfirst:
      "The breakfast institution rolled out familiar faces and a few emotional surprises to celebrate the occasion.",
    pillar: "entertainment",
    category: "Today",
    author: "Ben Ferris",
    authorTitle: "Entertainment Reporter",
    publishedAt: "2026-07-14T07:30:00+10:00",
    readMinutes: 3,
    tags: ["Today", "TV"],
    body: [
      "The breakfast program pulled out all the stops for its anniversary, reuniting former hosts and revisiting the moments that defined it.",
      "There were laughs, a few tears, and a genuinely surprising musical guest to close the show.",
      "Producers teased that the celebrations would continue across the week.",
    ],
  },
  {
    slug: "9now-streaming-winter-lineup",
    title: "Everything worth streaming on 9Now this winter",
    standfirst:
      "From a gripping new local drama to a back catalogue of comfort classics, here's where to point the remote.",
    pillar: "entertainment",
    category: "9Now",
    author: "Ben Ferris",
    authorTitle: "Entertainment Reporter",
    publishedAt: "2026-07-13T16:50:00+10:00",
    readMinutes: 4,
    tags: ["9Now", "Streaming"],
    body: [
      "Winter is prime couch season, and the streaming lineup has delivered, headlined by a tense new homegrown drama already drawing rave reviews.",
      "Beyond the marquee release, there's a deep bench of returning favourites and a documentary strand worth carving out an evening for.",
      "We've sorted the highlights by mood, from edge-of-your-seat to easy Sunday viewing.",
    ],
  },
  {
    slug: "60-minutes-investigation-teaser",
    title: "60 Minutes lines up a blockbuster investigation for Sunday",
    standfirst:
      "A months-long investigation promises revelations that producers say will 'start a national conversation'.",
    pillar: "entertainment",
    category: "60 Minutes",
    author: "Alicia Reyes",
    authorTitle: "Political Editor",
    publishedAt: "2026-07-12T18:05:00+10:00",
    readMinutes: 2,
    tags: ["60 Minutes", "TV"],
    body: [
      "The current-affairs flagship has teased a major Sunday investigation, the product of months of reporting.",
      "Producers are keeping specifics under wraps but promise the story will resonate well beyond the broadcast.",
      "It caps a strong run of ratings for the program's investigative strand.",
    ],
  },
  {
    slug: "music-homegrown-festival-lineup",
    title: "Homegrown festival unveils a lineup stacked with local talent",
    standfirst:
      "Organisers have leaned into the local scene for a bill that spans genres and generations.",
    pillar: "entertainment",
    category: "Music",
    author: "Chloe Baxter",
    authorTitle: "TV Writer",
    publishedAt: "2026-07-11T12:25:00+10:00",
    readMinutes: 3,
    tags: ["Music", "Festival"],
    body: [
      "This year's festival lineup puts local artists front and centre, from arena-fillers to the buzziest names coming up through the pub circuit.",
      "Organisers say the shift reflects both audience demand and a determination to invest in the domestic scene.",
      "Presale demand has been strong, with several stages already tipped to reach capacity.",
    ],
  },

  // --------------------------------------------------------------- Shopping
  {
    slug: "best-tech-deals-this-week",
    title: "The best tech deals worth your money this week",
    standfirst:
      "We've sifted the noise to find genuine discounts on headphones, tablets and the odd sneaky bargain.",
    pillar: "shopping",
    category: "Electronics",
    author: "Marcus Fenn",
    authorTitle: "Shopping Editor",
    publishedAt: "2026-07-16T00:10:00+10:00",
    readMinutes: 4,
    tags: ["Shopping", "Tech", "Deals"],
    featured: true,
    body: [
      "Not every 'sale' is a deal, so we've done the legwork — tracking prices to separate the genuine discounts from the marked-up markdowns.",
      "This week's standouts include a noise-cancelling headphone at its lowest price yet and a tablet bundle that actually adds up.",
      "As always, we link only to prices we've verified, and we'll update the list as deals sell out.",
    ],
  },
  {
    slug: "winter-fashion-sales-guide",
    title: "Winter fashion sales: the pieces actually worth buying",
    standfirst:
      "End-of-season markdowns are here — here's how to shop them without ending up with a wardrobe of regrets.",
    pillar: "shopping",
    category: "Fashion",
    author: "Georgia Sinclair",
    authorTitle: "Shopping",
    publishedAt: "2026-07-15T09:40:00+10:00",
    readMinutes: 3,
    tags: ["Shopping", "Fashion"],
    featured: true,
    body: [
      "End-of-season sales are a trap and an opportunity in equal measure. The trick is to buy the timeless stuff cheap and skip the trend-driven impulse buys.",
      "We've rounded up the coats, boots and knitwear worth grabbing now and wearing for years.",
      "Our one rule: if you wouldn't pay full price for it, it's not a bargain.",
    ],
  },
  {
    slug: "home-appliance-buying-guide",
    title: "Thinking of upgrading an appliance? Read this first",
    standfirst:
      "From air fryers to heat pumps, our buying guide cuts through the spec-sheet jargon.",
    pillar: "shopping",
    category: "Home & Garden",
    author: "Priya Nair",
    authorTitle: "Shopping",
    publishedAt: "2026-07-14T13:15:00+10:00",
    readMinutes: 5,
    tags: ["Shopping", "Home"],
    body: [
      "Appliance shopping is riddled with jargon designed to make you spend more, so we've translated the specs that matter into plain English.",
      "We cover running costs, the features that are worth paying for, and the ones that are pure marketing.",
      "Spoiler: the most expensive model is rarely the smartest buy.",
    ],
  },
  {
    slug: "coupon-codes-travel-bookings",
    title: "Live coupon codes to trim the cost of your next trip",
    standfirst:
      "Stack these verified codes on flights, hotels and car hire before they expire.",
    pillar: "shopping",
    category: "Travel",
    author: "Leah Nguyen",
    authorTitle: "Shopping",
    publishedAt: "2026-07-13T11:50:00+10:00",
    readMinutes: 3,
    tags: ["Shopping", "Travel", "Coupons"],
    body: [
      "A good coupon can knock a surprising amount off a trip, so we keep a running list of the codes our team has actually tested.",
      "This week's picks cover hotel bookings, car hire and a handful of activity providers.",
      "Codes come and go quickly, so we timestamp each one and pull it the moment it stops working.",
    ],
  },
  {
    slug: "gift-ideas-under-fifty",
    title: "40 genuinely good gift ideas under $50",
    standfirst:
      "Thoughtful, useful and not destined for the re-gift pile — sorted by who you're shopping for.",
    pillar: "shopping",
    category: "Gift ideas",
    author: "Chloe Baxter",
    authorTitle: "Shopping",
    publishedAt: "2026-07-12T10:05:00+10:00",
    readMinutes: 4,
    tags: ["Shopping", "Gifts"],
    body: [
      "Good gifts don't have to be expensive; they have to feel considered. Our under-$50 guide leans into that idea.",
      "We've grouped ideas by recipient — the host, the hard-to-buy-for, the new parent — so you can shop by problem, not category.",
      "Every pick is something a member of our team would happily receive.",
    ],
  },
  {
    slug: "mattress-reviews-2026",
    title: "We tested the year's most hyped mattresses so you don't have to",
    standfirst:
      "Firmness, cooling and value put to the test across weeks of very diligent 'research'.",
    pillar: "shopping",
    category: "Reviews",
    author: "Marcus Fenn",
    authorTitle: "Shopping Editor",
    publishedAt: "2026-07-11T15:30:00+10:00",
    readMinutes: 6,
    tags: ["Shopping", "Reviews", "Home"],
    body: [
      "We spent weeks testing the year's most-talked-about mattresses, rating each on firmness, temperature and long-term value.",
      "The results upended a few assumptions — including the idea that a higher price guarantees a better night's sleep.",
      "Our top pick balanced support and cooling at a mid-range price, with a generous trial period sealing the deal.",
    ],
  },
];

export function articlesByPillar(pillar: Article["pillar"]): Article[] {
  return articles.filter((a) => a.pillar === pillar);
}

export function featuredArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export function findArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function relatedArticles(article: Article, limit = 4): Article[] {
  return articles
    .filter((a) => a.slug !== article.slug && a.pillar === article.pillar)
    .slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return articles.filter((a) => {
    const haystack = [a.title, a.standfirst, a.category, a.author, ...a.tags]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
