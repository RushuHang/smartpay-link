"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import {
  CreditCard,
  Building,
  QrCode,
  ShieldCheck,
  User,
  CheckCircle2,
  Loader2,
  Lock,
  Zap,
  Globe,
  MapPin,
  Mail,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components /ui/Button";

// --- Types & Constants ---
type PaymentStatus = "idle" | "processing" | "success" | "failed" | "expired";
type PaymentMethod = "smartqr" | "sctcard" | "esewa" | "khalti" | "bank";

const SCT_BLUE = "#0066B3";
const SCT_NAVY = "#003A66";
const SCT_LIGHT = "#E6F2FF";

interface PaymentData {
  amount: string;
  currency: string;
  description: string;
  customerName: string;
  customerEmail: string;
  merchantName: string;
  merchantCategory: string;
  merchantLocation: string;
  merchantEmail: string;
  invoiceNumber: string;
  subtotal: string;
  taxAmount: string;
}

export default function SmartLinkCustomerPage() {
  const { id } = useParams() as { id: string };

  // States
  const [data, setData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("smartqr");
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes

  // Mock Data Initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        amount: "2450.00",
        currency: "NPR",
        description: "Cloud Hosting - Annual Subscription (Business Pro)",
        customerName: "Binod Tamang",
        customerEmail: "binod@example.com",
        merchantName: "TechSphere Solutions Pvt. Ltd.",
        merchantCategory: "IT Services & Software",
        merchantLocation: "Kathmandu, Nepal",
        merchantEmail: "billing@techsphere.com.np",
        invoiceNumber: `SL-${id?.toUpperCase() || "7789-01"}`,
        subtotal: "2168.14",
        taxAmount: "281.86",
      });
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  // Countdown Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setStatus("expired");
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0066B3] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-20">
      
      {/* --- BRAND HEADER --- */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 bg-[${SCT_BLUE}] rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200`}>
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`font-black text-xl tracking-tight leading-none text-[${SCT_NAVY}]`}>
                Smart<span className={`text-[${SCT_BLUE}]`}> Link</span>
              </span>
              {/* <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">National Payment Gateway</span> */}
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-bold border border-green-100">
               <ShieldCheck size={14} /> PCI-DSS COMPLIANT
             </div>
             <div className={`flex items-center gap-2 text-xs font-bold text-[${SCT_NAVY}] bg-[${SCT_LIGHT}] px-3 py-1.5 rounded-lg`}>
                <Globe size={14} /> NPR
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 md:pt-10">
        
        {/* --- MERCHANT IDENTITY CARD --- */}
        <div className="mb-8 bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-32 h-32 bg-[${SCT_BLUE}]/5 rounded-full -mr-16 -mt-16`} />
          
          <div className="flex items-center gap-5 relative z-10">
            <div className={`w-16 h-16 bg-[${SCT_NAVY}] text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-xl shadow-blue-900/10`}>
              {data.merchantName.split(' ').map(n => n[0]).join('').substring(0,2)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className={`text-xl font-black text-[${SCT_NAVY}]`}>{data.merchantName}</h1>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-[#0066B3] rounded text-[10px] font-bold border border-blue-100">
                  <ShieldCheck size={12} /> VERIFIED
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1.5"><Building size={14} className="text-slate-300"/> {data.merchantCategory}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-300"/> {data.merchantLocation}</span>
                <span className="flex items-center gap-1.5"><Mail size={14} className="text-slate-300"/> {data.merchantEmail}</span>
              </div>
            </div>
          </div>

          <div className="md:text-right relative z-10 flex flex-col items-end">
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100 mb-1">
              <span className="text-xs font-black uppercase tracking-wider">Expires In</span>
              <span className="font-mono font-black text-lg">{formatTime(timeLeft)}</span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Session ID: SCT-{id?.substring(0,8)}</p>
          </div>
        </div>

        {status === "expired" ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-4xl p-12 text-center border-2 border-dashed border-slate-200">
            <ShieldAlert size={64} className="mx-auto text-slate-300 mb-6" />
            <h2 className={`text-2xl font-black text-[${SCT_NAVY}] mb-2`}>Payment Link Expired</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">For your security, payment links are valid for 15 minutes. Please contact the merchant to generate a new link.</p>
            <Button className={`bg-[${SCT_BLUE}] text-white px-8 h-12 rounded-xl font-bold`}>Request New Link</Button>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* === PAYMENT SELECTION (LEFT) === */}
            <div className="w-full lg:w-7/12 order-2 lg:order-1">
              <div className="bg-white rounded-4xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                <div className="p-8 border-b border-slate-50">
                  <h3 className={`text-xl font-black text-[${SCT_NAVY}]`}>Select Payment Method</h3>
                  <p className="text-sm text-slate-400 mt-1 font-medium">Choose from SCT network or partner wallets</p>
                </div>

                <div className="p-8 pt-6">
                  {/* SCT PRIMARY METHODS */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <MethodButton active={paymentMethod === 'smartqr'} onClick={() => setPaymentMethod('smartqr')} color="blue">
                      <QrCode size={26} strokeWidth={2.5} />
                      <span className="text-[13px] font-black uppercase tracking-tight">Smart QR</span>
                      <span className="text-[10px] font-bold opacity-60">Instant Scan & Pay</span>
                    </MethodButton>

                    <MethodButton active={paymentMethod === 'sctcard'} onClick={() => setPaymentMethod('sctcard')} color="blue">
                      <CreditCard size={26} strokeWidth={2.5} />
                      <span className="text-[13px] font-black uppercase tracking-tight">SCT / UnionPay</span>
                      <span className="text-[10px] font-bold opacity-60">Debit/Credit Card</span>
                    </MethodButton>
                  </div>

                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Partner Gateways</p>
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    <MethodButton active={paymentMethod === 'esewa'} onClick={() => setPaymentMethod('esewa')} color="green" compact>
                      <span className="font-black text-sm">eSewa</span>
                    </MethodButton>
                    <MethodButton active={paymentMethod === 'khalti'} onClick={() => setPaymentMethod('khalti')} color="purple" compact>
                      <span className="font-black text-sm">Khalti</span>
                    </MethodButton>
                    <MethodButton active={paymentMethod === 'bank'} onClick={() => setPaymentMethod('bank')} color="navy" compact>
                      <Building size={20} />
                      <span className="font-black text-[10px] uppercase">Net Banking</span>
                    </MethodButton>
                  </div>

                  {/* CONTENT AREA */}
                  <div className={`min-h-75 bg-slate-50/50 rounded-2xl p-8 border border-slate-100 relative overflow-hidden`}>
                    <AnimatePresence mode="wait">
                      {paymentMethod === 'smartqr' && (
                        <motion.div key="qr" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
                          <div className="bg-white p-4 rounded-3xl shadow-sm mb-6 border border-slate-200">
                            <QRCode value={`sct-smartlink-${data.invoiceNumber}`} size={180} />
                          </div>
                          <div className="flex flex-col items-center gap-3">
                            <p className="text-[11px] text-slate-400 text-center max-w-[240px] leading-relaxed">
                              Open <strong>Smart QR</strong> supported apps (nBank, eSewa, Khalti) to scan and pay.
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {paymentMethod === 'sctcard' && (
                        <motion.div key="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                          <div className="flex justify-between items-center mb-2">
                             <span className={`text-xs font-bold text-[${SCT_NAVY}] uppercase tracking-wider`}>Card Details</span>
                             <div className="flex gap-2 opacity-50"><CreditCard size={20} /></div>
                          </div>
                          <div className="space-y-4">
                            <input placeholder="0000 0000 0000 0000" className="w-full px-5 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#0066B3]/20 focus:border-[#0066B3] transition-all font-mono text-base" />
                            <div className="grid grid-cols-2 gap-4">
                              <input placeholder="MM / YY" className="px-5 py-4 rounded-xl border border-slate-200 outline-none focus:border-[#0066B3] text-sm" />
                              <input placeholder="CVV" className="px-5 py-4 rounded-xl border border-slate-200 outline-none focus:border-[#0066B3] text-sm" />
                            </div>
                          </div>
                          <Button 
                            disabled={status === 'processing'}
                            className={`w-full bg-[${SCT_BLUE}] hover:bg-[#005596] text-white h-14 rounded-xl font-bold shadow-lg shadow-blue-100 mt-4 text-lg`}
                          >
                            {status === 'processing' ? <Loader2 className="animate-spin mr-2" /> : "Secure Pay"} {data.currency} {parseFloat(data.amount).toLocaleString()}
                          </Button>
                        </motion.div>
                      )}

                      {(paymentMethod === 'esewa' || paymentMethod === 'khalti' || paymentMethod === 'bank') && (
                        <motion.div key="ext" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12">
                           <div className={`w-16 h-16 bg-[${SCT_LIGHT}] text-[${SCT_BLUE}] rounded-2xl flex items-center justify-center mb-6`}>
                              <Zap size={32} />
                           </div>
                           <p className="text-sm text-slate-500 mb-8 text-center max-w-70">
                             You will be redirected to the secure <strong>{paymentMethod.toUpperCase()}</strong> gateway to complete your transaction.
                           </p>
                           <Button 
                            disabled={status === 'processing'}
                            className={`w-full bg-[${SCT_NAVY}] text-white h-14 rounded-xl font-bold text-lg`}
                           >
                             {status === 'processing' ? <Loader2 className="animate-spin mr-2" /> : `Continue to ${paymentMethod}`}
                           </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* === ORDER SUMMARY (RIGHT) === */}
            <div className="w-full lg:w-5/12 order-1 lg:order-2 lg:sticky lg:top-24">
              <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-12 h-12 bg-[${SCT_LIGHT}] rounded-2xl flex items-center justify-center text-[${SCT_BLUE}]`}>
                     <User size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Customer</p>
                    <p className={`font-black text-[${SCT_NAVY}]`}>{data.customerName}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Invoice Number</span>
                    <span className="text-sm font-bold font-mono bg-slate-50 px-2 py-1 rounded border border-slate-100">{data.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-slate-500">Description</span>
                    <span className="text-sm font-bold text-right max-w-45 leading-tight text-slate-700">{data.description}</span>
                  </div>
                </div>

                <div className={`p-8 bg-[${SCT_LIGHT}]/50 rounded-4xl border border-[${SCT_BLUE}]/10`}>
                  <div className="flex justify-between text-sm text-slate-600 mb-2 font-medium">
                    <span>Subtotal</span>
                    <span>{data.currency} {data.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 mb-4 font-medium">
                    <span>Tax Amount (VAT)</span>
                    <span>{data.currency} {data.taxAmount}</span>
                  </div>
                  <div className={`h-px bg-[${SCT_BLUE}]/10 mb-4`} />
                  <div className="flex justify-between items-center">
                    <span className={`font-black text-[${SCT_NAVY}] uppercase text-xs`}>Total Amount</span>
                    <span className={`text-3xl font-black text-[${SCT_BLUE}]`}>{data.currency} {parseFloat(data.amount).toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                  <Lock size={16} className="text-green-600" />
                  <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
                    Your payment information is encrypted and processed via the <strong>Smart Link</strong>. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- REUSABLE BUTTON COMPONENT ---
function MethodButton({ active, onClick, children, color, compact }: any) {
  
  // Theme configuration for borders, backgrounds, AND text colors
  const themes = {
    blue: {
      container: active ? "border-[#0066B3] bg-[#0066B3] shadow-xl shadow-blue-200/50" : "border-slate-100 bg-white hover:border-blue-200 hover:bg-blue-50/30",
      text: active ? "text-white" : "text-[#0066B3]" 
    },
    green: {
      container: active ? "border-[#41A124] bg-[#41A124] shadow-xl shadow-green-100" : "border-slate-100 bg-white hover:border-green-200 hover:bg-green-50/30",
      text: active ? "text-white" : "text-[#41A124]"
    },
    purple: {
      container: active ? "border-[#5C2D91] bg-[#5C2D91] shadow-xl shadow-purple-100" : "border-slate-100 bg-white hover:border-purple-200 hover:bg-purple-50/30",
      text: active ? "text-white" : "text-[#5C2D91]"
    },
    navy: {
      container: active ? "border-[#003A66] bg-[#003A66] shadow-xl shadow-slate-200" : "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-100/50",
      text: active ? "text-white" : "text-[#003A66]"
    },
  };

  const currentTheme = themes[color as keyof typeof themes];

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-1 rounded-2xl border-2 transition-all duration-300 
        ${compact ? 'h-24' : 'h-32'} 
        ${currentTheme.container} 
        ${currentTheme.text}`} // This applies the text color to all children automatically
    >
      {children}
      {active && (
        <motion.div layoutId="check" className="absolute -top-2 -right-2 bg-white rounded-full shadow-lg p-0.5">
          <CheckCircle2 
            size={22} 
            className={
               color === 'blue' ? 'text-[#0066B3]' : 
               color === 'green' ? 'text-[#41A124]' : 
               color === 'purple' ? 'text-[#5C2D91]' : 'text-[#003A66]'
            } 
            fill="white" 
          />
        </motion.div>
      )}
    </button>
  );
}