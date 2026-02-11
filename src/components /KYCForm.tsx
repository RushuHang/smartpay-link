"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileUpload } from './ui/FileUpload';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Camera, ShieldCheck } from 'lucide-react';

type Prop = {
  onNext?: () => void;
}

export default function KYCForm({ onNext }: Prop) {
  const [idFile, setIdFile] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);

  return (
    <div className="min-w-162.5 bg-brand-light/30 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-brand-navy p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShieldCheck size={20} className="text-brand-primary" /> Identity Verification
            </h2>
            <p className="text-blue-200 text-sm mt-1">Complete these steps to unlock full features.</p>
          </div>
          
        </div>

        <div className="p-8 space-y-8">
          {/* Step 1: Personal Info */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h3 className="text-lg font-semibold text-brand-navy">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Date of Birth" type="date" id="dob" />
              <Input label="Street Address" placeholder="123 Main St" id="addr" />
              <Input label="City" placeholder="New York" id="city" />
              <Input label="Zip Code" placeholder="10001" id="zip" />
            </div>
          </motion.div>

          {/* Step 2: Document Upload */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h3 className="text-lg font-semibold text-brand-navy">Document Upload</h3>
            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
              Please upload a clear photo of your ID and a selfie. 
              <span className="font-semibold"> No flash, no blur.</span>
            </div>
            
            <div className="grid md:grid-cols-1 gap-6">
              <FileUpload 
                label="Government ID (Front)" 
                accept="image/*,.pdf"
                value={idFile}
                onChange={setIdFile} 
              />
              {/* <div className="space-y-1.5">
                <span className="text-sm font-medium text-brand-navy">Liveness Check</span>
                <button 
                  onClick={() => alert("Trigger Camera Logic")}
                  className="w-full h-[132px] border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center gap-2 text-slate-500 hover:bg-brand-light/50 hover:border-brand-primary hover:text-brand-primary transition-all"
                >
                  <Camera size={24} />
                  <span className="text-xs font-semibold">Take Selfie</span>
                </button>
              </div> */}
            </div>
          </motion.div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button 
                className="w-full mt-2" 
                onClick={() => onNext && onNext()}
              >
                Get Started
              </Button>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
