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

import { merchantData } from "./data";
import { getColumns } from "./columns"; // Ensure columns.ts is updated to match Merchant interface

import FilterBar from "./components/FilterBar";
import FilterPanel from "./components/FilterPanel";
import PaymentsTable from "./components/PaymentsTable"; // Rename to MerchantTable later if desired
import BulkActionsBar from "./components/BulkActionsBar";
import PaginationFooter from "./components/PaginationFooter";
import MerchantDrawer from "./components/UserDrawer"; // Rename for clarity

import { Plus, LayoutGrid } from "lucide-react";
import { Button } from "@/components /ui/Button";

export default function MerchantManagementTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const table = useReactTable({
    data: merchantData,
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
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 lg:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              Merchant Management
            </h1>
            <p className="text-slate-500 text-sm">
              Manage businesses creating payment links and monitor their revenue.
            </p>
          </div>

          <div className="flex w-full md:w-auto gap-3">
            <div className="flex-1 md:flex-none">
              <Button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span>Onboard Merchant</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
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

        {/* Filter Panel */}
        <FilterPanel
          show={showFilters}
          table={table}
          onClose={() => setShowFilters(false)}
          reset={() => {
            setColumnFilters([]);
            setGlobalFilter("");
          }}
        />

        {/* Table Container */}
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

          <PaginationFooter table={table} totalCount={merchantData.length} />
        </div>

        {/* Drawer Component */}
        <MerchantDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </div>
    </div>
  );
}