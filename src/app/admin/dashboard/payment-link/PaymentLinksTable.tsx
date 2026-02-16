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

import { fakeData } from "./data";
import { getColumns } from "./columns";

import FilterBar from "./components/FilterBar";
import FilterPanel from "./components/FilterPanel";
import PaymentsTable from "./components/PaymentsTable";
import BulkActionsBar from "./components/BulkActionsBar";
import PaginationFooter from "./components/PaginationFooter";
import PaymentDrawer from "./components/PaymentDrawer";

import { Plus, Download } from "lucide-react";
import { Button } from "@/components /ui/Button";

export default function PaymentLinksTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const table = useReactTable({
    data: fakeData,
    columns: getColumns(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
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
    // Responsive padding: p-4 for mobile, lg:p-12 for desktop
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 lg:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        
        {/* 🔹 Header Section: Stacks vertically on mobile */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              Payment Requests
            </h1>
            <p className="text-slate-500 text-sm">
              Manage incoming and outgoing transaction requests.
            </p>
          </div>

          <div className="flex w-full md:w-auto gap-3">
            <button className="flex-1 md:flex-none justify-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <div className="flex-1 md:flex-none">
              <Button
                type="button"
                className="w-full justify-center"
                onClick={() => setIsDrawerOpen(true)}
              >
                <Plus className="w-4 h-4" />
                <span className="ml-2">New Request</span>
              </Button>
            </div>
          </div>
        </div>

        {/* 🔹 Filter Bar */}
        <FilterBar
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          columnFiltersLength={columnFilters.length}
          reset={() => {
            setColumnFilters([]);
            setGlobalFilter("");
          }}
        />

        {/* 🔹 Filter Panel */}
        <FilterPanel
          show={showFilters}
          table={table}
          onClose={() => setShowFilters(false)}
          reset={() => {
            setColumnFilters([]);
            setGlobalFilter("");
          }}
        />

        {/* 🔹 Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <BulkActionsBar
            selectedCount={Object.keys(rowSelection).length}
            clearSelection={() => setRowSelection({})}
          />

          <PaymentsTable
            table={table}
            columnsLength={table.getAllColumns().length}
            resetFilters={() => {
              setColumnFilters([]);
              setGlobalFilter("");
            }}
          />

          <PaginationFooter table={table} totalCount={fakeData.length} />
        </div>

        {/* 🔹 Drawer */}
        <PaymentDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </div>
    </div>
  );
}