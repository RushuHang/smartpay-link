"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, User, Shield, Activity, BarChart3 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components /ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// ✅ Zod v4 compatible schema
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  role: z.enum(["Merchant", "User"], {
    message: "Please select a role",
  }),

  status: z.enum(["Active", "Suspended", "Pending"], {
    message: "Please select a status",
  }),

transactions: z
  .number()
  .min(0, "Transactions cannot be negative"),


});

type FormValues = z.output<typeof userSchema>;

export default function UserDrawer({ isOpen, onClose }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "User",
      status: "Active",
      transactions: 0,
    },
  });

  const onSubmit = (data: FormValues) => {
    const id = crypto.randomUUID();

    const newUser = {
      id,
      ...data,
    };

    sessionStorage.setItem(`user-${id}`, JSON.stringify(newUser));

    reset();
    onClose();

    router.push(`/dashboard/users/${id}`);
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
            className="fixed inset-0 bg-brand-navy/20  z-40"
          />

          {/* Drawer */}
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
                <h2 className="text-lg md:text-xl font-bold text-brand-navy tracking-tight">
                  New User
                </h2>
                <p className="text-xs md:text-sm text-slate-500 mt-1">
                  Create a new system user
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-brand-light text-slate-400 hover:text-brand-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col h-full overflow-hidden"
            >
              {/* Body */}
              <div className="flex-1 overflow-y-auto px-4 py-4 md:px-8 md:py-6 space-y-6 md:space-y-8 scrollbar-thin scrollbar-thumb-slate-200">
                {/* PERSONAL INFORMATION */}
                <div className="space-y-4 md:space-y-5">
                  <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2 md:mb-4">
                    Personal Information
                  </h3>

                  <div>
                    <label className="text-sm font-semibold text-brand-navy mb-1.5 block">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                      <input
                        {...register("name")}
                        placeholder="John Doe"
                        className={`${inputBaseClass} pl-10 py-3`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-brand-navy mb-1.5 block">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                      <input
                        {...register("email")}
                        placeholder="john@company.com"
                        className={`${inputBaseClass} pl-10 py-3`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="h-px bg-slate-200 w-full" />

                {/* ACCOUNT SETTINGS */}
                <div className="space-y-4 md:space-y-5">
                  <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2 md:mb-4">
                    Account Settings
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-brand-navy mb-1.5 block">
                        Role
                      </label>
                      <div className="relative group">
                        <Shield className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                        <select
                          {...register("role")}
                          className={`${inputBaseClass} pl-10 py-3 font-medium appearance-none`}
                        >
                          <option value="User">User</option>
                          <option value="Merchant">Merchant</option>
                        </select>
                      </div>
                      {errors.role && (
                        <p className="text-xs text-red-500 mt-1.5 font-medium">
                          {errors.role.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-brand-navy mb-1.5 block">
                        Status
                      </label>
                      <div className="relative group">
                        <Activity className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                        <select
                          {...register("status")}
                          className={`${inputBaseClass} pl-10 py-3 font-medium appearance-none`}
                        >
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Suspended">Suspended</option>
                        </select>
                      </div>
                      {errors.status && (
                        <p className="text-xs text-red-500 mt-1.5 font-medium">
                          {errors.status.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-brand-navy mb-1.5 block">
                      Historical Transactions
                    </label>
                    <div className="relative group">
                      <BarChart3 className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                      <input
                        type="number"
                        {...register("transactions", { valueAsNumber: true })}
                        placeholder="0"
                        className={`${inputBaseClass} pl-10 py-3 font-medium`}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Starting transaction count for migration purposes.
                    </p>
                    {errors.transactions && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">
                        {errors.transactions.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-4 md:px-8 md:py-5 bg-white border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold"
                >
                  Create User
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
