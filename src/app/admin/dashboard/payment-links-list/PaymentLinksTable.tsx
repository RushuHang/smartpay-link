"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { paymentLinkData } from "./data";
import { getLinkColumns } from "./columns";

import FilterBar from "./components/FilterBar";
import PaymentsTable from "./components/PaymentsTable";
import PaginationFooter from "./components/PaginationFooter";

import { Link2, AlertTriangle, CheckCircle } from "lucide-react";

export default function PaymentLinksPage() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: paymentLinkData,
    columns: getLinkColumns(),
    state: { sorting, columnFilters, globalFilter },
    // onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Payment Links</h1>
            <p className="text-slate-500 text-sm">Control and monitor all active payment requests.</p>
          </div>
          <div className="flex gap-4 mb-1">
             <div className="text-right">
               <p className="text-[10px] font-bold text-slate-400 uppercase">Active Links</p>
               <p className="text-lg font-bold text-emerald-600">84</p>
             </div>
             <div className="text-right border-l pl-4">
               <p className="text-[10px] font-bold text-slate-400 uppercase">Expired/Disabled</p>
               <p className="text-lg font-bold text-slate-400">12</p>
             </div>
          </div>
        </div>

        <FilterBar
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          showFilters={false}
          setShowFilters={() => {}}
          columnFiltersLength={columnFilters.length}
          reset={() => setColumnFilters([])}
        />

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <PaymentsTable
            table={table}
            columnsLength={table.getAllColumns().length}
            resetFilters={() => setColumnFilters([])}
          />
          <PaginationFooter table={table} totalCount={paymentLinkData.length} />
        </div>

        {/* Proactive Warning Area */}
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900">Link Expiry Notice</p>
            <p className="text-xs text-amber-700 mt-1">
              There are 5 links expiring in the next 48 hours. Merchants have been notified via automated email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}