"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessInfoSchema, BusinessInfoFormData } from "@/lib/schemas/onboarding";
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
  Building2, 
  Briefcase, 
  FileText, 
  Store, 
  Globe, 
  ArrowRight,
  CheckCircle2,
  Info
} from "lucide-react";

// --- Data Constants ---
const BUSINESS_TYPES = [
  { value: "individual", label: "Individual / Sole Trader" },
  { value: "sole_proprietor", label: "Sole Proprietorship" },
  { value: "partnership", label: "General Partnership" },
  { value: "private_limited", label: "Private Limited Company (PLC)" },
  { value: "corporation", label: "C-Corporation" },
  { value: "non_profit", label: "Non-Profit Organization" },
];

const INDUSTRIES = [
  { value: "technology", label: "Technology & Software" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "services", label: "Professional Services" },
  { value: "manufacturing", label: "Manufacturing & Logistics" },
  { value: "finance", label: "Financial Services" },
  { value: "healthcare", label: "Healthcare & Biotech" },
  { value: "education", label: "Education & Training" },
  { value: "other", label: "Other" },
];

// --- Enterprise Style Definitions ---
// Uses a neutral slate border that darkens on hover, with a subtle specific ring on focus.
const inputBaseClass =
  "w-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm rounded-lg shadow-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 hover:border-slate-400 transition-all duration-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500";

const labelClass = "text-sm font-medium text-slate-700 mb-1.5 block flex items-center justify-between";

// Icons are centered vertically and colored neutrally
const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none";

export function Step1BusinessInfo() {
  const { formData, updateFormData, nextStep } = useOnboarding();

  const form = useForm<BusinessInfoFormData>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      legalBusinessName: (formData.legalBusinessName as string) || "",
      dbaName: (formData.dbaName as string) || "",
      businessType: (formData.businessType as any) || "individual",
      industryCategory: (formData.industryCategory as string) || "",
      businessDescription: (formData.businessDescription as string) || "",
    },
  });

  const onSubmit = (data: BusinessInfoFormData) => {
    updateFormData(1, data);
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      {/* Header Section */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Organization Profile</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-lg leading-relaxed">
          Please provide the legal details of your entity. This information will be verified against regulatory databases.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Section: Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Legal Identity
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {/* Legal Name */}
              <FormField
                control={form.control}
                name="legalBusinessName"
                render={({ field }) => (
                  <FormItem>
                    <label className={labelClass}>
                      Legal Business Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative group">
                      <Briefcase className={iconClass} />
                      <FormControl>
                        <input
                          {...field}
                          placeholder="e.g. Acme Corporation Inc."
                          className={`${inputBaseClass} pl-10 py-2.5`}
                        />
                      </FormControl>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Must match your incorporation documents.</p>
                    <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                  </FormItem>
                )}
              />
              <div></div>

              {/* DBA Name */}
              <FormField
                control={form.control}
                name="dbaName"
                render={({ field }) => (
                  <FormItem>
                    <label className={labelClass}>
                      Brand / Shop / Business Name (if different from registered name)
                    </label>
                    <div className="relative group">
                      <Store className={iconClass} />
                      <FormControl>
                        <input
                          {...field}
                          placeholder="e.g. Acme Shop"
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

          {/* Section: Classification */}
          <div className="space-y-6">
             <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Entity Classification
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Type */}
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <label className={labelClass}>
                      Business Structure
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <CheckCircle2 className={iconClass} />
                          <SelectTrigger className={`${inputBaseClass} pl-10 py-2.5 h-10`}>
                            <SelectValue placeholder="Select legal structure" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent className="bg-white border border-slate-200 rounded-lg shadow-lg">
                        {BUSINESS_TYPES.map((type) => (
                          <SelectItem 
                            key={type.value} 
                            value={type.value}
                            className="cursor-pointer py-2.5 text-sm focus:bg-slate-50 focus:text-slate-900"
                          >
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                  </FormItem>
                )}
              />

              {/* Industry */}
              <FormField
                control={form.control}
                name="industryCategory"
                render={({ field }) => (
                  <FormItem>
                    <label className={labelClass}>
                      Industry Sector
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <Building2 className={iconClass} />
                          <SelectTrigger className={`${inputBaseClass} pl-10 py-2.5 h-10`}>
                            <SelectValue placeholder="Select primary industry" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent className="bg-white border border-slate-200 rounded-lg shadow-lg">
                        {INDUSTRIES.map((industry) => (
                          <SelectItem 
                            key={industry.value} 
                            value={industry.value}
                            className="cursor-pointer py-2.5 text-sm focus:bg-slate-50 focus:text-slate-900"
                          >
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="businessDescription"
              render={({ field }) => (
                <FormItem>
                  <label className={labelClass}>
                    Operational Description
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative group">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                    <FormControl>
                      <textarea
                        {...field}
                        rows={4}
                        placeholder="Briefly describe the nature of your business and primary source of funds..."
                        className={`${inputBaseClass} pl-10 py-2.5 resize-none min-h-[100px] leading-relaxed`}
                      />
                    </FormControl>
                  </div>
                  {/* <div className="flex items-start gap-1.5 mt-2 text-slate-500">
                    <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] leading-tight">This description helps us comply with KYC regulations regarding merchant activities.</p>
                  </div> */}
                  <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-6 flex justify-end items-center gap-4">
             <Button 
               type="button" 
               variant="ghost" 
               className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
             >
               Save as Draft
             </Button>
            <Button 
              type="submit" 
              // className="px-6 py-2.5 h-10 rounded-lg text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all focus:ring-2 focus:ring-slate-900/20 focus:ring-offset-2 flex items-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}