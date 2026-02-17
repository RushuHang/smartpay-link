"use client";
import React from "react";
import { AlertCircle } from "lucide-react";

export default function ExpiredState({ merchantName }: { merchantName: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-10">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 ring-4 ring-red-50">
        <AlertCircle size={32} />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">Link Expired</h3>
      <p className="text-slate-500 text-xs max-w-xs mb-6 leading-relaxed">
        For security reasons, this payment session has ended. Please request a
        new link from <strong>{merchantName}</strong>.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="text-[#0066B3] font-bold text-sm hover:underline flex items-center gap-1"
      >
        Check Status
      </button>
    </div>
  );
}