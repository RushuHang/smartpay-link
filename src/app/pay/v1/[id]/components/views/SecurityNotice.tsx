import React from "react";
import { AlertCircle } from "lucide-react";

export default function SecurityNotice() {
  return (
    <div className="mb-6 bg-[#E6F2FF] border border-blue-200 rounded-xl p-4 flex gap-3 items-start">
      <AlertCircle className="text-[#0066B3] shrink-0 mt-0.5" size={18} />
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-[#003A66]">Security Notice</h4>
        <ul className="text-xs text-slate-600 space-y-1 list-disc pl-3">
          <li>
            We will <strong>never</strong> ask for your OTP or PIN.
          </li>
          <li>Please verify the merchant name before proceeding.</li>
          <li>
            Ensure the URL starts with <strong>https://pay.smartlink...</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}