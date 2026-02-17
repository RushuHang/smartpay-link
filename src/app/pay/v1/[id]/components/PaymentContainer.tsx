"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Clock } from "lucide-react";

import { PaymentData, PaymentMethod } from "../types";
import Header from "./Header";
import LoadingState from "./LoadingState";
import HelpModal from "./HelpModal";
import TransactionSidebar from "./sidebar/TransactionSidebar";

// View Imports
import ExpiredState from "./views/ExpiredState";
import SecurityNotice from "./views/SecurityNotice";
import MethodList from "./views/MethodList";
import SmartQRView from "./views/SmartQRView";
import CardForm from "./views/CardForm";
import NetBankingView from "./views/NetBankingView";
import RedirectView from "./views/RedirectView";

interface PaymentContainerProps {
  paymentData: PaymentData;
}

export default function PaymentContainer({ paymentData }: PaymentContainerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [timeLeft, setTimeLeft] = useState(paymentData.expiryMinutes * 60);
  const [isExpired, setIsExpired] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Initial Load Simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (isLoading) return <LoadingState />;

  return (
    <>
      <Header onHelp={() => setShowHelp(true)} />

      <main className="grow w-full max-w-7xl mx-auto px-4 py-6 md:py-12 flex flex-col justify-center items-center">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl shadow-blue-900/10 overflow-hidden border border-white/60 flex flex-col lg:flex-row min-h-170">
          
          {/* Left Panel */}
          <TransactionSidebar data={paymentData} />

          {/* Right Panel (Interaction Area) */}
          <section className="flex-1 flex flex-col bg-white relative">
            {/* Panel Header */}
            <div className="h-20 border-b border-slate-50 flex items-center justify-between px-6 md:px-10">
              <div className="flex items-center gap-3">
                <AnimatePresence mode="wait">
                  {selectedMethod && !isExpired && (
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      onClick={() => setSelectedMethod(null)}
                      className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors text-slate-500"
                    >
                      <ChevronLeft size={22} />
                    </motion.button>
                  )}
                </AnimatePresence>
                <div>
                  <h2 className="font-bold text-[#003A66] text-lg">
                    {isExpired
                      ? "Session Expired"
                      : selectedMethod
                      ? "Complete Payment"
                      : "Select Payment Method"}
                  </h2>
                  {!selectedMethod && !isExpired && (
                    <p className="text-xs text-slate-400 hidden sm:block">
                      Choose from SCT network or partner wallets
                    </p>
                  )}
                </div>
              </div>

              {/* Timer Badge */}
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  isExpired
                    ? "bg-slate-100 text-slate-400 border-slate-200"
                    : timeLeft < 300
                    ? "bg-red-50 text-red-600 border-red-100 animate-pulse ring-1 ring-red-200"
                    : "bg-[#E6F2FF] text-[#0066B3] border-blue-100"
                }`}
              >
                <Clock size={14} />
                <span>{isExpired ? "Expired" : formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto">
              {isExpired ? (
                <ExpiredState merchantName={paymentData.merchantName} />
              ) : (
                <AnimatePresence mode="wait">
                  {!selectedMethod ? (
                    <motion.div
                      key="method-selection"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SecurityNotice />
                      <MethodList onSelect={setSelectedMethod} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="detail-view"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      {selectedMethod === "smartqr" && <SmartQRView />}
                      {selectedMethod === "card" && (
                        <CardForm
                          amount={paymentData.amount}
                          currency={paymentData.currency}
                        />
                      )}
                      {selectedMethod === "netbanking" && <NetBankingView />}
                      {["esewa", "khalti", "imepay"].includes(selectedMethod) && (
                        <RedirectView method={selectedMethod} />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 px-6 py-3 bg-slate-50/50 text-[10px] text-slate-500 flex justify-between items-center shrink-0">
              <span>Licensed by Nepal Rastra Bank | PCI-DSS Encrypted</span>
            </div>
          </section>
        </div>
      </main>

      <AnimatePresence>
        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      </AnimatePresence>
    </>
  );
}