"use client";

import { useState, useEffect } from "react";
import { OTPInput } from "@/src/components /ui/OTPInput";
import { Button } from "@/src/components /ui/Button";
import { RefreshCw, ShieldCheck } from "lucide-react";

export default function VerifyStep() {
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(30);
    setIsResendDisabled(true);
    // Trigger resend API here
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
          <ShieldCheck size={20} className="text-brand-primary" />
          Verify Your Email
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          We’ve sent a 6-digit code to{" "}
          <span className="font-semibold text-brand-navy">
            user@example.com
          </span>
        </p>
      </div>

      {/* OTP Input */}
      <div className="flex justify-center">
        <OTPInput onComplete={(code) => console.log("Verifying:", code)} />
      </div>

      {/* Verify Button */}
      <Button className="w-full">
        Verify Account
      </Button>

      {/* Resend Section */}
      <div className="text-sm text-slate-500 flex items-center justify-center gap-2">
        <span>Didn't receive code?</span>

        <button
          onClick={handleResend}
          disabled={isResendDisabled}
          className="font-semibold text-brand-primary disabled:text-slate-400 disabled:cursor-not-allowed flex items-center gap-1 hover:underline"
        >
          {isResendDisabled
            ? `Resend in 00:${timer.toString().padStart(2, "0")}`
            : "Resend Code"}

          {!isResendDisabled && <RefreshCw size={12} />}
        </button>
      </div>
    </div>
  );
}
