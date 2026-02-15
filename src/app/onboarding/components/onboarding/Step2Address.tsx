"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";

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
  MapPin, 
  Globe, 
  Building, 
  Flag, 
  Hash, 
  Link as LinkIcon, 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  Check,
  Navigation,
  Info
} from "lucide-react";
import { z } from "zod";

// --- Types ---
export type AddressFormData = {
  registeredAddress: string;
  operatingAddress: string;
  sameAsRegistered: boolean; // always boolean
  country: string;
  state: string;
  city: string;
  postalCode: string;
  productServiceDescription: string;
  websiteUrl?: string; // optional
};

// --- Zod Schema ---
export const addressSchema = z.object({
  registeredAddress: z.string().min(5, "Registered address is required"),
  operatingAddress: z.string().min(5, "Operating address is required"),
  sameAsRegistered: z.boolean().default(false), 
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  // Note: .nullish() or .optional() works better with .or(z.literal("")) for empty inputs
  websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  productServiceDescription: z
    .string()
    .min(10, "Product/service description must be at least 10 characters"),
});




// --- Constants ---
const COUNTRIES = [{ value: "nepal", label: "Nepal" }];
const inputBaseClass =
  "w-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm rounded-lg shadow-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 hover:border-slate-400 transition-all duration-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500";
const labelClass = "text-sm font-medium text-slate-700 mb-1.5 block";
const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none";

// --- Component ---
export function Step2Address() {
  const { formData, updateFormData, nextStep, previousStep } = useOnboarding();

  // --- React Hook Form ---
const form = useForm<AddressFormData>({
  resolver: zodResolver(addressSchema) as Resolver<AddressFormData>,
  defaultValues: {
    registeredAddress: formData.registeredAddress || "",
    operatingAddress: formData.operatingAddress || "",
    sameAsRegistered: formData.sameAsRegistered ?? false,
    country: formData.country || "nepal",
    state: formData.state || "",
    city: formData.city || "",
    postalCode: formData.postalCode || "",
    websiteUrl: formData.websiteUrl || "",
    productServiceDescription: formData.productServiceDescription || "",
  },
});



  const sameAsRegistered = form.watch("sameAsRegistered");

  const onSubmit = (data: AddressFormData) => {
    updateFormData(2, data);
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      {/* Header Section */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
          Location & Presence
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-lg leading-relaxed">
          Verify your physical operating locations and online presence for regulatory compliance.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Physical Address */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Physical Address
              </h3>
            </div>

            {/* Registered Address */}
            <FormField
              control={form.control}
              name="registeredAddress"
              render={({ field }) => (
                <FormItem>
                  <label className={labelClass}>
                    Registered Office Address
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative group">
                    <Building className={iconClass} />
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Street address, suite, unit (e.g. 123 Corporate Blvd)"
                        className={`${inputBaseClass} pl-10 py-2.5`}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                </FormItem>
              )}
            />

            {/* Same as Registered */}
            <FormField
              control={form.control}
              name="sameAsRegistered"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                        field.value 
                          ? "bg-slate-50 border-slate-400" 
                          : "bg-white border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={field.value}
                        onChange={field.onChange}
                        className="hidden" 
                      />
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${
                          field.value 
                            ? "bg-slate-900 border-slate-900" 
                            : "bg-white border-slate-300"
                        }`}
                      >
                        {field.value && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        Operating address is same as registered address
                      </span>
                    </label>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Operating Address */}
            {!sameAsRegistered && (
              <FormField
                control={form.control}
                name="operatingAddress"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className={labelClass}>
                      Operating Address
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative group">
                      <MapPin className={iconClass} />
                      <FormControl>
                        <input
                          {...field}
                          placeholder="Storefront or branch address"
                          className={`${inputBaseClass} pl-10 py-2.5`}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                  </FormItem>
                )}
              />
            )}

            {/* Country / Postal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <label className={labelClass}>
                      Country
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <Flag className={iconClass} />
                          <SelectTrigger className={`${inputBaseClass} pl-10 py-2.5 h-10`}>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent className="bg-white border-slate-200 rounded-lg shadow-lg">
                        {COUNTRIES.map((c) => (
                          <SelectItem 
                            key={c.value} 
                            value={c.value}
                            className="cursor-pointer py-2.5 text-sm focus:bg-slate-50 focus:text-slate-900"
                          >
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                  </FormItem>
                )}
              />

              {/* Postal */}
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <label className={labelClass}>
                      Postal / Zip Code
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative group">
                      <Hash className={iconClass} />
                      <FormControl>
                        <input
                          {...field}
                          placeholder="e.g. 44600"
                          className={`${inputBaseClass} pl-10 py-2.5`}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* State / City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* State */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <label className={labelClass}>
                      State / Province
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative group">
                      <Navigation className={iconClass} />
                      <FormControl>
                        <input
                          {...field}
                          placeholder="e.g. Bagmati"
                          className={`${inputBaseClass} pl-10 py-2.5`}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                  </FormItem>
                )}
              />

              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <label className={labelClass}>
                      City
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative group">
                      <MapPin className={iconClass} />
                      <FormControl>
                        <input
                          {...field}
                          placeholder="e.g. Kathmandu"
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

          {/* Online Presence */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Online Presence
              </h3>
            </div>

            {/* Website */}
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <label className={labelClass}>
                    Website URL <span className="text-slate-400 font-normal ml-1">(Optional)</span>
                  </label>
                  <div className="relative group">
                    <LinkIcon className={iconClass} />
                    <FormControl>
                      <input
                        {...field}
                        placeholder="https://example.com"
                        className={`${inputBaseClass} pl-10 py-2.5`}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="productServiceDescription"
              render={({ field }) => (
                <FormItem>
                  <label className={labelClass}>
                    Product / Service Details
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative group">
                    <FileText className={`${iconClass} top-3`} />
                    <FormControl>
                      <textarea
                        {...field}
                        rows={3}
                        placeholder="Provide details about the goods or services sold..."
                        className={`${inputBaseClass} pl-10 py-2.5 resize-none min-h-[100px] leading-relaxed`}
                      />
                    </FormControl>
                  </div>
                  <div className="flex items-start gap-1.5 mt-2 text-slate-500">
                    <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] leading-tight">Used to categorize your business risk profile.</p>
                  </div>
                  <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Footer */}
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
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
