"use client";

import { ColumnDef } from "@tanstack/react-table";
import { 
  ArrowUpDown, 
  MoreHorizontal, 
  Store, 
  User as UserIcon, 
  Edit, 
  Trash2 
} from "lucide-react";
import { User } from "./data";
import StatusBadge from "./components/StatusBadge";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import UpdateUserDrawer from "./components/UpdateUserDrawer"; 
import DeleteUserModal from "./components/DeleteUserModal"; // 1. Import Modal

export const getColumns = (): ColumnDef<User>[] => [
  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-slate-900 text-sm">
          {row.original.id}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 hover:text-slate-900 transition-colors group"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="h-3 w-3 text-slate-400 group-hover:text-slate-600" />
      </button>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900">
              {row.original.name}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "email",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-slate-600">
        <span className="text-sm font-medium text-slate-900">
          {row.getValue("email")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "role",
    header: "role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      const roleMap: Record<string, React.ElementType> = {
        merchant: Store,
        user: UserIcon,
      };
      const Icon = roleMap[role.toLowerCase()] || UserIcon;

      return (
        <div className="flex items-center gap-2 text-slate-600">
          <Icon className="w-3.5 h-3.5" />
          <span className="text-sm capitalize">{role}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "transactions",
    header: () => <div className="text-right">transactions</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium text-slate-900 tabular-nums tracking-tight">
        {row.getValue("transactions")}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const [isEditOpen, setIsEditOpen] = useState(false);
      // 2. Add Delete State
      const [isDeleteOpen, setIsDeleteOpen] = useState(false);
      
      const dropdownRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
          ) {
            setDropdownOpen(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

      const handleSaveUser = (updatedUser: User) => {
        console.log("Saving user:", updatedUser);
        setIsEditOpen(false);
      };

      const handleDeleteUser = () => {
        console.log("Deleting user ID:", row.original.id);
        // Call API to delete
        setIsDeleteOpen(false);
      };

      return (
        <>
          <div className="flex justify-end relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`p-1.5 rounded-md transition-all duration-200 ${
                dropdownOpen 
                  ? "bg-slate-100 text-slate-900" 
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
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
                  transition={{ duration: 0.1 }}
                  className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-xl z-30 overflow-hidden origin-top-right"
                >
                  <div className="py-1">
                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left"
                      onClick={() => {
                        setDropdownOpen(false);
                        setIsEditOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4 text-slate-400" />
                      Edit
                    </button>
                    
                    <div className="h-px bg-slate-100 my-1" />
                    
                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors text-left group"
                      onClick={() => {
                        setDropdownOpen(false);
                        setIsDeleteOpen(true); // 3. Open Delete Modal
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <UpdateUserDrawer
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            userToEdit={row.original}
            onSave={handleSaveUser}
          />

          {/* 4. Render Delete Modal */}
          <DeleteUserModal 
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={handleDeleteUser}
            userName={row.original.name}
          />
        </>
      );
    },
  },
];