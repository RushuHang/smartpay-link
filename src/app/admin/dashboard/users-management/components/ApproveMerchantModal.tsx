"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Check } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  merchantName: string | undefined;
}

export default function ApproveMerchantModal({
  isOpen,
  onClose,
  onConfirm,
  merchantName,
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-0">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 "
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col"
          >
            <div className="p-6">
              {/* Icon - Changed to Emerald/Green for Approval */}
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-emerald-100 rounded-full mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>

              {/* Text Content */}
              <div className="text-center whitespace-normal break-words px-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Approve Merchant?
                </h3>
                <div className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Are you sure you want to approve merchant 
                 <div>
                    <span className="font-semibold text-slate-900">{merchantName}</span>? 
                 </div>
                 They will gain full access to the platform to start processing payments.
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 p-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                // Changed button styling to Emerald/Green
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200"
              >
                <Check className="w-4 h-4" />
                Approve
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}