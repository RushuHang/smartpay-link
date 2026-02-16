import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Payment } from "../types";

interface Props {
  table: Table<Payment>;
  totalCount: number;
}

export default function PaginationFooter({ table, totalCount }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-6 py-4 border-t border-slate-200 bg-slate-50/30">
      <div className="text-sm text-slate-500 text-center sm:text-left">
        Showing{" "}
        <span className="font-medium text-slate-900">
          {table.getRowModel().rows.length}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-900">{totalCount}</span>{" "}
        results
      </div>

      <div className="flex items-center gap-2">
        <button
          className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}