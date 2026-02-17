import React from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  CreditCard,
  Building,
  ChevronRight,
  Globe,
} from "lucide-react";
import { PaymentMethod } from "../../types";

export default function MethodList({
  onSelect,
}: {
  onSelect: (m: PaymentMethod) => void;
}) {
  const methods = [
    {
      id: "smartqr",
      title: "Smart QR",
      subtitle: "Fonepay, Mobile Banking",
      icon: QrCode,
      color: "bg-blue-600",
    },
    {
      id: "card",
      title: "Credit/Debit Card",
      subtitle: "Visa, Mastercard, SCT",
      icon: CreditCard,
      color: "bg-slate-800",
    },
    {
      id: "esewa",
      title: "eSewa",
      subtitle: "Mobile Wallet",
      icon: "/images/partnerlogo/esewa.jpg",
      color: "bg-white",
    },
    {
      id: "khalti",
      title: "Khalti",
      subtitle: "Digital Wallet",
      icon: "/images/partnerlogo/khalti.png",
      color: "bg-white",
    },
    {
      id: "imepay",
      title: "IME Pay",
      subtitle: "Mobile Wallet",
      icon: "/images/partnerlogo/imepay.png",
      color: "bg-white",
    },
    {
      id: "netbanking",
      title: "Net Banking",
      subtitle: "nBank, Retail Banking",
      icon: Building,
      color: "bg-teal-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-3">
      {methods.map((method) => (
        <motion.button
          key={method.id}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(method.id as PaymentMethod)}
          className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl text-left hover:border-[#0066B3] hover:shadow-lg hover:shadow-blue-900/5 transition-all group relative overflow-hidden"
        >
          <div
            className={`w-10 h-10 rounded-lg ${method.color} flex items-center justify-center text-white shrink-0 shadow-md overflow-hidden`}
          >
            {typeof method.icon === "string" ? (
              <img
                src={method.icon}
                alt={method.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <method.icon size={20} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-700 text-sm group-hover:text-[#0066B3] truncate">
              {method.title}
            </h4>
            <p className="text-[10px] text-slate-400 font-medium truncate">
              {method.subtitle}
            </p>
          </div>
          <ChevronRight
            size={16}
            className="text-slate-300 group-hover:text-[#0066B3] -ml-2"
          />
        </motion.button>
      ))}
    </div>
  );
}