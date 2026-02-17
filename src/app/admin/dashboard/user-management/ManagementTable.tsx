"use client";

import { flexRender, Table } from "@tanstack/react-table";
import { User } from "./data";
import { ChevronUp, ChevronDown, HelpCircle } from "lucide-react";

interface ManagementTableProps {
  table: Table<User>;
}

export default function ManagementTable({ table }: ManagementTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-slate-50/80 border-b border-slate-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSortable = header.column.getCanSort();
                
                return (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left font-semibold text-slate-600 uppercase tracking-wider text-[11px]"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-2 ${
                          isSortable ? "cursor-pointer select-none" : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        
                        {/* Sorting Icons */}
                        {isSortable && (
                          <div className="flex flex-col text-slate-400">
                            {{
                              asc: <ChevronUp className="w-3 h-3 text-blue-600" />,
                              desc: <ChevronDown className="w-3 h-3 text-blue-600" />,
                            }[header.column.getIsSorted() as string] ?? (
                              <ChevronDown className="w-3 h-3 opacity-30" />
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr 
                key={row.id} 
                className="hover:bg-slate-50/50 transition-all group"
              >
                {row.getVisibleCells().map((cell) => (
                  <td 
                    key={cell.id} 
                    className="px-6 py-4 whitespace-nowrap text-slate-600"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={table.getAllColumns().length} 
                className="px-6 py-12 text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <HelpCircle className="w-8 h-8 text-slate-300" />
                  <p className="text-slate-500 font-medium">No results found.</p>
                  <p className="text-slate-400 text-xs">Try adjusting your search or filters.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}