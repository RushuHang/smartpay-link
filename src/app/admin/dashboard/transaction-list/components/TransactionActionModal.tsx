"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, RefreshCw, Undo2 } from "lucide-react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSuccess: boolean; // true = Refund, false = Sync
  transactionId: string;
}

export const TransactionActionModal = ({
  isOpen,
  onClose,
  isSuccess,
  transactionId,
}: ActionModalProps) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    // Implement your actual logic here
    alert(
      isSuccess 
        ? `Refund initiated for ${transactionId}! Reason: ${reason}` 
        : `Sync triggered for ${transactionId}!`
    );
    setReason(""); // Reset on close
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40"
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
              {/* Dynamic Icon */}
              <div className={`flex items-center justify-center w-12 h-12 mx-auto rounded-full mb-4 ${
                isSuccess ? "bg-amber-100" : "bg-blue-100"
              }`}>
                {isSuccess ? (
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                ) : (
                  <Info className="w-6 h-6 text-blue-600" />
                )}
              </div>

              {/* Text Content */}
              <div className="text-center whitespace-normal break-words px-4">
                <h3 className="text-lg font-bold text-slate-900">
                  {isSuccess ? "Issue Refund?" : "Sync Transaction?"}
                </h3>
                
                <div className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {isSuccess ? (
                    <>
                      Are you sure you want to refund TXN:
                      <div className="font-semibold text-slate-900 my-1">{transactionId}</div>
                      This action cannot be undone.
                    </>
                  ) : (
                    <>
                      Do you want to fetch the latest status for TXN:
                      <div className="font-semibold text-slate-900 my-1">{transactionId}</div>
                      from the gateway?
                    </>
                  )}
                </div>
              </div>

              {/* Conditional Input for Refund */}
              {isSuccess && (
                <div className="mt-6 text-left">
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                    Reason for refund
                  </label>
                  <input 
                    type="text" 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Customer requested cancellation" 
                    className="w-full text-sm border border-slate-200 rounded-xl p-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm"
                  />
                </div>
              )}
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
                onClick={handleConfirm}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors shadow-sm ${
                  isSuccess 
                    ? "bg-amber-600 hover:bg-amber-700 shadow-amber-200" 
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                }`}
              >
                {isSuccess ? (
                  <>
                    <Undo2 className="w-4 h-4" />
                    Confirm Refund
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Sync Status
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};