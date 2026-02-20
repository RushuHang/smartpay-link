"use client";

import { ColumnDef } from "@tanstack/react-table";
import { 
  ArrowUpDown, 
  MoreHorizontal, 
  Eye, 
  RotateCcw, 
  Clock, 
  ExternalLink,
  Copy
} from "lucide-react";
import { Transaction } from "./data";
import StatusBadge from "./components/StatusBadge";
import { useState } from "react";

export const getTransactionColumns = (): ColumnDef<Transaction>[] => [
  {
    accessorKey: "id",
    header: "TXN ID",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-mono text-[11px] font-bold text-slate-500 uppercase">
          {row.original.id}
        </span>
        <button onClick={() => navigator.clipboard.writeText(row.original.id)}>
          <Copy className="w-3 h-3 text-slate-300 hover:text-slate-600 transition-colors" />
        </button>
      </div>
    ),
  },
  {
    accessorKey: "linkTitle",
    header: "Payment Link / Merchant",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-900 leading-none">
          {row.original.linkTitle}
        </span>
        <span className="text-[11px] text-blue-600 mt-1 font-medium hover:underline cursor-pointer">
          {row.original.merchantName}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <button
          className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="h-3 w-3" />
        </button>
      </div>
    ),
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-NP", {
        style: "currency",
        currency: "NPR",
        minimumFractionDigits: 0,
      }).format(row.original.amount);
      return (
        <div className="text-right font-bold text-slate-900 tabular-nums">
          {formatted.replace("NPR", "रू")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "paymentMethod",
    header: "Method",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-600 border border-slate-200 uppercase">
          {row.getValue("paymentMethod")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date & Time",
    cell: ({ row }) => (
      <div className="flex flex-col text-slate-500">
        <span className="text-xs font-medium text-slate-700">{row.original.createdAt.split(' ')[0]}</span>
        <span className="text-[10px]">{row.original.createdAt.split(' ')[1]}</span>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-2">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-colors">
          <Eye className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600 transition-colors">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];