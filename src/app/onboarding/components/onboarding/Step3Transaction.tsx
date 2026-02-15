"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, TransactionFormData } from "@/lib/schemas/onboarding";
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
  DollarSign, 
  CreditCard, 
  BarChart3, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Check,
  Wallet,
  Landmark,
  ShoppingBag,
  Info
} from "lucide-react";

// --- Data Constants ---
const PAYMENT_METHODS = [
  { value: "cards", label: "Credit & Debit Cards", icon: CreditCard }, 
  { value: "bank_transfer", label: "Direct Bank Transfer", icon: Landmark },
  { value: "wallets", label: "Digital Wallets", icon: Wallet },
  { value: "bnpl", label: "Buy Now, Pay Later", icon: ShoppingBag },
];

const SETTLEMENT_OPTS = [
    { value: "daily", label: "Daily (T+1)" },
    { value: "weekly", label: "Weekly (Every Friday)" },
    { value: "monthly", label: "Monthly (1st of month)" },
];

// --- Enterprise Style Definitions ---
const inputBaseClass =
  "w-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm rounded-lg shadow-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 hover:border-slate-400 transition-all duration-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500";

const labelClass = "text-sm font-medium text-slate-700 mb-1.5 block";

const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none";

export function Step3Transaction() {
  const { formData, updateFormData, nextStep, previousStep } = useOnboarding();

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      monthlyTransactionVolume: (formData.monthlyTransactionVolume as number) || 0,
      averageTransactionValue: (formData.averageTransactionValue as number) || 0,
      maximumTransactionValue: (formData.maximumTransactionValue as number) || 0,
      paymentMethods: (formData.paymentMethods as any) || [],
      settlementPreference: (formData.settlementPreference as any) || "weekly",
    },
  });

  const paymentMethods = form.watch("paymentMethods");

  const onSubmit = (data: TransactionFormData) => {
    updateFormData(3, data);
    nextStep();
  };

  const togglePaymentMethod = (method: string) => {
    const current = form.getValues("paymentMethods") || [];
    // @ts-ignore - simplified type handling for the array toggle
    const updated = current.includes(method)
      ? current.filter((m: string) => m !== method)
      : [...current, method];
    
    // @ts-ignore
    form.setValue("paymentMethods", updated, { shouldValidate: true });
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      {/* Header Section */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Financial Profile</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-lg leading-relaxed">
           Configure your processing limits and settlement preferences. These settings affect your risk tier.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Section: Volumes */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Projected Volumes
              </h3>
            </div>

            {/* Monthly Volume */}
            <FormField
              control={form.control}
              name="monthlyTransactionVolume"
              render={({ field }) => (
                <FormItem>
                  <label className={labelClass}>
                    Est. Monthly Volume
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative group">
                    <DollarSign className={iconClass} />
                    <FormControl>
                      <input
                        type="number"
                        {...field}
                        placeholder="0.00"
                        className={`${inputBaseClass} pl-10 py-2.5`}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Average Transaction */}
              <FormField
                control={form.control}
                name="averageTransactionValue"
                render={({ field }) => (
                  <FormItem>
                    <label className={labelClass}>
                        Avg. Ticket Size
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative group">
                      <DollarSign className={iconClass} />
                      <FormControl>
                        <input
                          type="number"
                          {...field}
                          placeholder="0.00"
                          className={`${inputBaseClass} pl-10 py-2.5`}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                  </FormItem>
                )}
              />

              {/* Max Transaction */}
              <FormField
                control={form.control}
                name="maximumTransactionValue"
                render={({ field }) => (
                  <FormItem>
                    <label className={labelClass}>
                        Max. Ticket Size
                        <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative group">
                      <DollarSign className={iconClass} />
                      <FormControl>
                        <input
                          type="number"
                          {...field}
                          placeholder="0.00"
                          className={`${inputBaseClass} pl-10 py-2.5`}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
               <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
               <p className="text-xs text-slate-600 leading-relaxed">
                 Transactions exceeding the "Max Ticket Size" may trigger manual review or require additional authentication (3DS).
               </p>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          {/* Section: Payment Methods */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Payment Methods
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAYMENT_METHODS.map((method) => {
                // @ts-ignore
                const isSelected = paymentMethods?.includes(method.value);
                const Icon = method.icon;
                
                return (
                  <div
                    key={method.value}
                    onClick={() => togglePaymentMethod(method.value)}
                    className={`
                      relative flex items-center p-3.5 rounded-lg border cursor-pointer transition-all duration-200
                      ${isSelected 
                        ? "bg-slate-50 border-slate-900 ring-1 ring-slate-900 shadow-sm" 
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"}
                    `}
                  >
                    <div className={`p-2 rounded-md mr-3 transition-colors ${isSelected ? "bg-white text-slate-900 shadow-sm border border-slate-100" : "bg-slate-100 text-slate-500"}`}>
                        <Icon className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1">
                        <p className={`text-sm font-medium ${isSelected ? "text-slate-900" : "text-slate-600"}`}>
                            {method.label}
                        </p>
                    </div>

                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors
                        ${isSelected ? "bg-slate-900 border-slate-900" : "border-slate-300 bg-white"}
                    `}>
                         {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
            {form.formState.errors.paymentMethods && (
                <p className="text-xs text-red-600 font-medium mt-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    {form.formState.errors.paymentMethods.message}
                </p>
            )}
          </div>

          <div className="h-px bg-slate-100 w-full" />

          {/* Section: Settlement */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Settlement Schedule
              </h3>
            </div>

            <FormField
              control={form.control}
              name="settlementPreference"
              render={({ field }) => (
                <FormItem>
                  <label className={labelClass}>Payout Frequency</label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <div className="relative">
                         <Clock className={iconClass} />
                         <SelectTrigger className={`${inputBaseClass} pl-10 py-2.5 h-10`}>
                           <SelectValue placeholder="Select frequency" />
                         </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent className="bg-white border-slate-200 rounded-lg shadow-lg">
                      {SETTLEMENT_OPTS.map((opt) => (
                        <SelectItem 
                            key={opt.value} 
                            value={opt.value}
                            className="cursor-pointer py-2.5 text-sm focus:bg-slate-50 focus:text-slate-900"
                        >
                            {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs font-medium text-red-600 mt-1" />
                </FormItem>
              )}
            />
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