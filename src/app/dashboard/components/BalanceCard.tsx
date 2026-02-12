"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface BalanceCardProps {
  title: string;
  amount: string;
  change: string;
  trend: "up" | "down";
  data: number[];
}

export default function BalanceCard({ title, amount, change, trend, data }: BalanceCardProps) {
  const isPositive = trend === "up";
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((val - min) / (max - min)) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <motion.div
      className="relative bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">{amount}</h3>
        </div>
        <div
          className={`p-2 rounded-full ${
            isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          }`}
        >
          {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`flex items-center text-sm font-bold ${
            isPositive ? "text-green-600" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : "-"}
          {change}
          <span className="text-slate-400 font-normal ml-1">vs last month</span>
        </span>
        <div className="w-24 h-10 opacity-70 group-hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
            <path
              d={`M ${points}`}
              fill="none"
              stroke={isPositive ? "#16a34a" : "#dc2626"}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
