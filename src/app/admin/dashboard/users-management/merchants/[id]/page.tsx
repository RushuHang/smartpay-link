"use client";

import { useRouter } from "next/navigation"; // Added import
import { 
  ArrowLeft, 
  DollarSign, 
  Link as LinkIcon, 
  TrendingUp, 
  Activity, 
  Download, 
  CreditCard,
  Building2,
  Mail,
  Phone,
  Calendar
} from "lucide-react";
import StatusBadge from "../../components/StatusBadge";

// --- Dummy Data ---
const DUMMY_MERCHANT = {
  id: "MERCH-8A9B2C",
  companyName: "TechFlow Solutions Inc.",
  name: "Sarah Jenkins",
  email: "sarah.j@techflow.io",
  contactNumber: "+977 980-1234567",
  status: "Active" as const, // <--- Add 'as const' here
  joinedDate: "Oct 12, 2024",
  stats: {
    totalRevenue: 452800.50,
    totalLinksCreated: 142,
    successfulTransactions: 890,
    conversionRate: "86.4%",
  }
};

const RECENT_TRANSACTIONS = [
  { id: "TXN-1092", date: "Today, 10:42 AM", customer: "ram.sharma@email.com", amount: 12500, status: "Success" },
  { id: "TXN-1091", date: "Today, 09:15 AM", customer: "gita.thapa@email.com", amount: 4500, status: "Success" },
  { id: "TXN-1090", date: "Yesterday, 04:30 PM", customer: "hari.b@email.com", amount: 8200, status: "Failed" },
  { id: "TXN-1089", date: "Yesterday, 02:10 PM", customer: "nima.sherpa@email.com", amount: 15000, status: "Success" },
  { id: "TXN-1088", date: "Oct 24, 11:20 AM", customer: "sita.rai@email.com", amount: 3000, status: "Pending" },
];

export default function MerchantDashboard() {
  const router = useRouter(); // Initialize router
  const merchant = DUMMY_MERCHANT;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(amount).replace("NPR", "NPR ");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              className="p-2 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
              title="Go Back"
              // Updated onClick to route back to users-management
              onClick={() => router.push("/admin/dashboard/users-management")}
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {merchant.companyName}
                </h1>
                <StatusBadge status={merchant.status} />
              </div>
              <p className="text-sm text-slate-500">Merchant ID: {merchant.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-sm font-semibold text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Revenue Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-500">Total Revenue</h3>
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 tabular-nums">
              {formatCurrency(merchant.stats.totalRevenue)}
            </p>
          </div>

          {/* Links Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-500">Payment Links</h3>
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <LinkIcon className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 tabular-nums">
              {merchant.stats.totalLinksCreated}
            </p>
          </div>

          {/* Transactions Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-500">Successful Txns</h3>
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-indigo-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 tabular-nums">
              {merchant.stats.successfulTransactions}
            </p>
          </div>

          {/* Conversion Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-500">Conversion Rate</h3>
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 tabular-nums">
              {merchant.stats.conversionRate}
            </p>
          </div>
        </div>

        {/* --- Main Content Split --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="px-5 py-3 font-medium">Transaction ID</th>
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium text-right">Amount</th>
                    <th className="px-5 py-3 font-medium text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RECENT_TRANSACTIONS.map((txn) => (
                    <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 font-medium text-slate-900">{txn.id}</td>
                      <td className="px-5 py-4 text-slate-600">{txn.customer}</td>
                      <td className="px-5 py-4 text-slate-500">{txn.date}</td>
                      <td className="px-5 py-4 text-right font-semibold text-slate-900 tabular-nums">
                        {formatCurrency(txn.amount)}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                            txn.status === "Success" ? "bg-emerald-50 text-emerald-700" :
                            txn.status === "Failed" ? "bg-red-50 text-red-700" :
                            "bg-amber-50 text-amber-700"
                          }`}>
                            {txn.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Business Details Sidebar */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 h-fit">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Business Profile</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</p>
                  <p className="text-sm font-medium text-slate-900">{merchant.companyName}</p>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Primary Contact</p>
                  <p className="text-sm font-medium text-slate-900">{merchant.name}</p>
                  <p className="text-sm text-slate-600">{merchant.email}</p>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</p>
                  <p className="text-sm font-medium text-slate-900">{merchant.contactNumber}</p>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform Joined</p>
                  <p className="text-sm font-medium text-slate-900">{merchant.joinedDate}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                <Activity className="w-4 h-4" />
                View Full Audit Log
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}