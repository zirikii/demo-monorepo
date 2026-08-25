import type { ReactNode } from "react";
import {
  Archive,
  Calendar,
  ChevronDown,
  Code,
  FileText,
  GitBranch,
  Globe,
  Link2,
  List,
  Maximize2,
  MessageSquare,
  PanelLeft,
  Plus,
  Search,
  Settings,
  SquareKanban,
  Target,
  Zap,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AppMark } from "@/components/brand/AppMark";
import { RovoLogo } from "@/components/brand/RovoLogo";
import { AccountMenu, AppSwitcher } from "@/components/product/AppSwitcher";
import { PROJECT } from "@/data/jira";
import { useAuth } from "@/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/cn";

interface ProjectTab {
  label: string;
  icon: typeof Globe;
  to?: string;
  end?: boolean;
}

const PROJECT_TABS: ProjectTab[] = [
  { label: "Summary", icon: Globe },
  { label: "Timeline", icon: List },
  { label: "Board", icon: SquareKanban, to: "/jira", end: true },
  { label: "Calendar", icon: Calendar },
  { label: "List", icon: List, to: "/jira/backlog" },
  { label: "Forms", icon: FileText },
  { label: "Goals", icon: Target },
  { label: "Development", icon: GitBranch },
  { label: "Code", icon: Code },
  { label: "Archived work items", icon: Archive },
  { label: "Docs", icon: FileText },
];

const JIRA_NAV = [
  { label: "Board", to: "/jira", end: true },
  { label: "Backlog", to: "/jira/backlog" },
  { label: "Project settings", to: "/jira/settings" },
] as const;

const ICON_BTN =
  "focus-atl flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-surface-deep";
const TAB_BASE =
  "focus-atl flex h-10 shrink-0 items-center gap-1.5 border-b-2 px-2 text-sm font-medium whitespace-nowrap";
const TAB_IDLE = "border-transparent text-ink-soft hover:text-ink-strong";
const TAB_ACTIVE = "border-atl-blue-deep text-atl-blue-deep";

function ChromeIconButton({ label, icon: Icon }: { label: string; icon: typeof Zap }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="focus-atl flex h-8 w-8 items-center justify-center rounded-atl-sm text-ink-soft hover:bg-surface-deep"
    >
      <Icon aria-hidden className="h-4 w-4" />
    </button>
  );
}

export function JiraLayout({
  title,
  children,
  onCreate,
}: {
  title: string;
  children: ReactNode;
  onCreate?: () => void;
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  useDocumentTitle(title);

  return (
    <div className="flex min-h-screen bg-white">
      <nav
        aria-label="Jira"
        className="flex w-52 shrink-0 flex-col border-r border-line bg-surface-tint"
      >
        <Link
          to="/jira"
          className="focus-atl m-2 flex items-center gap-2 rounded-atl-sm px-2 py-2"
          aria-label="Jira"
        >
          <AppMark slug="jira" size={22} />
          <span className="text-[0.95rem] font-bold text-ink-strong">Jira</span>
        </Link>
        <ul className="flex flex-col gap-0.5 px-2">
          {JIRA_NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={"end" in item ? item.end : false}
                className={({ isActive }: { isActive: boolean }) =>
                  cn(
                    "focus-atl block rounded-atl-sm px-2 py-1.5 text-sm font-medium",
                    isActive
                      ? "bg-atl-tint text-atl-blue-deep"
                      : "text-ink-soft hover:bg-line-soft",
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center gap-1 border-b border-line bg-white px-2">
          <button type="button" aria-label="Collapse sidebar" className={ICON_BTN}>
            <PanelLeft aria-hidden className="h-4.5 w-4.5" />
          </button>
          <AppSwitcher />

          <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
            <div className="relative min-w-0 flex-1 max-w-2xl">
              <Search
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-ink-ghost"
              />
              <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="focus-atl h-8 w-full rounded-atl-lg border border-line bg-white pr-3 pl-8 text-sm text-ink placeholder:text-ink-ghost focus:border-atl-blue"
              />
            </div>
            {onCreate ? (
              <button
                type="button"
                onClick={onCreate}
                className="focus-atl flex h-8 shrink-0 items-center gap-1 rounded-atl-sm bg-atl-blue-deep px-3 text-sm font-semibold text-white hover:brightness-110"
              >
                <Plus aria-hidden className="h-4 w-4" />
                Create
              </button>
            ) : (
              <Link
                to="/jira/issues/PORTAL-142"
                className="focus-atl flex h-8 shrink-0 items-center gap-1 rounded-atl-sm bg-atl-blue-deep px-3 text-sm font-semibold text-white hover:brightness-110"
              >
                <Plus aria-hidden className="h-4 w-4" />
                Create
              </Link>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <Link
              to="/jira/rovo"
              className="focus-atl flex h-8 items-center gap-1.5 rounded-full border border-line px-3 text-sm font-semibold text-ink-strong hover:bg-surface-deep"
            >
              <RovoLogo size={16} />
              Ask Rovo
            </Link>
            <Link to="/jira/settings" aria-label="Project settings" className={ICON_BTN}>
              <Settings aria-hidden className="h-4.5 w-4.5" />
            </Link>
            <AccountMenu
              email={user?.email ?? ""}
              name={user?.name ?? "You"}
              onSignOut={() => {
                logout();
                navigate("/");
              }}
            />
          </div>
        </header>

        <div className="px-5 pt-3">
          <p className="text-xs text-ink-faint">Spaces</p>
          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-atl-sm bg-[#2684FF] text-[0.6rem] font-extrabold text-white"
              >
                {PROJECT.key.slice(0, 2)}
              </span>
              <h1 className="text-xl font-bold text-ink-strong">{PROJECT.name}</h1>
              <ChromeIconButton label="Manage access" icon={Globe} />
              <ChromeIconButton label="More project actions" icon={ChevronDown} />
            </div>
            <div className="flex items-center gap-0.5">
              <ChromeIconButton label="Share" icon={Link2} />
              <ChromeIconButton label="Automation" icon={Zap} />
              <ChromeIconButton label="Comments" icon={MessageSquare} />
              <ChromeIconButton label="Expand" icon={Maximize2} />
            </div>
          </div>

          <nav
            aria-label="Project views"
            className="mt-2 flex items-center gap-1 overflow-x-auto border-b border-line"
          >
            {PROJECT_TABS.map((tab) =>
              tab.to ? (
                <NavLink
                  key={tab.label}
                  to={tab.to}
                  end={tab.end}
                  className={({ isActive }: { isActive: boolean }) =>
                    cn(TAB_BASE, isActive ? TAB_ACTIVE : TAB_IDLE)
                  }
                >
                  <tab.icon aria-hidden className="h-4 w-4" />
                  {tab.label}
                </NavLink>
              ) : (
                <button key={tab.label} type="button" className={cn(TAB_BASE, TAB_IDLE)}>
                  <tab.icon aria-hidden className="h-4 w-4" />
                  {tab.label}
                </button>
              ),
            )}
            <button type="button" className={cn(TAB_BASE, TAB_IDLE)}>
              <Link2 aria-hidden className="h-4 w-4" />
              Shortcuts
              <ChevronDown aria-hidden className="h-3.5 w-3.5" />
            </button>
            <button type="button" aria-label="Add view" className={cn(TAB_BASE, TAB_IDLE)}>
              <Plus aria-hidden className="h-4 w-4" />
            </button>
          </nav>
        </div>

        <div className="min-h-0 flex-1 overflow-auto px-5 py-4">{children}</div>
      </div>

      <Link
        to="/jira/rovo"
        aria-label="Chat with Rovo"
        className="focus-atl fixed right-5 bottom-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-atl-navy-deep shadow-atl-lift hover:brightness-125"
      >
        <RovoLogo size={24} />
      </Link>
    </div>
  );
}
