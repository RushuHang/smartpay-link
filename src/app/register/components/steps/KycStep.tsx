"use client";

import { useState } from "react";
import { FileUpload } from "@/src/components /ui/FileUpload";
import { Input } from "@/src/components /ui/Input";
import { Button } from "@/src/components /ui/Button";
import { ShieldCheck } from "lucide-react";

type Props = {
  data: any;
  setData: (data: any) => void;
  onNext: () => void;
};

export default function KycStep({ data, setData, onNext }: Props) {
  const [idFile, setIdFile] = useState<File | null>(data.idFile || null);

  const handleNext = () => {
    setData({ ...data, idFile });
    onNext();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2">
          <ShieldCheck size={20} className="text-brand-primary" /> Identity Verification
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Complete these steps to unlock full features.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-brand-navy">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Date of Birth"
            type="date"
            id="dob"
            value={data.dob}
            onChange={(e) => setData({ ...data, dob: e.target.value })}
          />
          <Input
            label="Street Address"
            placeholder="123 Main St"
            id="street"
            value={data.street}
            onChange={(e) => setData({ ...data, street: e.target.value })}
          />
          <Input
            label="City"
            placeholder="New York"
            id="city"
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
          />
          <Input
            label="Zip Code"
            placeholder="10001"
            id="zip"
            value={data.zip}
            onChange={(e) => setData({ ...data, zip: e.target.value })}
          />
        </div>
      </div>

      {/* <div className="space-y-6">
        <h3 className="text-lg font-semibold text-brand-navy">Document Upload</h3>
        <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
          Please upload a clear photo of your ID and a selfie. <span className="font-semibold">No flash, no blur.</span>
        </div>
        <FileUpload
          label="Government ID (Front)"
          accept="image/*,.pdf"
          value={idFile}
          onChange={setIdFile}
        />
      </div> */}

      <Button onClick={handleNext} className="w-full">Continue</Button>
    </div>
  );
}
