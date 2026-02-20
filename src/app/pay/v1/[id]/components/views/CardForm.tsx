"use client";

import React, { useState, ChangeEvent } from "react";
import { CreditCard, Lock, User, ShieldCheck } from "lucide-react";
// Imported your custom Button component
import { Button } from "@/components /ui/Button";

interface CardFormProps {
  amount: string;
  currency: string;
}

export default function CardForm({ amount, currency }: CardFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Handle Card Number: Only digits, max 16, auto-space every 4 digits
  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    if (value.length <= 16) {
      setCardNumber(formatted);
    }
  };

  // Handle Expiry: MM/YY format, restricts to numbers
  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    
    // Add slash after first 2 digits
    if (value.length >= 3) {
      value = `${value.slice(0, 2)} / ${value.slice(2)}`;
    }
    setExpiry(value);
  };

  // Handle CVV: Max 3 digits
  const handleCvvChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(value);
  };

  return (
    <div className="max-w-md mx-auto space-y-5 pt-2">
      {/* Trust Indicators */}
      <div className="flex gap-3 justify-center mb-6">
        <div className="px-3 py-1 border border-gray-300 rounded text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
          Visa
        </div>
        <div className="px-3 py-1 border border-gray-300 rounded text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
          Mastercard
        </div>
        <div className="px-3 py-1 border border-gray-300 rounded text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
          SCT
        </div>
      </div>

      {/* Card Number Field */}
      <div className="group space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-[#0066B3] transition-colors">
          Card Number
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0066B3] transition-colors">
            <CreditCard size={18} />
          </div>
          <input
            type="text"
            inputMode="numeric"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="0000 0000 0000 0000"
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#0066B3] focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all font-mono text-base tracking-widest"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Expiry Date Field */}
        <div className="group space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-[#0066B3] transition-colors">
            Expiry Date
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={expiry}
            onChange={handleExpiryChange}
            placeholder="MM / YY"
            className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#0066B3] focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all text-center font-mono text-base tracking-widest"
          />
        </div>

        {/* CVV Field */}
        <div className="group space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-[#0066B3] transition-colors">
            CVV / CVC
          </label>
          <div className="relative">
            <input
              type="password"
              inputMode="numeric"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="•••"
              className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#0066B3] focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all text-center font-mono text-base tracking-[0.3em]"
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
          </div>
        </div>
      </div>

      {/* Cardholder Name Field */}
      <div className="group space-y-1.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1 group-focus-within:text-[#0066B3] transition-colors">
          Cardholder Name
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0066B3] transition-colors">
            <User size={18} />
          </div>
          <input
            type="text"
            placeholder="e.g. AARAV SHARMA"
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#0066B3] focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all text-sm font-bold uppercase tracking-wide placeholder:font-normal"
          />
        </div>
      </div>

      {/* Pay Button */}
      <div className="pt-2">
        {/* Replaced native <button> with custom <Button> */}
        <Button 
          type="button" // Adjust to "submit" if wrapping this in a <form> later
          className="w-full bg-[#0066B3] hover:bg-[#004d87] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-900/10 transition-all active:scale-[0.98] relative overflow-hidden group"
        >
          {/* <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" /> */}
          <ShieldCheck size={20} className="relative z-10" />
          <span className="relative z-10">Confirm Payment {currency} {amount}</span>
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 py-2">
        <Lock size={12} className="text-green-600" />
        <p className="text-[10px] text-slate-400 font-medium">
          PCI-DSS Level 1 Encrypted Secure Checkout
        </p>
      </div>
    </div>
  );
}