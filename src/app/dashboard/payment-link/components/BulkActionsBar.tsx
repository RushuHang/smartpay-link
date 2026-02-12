"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Trash2 } from "lucide-react";

interface Props {
  selectedCount: number;
  clearSelection: () => void;
}

export default function BulkActionsBar({
  selectedCount,
  clearSelection,
}: Props) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-indigo-50/50 border-b border-indigo-100 px-6 py-3 flex items-center justify-between"
        >
          <span className="text-sm text-indigo-900 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            {selectedCount} payment(s) selected
          </span>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Archive
            </button>

            <button
              onClick={clearSelection}
              className="px-3 py-1.5 bg-white border border-rose-200 rounded text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
