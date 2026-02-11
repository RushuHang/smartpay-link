"use client";

import { useState } from "react";
import { FileUpload } from "@/src/components /ui/FileUpload";
import { Input } from "@/src/components /ui/Input";
import { Button } from "@/src/components /ui/Button";
import { ShieldCheck } from "lucide-react";

type Props = {
  onNext: () => void;
};

export default function KycStep({ onNext }: Props) {
  const [idFile, setIdFile] = useState<File | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
          <ShieldCheck size={20} className="text-brand-primary" />
          Identity Verification
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Complete these steps to unlock full features.
        </p>
      </div>

      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-brand-navy">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Date of Birth" type="date" id="dob" />
          <Input label="Street Address" placeholder="123 Main St" id="addr" />
          <Input label="City" placeholder="New York" id="city" />
          <Input label="Zip Code" placeholder="10001" id="zip" />
        </div>
      </div>

      {/* Document Upload */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-brand-navy">
          Document Upload
        </h3>

        <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
          Please upload a clear photo of your ID and a selfie.
          <span className="font-semibold"> No flash, no blur.</span>
        </div>

        <FileUpload
          label="Government ID (Front)"
          accept="image/*,.pdf"
          value={idFile}
          onChange={setIdFile}
        />
      </div>

      {/* Submit */}
      <Button onClick={onNext} className="w-full">
        Continue
      </Button>
    </div>
  );
}
