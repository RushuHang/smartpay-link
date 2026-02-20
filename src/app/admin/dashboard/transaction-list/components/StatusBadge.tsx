import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { cn } from "../utils";

export type TransactionStatus = "Paid" | "Pending" | "Failed";

export default function StatusBadge({ status }: { status: TransactionStatus }) {
  const styles: Record<TransactionStatus, string> = {
    Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Failed: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const icons: Record<TransactionStatus, React.ReactNode> = {
    Paid: <CheckCircle2 className="w-3.5 h-3.5" />,
    Pending: <Clock className="w-3.5 h-3.5" />,
    Failed: <XCircle className="w-3.5 h-3.5" />,
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