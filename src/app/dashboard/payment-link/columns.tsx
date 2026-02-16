"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CreditCard, Calendar, MoreHorizontal,Copy,Check } from "lucide-react";
import { Payment } from "./types";
import StatusBadge from "./components/StatusBadge";
import { Button } from "@/components /ui/Button";
import { useState } from "react";

export const getColumns = (): ColumnDef<Payment>[] => [
  {
    accessorKey: "id",
    header: "Transaction",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-slate-900 text-sm">
          {row.original.id}
        </span>
        <span className="text-xs text-slate-500 font-mono tracking-tight">
          {row.original.batchId}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 hover:text-slate-900 transition-colors group"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Counterparty
        <ArrowUpDown className="h-3 w-3 text-slate-400 group-hover:text-slate-600" />
      </button>
    ),
    cell: ({ row }) => {
      const initials = row.original.contact
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2);

      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
            {initials}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900">
              {row.original.contact}
            </span>
            <span className="text-xs text-slate-500">
              {row.original.email}
            </span>
          </div>
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
        currency: "NPR",
      }).format(amount);

      return (
        <div className="text-right font-medium text-slate-900 tabular-nums tracking-tight">
          {formatted}
        </div>
      );
    },
  },
 {
  id: "actions",
  cell: ({ row }) => {
    const status = row.getValue("status");
    const paymentUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/pay/v1/79a0c671-54b0-4ae2-9ada-757e65fafa4e`;


    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(paymentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // revert after 2s
    };

    return (
      <div className="flex justify-end gap-2 items-center">
        {status === "Active" && (
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors relative"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        )}
        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    );
  },
},

];
