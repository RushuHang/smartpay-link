"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Wallet,
  AlertCircle 
} from "lucide-react";
import { Button } from "@/src/components /ui/Button"; // Adjusted path to standard convention

interface PaymentData {
  amount: string;
  currency: string;
  linkName: string;
  description?: string;
  expiryAt: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  allowPartialPayment?: boolean;
  sendEmailNotification: boolean;
  sendSMSNotification: boolean;
  successUrl?: string;
  webhookUrl?: string;
}

export default function PaymentForm() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  const [data, setData] = useState<PaymentData | null>(null);

  useEffect(() => {
    if (!id || data) return;
    const stored = localStorage.getItem(`payment-link-${id}`);
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, [id, data]);

  // Error State / Not Found - Styled to match Login Error/Empty states
  if (!data) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/50 p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10 text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 mb-6 text-red-500">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Link Invalid</h2>
          <p className="text-slate-500 text-sm mt-2 mb-8">
            This payment link is either expired or does not exist.
          </p>
          <Button
            onClick={() => router.push("/dashboard/payment-link")}
            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
          >
            Return to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  // Helper to format currency
  const formattedAmount = parseFloat(data.amount).toLocaleString(undefined, { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="w-full flex items-center justify-center bg-slate-50/50 p-4 lg:p-0 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/10 mb-6 text-blue-600"
          >
            <Wallet size={28} />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {data.linkName}
          </h2>
          
          <div className="mt-2 flex items-center justify-center gap-2 text-slate-500">
             <span className="text-sm">Payment Request</span>
             {data.allowPartialPayment && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                  Partial Allowed
                </span>
             )}
          </div>
        </div>

        {/* Amount Display - The "Hero" Input Equivalent */}
        <div className="mb-8">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center group transition-colors hover:bg-slate-100/80 hover:border-slate-300/50">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Total Amount</p>
                <div className="flex items-baseline justify-center gap-1 text-slate-900">
                    <span className="text-2xl font-bold text-slate-500">{data.currency}</span>
                    <span className="text-5xl font-bold tracking-tighter">{formattedAmount}</span>
                </div>
            </div>
        </div>

        {/* Description Note */}
        {data.description && (
          <div className="mb-6 p-4 bg-white border border-dashed border-slate-200 rounded-xl">
             <p className="text-slate-600 text-sm text-center italic">
               &ldquo;{data.description}&rdquo;
             </p>
          </div>
        )}

        {/* Details List */}
        <div className="space-y-5 mb-8 ">
           {/* Customer Name */}
           <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                    <User size={18} />
                 </div>
                 <span className="text-sm font-medium text-slate-500">Customer</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">{data.customerName}</span>
           </div>

           {/* Email */}
           {data.customerEmail && (
            <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                        <Mail size={18} />
                    </div>
                    <span className="text-sm font-medium text-slate-500">Email</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">{data.customerEmail}</span>
            </div>
           )}

           {/* Phone */}
           {data.customerPhone && (
            <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                        <Phone size={18} />
                    </div>
                    <span className="text-sm font-medium text-slate-500">Phone</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">{data.customerPhone}</span>
            </div>
           )}

           {/* Expiry */}
           <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                    <Calendar size={18} />
                 </div>
                 <span className="text-sm font-medium text-slate-500">Expiry Date</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                {new Date(data.expiryAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
           </div>
        </div>

        {/* Actions */}
        <div className="pt-2 space-y-4 text-center">
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button 
                className="w-ful"
            >
                <CreditCard size={18} />
                Pay {data.currency} {formattedAmount}
            </Button>
          </motion.div>

          <div className="flex items-center justify-center gap-1.5 text-slate-400">
             <ShieldCheck size={14} className="text-emerald-500" />
             <span className="text-xs font-medium">Encrypted & Secure Payment</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
             <p className="text-sm text-slate-400">
                Powered by <span className="font-semibold text-slate-700">Smart Link</span>
            </p>
        </div>

      </motion.div>
    </div>
  );
}