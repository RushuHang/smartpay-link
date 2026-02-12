"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  ArrowUpDown,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Link as LinkIcon,
  DollarSign,
  FileText
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type Payment = {
  id: string;
  batchId: string;
  contact: string;
  email: string;
  status: "Pending" | "Completed" | "Failed";
  date: string;
  amount: number;
  method: string;
};

// --- Mock Data ---
const fakeData: Payment[] = [
  { id: "PAY-8832", batchId: "B-001", contact: "John Doe", email: "john@acme.inc", status: "Pending", date: "2026-02-10", amount: 1200.00, method: "Visa ••4242" },
  { id: "PAY-8833", batchId: "B-002", contact: "Jane Smith", email: "j.smith@design.studio", status: "Completed", date: "2026-02-09", amount: 450.50, method: "Mastercard ••8821" },
  { id: "PAY-8834", batchId: "B-003", contact: "Robert Johnson", email: "finance@global.co", status: "Failed", date: "2026-02-08", amount: 3100.00, method: "Bank Transfer" },
  { id: "PAY-8835", batchId: "B-004", contact: "Alice Brown", email: "alice@tech.start", status: "Completed", date: "2026-02-07", amount: 2150.00, method: "Visa ••1122" },
  { id: "PAY-8836", batchId: "B-005", contact: "Charlie Davis", email: "billing@web.net", status: "Pending", date: "2026-02-06", amount: 900.00, method: "Amex ••3001" },
  { id: "PAY-8837", batchId: "B-006", contact: "Sarah Miller", email: "s.miller@consulting.group", status: "Completed", date: "2026-02-05", amount: 5500.00, method: "Bank Transfer" },
  { id: "PAY-8838", batchId: "B-007", contact: "David Wilson", email: "david@logistics.io", status: "Completed", date: "2026-02-05", amount: 125.00, method: "Visa ••5599" },
];

// --- Components ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Failed: "bg-rose-50 text-rose-700 border-rose-200",
  };
  
  const icon = {
    Completed: <CheckCircle2 className="w-3.5 h-3.5" />,
    Pending: <Clock className="w-3.5 h-3.5" />,
    Failed: <AlertCircle className="w-3.5 h-3.5" />,
  };

  const currentStyle = styles[status as keyof typeof styles] || "bg-slate-100 text-slate-700 border-slate-200";
  const CurrentIcon = icon[status as keyof typeof styles];

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", currentStyle)}>
      {CurrentIcon}
      {status}
    </span>
  );
};

export default function PaymentLinksTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // New State for Side Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // --- Column Definitions ---
  const columns = useMemo<ColumnDef<Payment>[]>(() => [
    {
      id: "select",
      header: ({ table }) => (
        <div className="px-1">
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-0 cursor-pointer"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-0 cursor-pointer"
          />
        </div>
      ),
      enableSorting: false,
      size: 40,
    },
    {
      accessorKey: "id",
      header: "Transaction",
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-slate-900 text-sm">{row.original.id}</span>
          <span className="text-xs text-slate-500 font-mono tracking-tight">{row.original.batchId}</span>
        </div>
      ),
    },
    {
      accessorKey: "contact",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center gap-1 hover:text-slate-900 transition-colors group"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Counterparty
            <ArrowUpDown className="h-3 w-3 text-slate-400 group-hover:text-slate-600" />
          </button>
        )
      },
      cell: ({ row }) => {
        const initials = row.original.contact.split(' ').map(n => n[0]).join('').substring(0,2);
        return (
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                {initials}
             </div>
             <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">{row.original.contact}</span>
                <span className="text-xs text-slate-500">{row.original.email}</span>
             </div>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "method",
      header: "Method",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-slate-600">
          <CreditCard className="w-3.5 h-3.5" />
          <span className="text-sm">{row.getValue("method")}</span>
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sm tabular-nums">{row.getValue("date")}</span>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-right font-medium text-slate-900 tabular-nums tracking-tight">{formatted}</div>;
      },
    },
    {
      id: "actions",
      cell: () => (
        <div className="text-right">
            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
            </button>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data: fakeData,
    columns,
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
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Payment Requests</h1>
              <p className="text-slate-500 text-sm">Manage incoming and outgoing transaction requests.</p>
          </div>
          <div className="flex gap-3">
               <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
               </button>
               <button 
                  onClick={() => setIsDrawerOpen(true)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium shadow-sm transition-all flex items-center gap-2"
               >
                  <Plus className="w-4 h-4" />
                  New Request
               </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input 
                    placeholder="Search transactions, names, or emails..."
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-transparent text-sm focus:outline-none placeholder:text-slate-400"
                />
            </div>
            <div className="h-full w-px bg-slate-200 hidden sm:block mx-2"></div>
            
            <div className="flex gap-2 p-1">
                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                        showFilters 
                            ? "bg-slate-100 text-slate-900" 
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                >
                    <Filter className="w-4 h-4" />
                    Filters
                    {columnFilters.length > 0 && (
                        <span className="ml-1 bg-indigo-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                            {columnFilters.length}
                        </span>
                    )}
                </button>
                
                {(columnFilters.length > 0 || globalFilter) && (
                     <button 
                        onClick={() => {
                            setColumnFilters([]);
                            setGlobalFilter("");
                        }}
                        className="px-3 py-1.5 text-rose-600 rounded-lg text-sm font-medium hover:bg-rose-50 transition-colors flex items-center gap-2"
                     >
                        <X className="w-4 h-4" />
                        Reset
                    </button>
                )}
            </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
            {showFilters && (
                <motion.div 
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                >
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label>
                            <select
                                value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
                                onChange={(e) => table.getColumn("status")?.setFilterValue(e.target.value)}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            >
                                <option value="">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Failed">Failed</option>
                            </select>
                        </div>
                         <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</label>
                            <input
                                placeholder="Filter by name..."
                                value={(table.getColumn("contact")?.getFilterValue() as string) ?? ""}
                                onChange={(e) => table.getColumn("contact")?.setFilterValue(e.target.value)}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                        </div>
                         <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Transaction ID</label>
                            <input
                                placeholder="e.g. PAY-8832..."
                                value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                                onChange={(e) => table.getColumn("id")?.setFilterValue(e.target.value)}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            {/* Bulk Actions */}
            <AnimatePresence>
                {Object.keys(rowSelection).length > 0 && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-indigo-50/50 border-b border-indigo-100 px-6 py-2 flex items-center justify-between"
                    >
                        <span className="text-sm text-indigo-900 font-medium flex items-center gap-2">
                           <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                            {Object.keys(rowSelection).length} payment(s) selected
                        </span>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                                Archive
                            </button>
                            <button 
                                onClick={() => setRowSelection({})}
                                className="px-3 py-1.5 bg-white border border-rose-200 rounded text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1"
                            >
                                <Trash2 className="w-3 h-3" />
                                Delete
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                            row.getIsSelected() && "bg-indigo-50/30 hover:bg-indigo-50/50"
                        )}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-6 py-4 relative">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                                <Search className="h-6 w-6 opacity-40" />
                            </div>
                            <p className="font-medium text-slate-900">No payments found</p>
                            <p className="text-sm mt-1">Try adjusting your filters or search terms.</p>
                            <button 
                                onClick={() => { setColumnFilters([]); setGlobalFilter(""); }}
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

            {/* Footer / Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/30">
                <div className="text-sm text-slate-500">
                    Showing <span className="font-medium text-slate-900">{table.getRowModel().rows.length}</span> of <span className="font-medium text-slate-900">{fakeData.length}</span> results
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
        </div>

        {/* --- DRAWER COMPONENT --- */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDrawerOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity"
              />
              
              {/* Slide-over Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Generate Payment Link</h2>
                        <p className="text-sm text-slate-500">Create a secure link for customer payment.</p>
                    </div>
                    <button 
                        onClick={() => setIsDrawerOpen(false)}
                        className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Drawer Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* Amount Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Amount</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input 
                                type="number" 
                                placeholder="0.00" 
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-medium">USD</div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Description</label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
                            <textarea 
                                placeholder="What is this payment for?" 
                                rows={3}
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                            />
                        </div>
                    </div>

                    <div className="h-px bg-slate-100 my-2"></div>

                    {/* Customer Info */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Customer Details</h3>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="customer@example.com" 
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                        </div>

                         <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Reference ID (Optional)</label>
                            <input 
                                type="text" 
                                placeholder="e.g. INV-2024-001" 
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 pt-2">
                        <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                            <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                            <div>
                                <span className="block text-sm font-medium text-slate-900">Send automatic receipt</span>
                                <span className="block text-xs text-slate-500">Email a receipt upon successful payment.</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Drawer Footer (Sticky) */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                    <button 
                        onClick={() => setIsDrawerOpen(false)}
                        className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-all flex items-center justify-center gap-2">
                        <LinkIcon className="w-4 h-4" />
                        Create Link
                    </button>
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}