import React from "react";
import { PaymentData } from "../../types";

export default function PaymentBreakdown({ data }: { data: PaymentData }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
        Payment Details
      </h4>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-start">
          <span className="text-slate-500 font-medium text-xs uppercase tracking-wide">
            Customer
          </span>
          <span className="font-bold text-[#003A66] text-right">
            {data.customerName}
          </span>
        </div>

        <div className="border-t border-dashed border-slate-100 my-1" />

        <div className="flex justify-between items-start">
          <span className="text-slate-500 font-medium">Description</span>
          <span className="font-medium text-slate-700 text-right max-w-37.5">
            {data.description}
          </span>
        </div>

        <div className="border-t border-dashed border-slate-200 my-2" />

        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span className="font-mono">
            {data.currency} {data.subtotal}
          </span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>VAT (13%)</span>
          <span className="font-mono">
            {data.currency} {data.vat}
          </span>
        </div>
        {data.serviceCharge !== "0" && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-mono">
              {data.currency} {data.serviceCharge}
            </span>
          </div>
        )}

        <div className="border-t border-slate-100 pt-3 mt-2 flex justify-between items-center">
          <span className="font-bold text-[#003A66]">Total Payable</span>
          <span className="font-black text-2xl text-[#0066B3] tracking-tight">
            <span className="text-sm text-slate-400 font-bold mr-1">
              {data.currency}
            </span>
            {data.amount}
          </span>
        </div>
      </div>
    </div>
  );
}