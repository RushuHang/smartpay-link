"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, DollarSign, Link as LinkIcon, Mail, User, Phone, Calendar, Bell, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components /ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const paymentLinkSchema = z
  .object({
    amount: z.string().min(1, "Amount is required"),
    currency: z.string().min(1, "Currency is required"),
    description: z.string().optional(),
    expiryAt: z.string().min(1, "Expiry date is required"),
    customerName: z.string().min(1, "Customer name is required"),
    customerEmail: z.string().optional(),
    customerPhone: z.string().optional(),
    allowPartialPayment: z.boolean().optional(),
    sendEmailNotification: z.boolean(),
    sendSMSNotification: z.boolean(),
  });

type FormValues = z.infer<typeof paymentLinkSchema>;

export default function PaymentDrawer({ isOpen, onClose }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(paymentLinkSchema),
    defaultValues: {
      currency: "NPR",
      sendEmailNotification: true,
      sendSMSNotification: false,
    },
  });

  const emailNotif = watch("sendEmailNotification");
  const smsNotif = watch("sendSMSNotification");

  const onSubmit = (data: FormValues) => {
    // Submit logic
    reset();
    onClose();
  };

  const inputBaseClass =
    "w-full bg-white border border-slate-200 text-brand-navy placeholder:text-slate-400 text-sm rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-light focus:border-brand-primary transition-all duration-200";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-navy/20 backdrop-blur-sm z-40"
          />

          {/* Drawer - w-full on mobile, max-w-xl on larger screens */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full sm:max-w-xl bg-slate-50 z-50 shadow-2xl flex flex-col border-l border-white/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 md:px-8 md:py-6 bg-white border-b border-slate-100">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-brand-navy tracking-tight">New Payment Link</h2>
                <p className="text-xs md:text-sm text-slate-500 mt-1">Create a secure transaction link</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-brand-light text-slate-400 hover:text-brand-primary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full overflow-hidden">
              {/* Body */}
              <div className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-6 space-y-6 md:space-y-8 scrollbar-thin scrollbar-thumb-slate-200">
                
                {/* ---------------- TRANSACTION DETAILS ---------------- */}
                <div className="space-y-4 md:space-y-5">
                  <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2 md:mb-4">Transaction Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-brand-navy mb-1.5 block">Amount</label>
                      <div className="relative group">
                        <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                        <input
                          type="number"
                          step="0.01"
                          {...register("amount")}
                          placeholder="0.00"
                          className={`${inputBaseClass} pl-10 py-3 font-medium`}
                        />
                      </div>
                      {errors.amount && <p className="text-xs text-red-500 mt-1.5">{errors.amount.message}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-brand-navy mb-1.5 block">Currency</label>
                      <select {...register("currency")} className={`${inputBaseClass} px-3 py-3 font-medium`}>
                        <option value="NPR">NPR</option>
                        <option value="EUR">EUR</option>
                        <option value="INR">INR</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-brand-navy mb-1.5 block">Link Expiry</label>
                    <div className="relative group">
                      <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                      <input type="datetime-local" {...register("expiryAt")} className={`${inputBaseClass} pl-10 py-3 text-slate-600`} />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-200 w-full" />

                {/* ---------------- CUSTOMER INFO ---------------- */}
                <div className="space-y-4 md:space-y-5">
                  <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2 md:mb-4">Customer Information</h3>

                  <div>
                    <label className="text-sm font-semibold text-brand-navy mb-1.5 block">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                      <input {...register("customerName")} placeholder="John Doe" className={`${inputBaseClass} pl-10 py-3`} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-brand-navy mb-1.5 block">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                        <input {...register("customerEmail")} placeholder="john@example.com" className={`${inputBaseClass} pl-10 py-3`} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-brand-navy mb-1.5 block">Phone Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                        <input {...register("customerPhone")} placeholder="+977 9800 000 000" className={`${inputBaseClass} pl-10 py-3`} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-200 w-full" />

                {/* ---------------- CONFIGURATION ---------------- */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="w-4 h-4 text-brand-primary" />
                    <h3 className="text-sm font-bold text-brand-navy">Notification Settings</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <label
                      className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
                        emailNotif ? "bg-brand-light border-brand-primary shadow-sm" : "bg-white border-slate-200 hover:border-brand-primary/50"
                      }`}
                    >
                      <input type="checkbox" {...register("sendEmailNotification")} className="hidden" />
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 ${
                          emailNotif ? "bg-brand-primary border-brand-primary" : "bg-slate-100 border-slate-300"
                        }`}
                      >
                        {emailNotif && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="text-sm font-medium text-brand-navy">Send Receipt via Email</span>
                    </label>

                    <label
                      className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
                        smsNotif ? "bg-brand-light border-brand-primary shadow-sm" : "bg-white border-slate-200 hover:border-brand-primary/50"
                      }`}
                    >
                      <input type="checkbox" {...register("sendSMSNotification")} className="hidden" />
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 ${
                          smsNotif ? "bg-brand-primary border-brand-primary" : "bg-slate-100 border-slate-300"
                        }`}
                      >
                        {smsNotif && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="text-sm font-medium text-brand-navy">Send Receipt via SMS</span>
                    </label>
                  </div>
                  
                  <div className="mt-4">
                    <label className="text-sm font-semibold text-brand-navy mb-1.5 block">Description</label>
                    <textarea rows={3} {...register("description")} className={`${inputBaseClass} py-3 resize-none`} />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-4 md:px-8 md:py-5 bg-white border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4">
                <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <Button type="submit" className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold">
                  Create Payment Link
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}