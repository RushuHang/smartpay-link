import { ColumnDef } from "@tanstack/react-table";
import { User } from "./data";
import { MoreHorizontal } from "lucide-react";

export const getColumns = (toggleStatus: (id: string) => void): ColumnDef<User>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium text-slate-900">{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        row.original.role === 'Merchant' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
      }`}>
        {row.original.role}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const colors = {
        Active: "bg-green-50 text-green-700 border-green-200",
        Suspended: "bg-red-50 text-red-700 border-red-200",
        Pending: "bg-amber-50 text-amber-700 border-amber-200",
      };
      return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${colors[status]}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "transactions",
    header: () => <div className="text-center">Transactions</div>,
    cell: ({ row }) => <div className="text-center font-mono">{row.original.transactions}</div>,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <button 
          onClick={() => toggleStatus(row.original.id)}
          className="text-xs font-semibold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md transition-colors"
        >
          Toggle Status
        </button>
      </div>
    ),
  },
];