"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { agreementsSchema, AgreementsFormData } from "@/lib/schemas/onboarding";
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
  Loader2, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  BarChart3, 
  Landmark, 
  FileCheck,
  ArrowLeft,
  ShieldCheck,
  ScrollText,
  AlertCircle,
  FileText
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Step7Review() {
  const { formData, previousStep } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const form = useForm<AgreementsFormData>({
    resolver: zodResolver(agreementsSchema),
    defaultValues: {
      merchantAgreement: false,
      privacyPolicy: false,
      informationAccuracy: false,
    },
  });

  const onSubmit = async (data: AgreementsFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsComplete(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Success State ---
  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center max-w-lg mx-auto">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Application Submitted</h2>
        
        <p className="text-slate-500 mb-8 leading-relaxed text-sm">
          Thank you for completing your merchant onboarding. We have received your application and our compliance team will review it within <span className="font-semibold text-slate-900">2-3 business days</span>.
        </p>
        
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 w-full mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </div>
                <div className="text-left">
                    <p className="text-xs text-slate-500 font-medium">Current Status</p>
                    <p className="text-sm font-bold text-slate-900">Under Review</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-xs text-slate-500 font-medium">Ref ID</p>
                <p className="text-sm font-mono text-slate-900">APP-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
        </div>

       <Link href="/dashboard" passHref className="w-full">
         <Button className="w-full py-2.5 h-11 rounded-lg text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all">
           Go to Dashboard
         </Button>
       </Link>
      </div>
    );
  }

  // --- Summary Card Helper ---
  const SummarySection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm mb-6 last:mb-0">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
        <Icon className="w-4 h-4 text-slate-500" />
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">{title}</h3>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
        {children}
      </div>
    </div>
  );

  const SummaryRow = ({ label, value }: { label: string, value: string | number | undefined }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 border-b border-slate-100 last:border-0 sm:border-0">
        <span className="text-xs text-slate-500 font-medium">{label}</span>
        <span className="text-sm text-slate-900 font-medium text-left sm:text-right truncate max-w-full sm:max-w-[70%]">
            {value || <span className="text-slate-400 italic">Not provided</span>}
        </span>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-6">
      {/* Header */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Review & Submit</h2>
        <p className="text-sm text-slate-500 mt-1">
          Please verify all information below. By submitting, you confirm the details are accurate and agree to our terms.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* --- Summary Data --- */}
            <div>
                <SummarySection title="Business Profile" icon={Building2}>
                    <SummaryRow label="Legal Name" value={formData.legalBusinessName as string} />
                    <SummaryRow label="DBA Name" value={formData.dbaName as string} />
                    <SummaryRow label="Entity Type" value={(formData.businessType as string)?.replace("_", " ").toUpperCase()} />
                    <SummaryRow label="Industry" value={formData.industryCategory as string} />
                </SummarySection>

                <SummarySection title="Registered Address" icon={MapPin}>
                    <SummaryRow label="Street" value={formData.registeredAddress as string} />
                    <SummaryRow label="City" value={formData.city as string} />
                    <SummaryRow label="State/Province" value={formData.state as string} />
                    <SummaryRow label="Country" value={formData.country as string} />
                </SummarySection>

                <SummarySection title="Financial Profile" icon={BarChart3}>
                    <SummaryRow label="Monthly Volume" value={formData.monthlyTransactionVolume ? `$${Number(formData.monthlyTransactionVolume).toLocaleString()}` : undefined} />
                    <SummaryRow label="Avg Ticket Size" value={formData.averageTransactionValue ? `$${Number(formData.averageTransactionValue).toLocaleString()}` : undefined} />
                    <SummaryRow label="Settlement Frequency" value={(formData.settlementPreference as string)?.toUpperCase()} />
                </SummarySection>

                <SummarySection title="Banking Information" icon={Landmark}>
                    <SummaryRow label="Account Holder" value={formData.accountHolderName as string} />
                    <SummaryRow label="Bank Name" value={formData.bankName as string} />
                    <SummaryRow label="Account Number" value={`•••• •••• ${(formData.accountNumber as string)?.slice(-4) || ""}`} />
                    <SummaryRow label="SWIFT/Routing" value={(formData.swiftRoutingCode as string)?.toUpperCase()} />
                </SummarySection>
            </div>

            <div className="h-px bg-slate-200 w-full" />

            {/* --- Agreements --- */}
            <div className="space-y-5">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                        <ScrollText className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                        Legal Agreements
                    </h3>
                </div>

                <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <FormField
                        control={form.control}
                        name="merchantAgreement"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-row items-start space-x-3">
                                    <FormControl>
                                        <input 
                                            type="checkbox" 
                                            checked={field.value}
                                            onChange={field.onChange}
                                            className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <label className="text-sm font-medium text-slate-900">
                                            Accept Merchant Service Agreement
                                        </label>
                                        <p className="text-xs text-slate-500 leading-snug">
                                            I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Fee Schedule</a>.
                                        </p>
                                    </div>
                                </div>
                                <FormMessage className="text-xs text-red-600 mt-1 pl-7" />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="privacyPolicy"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex flex-row items-start space-x-3">
                                    <FormControl>
                                        <input 
                                            type="checkbox" 
                                            checked={field.value}
                                            onChange={field.onChange}
                                            className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <label className="text-sm font-medium text-slate-900">
                                            Accept Privacy Policy
                                        </label>
                                        <p className="text-xs text-slate-500 leading-snug">
                                            I acknowledge that data will be processed according to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                                        </p>
                                    </div>
                                </div>
                                <FormMessage className="text-xs text-red-600 mt-1 pl-7" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="informationAccuracy"
                        render={({ field }) => (
                             <FormItem>
                                <div className="flex flex-row items-start space-x-3">
                                    <FormControl>
                                        <input 
                                            type="checkbox" 
                                            checked={field.value}
                                            onChange={field.onChange}
                                            className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <label className="text-sm font-medium text-slate-900">
                                            Certification of Accuracy
                                        </label>
                                        <p className="text-xs text-slate-500 leading-snug">
                                            I certify that I am authorized to act on behalf of the entity and that all information provided is accurate.
                                        </p>
                                    </div>
                                </div>
                                <FormMessage className="text-xs text-red-600 mt-1 pl-7" />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-6 flex items-center justify-between border-t border-slate-100 mt-8">
                <Button
                    type="button"
                    onClick={previousStep}
                    disabled={isSubmitting}
                    variant="ghost"
                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-2"
                >
                <ArrowLeft className="w-4 h-4" />
                Back
                </Button>
                
                <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    // className="px-8 py-2.5 h-11 rounded-lg text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 transition-all flex items-center gap-2 min-w-[180px] justify-center"
                >
                {isSubmitting ? (
                    <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                    </>
                ) : (
                    <>
                    Submit Application
                    <ShieldCheck className="w-4 h-4" />
                    </>
                )}
                </Button>
            </div>
        </form>
      </Form>
    </div>
  );
}