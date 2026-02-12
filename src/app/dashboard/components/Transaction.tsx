"use client";

import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

interface TransactionProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  category: string;
  date: string;
  amount: string;
  positive?: boolean;
}

export default function Transaction({
  icon,
  iconBg,
  title,
  category,
  date,
  amount,
  positive,
}: TransactionProps) {
  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(248, 250, 252, 1)" }}
      className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center shadow-sm`}>
          {icon}
        </div>
        <div>
          <p className="font-bold text-slate-800">{title}</p>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
            <span>{category}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>{date}</span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <p className={`font-bold text-base ${positive ? "text-emerald-600" : "text-slate-800"}`}>{amount}</p>
        <div className="group relative inline-block">
          <MoreHorizontal size={16} className="text-slate-300 hover:text-slate-500 ml-auto mt-1" />
        </div>
      </div>
    </motion.div>
  );
}
