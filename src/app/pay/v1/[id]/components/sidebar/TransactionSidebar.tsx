import React from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { PaymentData } from "../../types";
import MerchantProfile from "./MerchantProfile";
import PaymentBreakdown from "./PaymentBreakdown";

export default function TransactionSidebar({ data }: { data: PaymentData }) {
  return (
    <section className="lg:w-105 bg-slate-50/80 border-r border-slate-100 p-6 md:p-8 flex flex-col relative">
      <div className="absolute top-4 left-6 md:left-8 flex items-center gap-1.5 opacity-60">
        <Lock size={10} className="text-green-600" />
        <span className="text-[10px] font-mono text-green-700">
          https://pay.smartlink.com.np
        </span>
      </div>

      <div className="mt-6">
        <MerchantProfile data={data} />
      </div>

      <div className="mt-8 mb-6">
        <PaymentBreakdown data={data} />
      </div>

      <div className="mt-auto pt-6 border-t border-slate-200/60">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-2">
          <span>Transaction ID</span>
          <span className="font-mono text-slate-600">TXN-998231</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
          <ShieldCheck size={16} className="text-[#0066B3]" />
          <p className="text-[10px] text-[#003A66] leading-tight">
            Payments processed via <strong>Nepal Rastra Bank</strong> licensed
            operators. 256-bit SSL Encrypted.
          </p>
        </div>
      </div>
    </section>
  );
}