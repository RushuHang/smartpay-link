"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Payment } from "../types";
import { Button } from "@/src/components /ui/Button";

interface Props {
  show: boolean;
  table: Table<Payment>;
  onClose: () => void;
  reset: () => void;
}

export default function FilterPanel({ show, table, onClose, reset }: Props) {
  const handleReset = () => {
    table.resetColumnFilters();
    reset();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                Advanced Filters
              </h3>

              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                  Status
                </label>

                <select
                  value={
                    (table.getColumn("status")?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(e) =>
                    table
                      .getColumn("status")
                      ?.setFilterValue(e.target.value || undefined)
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              {/* Date Filter */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                  Date
                </label>

                <input
                  type="date"
                  value={
                    (table.getColumn("date")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(e) =>
                    table
                      .getColumn("date")
                      ?.setFilterValue(e.target.value || undefined)
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
              >
                Reset Filters
              </button>

              <Button onClick={onClose}>Apply</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
