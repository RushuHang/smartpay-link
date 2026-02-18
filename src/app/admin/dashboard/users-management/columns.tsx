"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal,Store, User as UserIcon } from "lucide-react";
import { User } from "./data";
import StatusBadge from "./components/StatusBadge";


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
      const initials = row.original.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2);

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
        <span className="text-sm font-medium text-slate-900">{row.getValue("email")}</span>
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
    
    // 1. Create a simple map for your icons
    const roleMap: Record<string, React.ElementType> = {
      merchant: Store,
      user: UserIcon,
    };

    // 2. Get the icon based on the role (lowercase for safety), fallback to UserIcon
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
    cell: ({ row }) => {
      

      return (
        <div className="text-right font-medium text-slate-900 tabular-nums tracking-tight">
          {row.getValue("transactions")}
        </div>
      );
    },
  },
 {
  id: "actions",
   header: () => <div className="text-right">Action</div>,
  cell: ({ row }) => {
   



   

   

    return (
      <div className="flex justify-end gap-2 items-center">
        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    );
  },
},

];
