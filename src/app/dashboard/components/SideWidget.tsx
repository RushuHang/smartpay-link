"use client";

import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

export default function SideWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-brand-navy rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[300px]"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary blur-[60px] opacity-50 rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
          <CreditCard className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-1">Your Cards</h3>
        <p className="text-blue-200 text-sm">Manage your daily limits.</p>
      </div>

      <div className="relative z-10 mt-8">
        <div className="flex justify-between text-sm mb-2 text-blue-100">
          <span>Spent</span>
          <span>$1,200 / $5,000</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "24%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-400 to-brand-primary"
          />
        </div>
      </div>

      <button className="mt-6 w-full py-3 bg-white text-brand-navy font-bold rounded-xl hover:bg-blue-50 transition-colors">
        View Cards
      </button>
    </motion.div>
  );
}
