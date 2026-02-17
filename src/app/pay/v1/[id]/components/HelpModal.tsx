import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, X, MessageCircle, Phone } from "lucide-react";

export default function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X size={20} />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#E6F2FF] rounded-full flex items-center justify-center text-[#0066B3]">
            <HelpCircle size={20} />
          </div>
          <h3 className="font-bold text-[#003A66] text-lg">Need Help?</h3>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-[#E6F2FF] hover:border-[#0066B3] transition-all group">
            <MessageCircle size={20} className="text-green-600" />
            <div className="text-left">
              <h4 className="font-bold text-sm text-slate-700">
                WhatsApp Support
              </h4>
              <p className="text-[10px] text-slate-400">
                Average wait time: 5 mins
              </p>
            </div>
          </button>
          <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-[#E6F2FF] hover:border-[#0066B3] transition-all group">
            <Phone size={20} className="text-blue-600" />
            <div className="text-left">
              <h4 className="font-bold text-sm text-slate-700">Call Support</h4>
              <p className="text-[10px] text-slate-400">+977-1-4XXXXXX</p>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}