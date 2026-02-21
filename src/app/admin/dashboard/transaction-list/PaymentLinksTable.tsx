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

import { transactionData } from "./data";
import { getTransactionColumns } from "./columns";

import FilterBar from "./components/FilterBar";
import FilterPanel from "./components/FilterPanel";
import PaymentsTable from "./components/PaymentsTable";
import PaginationFooter from "./components/PaginationFooter";

import { Download, CreditCard, Activity, CheckCircle2 } from "lucide-react";
import { Button } from "@/components /ui/Button";

export default function TransactionsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const table = useReactTable({
    data: transactionData,
    columns: getTransactionColumns(),
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header with KPI Cards */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Transactions</h1>
            <p className="text-slate-500 text-sm">Real-time monitor for all platform payments.</p>
          </div>
          
          <div className="flex gap-3">
             <Button variant="outline" className="bg-white">
               <Download className="w-4 h-4 mr-2" /> Export CSV
             </Button>
          </div>
        </div>

        {/* Mini Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard title="Total Volume" value="NPR 1,24,500" icon={<Activity className="text-blue-600"/>} />
          <SummaryCard title="Success Rate" value="98.2%" icon={<CheckCircle2 className="text-emerald-600"/>} />
          <SummaryCard title="Active Links" value="142" icon={<CreditCard className="text-purple-600"/>} />
        </div>

        {/* Table Section */}
        <div className="space-y-4">
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

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <PaymentsTable
              table={table}
              columnsLength={table.getAllColumns().length}
              resetFilters={() => {
                setColumnFilters([]);
                setGlobalFilter("");
              }}
            />
            <PaginationFooter table={table} totalCount={transactionData.length} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
        <p className="text-xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
      <div className="h-10 w-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
        {icon}
      </div>
    </div>
  );
}