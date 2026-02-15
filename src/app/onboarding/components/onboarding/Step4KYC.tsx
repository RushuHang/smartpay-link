"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kycSchema, KYCFormData } from "@/lib/schemas/onboarding";
import { useOnboarding } from "@/context/OnboardingContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { 
  UploadCloud, 
  FileText, 
  ShieldCheck, 
  Hash, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  FileBadge,
  AlertCircle,
  File
} from "lucide-react";
import { useState, ChangeEvent } from "react";

// --- Enterprise Style Definitions ---
const inputBaseClass =
  "w-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm rounded-lg shadow-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 hover:border-slate-400 transition-all duration-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500";

const labelClass = "text-sm font-medium text-slate-700 mb-1.5 block";

const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none";

export function Step4KYC() {
  const { formData, updateFormData, nextStep, previousStep } = useOnboarding();
  
  // Local state for file previews/names (Mocking file upload behavior)
  const [certFile, setCertFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);

  const form = useForm<KYCFormData>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      businessRegistrationNumber: (formData.businessRegistrationNumber as string) || "",
      taxIdentificationNumber: (formData.taxIdentificationNumber as string) || "",
    },
  });

  const onSubmit = (data: KYCFormData) => {
    // In a real app, you would handle file uploads to S3/Blob storage here
    const submitData = {
      ...data,
      incorporationCertificate: certFile ? "uploaded" : "",
      businessLicense: licenseFile ? "uploaded" : "",
    };
    updateFormData(4, submitData);
    nextStep();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fileType: "cert" | "license") => {
    const file = e.target.files?.[0];
    if (file) {
        if (fileType === "cert") setCertFile(file);
        else setLicenseFile(file);
    }
  };

  // --- Enterprise Upload Component ---
  const UploadBox = ({ 
    label, 
    file, 
    onChange, 
    required = false,
    id
  }: { 
    label: string, 
    file: File | null, 
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    id: string
  }) => (
    <div className="space-y-2">
      <label className={labelClass}>
        {label} {required ? <span className="text-red-500 ml-1">*</span> : <span className="text-slate-400 font-normal ml-1">(Optional)</span>}
      </label>
      
      <div className="relative">
        <input 
          id={id}
          type="file" 
          className="hidden" 
          onChange={onChange} 
          accept=".pdf,.doc,.docx,.jpg,.png" 
        />
        
        {!file ? (
          <label 
            htmlFor={id}
            className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-slate-300 rounded-lg bg-slate-50/50 hover:bg-slate-50 hover:border-slate-400 cursor-pointer transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
              <UploadCloud className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
            </div>
            <p className="text-sm font-medium text-slate-900">
              <span className="text-blue-600 hover:underline">Click to upload</span> or drag and drop
            </p>
            <p className="text-[11px] text-slate-400 mt-1">PDF, JPG or PNG (Max 5MB)</p>
          </label>
        ) : (
          <div className="flex items-center justify-between w-full p-4 border border-emerald-200 bg-emerald-50/30 rounded-lg group">
            <div className="flex items-center gap-3 overflow-hidden">
               <div className="w-10 h-10 rounded-lg bg-white border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600">
                  <FileText className="w-5 h-5" />
               </div>
               <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate max-w-[200px]">{file.name}</p>
                  <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ready for verification
                  </p>
               </div>
            </div>
            <label 
              htmlFor={id} 
              className="text-xs font-medium text-slate-500 hover:text-slate-900 cursor-pointer px-3 py-1.5 rounded-md hover:bg-slate-200/50 transition-colors"
            >
              Replace
            </label>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto py-6">
      {/* Header Section */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Business Verification</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-lg leading-relaxed">
          Submit official documentation to verify your legal entity. All documents are encrypted and stored securely.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Section: Registration Identifiers */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                <Hash className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Registration Details
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Registration Number */}
              <FormField
                control={form.control}
                name="businessRegistrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <label className={labelClass}>
                      Registration No.
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative group">
                      <FileBadge className={iconClass} />
                      <FormControl>
                        <input
                          {...field}
                          placeholder="e.g. 123456789"
                          className={`${inputBaseClass} pl-10 py-2.5`}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                  </FormItem>
                )}
              />

              {/* Tax ID */}
              <FormField
                control={form.control}
                name="taxIdentificationNumber"
                render={({ field }) => (
                  <FormItem>
                    <label className={labelClass}>
                      Tax ID (PAN/VAT)
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative group">
                      <ShieldCheck className={iconClass} />
                      <FormControl>
                        <input
                          {...field}
                          placeholder="e.g. 600000001"
                          className={`${inputBaseClass} pl-10 py-2.5`}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          {/* Section: Document Uploads */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Document Evidence
              </h3>
            </div>

            {/* Incorporation Cert */}
            <div>
              <UploadBox 
                id="cert-upload"
                label="Certificate of Incorporation" 
                file={certFile}
                onChange={(e) => handleFileChange(e, "cert")}
                required
              />
              {form.formState.isSubmitted && !certFile && (
                 <p className="text-xs text-red-600 font-medium mt-2 flex items-center gap-1.5 animate-in slide-in-from-top-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Please upload the certificate to proceed.
                 </p>
              )}
            </div>

            {/* Business License */}
            <div>
              <UploadBox 
                id="license-upload"
                label="Business License / Tax Certificate" 
                file={licenseFile}
                onChange={(e) => handleFileChange(e, "license")}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 flex items-center justify-between border-t border-slate-100 mt-8">
            <Button
              type="button"
              onClick={previousStep}
              variant="ghost"
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            <Button 
              type="submit" 
              // className="px-6 py-2.5 h-10 rounded-lg text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all focus:ring-2 focus:ring-slate-900/20 focus:ring-offset-2 flex items-center gap-2"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}