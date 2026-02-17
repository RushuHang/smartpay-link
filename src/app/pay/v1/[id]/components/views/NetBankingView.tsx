"use client";

import React, { useState } from "react";
import { Search, CheckCircle2, ChevronRight } from "lucide-react";

// Added 'logo' property to the type definition implicitly by including it in the array
const BANKS = [
  { 
    id: "nabil", 
    name: "Nabil Bank", 
    logo: "/images/banks/nabil.jpg", // Image added here
    color: "bg-green-600" 
  },
  { id: "nicasia", name: "NIC Asia Bank", logo: "/images/banks/nic.png",color: "bg-red-600" },
  { id: "global", name: "Global IME Bank",logo: "/images/banks/global.jpg", color: "bg-red-700" },
  { id: "himalayan", name: "Himalayan Bank", logo: "/images/banks/himalayan.jpeg",color: "bg-blue-800" },
  { id: "laxmi", name: "Laxmi Sunrise",logo :"/images/banks/laxmi.png" ,color: "bg-orange-500" },
  { id: "prabhu", name: "Prabhu Bank",logo :"/images/banks/prabhu.jpg" , color: "bg-red-500" },
  { id: "siddhartha", name: "Siddhartha Bank",logo :"/images/banks/siddhartha.jpeg", color: "bg-yellow-600" },
  { id: "sanima", name: "Sanima Bank",logo :"/images/banks/sanima.png", color: "bg-teal-600" },
  { id: "everest", name: "Everest Bank",logo :"/images/banks/everest.jpg", color: "bg-red-600" },
  { id: "nmb", name: "NMB Bank",logo :"/images/banks/nmb.png", color: "bg-blue-600" },
];

export default function NetBankingView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const filteredBanks = BANKS.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="relative mb-4">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Search size={16} />
        </div>
        <input
          type="text"
          placeholder="Search your bank..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#0066B3] focus:ring-4 focus:ring-blue-50 transition-all"
        />
      </div>

      <div className="flex-1 overflow-y-auto min-h-[300px] pr-1">
        <div className="grid grid-cols-2 gap-3">
          {filteredBanks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => setSelectedBank(bank.id)}
              className={`p-3 rounded-xl border flex flex-col items-center gap-3 transition-all relative overflow-hidden group ${
                selectedBank === bank.id
                  ? "border-[#0066B3] bg-blue-50/50 shadow-md shadow-blue-900/5"
                  : "border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              {selectedBank === bank.id && (
                <div className="absolute top-2 right-2 text-[#0066B3]">
                  <CheckCircle2 size={16} className="fill-blue-100" />
                </div>
              )}

              {/* UPDATED: Logic to display Image if available, or fallback to Color Box */}
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform overflow-hidden ${
                  bank.logo 
                    ? "bg-white border border-slate-100" // Style for Image
                    : `${bank.color} text-white`         // Style for Fallback
                }`}
              >
                {bank.logo ? (
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <span className="font-bold text-lg">
                    {bank.name.charAt(0)}
                  </span>
                )}
              </div>

              <span
                className={`text-xs font-bold text-center ${
                  selectedBank === bank.id ? "text-[#003A66]" : "text-slate-600"
                }`}
              >
                {bank.name}
              </span>
            </button>
          ))}
        </div>
        {filteredBanks.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <p className="text-xs">No banks found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      <div className="pt-4 mt-auto border-t border-slate-100">
        <button
          disabled={!selectedBank}
          className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
            selectedBank
              ? "bg-[#0066B3] hover:bg-[#003A66] text-white shadow-blue-900/10 active:scale-[0.98]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          Proceed to Login <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}