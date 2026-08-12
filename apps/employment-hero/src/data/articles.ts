import type { Article } from "./types";

export const articles: Article[] = [
  {
    slug: "payday-super-employer-guide",
    title: "The employer's guide to Payday Super",
    category: "Payroll & Compliance",
    excerpt:
      "From 1 July 2026 superannuation must be paid at the same time as wages. Here is what changes in your pay run, and what to fix before it does.",
    author: "Priya Raman",
    authorRole: "Head of Payroll Compliance",
    publishedAt: "2026-07-28",
    readingMinutes: 8,
    audience: "businesses",
    body: [
      "Payday Super is the largest change to Australian superannuation administration in a decade. Instead of remitting contributions quarterly, employers must send superannuation guarantee payments at the same time they pay wages. The obligation is not simply to initiate the payment on payday — the money has to reach the employee's fund within seven business days.",
      "The practical consequence is that superannuation stops being a quarterly reconciliation task and becomes part of the pay run itself. If your current process involves exporting a report, checking it against a spreadsheet, and submitting a batch some weeks later, that process will not survive the transition.",
      "Start with your data. Contributions fail most often because a fund's unique superannuation identifier is wrong, a member number has a typo, or an employee has never made a choice and is sitting against a default that no longer exists. Every one of those is easy to fix in advance and expensive to fix under a seven-day clock.",
      "Next, look at the timing of your clearing house. A clearing house that batches submissions weekly cannot meet a seven-day delivery window on a weekly pay cycle. HeroClear submits per pay event rather than per batch, which is why it was rebuilt specifically for this change.",
      "Finally, think about cash flow. Quarterly superannuation has effectively been an interest-free timing benefit for employers, and it is going away. Model the change across a full quarter before it lands so the first payday under the new rules is not also the first time your finance team sees the impact.",
      "The compliance risk is real but manageable. The superannuation guarantee charge applies where contributions are late, and it is not tax deductible. Employers who clean up member data now, move to a per-event clearing house, and reforecast cash flow will find the transition uneventful.",
    ],
  },
  {
    slug: "ai-in-recruitment-strategies-ethics-limitations",
    title: "AI in recruitment: strategies, ethics and limitations",
    category: "Hiring & AI",
    excerpt:
      "AI can read a thousand applications in the time it takes to read ten. That is useful, and it is also exactly where the risk lives.",
    author: "Daniel Okafor",
    authorRole: "Director of Talent Products",
    publishedAt: "2026-06-19",
    readingMinutes: 10,
    audience: "businesses",
    body: [
      "The case for AI in recruitment is a volume argument. A mid-sized employer running a customer service intake might receive six hundred applications for four roles. No hiring manager reads six hundred applications carefully. They read forty, and the other five hundred and sixty are filtered by whoever happened to be sorting the inbox that morning.",
      "Against that baseline, a consistent automated first pass is an improvement rather than a compromise. The question is not whether a machine should read applications — something already filters them — but whether the filter is documented, consistent and reviewable.",
      "That framing sets the design constraints. A recruitment agent should score against a rubric that a person wrote and can edit. It should record why a candidate was ranked where they were. And it should never be the final decision maker on rejection, because the moment it is, a subtle bias in the rubric becomes a systematic exclusion with no human in the loop to notice.",
      "Bias deserves specific attention. Models trained on historical hiring data inherit historical hiring patterns, including the ones an organisation is actively trying to move away from. The mitigation is not to pretend the risk is absent but to test for it: run the rubric against past cohorts, look at the distribution of scores across groups, and be willing to rewrite criteria that correlate with something other than capability.",
      "There are limits worth stating plainly. AI is poor at judging career changes, at reading unusual paths, and at recognising the candidate whose best quality does not appear in text. Those are precisely the candidates a shortlist should surface rather than filter out, which is a good argument for keeping the shortlist longer than feels efficient.",
      "Used carefully, the technology buys back time at the top of the funnel and spends it at the bottom, where interviews and judgement actually happen. Used carelessly, it automates a bad process at speed.",
    ],
  },
  {
    slug: "what-is-an-employment-operating-system",
    title: "What is an Employment Operating System?",
    category: "HR & People Ops",
    excerpt:
      "HR software has spent twenty years becoming a better filing cabinet. An employment operating system is a different proposition.",
    author: "Ava Thompson",
    authorRole: "People and Culture Lead",
    publishedAt: "2026-05-30",
    readingMinutes: 6,
    audience: "businesses",
    body: [
      "Most HR platforms are systems of record. They store the contract, the leave balance and the review, and they do it reliably. What they generally do not do is act. The employee record knows a probation period ends on Thursday, and it waits patiently for a human to notice.",
      "An employment operating system inverts that. The record is still the foundation, but the platform is expected to initiate: draft the probation review, prepare the contract variation, flag the pay run anomaly, surface the candidate who matches the role you just opened.",
      "The distinction matters most in small teams, where the person responsible for HR is usually responsible for four other things as well. The failure mode is rarely a missing record. It is a record nobody looked at in time.",
      "Practically, this means three things. The data has to be unified enough that a payroll event can trigger an HR workflow. The automations have to be configurable by the people who own the process, not by a developer. And the actions have to be reversible, because a system that acts autonomously will occasionally act wrongly.",
      "It is worth being sceptical about the term itself. Plenty of vendors have relabelled the same suite. The test is simple: ask what the platform does on a Tuesday when nobody logs in. If the answer is nothing, it is a filing cabinet with a good search box.",
    ],
  },
  {
    slug: "eofy-hr-and-payroll-checklist",
    title: "EOFY HR and payroll checklist",
    category: "Payroll & Compliance",
    excerpt:
      "Finalisation, reconciliation and the handful of tasks that are much easier in May than in July.",
    author: "Priya Raman",
    authorRole: "Head of Payroll Compliance",
    publishedAt: "2026-05-12",
    readingMinutes: 7,
    audience: "businesses",
    body: [
      "End of financial year payroll work is mostly a reconciliation exercise, and reconciliation is much less painful when the underlying data was correct all year. That said, there is a short list of tasks worth working through before the last pay run of June.",
      "Start with employee details. Confirm tax file numbers, residency status, and that every employee's address and date of birth match what the ATO holds. Mismatches here are the most common cause of a finalisation being rejected.",
      "Reconcile gross wages, PAYG withholding and superannuation against your general ledger. Any variance is easier to explain in May than in a review eighteen months later. Pay particular attention to terminations — unused leave, redundancy components and employment termination payments are all reported differently.",
      "Review reportable fringe benefits and salary-sacrifice arrangements. These flow into the income statement and are frequently missed by businesses that set the arrangement up once and never revisited it.",
      "Check leave balances against entitlements, especially for employees who changed from casual to permanent during the year. The conversion changes accrual, and the change is rarely backdated correctly by hand.",
      "Finally, submit the finalisation declaration through Single Touch Payroll. Once lodged, employees see their income statement marked tax ready, and the number of individual questions your payroll inbox receives drops considerably.",
    ],
  },
  {
    slug: "hidden-cost-of-disconnected-hr-systems",
    title: "The hidden cost of disconnected HR systems",
    category: "HR & People Ops",
    excerpt:
      "Four tools that each work well can still add up to a process that does not. The cost shows up as time, not licence fees.",
    author: "Ava Thompson",
    authorRole: "People and Culture Lead",
    publishedAt: "2026-04-22",
    readingMinutes: 6,
    audience: "businesses",
    body: [
      "Ask a growing business what its HR stack costs and you will get a number made of subscriptions. Ask what it costs in hours and the number is usually larger, and nobody has ever calculated it.",
      "The pattern is familiar. Recruitment happens in one tool, contracts in another, employee records in a spreadsheet, and payroll somewhere else entirely. Each was a sensible purchase. Together they create a set of manual bridges — the export, the copy-paste, the Tuesday afternoon reconciliation — that quietly consume a day a week.",
      "Worse, every bridge is a place where data diverges. The start date in the recruitment tool is the offer date. The start date in payroll is the first day worked. Six months later, someone calculating a probation period picks whichever one they find first.",
      "The fix is not necessarily consolidation onto a single vendor, though that is the simplest version. It is making sure one system is authoritative for each fact, and that everything else reads from it rather than keeping a copy.",
      "The test worth running: pick an employee at random and trace their start date, pay rate and leave balance through every system that holds them. If the three numbers disagree anywhere, that disagreement is already costing you time you have not measured.",
    ],
  },
  {
    slug: "schads-award-changes-pay-rates",
    title: "SCHADS award changes: new pay rates and what to check",
    category: "Payroll & Compliance",
    excerpt:
      "Broken shifts, sleepovers and travel time make SCHADS one of the harder awards to interpret by hand.",
    author: "Marcus Webb",
    authorRole: "Employment Relations Adviser",
    publishedAt: "2026-04-02",
    readingMinutes: 9,
    audience: "businesses",
    body: [
      "The Social, Community, Home Care and Disability Services award covers a workforce that rarely works a standard day, which is exactly why it causes so much payroll difficulty. Broken shifts, minimum engagement periods, sleepovers and client travel each carry their own rules.",
      "Minimum engagement is the most commonly missed. A support worker rostered for one hour of client contact is generally entitled to a minimum payment regardless of the actual duration. Rosters built around client plans rather than award minimums produce underpayments without anyone intending them.",
      "Broken shift allowances apply where a shift is split across the day with an unpaid break in between. The allowance differs depending on the number of breaks, and it is separate from any travel time between clients — which is itself payable, along with a per-kilometre reimbursement.",
      "Sleepover provisions add another layer. The sleepover attracts an allowance, and any work performed during it is paid at the applicable rate on top, with minimum periods applying to each interruption.",
      "None of this is unmanageable, but it is close to impossible to do reliably in a spreadsheet across a workforce of any size. Award interpretation applied per shift, at the point the roster is built, is the difference between a compliant pay run and a back-pay project.",
    ],
  },
  {
    slug: "onboarding-that-does-not-waste-week-one",
    title: "Onboarding that does not waste week one",
    category: "HR & People Ops",
    excerpt:
      "A new starter's first week is the most attention you will ever have. Most of it gets spent on paperwork.",
    author: "Sophie Nguyen",
    authorRole: "Onboarding Specialist",
    publishedAt: "2026-03-18",
    readingMinutes: 5,
    audience: "businesses",
    body: [
      "The average new starter spends most of their first two days on administration: forms, accounts, policies, a laptop that was not ordered. It is the single least useful way to spend the period when someone is most motivated to learn.",
      "Almost all of that work can happen before day one. Tax declarations, superannuation choice, bank details, emergency contacts and policy acknowledgements are all things a new starter can complete from home the week before, given a link and ten minutes.",
      "Account provisioning is the other big win. If your identity provider is connected to your HR system, an accepted offer can create the email account, assign the licences and add the person to the right groups without anyone raising a ticket.",
      "That leaves week one for the things that actually require presence: meeting the team, understanding the work, sitting with someone who does the job well, and having a first conversation with their manager about what good looks like in ninety days.",
      "The measurable outcome is time to productivity, and it moves noticeably. The unmeasured outcome is that the new starter forms an early impression of an organisation that has its act together, which is worth more than the hours saved.",
    ],
  },
  {
    slug: "employment-law-changes-2026",
    title: "Employment law changes in 2026: key updates for employers",
    category: "Payroll & Compliance",
    excerpt:
      "Payday Super, the high income threshold, casual conversion and the changes worth diarising now.",
    author: "Marcus Webb",
    authorRole: "Employment Relations Adviser",
    publishedAt: "2026-02-11",
    readingMinutes: 11,
    audience: "businesses",
    body: [
      "Several changes land in 2026 that affect how Australian employers hire, classify and pay people. Most have transition periods, and most are easier to absorb if the work starts before the deadline rather than after it.",
      "Payday Super is the headline. From 1 July 2026, superannuation guarantee contributions must be paid at the same time as salary and wages, and must reach the fund within seven business days. This is a process change, not just a timing one.",
      "The high income threshold has moved again, which changes who can access unfair dismissal remedies and where guarantees of annual earnings can apply. Review any employment agreements written against the old figure, particularly those with set-off clauses.",
      "Casual employment definitions continue to bed down following earlier reforms. The practical obligation is to assess conversion eligibility and to keep a record of the assessment, including where conversion was declined and why.",
      "Right to disconnect provisions now apply to small business employers as well. In practice this rarely means changing what happens, but it does mean writing down what is expected — which is a conversation worth having explicitly rather than by implication.",
      "Finally, keep an eye on award rate reviews. Annual wage decisions flow through to every award-covered employee, and businesses that apply the increase late are dealing with back-pay rather than a rate change.",
    ],
  },
  {
    slug: "reading-a-payslip",
    title: "How to read your payslip",
    category: "HR & People Ops",
    excerpt:
      "Gross, net, YTD, and where your superannuation actually goes. A plain guide for employees.",
    author: "Sophie Nguyen",
    authorRole: "Onboarding Specialist",
    publishedAt: "2026-01-29",
    readingMinutes: 4,
    audience: "employees",
    body: [
      "Your payslip has more information on it than most people ever read, and understanding four numbers explains almost all of it.",
      "Gross pay is what you earned before anything is taken out. If you are paid hourly, this is your hours multiplied by your rate, plus any penalties, overtime or allowances that applied to the shifts you worked.",
      "Deductions are what comes out. PAYG withholding is income tax collected on your behalf and sent to the ATO. Other deductions might include salary sacrifice, union fees or a repayment you have agreed to.",
      "Net pay is what lands in your account. It is gross pay minus deductions, and it is the only number most people check.",
      "Superannuation sits outside all of this. It is paid by your employer on top of your wages, into your nominated fund. It should appear on the payslip as a contribution amount, and from July 2026 it must be paid at the same time as your wages rather than quarterly.",
      "Year-to-date figures show the running totals since 1 July. If something looks wrong, the year-to-date column is usually where an error first becomes obvious.",
    ],
  },
  {
    slug: "interview-questions-worth-preparing",
    title: "Five interview questions worth actually preparing",
    category: "Hiring & AI",
    excerpt:
      "Not the trick ones. The five that come up in almost every interview and reward a prepared answer.",
    author: "Daniel Okafor",
    authorRole: "Director of Talent Products",
    publishedAt: "2026-01-15",
    readingMinutes: 5,
    audience: "job-seekers",
    body: [
      "Interview preparation advice tends to focus on unusual questions, which is backwards. The questions that decide most interviews are ordinary, and candidates answer them badly because they assumed they would improvise.",
      "Tell me about yourself. This is not an invitation to recite your résumé. It is a two-minute argument for why your background points at this role. Write it out, say it aloud, and cut it in half.",
      "Why this role? The honest answer is often that you need a job, and that is fine, but it is not the whole answer. Find the specific thing about the work that you would choose if you had five offers, and lead with that.",
      "Tell me about a time something went wrong. Interviewers are listening for whether you can describe a failure without either minimising it or collapsing into it. Pick something genuinely difficult, say what you did, and say what you would do differently.",
      "What are you looking for in your next role? Answer honestly, because a mismatch discovered here is better than one discovered in month three. If you want to move into management, say so.",
      "Do you have any questions for us? Always yes. Ask about the thing you would actually want to know if you had already accepted — how decisions get made, what the last person in the role found hard, what success looks like at six months.",
    ],
  },
  {
    slug: "recognition-that-does-not-feel-hollow",
    title: "Recognition that does not feel hollow",
    category: "Culture & Engagement",
    excerpt: "Most recognition programs fail the same way. Here is the pattern, and the fix.",
    author: "Ava Thompson",
    authorRole: "People and Culture Lead",
    publishedAt: "2025-12-08",
    readingMinutes: 5,
    audience: "businesses",
    body: [
      "Recognition programs fail predictably. They launch with enthusiasm, generate a burst of activity, then settle into a monthly ritual where the same three people thank each other and everyone else ignores the notification.",
      "The usual diagnosis is that the rewards are not valuable enough. That is rarely the problem. The problem is that the recognition is not specific, and non-specific praise reads as noise regardless of what is attached to it.",
      "Compare two messages. The first says great work this week, team. The second says the migration ran over on Thursday and Jess stayed to make sure the overnight batch cleared, which is why nobody noticed on Friday. Only one of those tells anybody anything.",
      "Specificity requires that the person giving recognition actually knows what happened, which means recognition works best close to the work. Peer-to-peer beats top-down for exactly this reason.",
      "The other common failure is timing. Recognition delivered a month later, in a batch, at a meeting, has almost no effect. Delivered the same week, in the place where the team already talks, it does.",
      "Keep the mechanism light, keep it public, and resist the urge to formalise it into a process with nominations and a committee. The moment recognition requires paperwork, it stops happening.",
    ],
  },
  {
    slug: "salary-benchmarking-know-your-worth",
    title: "Salary benchmarking: how to work out what you should be paid",
    category: "Culture & Engagement",
    excerpt:
      "Advertised salary ranges are a weak signal. Here is how to build a better picture before you negotiate.",
    author: "Daniel Okafor",
    authorRole: "Director of Talent Products",
    publishedAt: "2025-11-20",
    readingMinutes: 6,
    audience: "job-seekers",
    body: [
      "Most people work out their market value from job ads, which is a bit like valuing a house from the asking prices in the window. Advertised ranges are negotiating positions, and plenty of them are wide enough to be meaningless.",
      "Better signals exist. Payslip-derived benchmarking data reflects what people are actually paid rather than what roles were advertised at, and it can be segmented by industry, location and years of experience.",
      "Adjust for the specifics. Location matters more than most candidates assume, and so does company size — the same title carries different scope at thirty people and at three thousand.",
      "Separate the components. Base salary, superannuation, bonus and equity are four different things, and comparing a total package against someone else's base will mislead you in both directions.",
      "Then decide what you are optimising for. A role paying slightly under market that moves you into the work you want is often the better financial decision over three years, because the next negotiation starts from a different position.",
      "When you do negotiate, name a number and give the reasoning behind it. A specific figure with a rationale is much harder to counter than a range, and a range is always read from the bottom.",
    ],
  },
];

export const articleCategories = [
  "HR & People Ops",
  "Payroll & Compliance",
  "Hiring & AI",
  "Culture & Engagement",
] as const;

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByAudience(audience: Article["audience"]): Article[] {
  return articles.filter((article) => article.audience === audience);
}

export function getLatestArticles(count: number): Article[] {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, count);
}
