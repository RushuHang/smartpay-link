import React from "react";
import { CreditCard, ShieldCheck, ArrowRight } from "lucide-react";

export default function PayByLink() {
  const invoiceDetails = {
    amount: "1,250.00",
    currency: "USD",
    invoiceId: "INV-2026-042",
    description: "Cloud Services Monthly Subscription",
    dueDate: "Feb 24, 2026",
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans text-foreground">
      <div className="max-w-md w-full">
        {/* Branding/Logo Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary text-white mb-4 shadow-lg shadow-brand-primary/20">
            <CreditCard size={24} />
          </div>
          <h2 className="text-brand-navy font-bold text-xl">Secure Checkout</h2>
          <p className="text-gray-500 text-sm mt-1">Invoice #{invoiceDetails.invoiceId}</p>
        </div>

        {/* Main Payment Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          <div className="bg-brand-light/30 p-8 text-center border-b border-brand-light">
            <span className="text-brand-navy/60 font-medium uppercase tracking-wider text-xs">Amount Due</span>
            <div className="mt-2 flex items-center justify-center gap-1">
              <span className="text-2xl font-semibold text-brand-navy leading-none self-start mt-1">$</span>
              <span className="text-5xl font-bold text-brand-navy tracking-tight">{invoiceDetails.amount}</span>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Description</span>
                <span className="font-medium text-brand-navy">{invoiceDetails.description}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Due Date</span>
                <span className="font-medium text-brand-navy">{invoiceDetails.dueDate}</span>
              </div>
            </div>

            <button className="w-full bg-brand-primary hover:bg-brand-navy text-white font-semibold py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 group active:scale-[0.98]">
              Pay Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
              <ShieldCheck size={16} className="text-green-500" />
              <span className="text-xs font-medium">Secured by AES-256 Encryption</span>
            </div>
          </div>
        </div>

        {/* Footer Support */}
        <p className="text-center mt-8 text-sm text-gray-400">
          Having trouble?{" "}
          <a href="#" className="text-brand-primary hover:underline underline-offset-4">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
