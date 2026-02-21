"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, ShieldAlert, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components /ui/Button"; // Fixed typo in import path

// ✅ Zod schema for Admin validation
const adminSchema = z.object({
  name: z.string().min(1, "Full legal name is required"),
  email: z
    .string()
    .min(1, "Work email is required")
    .email("Enter a valid work email address"),
  role: z.enum(["Super Admin", "Compliance", "Support"], {
    message: "Please select an access level",
  }),
});

// Infer the TypeScript type directly from the Zod schema
type FormValues = z.infer<typeof adminSchema>;

// 1. Strictly type the onAdd prop to match the Zod schema
interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (admin: { 
    id: string; 
    name: string; 
    email: string; 
    role: "Super Admin" | "Compliance" | "Support" 
  }) => void;
}

// 2. Strictly type the ROLES array so TypeScript knows `id` isn't just any string
const ROLES: {
  id: "Super Admin" | "Compliance" | "Support";
  title: string;
  description: string;
}[] = [
  {
    id: "Super Admin",
    title: "Super Admin",
    description: "Full system access, platform settings, and billing.",
  },
  {
    id: "Compliance",
    title: "Compliance Officer",
    description: "KYC/AML checks and transaction audits.",
  },
  {
    id: "Support",
    title: "Support Specialist",
    description: "Manage users and issue manual refunds.",
  },
];

export default function AddAdminModal({ isOpen, onClose, onAdd }: AddAdminModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      role: "Support",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = (data: FormValues) => {
    const newAdmin = {
      id: crypto.randomUUID(),
      ...data,
    };

    onAdd(newAdmin);
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
            className="fixed inset-0 bg-slate-900/20 z-40 "
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
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                    Provision Admin
                  </h2>
                  <p className="text-xs md:text-sm text-slate-500 mt-1">
                    Grant dashboard access to a team member
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
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
                
                {/* IDENTITY SECTION */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Identity Details
                  </h3>

                  <div>
                    <label className="text-sm font-semibold text-slate-900 mb-1.5 block">
                      Full Legal Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        {...register("name")}
                        placeholder="e.g. Jane Doe"
                        className={`${inputBaseClass} pl-10 py-3`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-900 mb-1.5 block">
                      Work Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        {...register("email")}
                        placeholder="jane.doe@company.com"
                        className={`${inputBaseClass} pl-10 py-3`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="h-px bg-slate-200 w-full" />

                {/* ACCESS LEVEL SECTION */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Access Level
                  </h3>
                  
                  <div className="space-y-3">
                    {ROLES.map((role) => (
                      <label 
                        key={role.id}
                        className={`relative flex cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                          selectedRole === role.id 
                            ? "bg-white border-blue-600 ring-1 ring-blue-600 shadow-sm" 
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {/* 3. Removed `as any` because ROLES is now strictly typed */}
                        <input
                          type="radio"
                          className="sr-only"
                          value={role.id}
                          checked={selectedRole === role.id}
                          onChange={() => setValue("role", role.id)}
                        />
                        <div className="flex flex-1 items-start gap-3">
                          <div className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                            selectedRole === role.id ? "border-blue-600 bg-blue-600" : "border-slate-300"
                          }`}>
                            {selectedRole === role.id && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </div>
                          <div className="flex flex-col">
                            <span className={`block text-sm font-bold ${selectedRole === role.id ? "text-slate-900" : "text-slate-700"}`}>
                              {role.title}
                            </span>
                            <span className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                              {role.description}
                            </span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Security Note */}
                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    <strong>Security Notice:</strong> The user will be required to configure <strong>Two-Factor Authentication (2FA)</strong> before accessing any sensitive data.
                  </p>
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
                  className="w-full sm:w-auto px-8 py-2.5 rounded-xl text-sm font-semibold"
                >
                  Send Invite
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}