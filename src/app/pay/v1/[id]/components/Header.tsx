import React from "react";
import { ShieldCheck, Lock, Globe, HelpCircle } from "lucide-react";

export default function Header({ onHelp }: { onHelp: () => void }) {
  return (
    <header className="h-16 bg-brand-navy backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-6">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#0066B3] rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <ShieldCheck size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-black text-lg text-white leading-none tracking-tight">
              Smart Link
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-bold border border-green-100">
            <ShieldCheck size={14} /> PCI-DSS COMPLIANT
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-100">
            <Lock size={12} className="text-green-600" />
            <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">
              Secure Checkout
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#003A66] bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
            <Globe size={14} /> NPR
          </div>
          <button
            onClick={onHelp}
            className="text-white hover:bg-slate-100 p-2 rounded-full transition-colors"
          >
            <HelpCircle size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}