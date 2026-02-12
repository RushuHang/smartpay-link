"use client";

import { motion } from "framer-motion";
import BalanceCard from "./components/BalanceCard";
import Transaction from "./components/Transaction";
import SideWidget from "./components/SideWidget";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
};

export default function DashboardPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-6xl mx-auto space-y-8">
      <motion.div variants={itemVariants} className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, here's your financial summary.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-700 shadow-sm transition-all">
          Download Report
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BalanceCard title="Total Balance" amount="$24,580.00" change="2.4%" trend="up" data={[40, 35, 50, 60, 75, 65, 80]} />
        <BalanceCard title="Total Income" amount="$8,420.00" change="5.1%" trend="up" data={[20, 40, 30, 50, 45, 60, 70]} />
        <BalanceCard title="Total Expenses" amount="$3,210.00" change="1.8%" trend="down" data={[50, 45, 40, 35, 40, 30, 25]} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transactions */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Recent Transactions</h2>
            <button className="text-sm text-brand-primary font-semibold hover:text-brand-navy transition-colors">View All</button>
          </div>

          <div className="p-2">
            <Transaction title="Netflix Subscription" category="Entertainment" date="Oct 12, 2025" amount="- $19.99" positive={false} icon={<></>} iconBg="bg-rose-50" />
            <Transaction title="Salary Payment" category="Income" date="Oct 10, 2025" amount="+ $3,500.00" positive icon={<></>} iconBg="bg-blue-50" />
            <Transaction title="Apple Store" category="Electronics" date="Oct 08, 2025" amount="- $1,299.00" positive={false} icon={<></>} iconBg="bg-orange-50" />
            <Transaction title="Stripe Transfer" category="Business" date="Oct 05, 2025" amount="+ $850.00" positive icon={<></>} iconBg="bg-emerald-50" />
          </div>
        </motion.div>

        <SideWidget />
      </div>
    </motion.div>
  );
}
