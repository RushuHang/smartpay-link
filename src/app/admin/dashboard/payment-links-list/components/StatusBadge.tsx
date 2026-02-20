import { CheckCircle2, Clock, Ban, DollarSign } from "lucide-react";
import { cn } from "../utils";

// Export the new type so it can be used in your tables and data files
export type LinkStatus = "Active" | "Expired" | "Paid" | "Disabled";

export default function StatusBadge({ status }: { status: LinkStatus }) {
  const styles: Record<LinkStatus, string> = {
    Active: "bg-blue-50 text-blue-700 border-blue-200",
    Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Expired: "bg-amber-50 text-amber-700 border-amber-200",
    Disabled: "bg-slate-100 text-slate-600 border-slate-200",
  };

  const icons: Record<LinkStatus, React.ReactNode> = {
    Active: <CheckCircle2 className="w-3.5 h-3.5" />,
    Paid: <DollarSign className="w-3.5 h-3.5" />,
    Expired: <Clock className="w-3.5 h-3.5" />,
    Disabled: <Ban className="w-3.5 h-3.5" />,
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        styles[status]
      )}
    >
      {icons[status]}
      {status}
    </span>
  );
}