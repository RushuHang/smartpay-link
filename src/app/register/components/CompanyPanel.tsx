"use client";

import { ShieldCheck, CheckCircle2, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CompanyPanel() {
  return (
    <div className="relative w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-10 lg:p-16 bg-brand-navy text-white overflow-hidden lg:h-dvh min-h-[600px]">
      
      {/* --------------------------------------------------
          BACKGROUND LAYERS (Cinematic Depth)
         -------------------------------------------------- */}
      <div className="absolute inset-0 z-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-[#0f172a] to-brand-primary opacity-90" />
        
        {/* Texture Overlay (Noise) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
        
        {/* Animated Glow Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-primary blur-[100px] opacity-40 mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-600 blur-[120px] opacity-20 mix-blend-screen" />
      </div>

      {/* --------------------------------------------------
          CONTENT
         -------------------------------------------------- */}
      
      {/* 1. Brand Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center gap-3"
      >
        <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg shadow-black/5">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          Smart Link
        </span>
      </motion.div>

      {/* 2. Hero Section */}
      <div className="relative z-10 mt-12 mb-12 flex flex-col justify-center flex-1">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
        >
            <h1 className="text-4xl lg:text-5xl font-bold leading-[1.1] mb-6 tracking-tight">
              Start your financial <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                journey today.
              </span>
            </h1>

            <p className="text-lg text-blue-100/80 leading-relaxed max-w-lg font-light mb-8">
              Join Smart Link to experience next-gen banking. 
              Real-time insights, zero-fee international transfers, 
              and iron-clad security await.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
                <FeaturePill icon={<Globe size={14} />} label="Global Access" />
                <FeaturePill icon={<ShieldCheck size={14} />} label="Bank-Grade Security" />
            </div>
        </motion.div>
      </div>

      {/* 3. Floating Visual Element (Abstract UI) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-1/3 -right-16 lg:-right-24 hidden xl:block z-0"
      >
        {/* Glass Card - Account Success */}
        <div className="relative w-72 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-5 transform rotate-[-6deg] group hover:rotate-0 transition-all duration-500">
            {/* Top Row */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="text-white w-5 h-5" />
                </div>
                <div>
                    <div className="text-sm font-bold text-white">Account Created</div>
                    <div className="text-[10px] text-emerald-300">Ready to use</div>
                </div>
            </div>
            
            {/* Decorative Lines */}
            <div className="space-y-2 mb-4 opacity-50">
                <div className="h-1.5 w-full bg-white/20 rounded-full"></div>
                <div className="h-1.5 w-2/3 bg-white/20 rounded-full"></div>
            </div>

            {/* Button fake */}
            <div className="w-full h-8 bg-white/10 rounded-lg flex items-center justify-center text-xs text-white/80 font-medium">
                Go to Dashboard
            </div>
        </div>
      </motion.div>

      {/* 4. Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 flex items-center gap-2 text-xs text-blue-200/50"
      >
        <span>© {new Date().getFullYear()} Smart Link Technologies.</span>
      </motion.div>
    </div>
  );
}

/* Helper Component for Feature Pills */
function FeaturePill({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-xs font-medium text-blue-100 hover:bg-white/10 transition-colors cursor-default">
            {icon}
            {label}
        </div>
    );
}