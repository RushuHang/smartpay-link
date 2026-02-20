"use client";

import { ColumnDef } from "@tanstack/react-table";
import { 
  ArrowUpDown, 
  MoreHorizontal, 
  Store, 
  Edit, 
  Trash2,
  ExternalLink,
  Ban,
  CheckCircle2
} from "lucide-react";
import { Merchant } from "./data";
import StatusBadge from "./components/StatusBadge";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import UpdateUserDrawer from "./components/UpdateUserDrawer"; 
import DeleteUserModal from "./components/DeleteUserModal";

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
    cell: ({ row }) => {
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const [isEditOpen, setIsEditOpen] = useState(false);
      const [isDeleteOpen, setIsDeleteOpen] = useState(false);
      
      const dropdownRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      return (
        <>
          <div className="flex justify-end relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`p-1.5 rounded-md transition-all ${
                dropdownOpen ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl z-30 border border-slate-100 overflow-hidden origin-top-right"
                >
                  <div className="py-1">
                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      onClick={() => { setDropdownOpen(false); /* Logic to view details */ }}
                    >
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                      View Dashboard
                    </button>
                    
                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      onClick={() => { setDropdownOpen(false); setIsEditOpen(true); }}
                    >
                      <Edit className="w-4 h-4 text-slate-400" />
                      Edit Details
                    </button>

                    <div className="h-px bg-slate-100 my-1" />
                    
                    {row.original.status === "Pending" && (
                      <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                        Approve Merchant
                      </button>
                    )}

                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      onClick={() => { setDropdownOpen(false); setIsDeleteOpen(true); }}
                    >
                      <Ban className="w-4 h-4" />
                      Suspend Account
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <UpdateUserDrawer
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            userToEdit={row.original as any} // Cast temporarily if types mismatch
            onSave={() => setIsEditOpen(false)}
          />

          <DeleteUserModal 
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={() => setIsDeleteOpen(false)}
            userName={row.original.companyName}
          />
        </>
      );
    },
  },
];