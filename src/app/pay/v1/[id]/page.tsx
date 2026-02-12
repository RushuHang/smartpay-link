"use client";

import { ShieldCheck, Lock, Receipt, CheckCircle, Wallet, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// specific imports for the payment context
import PaymentForm from "./PaymentForm";


export default function PaymentPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 font-sans selection:bg-brand-primary selection:text-white">
      
      {/* --------------------------------------------------
        LEFT SECTION: Customer/Payment Context
        --------------------------------------------------
      */}
      <div className="relative w-full lg:w-[55%] flex flex-col justify-between p-8 lg:p-16 bg-gradient-to-br from-brand-navy to-brand-primary text-white overflow-hidden">
        
        {/* Modern Background Texture (Grid & Blurs) */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            {/* Ambient Glows - Adjusted for a "Security/Safe" feel (Greens/Blues) */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600 blur-[120px] opacity-40 mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500 blur-[120px] opacity-20 mix-blend-screen" />
        </div>

        {/* Brand/Security Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg shadow-black/5">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Smart Link <span className="font-normal text-white/60">Pay</span></span>
          </div>
          
          {/* Added Trust Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-emerald-300">
            <Lock size={12} />
            Encrypted End-to-End
          </div>
        </motion.div>

        {/* Center Content: Transaction Context */}
        <div className="relative z-10 flex flex-col justify-center h-full mt-12 mb-12 lg:mt-0 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            {/* Dynamic Headline for Payment Context */}
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200">
              Secure payment <br />
              <span className="text-white">gateway.</span>
            </h1>
            <p className="text-lg text-blue-100/80 leading-relaxed mb-10 font-light max-w-md">
              You are completing a secure transaction via Smart Link. Your payment details are processed with bank-grade security.
            </p>

            {/* Transaction Steps / Assurance */}
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-300">
                        <CheckCircle size={16} />
                    </div>
                    <span className="text-blue-50">Verified Merchant Identity</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 text-emerald-300">
                        <CheckCircle size={16} />
                    </div>
                    <span className="text-blue-50">Instant Receipt Generation</span>
                </div>
            </div>
          </motion.div>
        </div>

        {/* Visual Element: Floating Invoice/Transaction Summary */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute top-1/2 -right-24 lg:-right-36 transform -translate-y-1/2 hidden xl:block"
        >
            {/* The Glass Card - Styled like a Payment Summary/Receipt */}
            <div className="relative w-80 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 flex flex-col justify-between rotate-[-6deg] group hover:rotate-0 transition-transform duration-500">
                
                {/* Header of Card */}
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                            M
                        </div>
                        <div className="leading-none">
                            <p className="text-xs text-white/60 mb-1">Paying</p>
                            <p className="text-sm font-semibold text-white">Merchant Inc.</p>
                        </div>
                    </div>
                    <Receipt className="text-white/40" size={20} />
                </div>

                {/* Amount Display */}
                <div className="mb-6">
                    <p className="text-xs text-white/60 mb-1">Total Amount</p>
                    <div className="text-3xl font-mono text-white tracking-tight">$150.00</div>
                </div>

                {/* Footer of Card */}
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-medium bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    Secure Connection Active
                </div>
            </div>
            
            {/* Secondary Floating Element: Payment Method Icon */}
            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-12 w-auto px-5 py-3 bg-white text-brand-navy backdrop-blur-lg rounded-xl shadow-xl flex items-center gap-3"
            >
               <Wallet className="text-brand-primary" size={20} />
               <div>
                 <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Method</div>
                 <div className="text-sm font-bold">Card / UPI</div>
               </div>
            </motion.div>
        </motion.div>

        {/* Footer */}
        <div className="relative z-10 flex justify-between items-end text-xs text-blue-200/50">
           <span>© {new Date().getFullYear()} Smart Link Technologies.</span>
          <span className="hidden lg:block">Powered by Smart Link</span>
        </div>
      </div>

      {/* --------------------------------------------------
        RIGHT SECTION: Payment Form
        --------------------------------------------------
      */}
      <div className="w-full lg:w-[45%] flex flex-col relative bg-white">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden p-6 pb-0 flex justify-between items-center">
             <div className="flex items-center gap-2 text-brand-navy">
                <ShieldCheck className="w-6 h-6" />
                <span className="font-bold text-lg">Smart Link</span>
             </div>
             <div className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
                SECURE
             </div>
        </div>

        {/* Main Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full max-w-md space-y-6"
            >
               
                {/* Payment Form Wrapper */}
                <div className="bg-white">
                    <PaymentForm/>
                </div>

                <div className="relative mt-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-wider">
                        <span className="px-2 bg-white text-slate-400 flex items-center gap-1">
                            <Lock size={10} /> TLS 1.3 Encrypted
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}