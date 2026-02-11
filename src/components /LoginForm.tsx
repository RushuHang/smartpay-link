"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import Link from "next/link";

// Zod Schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(), // optional because checkbox may be unchecked
});

// Use Zod inference for FormData
type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // UseForm with Zod resolver and default values
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { rememberMe: false }, // ensure checkbox is unchecked by default
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // Ensure rememberMe is always boolean
    const submitData = { ...data, rememberMe: data.rememberMe ?? false };
    console.log("Login Data:", submitData);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="w-full bg-brand-light/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 text-black flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShieldCheck size={20} className="text-brand-primary" /> Welcome Back
            </h2>
            <p className="text-black text-sm mt-2">
              Sign in to access your digital banking dashboard
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Email */}
            <Input
              id="email"
              label="Email Address"
              placeholder="name@company.com"
              type="email"
              icon={<Mail size={18} />}
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Password */}
            <Input
              id="password"
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              icon={<Lock size={18} />}
              error={errors.password?.message}
              {...register("password")}
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none hover:text-brand-primary transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-brand-primary checked:border-brand-primary focus:ring-2 focus:ring-brand-primary focus:ring-offset-1 transition-all"
                    {...register("rememberMe")}
                  />
                  <ShieldCheck
                    size={12}
                    className="absolute left-0.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                  />
                </div>
                <span className="text-sm text-slate-600 group-hover:text-brand-navy transition-colors">
                  Remember me
                </span>
              </label>

              <Link
                href="#"
                className="text-sm font-medium text-brand-primary hover:text-brand-navy transition-colors hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </motion.div>

          {/* Submit Button */}
          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full h-12 text-base" isLoading={isLoading}>
              Sign in securely
            </Button>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            {/* Google Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 gap-3 font-medium text-slate-700"
            >
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Login with Google
            </Button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-brand-primary hover:text-brand-navy hover:underline transition-colors"
            >
              Open an account
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
