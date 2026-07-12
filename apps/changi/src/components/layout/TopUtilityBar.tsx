import { Link } from "react-router-dom";
import { Globe, Search, User } from "lucide-react";
import { company } from "@/data/company";

/** Slim utility strip above the main header (region, search, member login). */
export function TopUtilityBar() {
  return (
    <div className="hidden bg-plum text-white/90 lg:block">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-end gap-6 px-6 text-xs font-medium">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 hover:text-white"
          aria-label="Change region and language"
        >
          <Globe className="size-3.5" aria-hidden />
          {company.region}
        </button>
        <Link to="/help" className="inline-flex items-center gap-1.5 hover:text-white">
          <Search className="size-3.5" aria-hidden />
          Search
        </Link>
        <Link to="/rewards" className="inline-flex items-center gap-1.5 hover:text-white">
          <User className="size-3.5" aria-hidden />
          Changi Rewards Login
        </Link>
      </div>
    </div>
  );
}
