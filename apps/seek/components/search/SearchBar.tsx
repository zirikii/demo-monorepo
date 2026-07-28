"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, TrendingUp } from "lucide-react";
import { AU_LOCATIONS, KEYWORD_SUGGESTIONS } from "@/lib/constants/taxonomy";
import { filterKeywordSuggestions } from "@/lib/utils/suggest";
import { cn } from "@/lib/utils/cn";

interface SearchBarProps {
  defaultKeywords?: string;
  defaultLocation?: string;
  /** "hero" = large landing variant; "compact" = inline results variant. */
  variant?: "hero" | "compact";
  className?: string;
}

const LISTBOX_ID = "seek-keyword-suggestions";

export function SearchBar({
  defaultKeywords = "",
  defaultLocation = "",
  variant = "hero",
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [keywords, setKeywords] = React.useState(defaultKeywords);
  const [location, setLocation] = React.useState(defaultLocation);
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const suggestions = React.useMemo(
    () => filterKeywordSuggestions(keywords, KEYWORD_SUGGESTIONS),
    [keywords],
  );
  const showList = open && suggestions.length > 0;

  function runSearch(kw: string, loc: string) {
    const params = new URLSearchParams();
    if (kw.trim()) params.set("keywords", kw.trim());
    if (loc.trim()) params.set("location", loc.trim());
    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    runSearch(keywords, location);
  }

  function selectSuggestion(value: string) {
    setKeywords(value);
    setOpen(false);
    setActiveIndex(-1);
    runSearch(value, location);
  }

  function onKeywordKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!showList) {
        setOpen(true);
        setActiveIndex(0);
        return;
      }
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      if (!showList) return;
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      if (showList && activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        selectSuggestion(suggestions[activeIndex]!);
      }
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        setOpen(false);
        setActiveIndex(-1);
      }
    }
  }

  const big = variant === "hero";
  const activeId = activeIndex >= 0 ? `${LISTBOX_ID}-option-${activeIndex}` : undefined;

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex w-full flex-col gap-2 rounded-xl bg-white p-2 shadow-panel sm:flex-row sm:items-center",
        big ? "sm:rounded-full" : "rounded-lg",
        className,
      )}
      role="search"
      aria-label="Search jobs"
    >
      <div className="relative flex flex-1 items-center gap-2 border-line px-3 sm:border-r">
        <Search className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden="true" />
        <input
          value={keywords}
          onChange={(e) => {
            setKeywords(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeywordKeyDown}
          placeholder="Enter keywords"
          aria-label="Enter keywords"
          role="combobox"
          aria-expanded={showList}
          aria-controls={LISTBOX_ID}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          autoComplete="off"
          className={cn(
            "w-full bg-transparent text-ink placeholder:text-ink-muted focus:outline-none",
            big ? "h-12 text-base" : "h-10 text-sm",
          )}
        />

        {showList && (
          <ul
            id={LISTBOX_ID}
            role="listbox"
            aria-label="Keyword suggestions"
            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-auto rounded-lg border border-line bg-white py-1 shadow-panel"
          >
            {suggestions.map((s, i) => (
              <li
                key={s}
                id={`${LISTBOX_ID}-option-${i}`}
                role="option"
                aria-selected={i === activeIndex}
                onMouseDown={(e) => {
                  // Prevent input blur from closing the list before selection.
                  e.preventDefault();
                  selectSuggestion(s);
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm text-ink",
                  i === activeIndex
                    ? "bg-seek-pink-light text-seek-pink-dark"
                    : "hover:bg-surface-muted",
                )}
              >
                <TrendingUp className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
                <span className="truncate">{s}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-1 items-center gap-2 px-3">
        <MapPin className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden="true" />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter suburb, city, or region"
          aria-label="Enter suburb, city, or region"
          list="seek-locations"
          autoComplete="off"
          className={cn(
            "w-full bg-transparent text-ink placeholder:text-ink-muted focus:outline-none",
            big ? "h-12 text-base" : "h-10 text-sm",
          )}
        />
        <datalist id="seek-locations">
          {AU_LOCATIONS.map((loc) => (
            <option key={loc} value={loc} />
          ))}
        </datalist>
      </div>

      <button
        type="submit"
        className={cn(
          "focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-seek-pink font-semibold text-white transition-colors hover:bg-seek-pink-dark",
          big ? "h-12 px-8 text-base" : "h-10 px-6 text-sm",
        )}
      >
        <Search className="h-5 w-5" aria-hidden="true" />
        SEEK
      </button>
    </form>
  );
}
