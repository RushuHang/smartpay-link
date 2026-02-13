"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, ShieldCheck } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Prop = {
  onNext?: () => void;
}

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be 8+ chars")
    .regex(/[A-Z]/, "Needs uppercase letter")
    .regex(/[0-9]/, "Needs a number"),
});

export default function RegisterForm({ onNext }: Prop) {
  const [showPass, setShowPass] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = (data: any) => {
    console.log(data);
    if (onNext) onNext();  // trigger step change
  };

  const password = watch("password") || "";
  const strength = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password)
  ].filter(Boolean).length;

  return (
    <div className="min-w-162.5 bg-brand-light/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-brand-navy p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <UserPlus size={20} className="text-brand-primary" /> Create Account
            </h2>
            <p className="text-blue-200 text-sm mt-1">
              Join 50,000+ users managing finance smarter.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
          {/* Personal Info Section */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h3 className="text-lg font-semibold text-brand-navy flex items-center gap-2">
              <ShieldCheck size={18} className="text-brand-primary" /> Personal Information
            </h3>

           
              <Input
                id="name"
                label="Full Name"
                placeholder="e.g. John Doe"
                icon={<User size={18} />}
                error={errors.fullName?.message as string}
                {...register("fullName")}
              />

              <Input
                id="email"
                label="Email Address"
                placeholder="name@company.com"
                icon={<Mail size={18} />}
                error={errors.email?.message as string}
                {...register("email")}
              />
            

            <div className="space-y-1">
              <Input
                id="pass"
                label="Password"
                type={showPass ? "text" : "password"}
                icon={<Lock size={18} />}
                endIcon={
                  <button type="button" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
                error={errors.password?.message as string}
                {...register("password")}
              />
              <div className="flex gap-1 h-1 mt-2">
                {[1, 2, 3, 4].map((level) => (
                  <div key={level} className={cn(
                    "h-full flex-1 rounded-full transition-all duration-300",
                    strength >= level ? (strength > 2 ? "bg-green-500" : "bg-yellow-500") : "bg-slate-100"
                  )} />
                ))}
              </div>
              <p className="text-xs text-slate-400 text-right">
                {strength < 2 ? "Weak" : strength < 4 ? "Good" : "Strong"}
              </p>
            </div>
          </motion.div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button className="w-full mt-2">Get Started</Button>
          </div>

          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account? <Link href="/login" className="text-brand-primary font-semibold hover:underline">Log in</Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
