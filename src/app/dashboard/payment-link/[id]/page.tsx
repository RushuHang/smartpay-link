"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  CreditCard, 
  Calendar, 
  User, 
  Mail, 
  Smartphone, 
  Bell, 
  Link as LinkIcon 
} from "lucide-react";
import { Button } from "@/src/components /ui/Button";

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

export default function PaymentLinkDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  const [data, setData] = useState<PaymentData | null>(null);
  const [copied, setCopied] = useState(false);

  // Mocking a real domain for the display
  const paymentUrl = typeof window !== "undefined"
  ? `${window.location.origin}/pay/v1/${id}`
  : "";


 useEffect(() => {
  if (!id) return;

  const stored = localStorage.getItem(`payment-link-${id}`);
  if (stored) {
    const parsed = JSON.parse(stored);
    // Only update state if different
    setData(prev => prev ?? parsed);
  } else {
    const sessionStored = sessionStorage.getItem(`payment-link-${id}`);
    if (sessionStored) {
      const parsed = JSON.parse(sessionStored);
      setData(prev => prev ?? parsed);
      localStorage.setItem(`payment-link-${id}`, JSON.stringify(parsed));
    }
  }
}, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E6F2FF] text-[#0066B3]">
            <LinkIcon className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold text-[#003A66]">
            Payment link not found
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            The payment link you are looking for might have been removed or the ID is incorrect.
          </p>
          <button
            onClick={() => router.push("/dashboard/payment-link")}
            className="mt-4 px-6 py-2.5 bg-[#0066B3] hover:bg-[#003A66] text-white rounded-lg transition-colors font-medium shadow-sm shadow-blue-900/10"
          >
            Go Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Navigation */}
        <button
          onClick={() => router.push("/dashboard/payment-link")}
          className="group flex items-center text-slate-500 hover:text-[#0066B3] transition-colors font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Payment Links
        </button>

        <div className="bg-white shadow-xl shadow-slate-200/60 rounded-2xl overflow-hidden border border-slate-100">
          
          {/* Top Banner / Hero */}
          <div className="bg-[#003A66] p-8 text-white relative overflow-hidden">
            {/* Abstract background shape for modern feel */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-[#E6F2FF] mb-2 text-sm font-medium tracking-wide uppercase">
                  <CreditCard className="w-4 h-4" />
                  <span>Payment Link Generated</span>
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  {data.linkName}
                </h1>
                <p className="text-blue-100/80 text-sm mt-2 font-mono">
                  ID: {id}
                </p>
              </div>

              <div className="text-left md:text-right bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-blue-100 text-xs uppercase font-semibold tracking-wider mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-white">
                  {data.currency} <span className="tracking-tight">{parseFloat(data.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            
            {/* Shareable Link Section - New Feature */}
            <div className="mb-10">
              <label className="block text-sm font-semibold text-[#003A66] mb-3">
                Share Payment Link
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-slate-600 font-mono text-sm truncate select-all">
                  {paymentUrl}
                </div>
                <Button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm ${
                    copied 
                      ? "bg-[#E6F2FF] text-[#0066B3] border border-[#0066B3]/20" 
                      : "bg-[#0066B3] hover:bg-[#003A66] text-white"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy Link
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Share this URL with your customer to collect payment instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              
              {/* Left Column: Customer Details */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-[#003A66] uppercase tracking-wider border-b border-slate-100 pb-2">
                  Customer Information
                </h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E6F2FF] flex items-center justify-center text-[#0066B3] shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs font-medium uppercase mb-0.5">Customer Name</p>
                      <p className="text-slate-800 font-semibold">{data.customerName}</p>
                    </div>
                  </div>

                  {data.customerEmail && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#E6F2FF] flex items-center justify-center text-[#0066B3] shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs font-medium uppercase mb-0.5">Email Address</p>
                        <p className="text-slate-800 font-semibold">{data.customerEmail}</p>
                      </div>
                    </div>
                  )}

                  {data.customerPhone && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#E6F2FF] flex items-center justify-center text-[#0066B3] shrink-0">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs font-medium uppercase mb-0.5">Phone Number</p>
                        <p className="text-slate-800 font-semibold">{data.customerPhone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Payment Settings */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-[#003A66] uppercase tracking-wider border-b border-slate-100 pb-2">
                  Configuration & Limits
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E6F2FF] flex items-center justify-center text-[#0066B3] shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs font-medium uppercase mb-0.5">Expires On</p>
                      <p className="text-slate-800 font-semibold">
                        {new Date(data.expiryAt).toLocaleDateString(undefined, { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {new Date(data.expiryAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E6F2FF] flex items-center justify-center text-[#0066B3] shrink-0">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs font-medium uppercase mb-2">Notifications</p>
                      <div className="flex gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${data.sendEmailNotification ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                          Email: {data.sendEmailNotification ? "ON" : "OFF"}
                        </span>
                        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${data.sendSMSNotification ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                          SMS: {data.sendSMSNotification ? "ON" : "OFF"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                     <p className="text-slate-500 text-xs font-medium uppercase mb-2 pl-[3.5rem]">Payment Flexibility</p>
                     <div className="flex items-center gap-3 pl-[3.5rem]">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          data.allowPartialPayment 
                          ? "bg-[#E6F2FF] text-[#0066B3]" 
                          : "bg-slate-100 text-slate-500"
                        }`}>
                          {data.allowPartialPayment ? "Partial Payments Allowed" : "Full Payment Only"}
                        </span>
                     </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Description Section */}
            {data.description && (
              <div className="mt-10 pt-8 border-t border-slate-100">
                <h3 className="text-sm font-bold text-[#003A66] mb-3">
                  Description / Note
                </h3>
                <div className="bg-[#F8FAFC] p-5 rounded-xl border border-slate-200 text-slate-600 text-sm leading-relaxed">
                  {data.description}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}