import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    slug: "jira",
    name: "Jira",
    family: "Teamwork",
    tagline: "The teamwork platform for every team",
    summary:
      "AI-powered project management that removes the work around work. Keep teams in sync and on track.",
    heroHeadline: "Great outcomes start with Jira",
    heroBody:
      "Agents in Jira raise the floor for what every team can do. Plan, execute, and deliver outcomes together — without needing to be an engineer or an AI expert.",
    includes: ["Plans", "Boards", "Goals", "Rovo agents"],
    bullets: [
      "Plan sprints, roadmaps, and business projects in one place",
      "Let Rovo update work items when plans change",
      "Connect Confluence, Loom, and your toolchain through Teamwork Graph",
    ],
    features: [
      {
        title: "Work with agents, not around them",
        body: "Rovo drafts specs, splits epics, and flags blocked work using the context already in Jira.",
      },
      {
        title: "One board for every kind of team",
        body: "Software, marketing, and operations share the same system of work — with views that fit how they operate.",
      },
      {
        title: "Goals connected to delivery",
        body: "Link work items to focus areas so leadership can see progress without another status meeting.",
      },
    ],
    metrics: [
      { value: "85%", label: "less time on status updates" },
      { value: "40x", label: "faster reporting with agents" },
    ],
    faqs: [
      {
        question: "Is Jira only for software teams?",
        answer:
          "No. Jira is the project and work management system for software, IT, and business teams — with templates for each.",
      },
      {
        question: "How does Rovo work in Jira?",
        answer:
          "Rovo reads the Teamwork Graph — projects, people, docs, and goals — and can create, update, or summarise work from a prompt.",
      },
    ],
    relatedSlugs: ["confluence", "rovo", "jira-product-discovery"],
    accent: "jira",
  },
  {
    slug: "confluence",
    name: "Confluence",
    family: "Teamwork",
    tagline: "The AI workspace that works with you",
    summary:
      "The one place for ideas, docs, knowledge, and human+AI teammates. Live docs, whiteboards, databases, and pages.",
    heroHeadline: "The AI workspace that works with you",
    heroBody:
      "Beat the blank page with AI creation and ready-to-use templates. Draft PRDs, social briefs, and annual plans in seconds — then keep them connected to Jira.",
    includes: ["Live docs", "Whiteboards", "Databases", "Pages", "Videos", "Slides"],
    bullets: [
      "Create from a prompt or a template, then edit with your team live",
      "Pull context from Jira, Loom, and connected tools into the page",
      "Find answers with AI search instead of hunting across drives",
    ],
    features: [
      {
        title: "Put pen to paper. No hassle.",
        body: "AI creation and templates turn a blank page into a PRD, brief, or plan in seconds.",
      },
      {
        title: "Transform ideas into action",
        body: "Take ideas from concept to strategy to Jira work items without leaving the page.",
      },
      {
        title: "Stay in the know, your way",
        body: "Page summaries, audio briefings, and comment recaps keep everyone current.",
      },
    ],
    metrics: [
      { value: "360+", label: "hours saved onboarding new hires each year" },
      { value: "1", label: "source of truth for documentation" },
    ],
    faqs: [
      {
        question: "How is Confluence different from a shared drive?",
        answer:
          "Pages are connected to the Teamwork Graph — so search, agents, and Jira can use the same context instead of another folder of files.",
      },
    ],
    relatedSlugs: ["jira", "loom", "rovo"],
    accent: "confluence",
  },
  {
    slug: "rovo",
    name: "Rovo",
    family: "Platform",
    tagline: "AI search, chat, and agents for every team",
    summary:
      "Help every team work smarter with AI-powered Search, Chat, and Agents — or build custom agents in Studio.",
    heroHeadline: "Context and agents that move work forward",
    heroBody:
      "Rovo sits on the Teamwork Graph. Ask a question, and it already knows the project, the people, and the last decision — then it can act in Jira and Confluence.",
    bullets: [
      "Search across Jira, Confluence, Loom, and connected tools",
      "Chat with an agent that can update work, not just summarise it",
      "Build custom agents and automations in Studio",
    ],
    features: [
      {
        title: "It all starts with context",
        body: "When teams, work, and goals are linked, a simple prompt unlocks Rovo.",
      },
      {
        title: "Agents that take action",
        body: "Update a strategy brief, split a story, or reopen a blocked item when the plan changes.",
      },
      {
        title: "Studio for custom agents",
        body: "Team-specific agents for onboarding, reporting, or support — without a separate AI stack.",
      },
    ],
    metrics: [
      { value: "40x", label: "faster reporting" },
      { value: "100+", label: "hours saved on repetitive questions each week" },
    ],
    faqs: [
      {
        question: "Does Rovo train on our data?",
        answer:
          "In this demo, nothing leaves the browser. On the real platform, Rovo is designed to use your organisation's context under Atlassian cloud admin and data controls.",
      },
    ],
    relatedSlugs: ["jira", "confluence", "loom"],
    accent: "rovo",
  },
  {
    slug: "loom",
    name: "Loom",
    family: "Teamwork",
    tagline: "Async video that keeps work moving",
    summary:
      "Share Loom video messages and AI-powered meeting recaps so teams stay aligned without another meeting.",
    heroHeadline: "Move work forward with video",
    heroBody:
      "Record a walkthrough, drop it on a Jira work item or Confluence page, and let AI turn the conversation into next steps.",
    bullets: [
      "Record in the browser and share a link in seconds",
      "AI recaps and action items land in Jira automatically",
      "Part of the Teamwork Collection with Jira and Confluence",
    ],
    features: [
      {
        title: "Show, don't schedule",
        body: "A two-minute Loom replaces a 30-minute status call for reviews, bugs, and demos.",
      },
      {
        title: "Recaps that become work",
        body: "Meeting notes become work items, with owners and due dates already attached.",
      },
    ],
    metrics: [{ value: "4,000+", label: "meetings reclaimed in five months by one customer" }],
    faqs: [
      {
        question: "Is Loom still a standalone product?",
        answer:
          "Loom is an Atlassian app in the Teamwork Collection, and it still works as a lightweight recorder for any team.",
      },
    ],
    relatedSlugs: ["jira", "confluence", "rovo"],
    accent: "loom",
  },
  {
    slug: "jira-service-management",
    name: "Jira Service Management",
    family: "Service",
    tagline: "AI-powered service at scale",
    summary:
      "Unite IT, operations, and customer teams on a single platform to deliver service without the ticket pile-up.",
    heroHeadline: "Deliver service at high velocity",
    heroBody:
      "Requests, incidents, changes, and assets share context with the rest of the system of work — so agents and people resolve faster.",
    bullets: [
      "Portal, queues, and SLAs for IT and business service",
      "Assets and configuration items next to the incident",
      "Virtual agents that answer from Confluence knowledge",
    ],
    features: [
      {
        title: "One queue, many teams",
        body: "IT, facilities, legal, and HR run on the same service platform with their own portals.",
      },
      {
        title: "Incidents that already know the change",
        body: "Link incidents to deploys, assets, and the Jira work that caused them.",
      },
    ],
    metrics: [{ value: "100+", label: "hours saved per week on repetitive support questions" }],
    faqs: [
      {
        question: "Can JSM replace a traditional ITSM suite?",
        answer:
          "Yes for most IT and enterprise service teams. It is built for high-velocity service rather than heavyweight process for its own sake.",
      },
    ],
    relatedSlugs: ["jira", "confluence", "rovo"],
    accent: "jsm",
  },
  {
    slug: "jira-product-discovery",
    name: "Jira Product Discovery",
    family: "Product",
    tagline: "Build the right thing",
    summary:
      "Capture feedback, prioritise ideas, and create roadmaps tied to delivery in Jira.",
    heroHeadline: "Ideas connected to delivery",
    heroBody:
      "Product teams collect insights, score opportunities, and push committed work into Jira without a second system of record.",
    bullets: [
      "Feedback, ideas, and insights in one backlog",
      "Roadmaps that stay honest because they sit on Jira delivery",
      "Part of the Product Collection with Rovo",
    ],
    features: [
      {
        title: "Prioritise with evidence",
        body: "Impact, effort, and goal alignment sit on every idea — not in a slide deck.",
      },
      {
        title: "Ship without a handoff",
        body: "Promoted ideas become epics and stories the delivery team already works in.",
      },
    ],
    metrics: [{ value: "75%", label: "less time writing quarterly roadmaps" }],
    faqs: [
      {
        question: "How is JPD different from a Jira project?",
        answer:
          "Discovery is for opportunities and evidence. Delivery projects are for committed work. JPD is the bridge, not a second tracker.",
      },
    ],
    relatedSlugs: ["jira", "rovo", "confluence"],
    accent: "jpd",
  },
  {
    slug: "bitbucket",
    name: "Bitbucket",
    family: "Software",
    tagline: "Git collaboration for software teams",
    summary:
      "Collaborate on code with inline comments and pull requests. Manage Git repositories and ship with Pipelines.",
    heroHeadline: "Code, review, and ship as a team",
    heroBody:
      "Bitbucket Cloud connects pull requests to Jira work items and Pipelines so the change is never detached from the why.",
    bullets: [
      "Pull requests with Jira context in the sidebar",
      "Pipelines for CI/CD across one team or the org",
      "Part of the Software Collection with Rovo Dev and DX",
    ],
    features: [
      {
        title: "Reviews that know the ticket",
        body: "Open a PR and see the Jira work item, the design, and the last Loom — in one place.",
      },
      {
        title: "Pipelines that scale",
        body: "Orchestrate delivery for a single service or an organisation-wide path to production.",
      },
    ],
    metrics: [{ value: "1", label: "system of work from commit to customer" }],
    faqs: [
      {
        question: "Does Bitbucket work with other Git hosts?",
        answer:
          "Jira and Rovo also connect to GitHub and GitLab. Bitbucket is the first-party option when you want code on the same platform.",
      },
    ],
    relatedSlugs: ["jira", "rovo", "jira-service-management"],
    accent: "bitbucket",
  },
  {
    slug: "trello",
    name: "Trello",
    family: "Teamwork",
    tagline: "Boards that stay visual and flexible",
    summary:
      "Trello boards let any team organise projects in a fun, flexible, visual way — and still connect to Jira when work gets serious.",
    heroHeadline: "Collaborate and get more done",
    heroBody:
      "Start with a board. Add Power-Ups, Automation, and Jira when the work needs a stronger system behind it.",
    bullets: [
      "Kanban that anyone can learn in a minute",
      "Inbox, calendar, and timeline views",
      "Connect cards to Jira when delivery starts",
    ],
    features: [
      {
        title: "Visual first",
        body: "Cards, lists, and labels that make status obvious without a training course.",
      },
      {
        title: "Grow into Jira",
        body: "Graduate a board into Jira when you need plans, goals, and agents.",
      },
    ],
    metrics: [{ value: "2M+", label: "teams that started on a Trello board" }],
    faqs: [
      {
        question: "Should we use Trello or Jira?",
        answer:
          "Trello is the lightweight visual board. Jira is the system of work when you need plans, permissions, and agents. Many teams use both.",
      },
    ],
    relatedSlugs: ["jira", "confluence", "loom"],
    accent: "trello",
  },
  extraApp("focus", "Focus", "Strategy", "Connect strategy to goals, work, people, and funds."),
  extraApp("talent", "Talent", "Strategy", "Plan and assemble a future-ready workforce."),
  extraApp("jira-align", "Jira Align", "Strategy", "Align planning and delivery to strategy across the enterprise."),
  extraApp(
    "customer-service-management",
    "Customer Service Management",
    "Service",
    "AI-powered customer service with the context to improve every interaction.",
  ),
  extraApp("assets", "Assets", "Service", "See dependencies so you can troubleshoot incidents and reduce change risk."),
  extraApp("rovo-dev", "Rovo Dev", "Software", "AI-enabled productivity and quality for the software delivery lifecycle."),
  extraApp("dx", "DX", "Software", "Measure and improve productivity, quality, and speed for every software team."),
  extraApp("pipelines", "Pipelines", "Software", "Orchestrate software delivery for one team or the whole organisation."),
  extraApp("feedback", "Feedback", "Product", "Capture customer and teammate feedback next to the ideas it should change."),
];

function extraApp(
  slug: string,
  name: string,
  family: Product["family"],
  summary: string,
): Product {
  return {
    slug,
    name,
    family,
    tagline: summary,
    summary,
    heroHeadline: name,
    heroBody: summary,
    bullets: [summary],
    features: [
      { title: `Part of the ${family} Collection`, body: summary },
      { title: "On the Teamwork Graph", body: "Context from Jira, Confluence, and Rovo is available in the flow of work." },
    ],
    metrics: [{ value: family, label: "Collection" }],
    faqs: [
      {
        question: `How does ${name} fit with Jira?`,
        answer: `${name} is in the ${family} Collection and shares context with Jira through the Teamwork Graph.`,
      },
    ],
    relatedSlugs: family === "Strategy" ? ["jira", "jira-product-discovery"] : ["jira", "rovo"],
    accent: slug,
  };
}

export const RECOMMENDED_SLUGS = ["confluence", "rovo", "jira-service-management"] as const;

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function productsByFamily(family: Product["family"]): Product[] {
  return PRODUCTS.filter((product) => product.family === family);
}
