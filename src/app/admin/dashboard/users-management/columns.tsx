"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { 
  ArrowUpDown, 
  Store, 
  Edit, 
  Trash2,
  ExternalLink,
  Ban,
  CheckCircle2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Types and Components
import { Merchant } from "./data";
import StatusBadge from "./components/StatusBadge";
import UpdateUserDrawer from "./components/UpdateUserDrawer"; 
import DeleteUserModal from "./components/DeleteUserModal";
import ApproveMerchantModal from "./components/ApproveMerchantModal";

// --- Extracted Actions Component ---
// We extract this so we can safely use React hooks like useRouter and useState
const ActionsCell = ({ row }: { row: Row<Merchant> }) => {
  const router = useRouter();
  
  // Manage state for all three dialogs
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);

  return (
    <>
      {/* Direct Action Buttons Container */}
      <div className="flex items-center justify-end gap-1">
        
        {/* View Dashboard - Now navigates to the merchant's specific page */}
        <button
          title="View Dashboard"
          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          onClick={() => {
            // Adjust this route based on your actual Next.js folder structure
            router.push(`/admin/dashboard/users-management/merchants/${row.original.id}`);
          }}
        >
          <ExternalLink className="w-4 h-4" />
        </button>

        {/* Edit */}
        <button
          title="Edit Details"
          onClick={() => setIsEditOpen(true)}
          className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>

        {/* Approve Merchant (Conditional) */}
        {row.original.status === "Pending" && (
          <button
            title="Approve Merchant"
            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
            onClick={() => setIsApproveOpen(true)}
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}

        {/* Suspend Account */}
        <button
          title="Suspend Account"
          onClick={() => setIsDeleteOpen(true)}
          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <Ban className="w-4 h-4" />
        </button>
      </div>

      {/* Modals & Drawers */}
      <UpdateUserDrawer
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        userToEdit={row.original as any} 
        onSave={() => setIsEditOpen(false)}
      />

      <DeleteUserModal 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          // Add your suspend logic here
          console.log("Suspended:", row.original.id);
          setIsDeleteOpen(false);
        }}
        userName={row.original.companyName}
      />

      <ApproveMerchantModal 
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        onConfirm={() => {
          // Add your approve logic here
          console.log("Approved:", row.original.id);
          setIsApproveOpen(false);
        }}
        merchantName={row.original.companyName}
      />
    </>
  );
};

// --- Column Definitions ---
export const getColumns = (): ColumnDef<Merchant>[] => [
  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 hover:text-slate-900 transition-colors group"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Merchant / Company
        <ArrowUpDown className="h-3 w-3 text-slate-400 group-hover:text-slate-600" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-900">
          {row.original.companyName}
        </span>
        <span className="text-xs text-slate-500 uppercase tracking-wider">
          {row.original.id}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Contact Info",
    cell: ({ row }) => (
      <div className="flex flex-col text-slate-600">
        <span className="text-sm font-medium text-slate-900 leading-none mb-1">
          {row.original.name}
        </span>
        <span className="text-xs">{row.original.email}</span>
        <span className="text-[11px] text-slate-400">{row.original.contactNumber}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "totalLinksCreated",
    header: () => <div className="text-center">Links</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium text-slate-700">
        {row.getValue("totalLinksCreated")}
      </div>
    ),
  },
  {
    accessorKey: "totalRevenue",
    header: () => <div className="text-right">Total Revenue</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalRevenue"));
      const formatted = new Intl.NumberFormat("en-NP", {
        style: "currency",
        currency: "NPR",
        minimumFractionDigits: 0,
      }).format(amount);

      return (
        <div className="text-right font-bold text-slate-900 tabular-nums">
          {formatted.replace("NPR", "NPR")}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-2">Actions</div>,
    // Inject our extracted component here
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];