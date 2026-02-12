"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { OTPInput } from "./ui/OTPInput";
import { Button } from "./ui/Button";
import { RefreshCw, Mail, ShieldCheck } from "lucide-react";

export default function VerifyForm() {
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(30);
    setIsResendDisabled(true);
    // Trigger API logic here
  };

  return (
    <div className="min-h-screen bg-brand-light/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 p-8 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-brand-navy p-6 text-white flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-brand-primary" />
            <h2 className="text-xl font-bold">Verify Your Email</h2>
          </div>
        </div>

        <p className="text-slate-500 text-sm mb-8 text-center">
          We&apos;ve sent a 6-digit code to <span className="font-semibold text-brand-navy">user@example.com</span>. Enter it below to confirm your
          identity.
        </p>

        {/* OTP Input */}
        <div className="mb-8 flex justify-center">
          <OTPInput onComplete={(code) => console.log("Verifying:", code)} />
        </div>

        {/* Verify Button */}
        <Button className="w-full mb-6">Verify Account</Button>

        {/* Resend */}
        <div className="text-sm text-slate-500 flex items-center justify-center gap-2">
          <span>Didn&apos;t receive code?</span>
          <button
            onClick={handleResend}
            disabled={isResendDisabled}
            className="font-semibold text-brand-primary disabled:text-slate-400 disabled:cursor-not-allowed flex items-center gap-1 hover:underline"
          >
            {isResendDisabled ? `Resend in 00:${timer.toString().padStart(2, "0")}` : "Resend Code"}
            {!isResendDisabled && <RefreshCw size={12} />}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
