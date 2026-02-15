"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import {
  CreditCard,
  QrCode,
  ShieldCheck,
  User,
  Loader2,
  Building,
  ChevronRight,
  ChevronLeft,
  Smartphone,
  Wallet,
  Zap
} from "lucide-react";

// --- Types & Constants ---
type PaymentStatus = "idle" | "processing" | "success" | "failed" | "expired";
type PaymentMethod = "smartqr" | "sctcard" | "esewa" | "khalti" | "bank" | null;

const SCT_BLUE = "#0066B3";

export default function RazorpayStyleSmartLink() {
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState<PaymentMethod>(null);
  const [timeLeft, setTimeLeft] = useState(900);

  // Your Data
  const data = {
    amount: "2,450.00",
    currency: "NPR",
    description: "Cloud Hosting - Annual Subscription (Business Pro)",
    customerName: "Binod Tamang",
    customerEmail: "binod@example.com",
    merchantName: "TechSphere Solutions Pvt. Ltd.",
    invoiceNumber: `SL-${id?.toUpperCase() || "7789-01"}`,
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-[#0066B3]" /></div>;

  return (
    <div className="min-h-screen bg-[#F2F4F7] flex items-center justify-center p-0 md:p-4 font-sans antialiased">
      {/* Container mimic of the Razorpay Checkout Modal */}
      <div className="w-full max-w-[840px] bg-white md:rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[580px]">
        
        {/* LEFT SIDEBAR: Order Info */}
        <div className="md:w-[340px] bg-[#F9FAFB] border-r border-slate-100 flex flex-col p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center font-black text-[#0066B3] shadow-sm">
              {data.merchantName.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-800 leading-tight">{data.merchantName}</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Payment Request</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Amount to pay</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-slate-800">{data.currency}</span>
              <span className="text-4xl font-black text-slate-900 tracking-tighter">{data.amount}</span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
              <p className="text-[11px] font-bold text-slate-400 uppercase mb-2">Order Details</p>
              <p className="text-xs font-semibold text-slate-700 leading-relaxed">{data.description}</p>
              <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between">
                <span className="text-[10px] text-slate-400 font-bold">INVOICE</span>
                <span className="text-[10px] text-slate-800 font-mono font-bold">{data.invoiceNumber}</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8">
             <div className="flex items-center gap-2 text-slate-400">
               <User size={14} />
               <span className="text-xs font-medium">{data.customerEmail}</span>
             </div>
          </div>
        </div>

        {/* RIGHT SIDE: Payment Actions */}
        <div className="flex-1 flex flex-col bg-white relative">
          
          {/* Header Area */}
          <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10">
            {method ? (
              <button onClick={() => setMethod(null)} className="flex items-center gap-1 text-[#0066B3] font-bold text-sm hover:text-blue-700 transition-colors">
                <ChevronLeft size={18} /> All payment methods
              </button>
            ) : (
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Select Payment Method</span>
            )}
            <div className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          </div>

          {/* Interaction Area */}
          <div className="flex-1 p-8 overflow-y-auto">
            <AnimatePresence mode="wait">
              {!method ? (
                <motion.div key="list" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-2">
                  {/* Smart QR */}
                  <MethodRow 
                    icon={<QrCode size={18} />} 
                    title="Smart QR" 
                    subtitle="Scan with SmartQR, Fonepay, or Mobile Banking" 
                    onClick={() => setMethod('smartqr')} 
                  />
                  
                  {/* Card */}
                  <MethodRow 
                    icon={<CreditCard size={18} />} 
                    title="Card" 
                    subtitle="Visa, Mastercard, SCT, UnionPay" 
                    onClick={() => setMethod('sctcard')} 
                  />
                  
                  {/* eSewa */}
                  <MethodRow 
                    icon={<Wallet size={18} className="text-green-600" />} 
                    title="eSewa" 
                    subtitle="Pay with eSewa Mobile Wallet" 
                    onClick={() => setMethod('esewa')} 
                  />
                  
                  {/* Khalti - NEW */}
                  <MethodRow 
                    icon={<Wallet size={18} className="text-purple-600" />} 
                    title="Khalti" 
                    subtitle="Pay with Khalti Digital Wallet" 
                    onClick={() => setMethod('khalti')} 
                  />
                  
                  {/* Netbanking */}
                  <MethodRow 
                    icon={<Building size={18} />} 
                    title="Netbanking" 
                    subtitle="Login to your bank account" 
                    onClick={() => setMethod('bank')} 
                  />
                </motion.div>
              ) : (
                <motion.div key="detail" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  {method === 'smartqr' && <QRSection id={id} />}
                  {method === 'sctcard' && <CardSection amount={data.amount} currency={data.currency} />}
                  {(method === 'esewa' || method === 'khalti' || method === 'bank') && <RedirectSection method={method} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trusted Footer */}
          <div className="p-6 bg-slate-50/50 border-t border-slate-50">
            <div className="flex items-center justify-center gap-4 opacity-40 grayscale contrast-200 mb-3">
              <span className="text-[9px] font-black italic tracking-widest uppercase">PCI-DSS Compliant</span>
              <span className="text-[9px] font-black italic tracking-widest uppercase">SSL Secured</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-[#0066B3]">
              <ShieldCheck size={14} className="text-green-500" fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Secured by Smart Link</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub Components (Razorpay Style) ---

function MethodRow({ icon, title, subtitle, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50/80 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 flex items-center justify-center text-slate-400 group-hover:text-[#0066B3] transition-colors bg-white border border-slate-100 rounded-lg shadow-sm">
          {icon}
        </div>
        <div className="text-left">
          <p className="text-[13px] font-bold text-slate-700">{title}</p>
          <p className="text-[11px] text-slate-400 font-medium">{subtitle}</p>
        </div>
      </div>
      <ChevronRight size={16} className="text-slate-200 group-hover:text-slate-400" />
    </button>
  );
}

function CardSection({ amount, currency }: { amount: string, currency: string }) {
  return (
    <div className="space-y-5 max-w-sm mx-auto pt-4">
      <div className="space-y-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Card Number</label>
          <input className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:border-[#0066B3] outline-none transition-all" placeholder="0000 0000 0000 0000" />
          <CreditCard className="absolute right-3 top-[34px] text-slate-300" size={18} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Expiry</label>
            <input className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:border-[#0066B3] outline-none" placeholder="MM / YY" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">CVV</label>
            <input className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:border-[#0066B3] outline-none" placeholder="123" />
          </div>
        </div>
        <div>
           <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Card Holder Name</label>
           <input className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:border-[#0066B3] outline-none" placeholder="Name on Card" />
        </div>
      </div>
      <button className="w-full bg-[#0066B3] text-white py-4 rounded-lg font-bold text-sm shadow-lg shadow-blue-600/10 hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-wider">
        Pay {currency} {amount}
      </button>
    </div>
  );
}

function QRSection({ id }: { id: string }) {
  return (
    <div className="flex flex-col items-center py-4">
      <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm mb-6">
        <QRCode value={`sct-${id}`} size={180} />
      </div>
      <div className="text-center space-y-2 max-w-[280px]">
        <div className="flex items-center justify-center gap-2 text-[#0066B3] font-bold text-sm">
           <Zap size={16} fill="currentColor" />
           <span>Smart QR</span>
        </div>
        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
          Open <strong>Fonepay, nBank, or SmartQR</strong> supported apps to scan this code instantly.
        </p>
      </div>
    </div>
  );
}

function RedirectSection({ method }: { method: string }) {
  // Simple styling to differentiate wallets based on selection
  const isKhalti = method === 'khalti';
  const isEsewa = method === 'esewa';
  
  const themeColor = isKhalti ? "bg-purple-600" : isEsewa ? "bg-green-600" : "bg-slate-900";
  const logoInitial = method!.charAt(0).toUpperCase();

  return (
    <div className="text-center py-10">
      <div className={`w-16 h-16 ${isKhalti ? 'bg-purple-50 text-purple-600' : isEsewa ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
        {method === 'bank' ? <Building size={32} /> : <span className="text-2xl font-black">{logoInitial}</span>}
      </div>
      <p className="text-sm text-slate-600 mb-8 px-6 font-medium leading-relaxed">
        We will redirect you to <strong>{method!.charAt(0).toUpperCase() + method!.slice(1)}</strong> secure login to complete the payment.
      </p>
      <button className={`w-full max-w-xs ${themeColor} text-white py-4 rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-lg`}>
        Continue to {method!.charAt(0).toUpperCase() + method!.slice(1)}
      </button>
    </div>
  );
}