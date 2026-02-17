import React from "react";
import { CheckCircle2, MapPin, Mail, Phone, FileText } from "lucide-react";
import { PaymentData } from "../../types";

export default function MerchantProfile({ data }: { data: PaymentData }) {
  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-3xl font-black text-[#0066B3]">
          {data.merchantName.charAt(0)}
        </div>
        <div>
          <h3 className="font-bold text-[#003A66] text-lg leading-tight">
            {data.merchantName}
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5">
            <CheckCircle2 size={12} className="text-[#0066B3] fill-blue-50" />
            <span className="text-xs font-bold text-[#0066B3]">
              Verified Merchant
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-slate-400 text-xs">
            <MapPin size={10} />
            <span>{data.merchantLocation}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <Mail size={14} className="text-slate-400" />
          <span>{data.merchantEmail}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <Phone size={14} className="text-slate-400" />
          <span>{data.merchantPhone}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <FileText size={14} className="text-slate-400" />
          <span className="font-mono">PAN: {data.merchantPan}</span>
        </div>
      </div>
    </div>
  );
}