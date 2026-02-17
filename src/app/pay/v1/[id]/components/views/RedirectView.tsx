import React from "react";
import { ArrowRight, Globe } from "lucide-react";

export default function RedirectView({ method }: { method: string }) {
  const meta = {
    esewa: {
      title: "eSewa Wallet",
      color: "bg-white",
      icon: "/images/partnerlogo/esewa.jpg",
    },
    khalti: {
      title: "Khalti Wallet",
      color: "bg-white",
      icon: "/images/partnerlogo/khalti.png",
    },
    imepay: {
      title: "IME Pay",
      color: "bg-white",
      icon: "/images/partnerlogo/imepay.png",
    },
  }[method] || { title: "Wallet", color: "bg-blue-600", icon: Globe };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-6">
      <div
        className={`w-16 h-16 ${meta.color} rounded-2xl flex items-center justify-center text-white shadow-xl mb-6 overflow-hidden`}
      >
        {typeof meta.icon === "string" ? (
          <img
            src={meta.icon}
            alt={meta.title}
            className="w-full h-full object-contain"
          />
        ) : (
          <meta.icon size={32} />
        )}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">
        Continue to {meta.title}
      </h3>
      <p className="text-xs text-slate-500 max-w-xs mb-8 font-medium">
        We'll redirect you to your {meta.title} portal to securely authorize
        this payment.
      </p>
      <button
        className={`w-full max-w-xs ${
          meta.color === "bg-white" ? "bg-[#0066B3]" : meta.color
        } text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:brightness-110`}
      >
        Login & Pay <ArrowRight size={16} />
      </button>
    </div>
  );
}