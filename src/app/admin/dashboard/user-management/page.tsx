"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";

import { userData, User } from "./data";
import { getColumns } from "./columns";

// Components (Assuming you have these UI components)
import { UserPlus, Download } from "lucide-react";
import { Button } from "@/components /ui/Button"; 
import ManagementTable from "./ManagementTable"; // Custom Table wrapper

export default function UserManagementPage() {
  const [data, setData] = useState(userData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  // Logic to handle status change within the table
  const handleToggleStatus = (id: string) => {
    setData(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus: Record<string, any> = { 
          Active: "Suspended", Suspended: "Pending", Pending: "Active" 
        };
        return { ...u, status: nextStatus[u.status] };
      }
      return u;
    }));
  };

  const table = useReactTable({
    data,
    columns: getColumns(handleToggleStatus),
    state: { sorting, columnFilters, rowSelection, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 lg:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              User / Merchant Management
            </h1>
            <p className="text-slate-500 text-sm">
              Control access levels and monitor merchant activity.
            </p>
          </div>

          <div className="flex w-full md:w-auto gap-3">
            <button className="flex-1 md:flex-none justify-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <Button className="flex-1 md:flex-none justify-center">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Search & Table Wrapper */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Custom Search Input */}
          <div className="p-4 border-b border-slate-100">
            <input
              value={globalFilter ?? ""}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Search users..."
              className="w-full md:w-72 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Table Component */}
          <ManagementTable table={table} />
          
          {/* Footer / Pagination */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
            <div>{data.length} Total Users</div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => table.previousPage()} 
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                onClick={() => table.nextPage()} 
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}