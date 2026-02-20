"use client";

import { ColumnDef } from "@tanstack/react-table";
import { 
  ArrowUpDown, 
  MoreHorizontal, 
  Link as LinkIcon, 
  Eye, 
  ToggleLeft, 
  ToggleRight,
  BarChart3,
  Calendar
} from "lucide-react";
import { PaymentLink } from "./data";
import StatusBadge from "./components/StatusBadge";

export const getLinkColumns = (): ColumnDef<PaymentLink>[] => [
  {
    accessorKey: "linkName",
    header: "Link Details",
    cell: ({ row }) => (
      <div className="flex items-start gap-3">
        <div className="mt-1 p-2 bg-slate-100 rounded-md">
          <LinkIcon className="w-4 h-4 text-slate-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-900 leading-none">
            {row.original.linkName}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 line-clamp-1 max-w-[200px]">
            {row.original.description}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "merchantName",
    header: "Merchant",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-blue-600">
        {row.original.merchantName}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-NP", {
        style: "currency",
        currency: "NPR",
        minimumFractionDigits: 0,
      }).format(row.original.amount);
      return <div className="font-bold text-slate-900">{formatted.replace("NPR", "रू")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "performance",
    header: "Performance",
    cell: ({ row }) => {
      const conversion = row.original.views > 0 
        ? ((row.original.paymentsReceived / row.original.views) * 100).toFixed(1)
        : 0;
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1"><Eye className="w-3 h-3"/> {row.original.views}</span>
            <span className="flex items-center gap-1 font-bold text-slate-700">🛒 {row.original.paymentsReceived}</span>
          </div>
          <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${Math.min(Number(conversion), 100)}%` }} />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
        <Calendar className="w-3 h-3" />
        {row.original.expiryDate}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600 transition-colors" title="Performance Stats">
          <BarChart3 className="w-4 h-4" />
        </button>
        <button 
          className={`p-1.5 rounded transition-colors ${row.original.status === 'Disabled' ? 'text-slate-300 hover:text-emerald-600' : 'text-slate-400 hover:text-red-600'}`}
          title={row.original.status === 'Disabled' ? "Enable Link" : "Disable Link"}
        >
          {row.original.status === 'Disabled' ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
        </button>
      </div>
    ),
  },
];