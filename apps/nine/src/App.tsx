import {
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  CloudSun,
  Menu,
  PlayCircle,
  Search,
  Star,
  Tv,
  UserCircle,
  Video,
} from "lucide-react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

type Story = {
  title: string;
  kicker: string;
  summary: string;
  tone: "ink" | "red" | "blue" | "gold" | "green" | "violet";
  minutes: number;
};

type SectionPage = {
  id: string;
  title: string;
  eyebrow: string;
  deck: string;
  lead: Story;
  stories: Story[];
  rail: string[];
};

type TvSlot = {
  time: string;
  channel: string;
  show: string;
  detail: string;
};

const BUG_TICKET_KEY = "DR-NINE-WEATHER-LAYOUT";

const navItems = [
  { label: "News", path: "/news" },
  { label: "Sport", path: "/sport" },
  { label: "Entertainment", path: "/entertainment" },
  { label: "Lifestyle", path: "/lifestyle" },
  { label: "Travel", path: "/travel" },
  { label: "TV Guide", path: "/tv-guide" },
  { label: "Video", path: "/video" },
  { label: "Weather", path: "/weather" },
];

const sections: SectionPage[] = [
  {
    id: "news",
    title: "News",
    eyebrow: "Australia and the world",
    deck: "Breaking headlines, explainers and live updates from across the Nine network.",
    lead: {
      title: "Morning briefing: housing, energy and health dominate cabinet agenda",
      kicker: "Politics",
      summary:
        "State leaders arrive in Canberra with cost-of-living measures, hospital funding and grid upgrades leading the talks.",
      tone: "red",
      minutes: 4,
    },
    stories: [
      {
        title: "Live: severe storms move across south-east Queensland",
        kicker: "Weather",
        summary: "Emergency services urge residents to avoid floodwater as cells track toward the coast.",
        tone: "blue",
        minutes: 2,
      },
      {
        title: "Explainer: what the new privacy bill means for households",
        kicker: "Analysis",
        summary: "The proposed regime expands data access rules and introduces larger penalties.",
        tone: "ink",
        minutes: 6,
      },
      {
        title: "Markets open higher after Wall Street rally",
        kicker: "Finance",
        summary: "Local miners and banks push the ASX into positive territory in early trade.",
        tone: "green",
        minutes: 3,
      },
    ],
    rail: ["Latest bulletins", "9News app alerts", "Watch live stream", "Submit a news tip"],
  },
  {
    id: "sport",
    title: "Sport",
    eyebrow: "Wide World of Sports",
    deck: "Match coverage, expert calls and behind-the-scenes moments from the biggest games.",
    lead: {
      title: "Origin selection shock as veteran playmaker earns recall",
      kicker: "NRL",
      summary:
        "Selectors back experience for the decider after a weekend of injuries and breakout performances.",
      tone: "blue",
      minutes: 5,
    },
    stories: [
      {
        title: "Aussie quicks set up tense final day at Lord's",
        kicker: "Cricket",
        summary: "A late spell flips the match after England's top order threatened to bat through.",
        tone: "green",
        minutes: 4,
      },
      {
        title: "Matildas announce expanded regional tour",
        kicker: "Football",
        summary: "Five new fixtures take the national side to fans outside the capital cities.",
        tone: "gold",
        minutes: 3,
      },
      {
        title: "Supercars grid reacts to new street circuit",
        kicker: "Motorsport",
        summary: "Drivers praise the technical layout but warn tyre strategy will decide the weekend.",
        tone: "red",
        minutes: 3,
      },
    ],
    rail: ["Live scores", "NRL ladder", "AFL ladder", "Expert tipping"],
  },
  {
    id: "entertainment",
    title: "Entertainment",
    eyebrow: "Shows, celebrities and streaming",
    deck: "The biggest TV moments, celebrity interviews and watch-next recommendations.",
    lead: {
      title: "Block teams reveal the room that changes the competition",
      kicker: "Television",
      summary:
        "Judges call one renovation a season benchmark as the leaderboard tightens before auctions.",
      tone: "violet",
      minutes: 4,
    },
    stories: [
      {
        title: "MAFS reunion first look promises unfinished business",
        kicker: "Reality TV",
        summary: "The cast returns to the couch for a final round of questions from experts.",
        tone: "red",
        minutes: 2,
      },
      {
        title: "Nine picks up new crime drama for prime time",
        kicker: "TV",
        summary: "The six-part series follows a detective unit reopening a cold case.",
        tone: "blue",
        minutes: 3,
      },
      {
        title: "Celebrity chef shares winter pasta shortcut",
        kicker: "Food",
        summary: "A pantry-led recipe lands on Today Extra ahead of a national book tour.",
        tone: "gold",
        minutes: 2,
      },
    ],
    rail: ["What to watch", "9Now originals", "Celebrity news", "Recaps"],
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    eyebrow: "Homes, food and wellbeing",
    deck: "Practical ideas for family, health, money, home and everyday living.",
    lead: {
      title: "Five small home upgrades designers say make rooms feel calmer",
      kicker: "Homes",
      summary:
        "Simple lighting, storage and fabric choices can refresh a space without a full renovation.",
      tone: "green",
      minutes: 5,
    },
    stories: [
      {
        title: "Doctor answers the sleep question everyone asks in winter",
        kicker: "Health",
        summary: "Temperature, light and routine can make the biggest difference to rest quality.",
        tone: "blue",
        minutes: 4,
      },
      {
        title: "Budget family dinners with leftovers built in",
        kicker: "Food",
        summary: "Three tray-bake recipes designed to turn into lunches the next day.",
        tone: "gold",
        minutes: 3,
      },
      {
        title: "The subscription audit saving households hundreds",
        kicker: "Money",
        summary: "Finance experts share a ten-minute review for forgotten recurring payments.",
        tone: "red",
        minutes: 3,
      },
    ],
    rail: ["Recipes", "Homes", "Health", "Money"],
  },
  {
    id: "travel",
    title: "Travel",
    eyebrow: "Destinations and deals",
    deck: "Ideas for weekends away, longer holidays and smarter ways to see Australia.",
    lead: {
      title: "The coastal town turning winter weekends into a food festival",
      kicker: "Australia",
      summary:
        "Local producers, ocean walks and boutique stays are drawing visitors outside peak season.",
      tone: "gold",
      minutes: 5,
    },
    stories: [
      {
        title: "Airline adds direct flights to a bucket-list Asian island",
        kicker: "Aviation",
        summary: "The new route opens in time for school holidays with introductory fares.",
        tone: "blue",
        minutes: 3,
      },
      {
        title: "Carry-on packing mistakes that slow every airport queue",
        kicker: "Tips",
        summary: "Travel editors explain the common items that trigger bag checks.",
        tone: "ink",
        minutes: 4,
      },
      {
        title: "Regional rail journey named best value escape",
        kicker: "Deals",
        summary: "A scenic route wins praise for food stops, views and flexible fares.",
        tone: "green",
        minutes: 3,
      },
    ],
    rail: ["Beach escapes", "City breaks", "Cruise", "Travel deals"],
  },
];

const tvSlots: TvSlot[] = [
  {
    time: "6:00pm",
    channel: "9",
    show: "9News",
    detail: "Local, national and international news with sport and weather.",
  },
  {
    time: "7:30pm",
    channel: "9",
    show: "A Current Affair",
    detail: "Investigations, consumer issues and the stories viewers are talking about.",
  },
  {
    time: "8:40pm",
    channel: "9",
    show: "Travel Guides",
    detail: "Everyday Australians review a new holiday destination.",
  },
  {
    time: "9:45pm",
    channel: "9Gem",
    show: "Movie: The Great Escape",
    detail: "Classic drama from the Nine movie library.",
  },
];

const videoPlaylist = [
  "Watch the latest 9News bulletin",
  "Sport wrap: every try from the round",
  "Exclusive interview from the Today couch",
  "Home reveal: the judges' favourite rooms",
  "Travel Guides: funniest moments",
];

const weatherCities = [
  { city: "Sydney", temp: "24", state: "Windy showers", rain: "62%" },
  { city: "Melbourne", temp: "18", state: "Cloud clearing", rain: "40%" },
  { city: "Brisbane", temp: "29", state: "Storm risk", rain: "68%" },
  { city: "Perth", temp: "31", state: "Sunny", rain: "4%" },
];

const sectionById = new Map(sections.map((section) => [section.id, section]));

function AppHeader() {
  return (
    <header className="site-header">
      <div className="utility-bar">
        <span>Unofficial Nine demo</span>
        <span>Today: 16 July 2026</span>
      </div>
      <div className="masthead">
        <NavLink to="/" className="logo-link" aria-label="Nine demo home">
          <img src="/brand/logo.svg" alt="Nine" />
        </NavLink>
        <nav className="primary-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <NavLink to="/search" className="icon-button" aria-label="Search">
            <Search aria-hidden="true" size={19} />
          </NavLink>
          <NavLink to="/account" className="icon-button" aria-label="Account">
            <UserCircle aria-hidden="true" size={21} />
          </NavLink>
          <button className="icon-button menu-button" type="button" aria-label="Open menu">
            <Menu aria-hidden="true" size={21} />
          </button>
        </div>
      </div>
    </header>
  );
}

function StoryCard({ story, feature = false }: { story: Story; feature?: boolean }) {
  return (
    <article className={feature ? "story-card feature-card" : "story-card"}>
      <div className={`story-art tone-${story.tone}`}>
        <span>{story.kicker}</span>
      </div>
      <div className="story-copy">
        <span className="kicker">{story.kicker}</span>
        <h3>{story.title}</h3>
        <p>{story.summary}</p>
        <div className="story-meta">
          <Clock3 aria-hidden="true" size={15} />
          <span>{story.minutes} min read</span>
        </div>
      </div>
    </article>
  );
}

function RailList({ title, items }: { title: string; items: string[] }) {
  return (
    <aside className="rail-card">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase().replaceAll(" ", "-")}`}>
              {item}
              <ChevronRight aria-hidden="true" size={16} />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function HomePage() {
  const news = sectionById.get("news");
  const sport = sectionById.get("sport");
  const entertainment = sectionById.get("entertainment");

  if (!news || !sport || !entertainment) {
    return <NotFoundPage />;
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Nine.com.au</span>
          <h1>News, sport, entertainment and the shows Australians are watching.</h1>
          <p>
            A high-fidelity mock of the Nine front door with section hubs, TV listings, video
            rails, newsletter capture and a known weather-page defect for demo workflows.
          </p>
          <div className="hero-actions">
            <NavLink to="/news" className="primary-button">
              Read top stories
            </NavLink>
            <NavLink to="/video" className="secondary-button">
              <PlayCircle aria-hidden="true" size={18} />
              Watch video
            </NavLink>
          </div>
        </div>
        <div className="hero-panel">
          <StoryCard story={news.lead} feature />
        </div>
      </section>

      <section className="content-grid">
        <div className="main-column">
          <SectionStrip title="Top stories" stories={[news.stories[0], sport.lead, entertainment.lead]} />
          <SectionStrip
            title="Trending now"
            stories={[news.stories[1], sport.stories[0], entertainment.stories[1]]}
          />
        </div>
        <div className="side-column">
          <NewsletterCard />
          <RailList title="Quick links" items={["9News", "Wide World of Sports", "9Now", "TV Guide"]} />
        </div>
      </section>
    </main>
  );
}

function SectionStrip({ title, stories }: { title: string; stories: Array<Story | undefined> }) {
  return (
    <section className="section-block">
      <div className="section-heading">
        <h2>{title}</h2>
        <NavLink to="/news">View all</NavLink>
      </div>
      <div className="card-grid">
        {stories.filter((story): story is Story => Boolean(story)).map((story) => (
          <StoryCard key={story.title} story={story} />
        ))}
      </div>
    </section>
  );
}

function SectionPage({ section }: { section: SectionPage }) {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <span className="eyebrow">{section.eyebrow}</span>
        <h1>{section.title}</h1>
        <p>{section.deck}</p>
      </section>
      <section className="content-grid">
        <div className="main-column">
          <StoryCard story={section.lead} feature />
          <SectionStrip title={`More in ${section.title}`} stories={section.stories} />
        </div>
        <div className="side-column">
          <RailList title={`${section.title} tools`} items={section.rail} />
          <AdCard />
        </div>
      </section>
    </main>
  );
}

function TvGuidePage() {
  return (
    <main className="page-shell">
      <section className="page-hero compact">
        <span className="eyebrow">Tonight on Nine</span>
        <h1>TV Guide</h1>
        <p>Plan prime time across Nine, 9Gem, 9Go! and 9Life.</p>
      </section>
      <section className="schedule-card">
        {tvSlots.map((slot) => (
          <article key={`${slot.time}-${slot.show}`} className="schedule-row">
            <div className="schedule-time">
              <CalendarDays aria-hidden="true" size={18} />
              <span>{slot.time}</span>
            </div>
            <div>
              <span className="channel-pill">{slot.channel}</span>
              <h2>{slot.show}</h2>
              <p>{slot.detail}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function VideoPage() {
  return (
    <main className="page-shell">
      <section className="video-hero">
        <div>
          <span className="eyebrow">Video centre</span>
          <h1>Watch the latest Nine clips</h1>
          <p>Bulletins, highlights, explainers and must-see moments in one playlist.</p>
        </div>
        <div className="play-tile">
          <Video aria-hidden="true" size={52} />
          <span>Now playing</span>
        </div>
      </section>
      <section className="playlist">
        {videoPlaylist.map((item, index) => (
          <article key={item} className="playlist-row">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{item}</h2>
            <button type="button">
              <PlayCircle aria-hidden="true" size={18} />
              Play
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

function WeatherPage() {
  return (
    <main className="page-shell" data-demo-bug={BUG_TICKET_KEY}>
      <section className="page-hero compact">
        <span className="eyebrow">Known demo bug target</span>
        <h1>Weather</h1>
        <p>Capital city forecast cards with rainfall odds and conditions.</p>
      </section>
      <section className="weather-grid buggy-weather-grid" aria-label="Capital city weather">
        {weatherCities.map((city) => (
          <article key={city.city} className="weather-card">
            <CloudSun aria-hidden="true" size={30} />
            <h2>{city.city}</h2>
            <p className="temp">{city.temp}°</p>
            <span>{city.state}</span>
            <strong>{city.rain} chance of rain</strong>
          </article>
        ))}
      </section>
      <p className="bug-note" aria-label="Known bug summary">
        Forecast cards intentionally overflow the viewport on this page for Jira demo bug{" "}
        {BUG_TICKET_KEY}.
      </p>
    </main>
  );
}

function SearchPage() {
  return (
    <main className="page-shell">
      <section className="page-hero compact">
        <span className="eyebrow">Search</span>
        <h1>Find stories across Nine</h1>
      </section>
      <form className="search-panel">
        <label htmlFor="search-query">Search Nine</label>
        <div>
          <input id="search-query" type="search" defaultValue="top stories" />
          <button type="submit">Search</button>
        </div>
      </form>
      <SectionStrip title="Suggested results" stories={sections.flatMap((section) => section.stories).slice(0, 3)} />
    </main>
  );
}

function AccountPage() {
  return (
    <main className="page-shell">
      <section className="account-card">
        <UserCircle aria-hidden="true" size={48} />
        <span className="eyebrow">Nine profile</span>
        <h1>Save stories and manage alerts</h1>
        <p>
          This demo profile lets viewers follow sections, save shows and configure breaking news
          notifications without connecting to a real authentication service.
        </p>
        <div className="preference-grid">
          {["Breaking news", "Sport scores", "Entertainment recaps", "Travel deals"].map((item) => (
            <label key={item}>
              <input type="checkbox" defaultChecked={item !== "Travel deals"} />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </section>
    </main>
  );
}

function NewsletterPage() {
  return (
    <main className="page-shell">
      <NewsletterCard feature />
    </main>
  );
}

function NewsletterCard({ feature = false }: { feature?: boolean }) {
  return (
    <section className={feature ? "newsletter-card feature-newsletter" : "newsletter-card"}>
      <Bell aria-hidden="true" size={28} />
      <span className="eyebrow">Daily briefing</span>
      <h2>Start with the headlines that matter.</h2>
      <p>Get a curated Nine morning email with news, sport, entertainment and TV picks.</p>
      <form>
        <label htmlFor={feature ? "feature-email" : "email"}>Email address</label>
        <input id={feature ? "feature-email" : "email"} type="email" placeholder="you@example.com" />
        <button type="submit">Sign up</button>
      </form>
    </section>
  );
}

function LegalPage({ type }: { type: "Privacy" | "Terms" }) {
  return (
    <main className="page-shell">
      <section className="page-hero compact">
        <span className="eyebrow">Demo policy</span>
        <h1>{type}</h1>
        <p>
          Placeholder {type.toLowerCase()} content for the unofficial demo. No real user data is
          collected or transmitted.
        </p>
      </section>
    </main>
  );
}

function AdCard() {
  return (
    <aside className="ad-card">
      <Star aria-hidden="true" size={22} />
      <span>Sponsored module placeholder</span>
      <strong>Brand-safe inventory preview</strong>
    </aside>
  );
}

function NotFoundPage() {
  return (
    <main className="page-shell">
      <section className="not-found">
        <Tv aria-hidden="true" size={46} />
        <h1>Page not found</h1>
        <p>The Nine demo could not find that page.</p>
        <NavLink to="/" className="primary-button">
          Return home
        </NavLink>
      </section>
    </main>
  );
}

function AppFooter() {
  return (
    <footer className="site-footer">
      <div>
        <img src="/brand/logo.svg" alt="Nine" />
        <p>Unofficial demo only. Not affiliated with Nine Entertainment Co.</p>
      </div>
      <nav aria-label="Footer navigation">
        <NavLink to="/newsletter">Newsletter</NavLink>
        <NavLink to="/privacy">Privacy</NavLink>
        <NavLink to="/terms">Terms</NavLink>
      </nav>
    </footer>
  );
}

function DemoApp() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {sections.map((section) => (
          <Route
            key={section.id}
            path={`/${section.id}`}
            element={<SectionPage section={section} />}
          />
        ))}
        <Route path="/tv-guide" element={<TvGuidePage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/privacy" element={<LegalPage type="Privacy" />} />
        <Route path="/terms" element={<LegalPage type="Terms" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <AppFooter />
    </BrowserRouter>
  );
}

export { BUG_TICKET_KEY };
export default DemoApp;
