"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankAccountSchema, BankAccountFormData } from "@/lib/schemas/onboarding";
import { useOnboarding } from "@/context/OnboardingContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { 
  Landmark, 
  User, 
  CreditCard, 
  Globe, 
  UploadCloud, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  FileText,
  Building2,
  AlertCircle
} from "lucide-react";
import { useState, ChangeEvent } from "react";

const MAJOR_BANKS =  [
  "Nepal Bank Limited",
  "Rastriya Banijya Bank",
  "Nabil Bank",
  "Standard Chartered Bank Nepal",
  "Himalayan Bank",
  "Everest Bank",
  "NIC Asia Bank",
  "Siddhartha Bank",
  "Global IME Bank",
  "Other"
];

// --- Enterprise Style Definitions ---
const inputBaseClass =
  "w-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm rounded-lg shadow-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 hover:border-slate-400 transition-all duration-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500";

const labelClass = "text-sm font-medium text-slate-700 mb-1.5 block";

const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none";

export function Step6BankAccount() {
  const { formData, updateFormData, nextStep, previousStep } = useOnboarding();
  const [bankStatementFile, setBankStatementFile] = useState<File | null>(null);

  const form = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      accountHolderName: (formData.accountHolderName as string) || "",
      bankName: (formData.bankName as string) || "",
      accountNumber: (formData.accountNumber as string) || "",
      swiftRoutingCode: (formData.swiftRoutingCode as string) || "",
    },
  });

  const onSubmit = (data: BankAccountFormData) => {
    // Mocking the file upload state for form submission
    const submitData = {
      ...data,
      bankStatement: bankStatementFile ? "uploaded" : "",
    };
    updateFormData(6, submitData);
    nextStep();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBankStatementFile(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      {/* Header Section */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Settlement Account</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-lg leading-relaxed">
          Designate the primary bank account for receiving payouts. This account must be registered in the company's name.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Section: Account Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                <Landmark className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Banking Information
              </h3>
            </div>

            {/* Bank Name */}
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <label className={labelClass}>
                    Bank Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <div className="relative group">
                        <Building2 className={iconClass} />
                        <SelectTrigger className={`${inputBaseClass} pl-10 py-2.5 h-10`}>
                          <SelectValue placeholder="Select your bank" />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent className="bg-white border-slate-200 rounded-lg shadow-lg">
                      {MAJOR_BANKS.map((bank) => (
                        <SelectItem 
                          key={bank} 
                          value={bank}
                          className="cursor-pointer py-2.5 text-sm focus:bg-slate-50 focus:text-slate-900"
                        >
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                </FormItem>
              )}
            />

            {/* Account Holder */}
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <label className={labelClass}>
                    Account Holder Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative group">
                    <User className={iconClass} />
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Must match company legal name"
                        className={`${inputBaseClass} pl-10 py-2.5`}
                      />
                    </FormControl>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Payouts cannot be settled to personal accounts for business entities.
                  </p>
                  <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="h-px bg-slate-100 w-full" />

          {/* Section: Banking Coordinates */}
          <div className="space-y-6">
             <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Account Coordinates
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Number */}
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <label className={labelClass}>
                      Account Number / IBAN
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative group">
                      <CreditCard className={iconClass} />
                      <FormControl>
                        <input
                          {...field}
                          placeholder="e.g. 0000 0000 0000"
                          className={`${inputBaseClass} pl-10 py-2.5 font-mono`}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                  </FormItem>
                )}
              />

              {/* SWIFT */}
              <FormField
                control={form.control}
                name="swiftRoutingCode"
                render={({ field }) => (
                  <FormItem>
                    <label className={labelClass}>
                      SWIFT / Routing Code
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative group">
                      <Globe className={iconClass} />
                      <FormControl>
                        <input
                          {...field}
                          placeholder="e.g. BOFAUS3N"
                          className={`${inputBaseClass} pl-10 py-2.5 uppercase font-mono`}
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

          {/* Section: Verification */}
          <div className="space-y-6">
             <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Bank Proof
              </h3>
            </div>

            <div>
              <label className={labelClass}>
                Bank Statement / Voided Check
                <span className="text-red-500 ml-1">*</span>
              </label>
              
              <div className="relative mt-2">
                 <input 
                  id="bank-statement-upload"
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange} 
                  accept=".pdf,.doc,.docx,.jpg,.png" 
                />
                
                {!bankStatementFile ? (
                  <label 
                    htmlFor="bank-statement-upload"
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
                          <p className="text-sm font-medium text-slate-900 truncate max-w-[200px]">{bankStatementFile.name}</p>
                          <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Ready for verification
                          </p>
                       </div>
                    </div>
                    <label 
                      htmlFor="bank-statement-upload" 
                      className="text-xs font-medium text-slate-500 hover:text-slate-900 cursor-pointer px-3 py-1.5 rounded-md hover:bg-slate-200/50 transition-colors"
                    >
                      Replace
                    </label>
                  </div>
                )}
              </div>
              
              {form.formState.isSubmitted && !bankStatementFile && (
                 <p className="text-xs text-red-600 font-medium mt-2 flex items-center gap-1.5 animate-in slide-in-from-top-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Please upload a bank statement to proceed.
                 </p>
              )}
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