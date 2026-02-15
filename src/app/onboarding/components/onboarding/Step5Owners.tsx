"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ownersSchema, OwnersFormData } from "@/lib/schemas/onboarding";
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
  User, 
  Percent, 
  Calendar, 
  Flag, 
  Mail, 
  Phone, 
  Trash2, 
  Plus, 
  UploadCloud, 
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Fingerprint,
  FileBadge
} from "lucide-react";
import { useState, ChangeEvent } from "react";

// --- Enterprise Style Definitions ---
const inputBaseClass =
  "w-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm rounded-lg shadow-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 hover:border-slate-400 transition-all duration-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500";

const labelClass = "text-sm font-medium text-slate-700 mb-1.5 block";

const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none";

export function Step5Owners() {
  const { formData, updateFormData, nextStep, previousStep } = useOnboarding();
  
  // Local state for file previews (Base64 strings for simplicity in this demo)
  const [ownerFiles, setOwnerFiles] = useState<Record<number, string>>({});

  const initialOwners = (formData.owners as any) || [
    { fullName: "", ownershipPercentage: 0, dateOfBirth: "", nationality: "", governmentIdNumber: "", email: "", phoneNumber: "" },
  ];

  const form = useForm<OwnersFormData>({
    resolver: zodResolver(ownersSchema),
    defaultValues: {
      owners: initialOwners,
    },
  });

  // Watch owners to map over them
  const owners = form.watch("owners");

  const onSubmit = (data: OwnersFormData) => {
    const submitData = {
      owners: data.owners.map((owner, idx) => ({
        ...owner,
        governmentIdDocument: ownerFiles[idx] || "",
      })),
    };
    updateFormData(5, submitData);
    nextStep();
  };

  const addOwner = () => {
    const currentOwners = form.getValues("owners");
    form.setValue("owners", [
      ...currentOwners,
      {
        fullName: "",
        ownershipPercentage: 0,
        dateOfBirth: "",
        nationality: "",
        governmentIdNumber: "",
        email: "",
        phoneNumber: "",
        governmentIdDocument: "",
      },
    ]);
  };

  const removeOwner = (index: number) => {
    const currentOwners = form.getValues("owners");
    form.setValue(
      "owners",
      currentOwners.filter((_, i) => i !== index),
    );
    const newFiles = { ...ownerFiles };
    delete newFiles[index];
    setOwnerFiles(newFiles);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setOwnerFiles((prev) => ({ ...prev, [index]: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      {/* Header Section */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Beneficial Owners</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-lg leading-relaxed">
          Please provide details for all individuals who own 25% or more of the company, or exercise significant control.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="space-y-6">
            {owners.map((owner, index) => (
              <div 
                key={index} 
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative transition-all duration-300 hover:shadow-md"
              >
                {/* Card Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">Owner / Director Profile</h3>
                  </div>
                  
                  {owners.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => removeOwner(index)} 
                      className="text-slate-400 hover:text-red-600 hover:bg-red-50 h-8 px-3 rounded-lg transition-colors text-xs font-medium flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </Button>
                  )}
                </div>

                <div className="space-y-5">
                  {/* Row 1: Name & Equity */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    <div className="md:col-span-8">
                      <FormField
                        control={form.control}
                        name={`owners.${index}.fullName`}
                        render={({ field }) => (
                          <FormItem>
                            <label className={labelClass}>
                              Full Legal Name
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative group">
                              <User className={iconClass} />
                              <FormControl>
                                <input {...field} placeholder="e.g. Johnathan Doe" className={`${inputBaseClass} pl-10 py-2.5`} />
                              </FormControl>
                            </div>
                            <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="md:col-span-4">
                      <FormField
                        control={form.control}
                        name={`owners.${index}.ownershipPercentage`}
                        render={({ field }) => (
                          <FormItem>
                            <label className={labelClass}>
                              Ownership
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative group">
                              <Percent className={iconClass} />
                              <FormControl>
                                <input type="number" {...field} placeholder="0" className={`${inputBaseClass} pl-10 py-2.5`} />
                              </FormControl>
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                %
                              </span>
                            </div>
                            <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Row 2: Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name={`owners.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <label className={labelClass}>
                            Email Address
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <div className="relative group">
                            <Mail className={iconClass} />
                            <FormControl>
                              <input type="email" {...field} placeholder="john@company.com" className={`${inputBaseClass} pl-10 py-2.5`} />
                            </FormControl>
                          </div>
                          <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`owners.${index}.phoneNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <label className={labelClass}>Phone Number</label>
                          <div className="relative group">
                            <Phone className={iconClass} />
                            <FormControl>
                              <input {...field} placeholder="+1 234 567 890" className={`${inputBaseClass} pl-10 py-2.5`} />
                            </FormControl>
                          </div>
                          <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 3: Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <FormField
                      control={form.control}
                      name={`owners.${index}.dateOfBirth`}
                      render={({ field }) => (
                        <FormItem>
                          <label className={labelClass}>Date of Birth</label>
                          <div className="relative group">
                            <Calendar className={iconClass} />
                            <FormControl>
                              <input type="date" {...field} className={`${inputBaseClass} pl-10 py-2.5 text-slate-600`} />
                            </FormControl>
                          </div>
                          <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name={`owners.${index}.nationality`}
                      render={({ field }) => (
                        <FormItem>
                          <label className={labelClass}>Nationality</label>
                          <div className="relative group">
                            <Flag className={iconClass} />
                            <FormControl>
                              <input {...field} placeholder="e.g. United States" className={`${inputBaseClass} pl-10 py-2.5`} />
                            </FormControl>
                          </div>
                          <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="h-px bg-slate-100 w-full my-2" />

                  {/* Row 4: ID & Upload */}
                  <div className="grid grid-cols-1 gap-5">
                    <FormField
                      control={form.control}
                      name={`owners.${index}.governmentIdNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <label className={labelClass}>Government ID Number</label>
                          <div className="relative group">
                            <Fingerprint className={iconClass} />
                            <FormControl>
                              <input {...field} placeholder="Passport No. or National ID" className={`${inputBaseClass} pl-10 py-2.5`} />
                            </FormControl>
                          </div>
                          <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                        </FormItem>
                      )}
                    />

                    <div>
                      <label className={labelClass}>
                        Upload ID Document
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <label 
                        className={`
                          relative flex items-center justify-between w-full p-4 
                          border border-dashed rounded-lg cursor-pointer transition-all duration-200 group
                          ${ownerFiles[index] 
                            ? "border-emerald-200 bg-emerald-50/30" 
                            : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"}
                        `}
                      >
                         {ownerFiles[index] ? (
                           <div className="flex items-center gap-3 w-full">
                             <div className="w-10 h-10 rounded-lg bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                               <FileBadge className="w-5 h-5" />
                             </div>
                             <div className="flex-1">
                               <p className="text-sm font-medium text-slate-900">Document Attached</p>
                               <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                                 <CheckCircle2 className="w-3 h-3" /> Ready for review
                               </p>
                             </div>
                             <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-sm">
                               Replace
                             </span>
                           </div>
                         ) : (
                           <div className="flex items-center gap-4 w-full">
                             <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                               <UploadCloud className="w-5 h-5" />
                             </div>
                             <div className="flex-1">
                               <p className="text-sm font-medium text-slate-900">
                                 Upload Passport or ID
                               </p>
                               <p className="text-xs text-slate-500">JPG, PNG or PDF (Max 5MB)</p>
                             </div>
                             <div className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-sm opacity-90 group-hover:opacity-100">
                               Select File
                             </div>
                           </div>
                         )}
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => handleFileChange(e, index)} 
                          accept=".pdf,.doc,.docx,.jpg,.png" 
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Owner Button */}
          <Button 
            type="button" 
            onClick={addOwner}
            variant="outline"
            className="w-full py-8 border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all flex flex-col items-center justify-center gap-2 h-auto"
          >
            <div className="p-1.5 rounded-full bg-slate-200 group-hover:bg-slate-300 transition-colors">
               <Plus className="w-4 h-4" />
            </div>
            <span className="font-semibold text-sm">Add Another Beneficial Owner</span>
          </Button>

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
              className="px-6 py-2.5 h-10 rounded-lg text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all focus:ring-2 focus:ring-slate-900/20 focus:ring-offset-2 flex items-center gap-2"
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