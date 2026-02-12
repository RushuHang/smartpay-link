"use client";

import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import PaymentForm from "./PaymentForm";

export default function PaymentPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 font-sans selection:bg-brand-primary selection:text-white">
      <div className="w-full flex flex-col relative bg-white">
        <div className="lg:hidden p-6 pb-0 flex justify-between items-center">
          <div className="flex items-center gap-2 text-brand-navy">
            <ShieldCheck className="w-6 h-6" />
            <span className="font-bold text-lg">Smart Link</span>
          </div>
          <div className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">SECURE</div>
        </div>

        {/* Main Form Container */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-md space-y-6"
          >
            <PaymentForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
