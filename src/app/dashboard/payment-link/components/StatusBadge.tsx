import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "../utils";

export default function StatusBadge({ status }: { status: string }) {
  const styles = {
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Failed: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const icons = {
    Completed: <CheckCircle2 className="w-3.5 h-3.5" />,
    Pending: <Clock className="w-3.5 h-3.5" />,
    Failed: <AlertCircle className="w-3.5 h-3.5" />,
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        styles[status as keyof typeof styles]
      )}
    >
      {icons[status as keyof typeof icons]}
      {status}
    </span>
  );
}
