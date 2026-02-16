"use client";

import { Search, Filter, X } from "lucide-react";
import { cn } from "../utils";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components /ui/Button";

interface Props {
  globalFilter: string;
  setGlobalFilter: Dispatch<SetStateAction<string>>;
  showFilters: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  columnFiltersLength: number;
  reset: () => void;
}

export default function FilterBar({
  globalFilter,
  setGlobalFilter,
  showFilters,
  setShowFilters,
  columnFiltersLength,
  reset,
}: Props) {
  const hasFilters = columnFiltersLength > 0 || !!globalFilter;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-3 py-3 md:py-2 flex flex-col sm:flex-row sm:items-center gap-3">
      {/* 🔎 Search Input - Full width on mobile */}
      <div className="relative w-full sm:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />

        <input
          placeholder="Search transactions..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full pl-10 pr-10 py-2 text-sm bg-slate-50 border border-transparent rounded-lg 
                     focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 
                     outline-none transition-all placeholder:text-slate-400"
        />

        {globalFilter && (
          <button
            onClick={() => setGlobalFilter("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 🔘 Actions - Row on mobile, auto width */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          className={cn(
            "flex-1 sm:flex-none justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
            showFilters
              ? "bg-brand-primary text-white shadow-sm"
              : "bg-brand-light text-brand-primary hover:bg-brand-light/20",
          )}
        >
          <Filter className="w-4 h-4" />
          Filters
          {columnFiltersLength > 0 && (
            <span className="ml-1 bg-white text-brand-primary text-[10px] min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full font-bold">
              {columnFiltersLength}
            </span>
          )}
        </Button>

        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className="flex-1 sm:flex-none justify-center px-3 py-2 text-sm font-medium text-rose-600 rounded-lg hover:bg-rose-50 transition flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}