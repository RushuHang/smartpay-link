// components/LinkAnalyticsModal.tsx
"use client";

import { useState } from "react";
import { BarChart3, X, Eye, ShoppingCart, TrendingUp } from "lucide-react";
import { PaymentLink } from "./data"; // Adjust path as needed

export default function LinkAnalyticsModal({ link }: { link: PaymentLink }) {
  const [isOpen, setIsOpen] = useState(false);

  const conversion = link.views > 0 
    ? ((link.paymentsReceived / link.views) * 100).toFixed(1)
    : "0.0";

  const formattedAmount = new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    minimumFractionDigits: 0,
  }).format(link.amount).replace("NPR", "NPR");

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600 transition-colors" 
        title="View Performance Stats"
      >
        <BarChart3 className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b bg-brand-navy border-slate-100">
              <div>
                <h3 className="text-lg font-semibold text-white">Link Performance</h3>
                <p className="text-xs text-white">{link.linkName} • {link.merchantName}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 text-slate-400 rounded-md hover:bg-white/2">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 mb-2"><Eye className="w-4 h-4"/> Views</div>
                  <div className="text-2xl font-bold text-slate-900">{link.views}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 mb-2"><ShoppingCart className="w-4 h-4"/> Payments</div>
                  <div className="text-2xl font-bold text-slate-900">{link.paymentsReceived}</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-600 mb-2"><TrendingUp className="w-4 h-4"/> Conversion</div>
                  <div className="text-2xl font-bold text-blue-700">{conversion}%</div>
                </div>
              </div>

              <div className="h-48 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 text-sm">
                {/* Drop your Recharts or Chart.js component here */}
                [Time-Series Chart Placeholder for {formattedAmount} Volume]
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}