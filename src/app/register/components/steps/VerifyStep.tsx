"use client";

import { useState, useEffect } from "react";
import { OTPInput } from "@/src/components /ui/OTPInput";
import { Button } from "@/src/components /ui/Button";
import { RefreshCw, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  data: any;
};

export default function VerifyStep({ data }: Props) {
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [otp, setOtp] = useState(""); // track OTP value
  const router = useRouter();

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
    // trigger resend API
  };

  const handleVerify = () => {
    console.log("Verifying OTP:", otp);
    // Call your OTP verification API here
    router.push("/dashboard");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
          <ShieldCheck size={20} className="text-brand-primary" /> Verify Your
          Phone Number
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          We’ve sent a 6-digit code to
          <span className="font-semibold text-brand-navy">{data.phone}</span>
        </p>
      </div>

      {/* OTP Input */}
      <div className="flex justify-center">
        <OTPInput 
          value={otp}
          onChange={(code) => setOtp(code)}
        />
      </div>

      {/* Verify Button */}
      <Button
        className="w-full"
        disabled={otp.length !== 6} // enable only when exactly 6 digits
        onClick={handleVerify}
      >
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
