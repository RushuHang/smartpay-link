import { CheckCircle2, Clock, Ban } from "lucide-react";
import { cn } from "../utils";

type StatusType = "Active" | "Suspended" | "Pending";

export default function StatusBadge({ status }: { status: StatusType }) {
  const styles: Record<StatusType, string> = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Suspended: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const icons: Record<StatusType, React.ReactNode> = {
    Active: <CheckCircle2 className="w-3.5 h-3.5" />,
    Pending: <Clock className="w-3.5 h-3.5" />,
    Suspended: <Ban className="w-3.5 h-3.5" />,
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