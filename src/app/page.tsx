import React from 'react';
import { LockKeyhole, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      
      {/* Left Side: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-24 lg:px-36 bg-white">
        <div className="mb-10">
          <div className="h-10 w-10 bg-brand-primary rounded-lg mb-6 flex items-center justify-center">
            <div className="h-5 w-5 bg-white rounded-full" />
          </div>
          <h1 className="text-3xl font-bold text-brand-navy">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Enter your credentials to access your portfolio.</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-brand-navy mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400 size-5" />
              <input 
                type="email" 
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-brand-navy">Password</label>
              <a href="#" className="text-sm font-medium text-brand-primary hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-3 text-slate-400 size-5" />
              <input 
                type="password" 
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button className="w-full bg-brand-primary hover:bg-brand-navy text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 group">
            Sign In to Dashboard
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="mt-8 text-center text-slate-600">
          Don't have an account? 
          <span className="text-brand-primary font-bold cursor-pointer ml-1 hover:text-brand-navy">Get Started</span>
        </p>
      </div>

      {/* Right Side: Visual/Branding */}
      <div className="hidden md:flex flex-1 bg-brand-light items-center justify-center p-12">
        <div className="max-w-md space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-brand-primary/10 border border-brand-primary/5">
            <div className="flex gap-2 mb-6">
              <div className="h-3 w-3 rounded-full bg-brand-accent animate-pulse" />
              <div className="h-3 w-24 rounded-full bg-slate-100" />
            </div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-slate-100 rounded-lg" />
              <div className="h-4 w-5/6 bg-slate-100 rounded-lg" />
              <div className="h-20 w-full bg-brand-light rounded-2xl flex items-end p-4 gap-2">
                <div className="bg-brand-primary h-1/2 w-full rounded-sm" />
                <div className="bg-brand-primary h-3/4 w-full rounded-sm" />
                <div className="bg-brand-navy h-full w-full rounded-sm" />
                <div className="bg-brand-primary h-2/3 w-full rounded-sm" />
              </div>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-brand-navy">The new standard for digital assets.</h2>
            <p className="text-brand-navy/70 mt-4 leading-relaxed">
              Join over 10,000+ institutional investors managing their capital with our encrypted cloud infrastructure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}