import { flexRender, Table } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "../utils";
import { Payment } from "../types";

interface Props {
  table: Table<Payment>;
  columnsLength: number;
  resetFilters: () => void;
}

export default function PaymentsTable({
  table,
  columnsLength,
  resetFilters,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 border-b border-slate-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-slate-100">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn(
                  "group hover:bg-slate-50/50 transition-colors",
                  row.getIsSelected() &&
                    "bg-indigo-50/30 hover:bg-indigo-50/50"
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnsLength} className="h-64 text-center">
                <div className="flex flex-col items-center justify-center text-slate-400">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                    <Search className="h-6 w-6 opacity-40" />
                  </div>
                  <p className="font-medium text-slate-900">
                    No payments found
                  </p>
                  <p className="text-sm mt-1">
                    Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="text-indigo-600 hover:text-indigo-700 hover:underline mt-2 text-sm font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
