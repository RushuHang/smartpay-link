"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string | undefined;
}

export default function DeleteUserModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        // z-[9999] ensures it sits on top of everything
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-0">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
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
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>

              {/* Text Content - FIXED HERE */}
              {/* whitespace-normal: Forces text to wrap */}
              {/* break-words: Breaks long words if necessary */}
              <div className="text-center whitespace-normal wrap-break-word px-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Delete User?
                </h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Are you sure you want to delete 
                 <div>
                    <span className="font-semibold text-slate-900">{userName}</span>? 
                  This action cannot be undone.
                 </div>
                  
                </p>
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
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors shadow-sm shadow-red-200"
              >
                <Trash2 className="w-4 h-4" />
                Delete User
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}