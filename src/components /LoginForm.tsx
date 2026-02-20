"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react"; // Added AlertCircle
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Zod Schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null); // New state for auth errors
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { rememberMe: false },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setAuthError(null); // Clear any previous errors when submitting

    // Normalize email & password
    const email = data.email.trim().toLowerCase();
    const password = data.password.trim();
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);

    // Conditional navigation for Admin and Merchant
    if (email === "admin@gmail.com" && password === "test12345") {
      router.push("/admin/dashboard"); 
    } else if (email === "merchant@gmail.com" && password === "test12345") {
      router.push("/dashboard");
    } else {
      // Set the error message instead of using alert()
      setAuthError("Invalid credentials. Try admin@gmail.com or merchant@gmail.com and password test12345");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 lg:p-0">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-primary/10 mb-6 text-brand-primary">
            <ShieldCheck size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Global Auth Error Message */}
          {authError && (
            <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle size={18} className="shrink-0" />
              <p className="text-sm font-medium">{authError}</p>
            </div>
          )}

          <div className="space-y-5">
            {/* Email Field */}
            <div className="group">
                <Input
                  id="email"
                  label="Email"
                  placeholder="name@company.com"
                  type="email"
                  icon={<Mail size={18} className="text-slate-400 group-focus-within:text-brand-primary transition-colors" />}
                  error={errors.email?.message}
                  {...register("email")}
                  className="bg-slate-50 border-slate-200 focus:bg-white transition-all duration-300"
                />
            </div>

            {/* Password Field */}
            <div className="group">
                <Input
                  id="password"
                  label="Password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  icon={<Lock size={18} className="text-slate-400 group-focus-within:text-brand-primary transition-colors" />}
                  error={errors.password?.message}
                  {...register("password")}
                  className="bg-slate-50 border-slate-200 focus:bg-white transition-all duration-300"
                  endIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer group select-none">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="peer appearance-none w-5 h-5 rounded-md border-2 border-slate-300 bg-white checked:bg-brand-primary checked:border-brand-primary checked:scale-105 focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200 ease-out"
                  {...register("rememberMe")}
                />
                <ShieldCheck
                  size={12}
                  className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                  strokeWidth={3}
                />
              </div>
              <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
                Remember for 30 days
              </span>
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-brand-primary hover:text-brand-navy transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Actions */}
          <div className="pt-2">
            <div>
                <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 transition-all duration-300" 
                    isLoading={isLoading}
                >
                Sign in
                </Button>
            </div>
          </div>
        </form>
        
        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
             <p className="text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link
                href="/register"
                className="font-semibold text-brand-primary hover:text-brand-navy hover:underline decoration-2 underline-offset-4 transition-all"
                >
                Create an account
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}