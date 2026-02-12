"use client";

import LoginForm from '@/src/components /LoginForm'; // Assuming path exists
import { ShieldCheck, Star, TrendingUp, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 font-sans selection:bg-brand-primary selection:text-white">
      
      {/* --------------------------------------------------
        LEFT SECTION: Immersive Brand Experience
        --------------------------------------------------
      */}
      <div className="relative w-full lg:w-[55%] flex flex-col justify-between p-8 lg:p-16 bg-gradient-to-br from-brand-navy to-brand-primary text-white overflow-hidden">
        
        {/* Modern Background Texture (Grid & Blurs) */}
        <div className="absolute inset-0 z-0">
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            {/* Ambient Glows */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-primary blur-[120px] opacity-40 mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500 blur-[120px] opacity-30 mix-blend-screen" />
        </div>

        {/* Brand Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center gap-3"
        >
          <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg shadow-black/5">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Smart Link</span>
        </motion.div>

        {/* Center Content: Hero Text & Floating Visuals */}
        <div className="relative z-10 flex flex-col justify-center h-full mt-12 mb-12 lg:mt-0 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200">
              Banking built for <br />
              <span className="text-white">tomorrow.</span>
            </h1>
            <p className="text-lg text-blue-100/80 leading-relaxed mb-10 font-light max-w-md">
              Experience the next generation of financial technology with real-time insights and iron-clad security.
            </p>

            {/* Social Proof / Trust Indicator */}
            <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                    {[1,2,3].map((i) => (
                        <div key={i} className={`w-10 h-10 rounded-full border-2 border-brand-navy bg-blue-${i*100+100} flex items-center justify-center text-xs font-bold text-brand-navy`}>
                            {i === 3 ? '5k+' : ''}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <div className="flex text-yellow-400 gap-0.5">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                    </div>
                    <span className="text-xs text-blue-200 font-medium">Trusted by teams worldwide</span>
                </div>
            </div>
          </motion.div>
        </div>

        {/* Visual Element: Floating Glass Card (Abstract Representation) */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute top-1/2 -right-24 lg:-right-32 transform -translate-y-1/2 hidden xl:block"
        >
            <div className="relative w-80 h-48 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 flex flex-col justify-between rotate-[-12deg] group hover:rotate-0 transition-transform duration-500">
                <div className="flex justify-between items-start">
                    <CreditCard className="text-white/80" />
                    <ShieldCheck className="text-emerald-400" size={20} />
                </div>
                <div>
                    <div className="flex gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-white/50"></div>
                        <div className="w-2 h-2 rounded-full bg-white/20"></div>
                        <div className="w-2 h-2 rounded-full bg-white/20"></div>
                        <div className="w-2 h-2 rounded-full bg-white/20"></div>
                    </div>
                    <div className="text-white font-mono tracking-widest text-lg opacity-80">**** 4291</div>
                </div>
            </div>
            
            {/* Secondary Floating Element */}
            <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 w-40 p-4 bg-brand-navy/80 backdrop-blur-lg rounded-xl border border-white/10 shadow-xl"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-green-500/20 rounded-lg">
                        <TrendingUp size={16} className="text-green-400" />
                    </div>
                    <span className="text-xs font-semibold text-white">Income</span>
                </div>
                <div className="text-lg font-bold text-white">+$4,250.00</div>
            </motion.div>
        </motion.div>

        {/* Footer */}
        <div className="relative z-10 flex justify-between items-end text-xs text-blue-200/50">
          <span>© {new Date().getFullYear()} Smart Link Technologies.</span>
          <span className="hidden lg:block">Privacy Policy &bull; Terms</span>
        </div>
      </div>

      {/* --------------------------------------------------
        RIGHT SECTION: Login Form
        --------------------------------------------------
      */}
      <div className="w-full lg:w-[45%] flex flex-col relative bg-white">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden p-6 pb-0">
             <div className="flex items-center gap-2 text-brand-navy">
                <ShieldCheck className="w-6 h-6" />
                <span className="font-bold text-lg">Smart Link</span>
             </div>
        </div>

        {/* Top Right Navigation */}
        {/* <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20">
            <a href="#" className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-primary transition-colors">
                Back to website
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform order-first" />
            </a>
        </div> */}

        {/* Main Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full max-w-md space-y-8"
            >
                {/* <div className="text-center lg:text-left">
                    <h2 className="text-3xl text-center font-bold tracking-tight text-slate-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-500">
                        Please enter your details to access your dashboard.
                    </p>
                </div> */}

                {/* Login Form Wrapper */}
                <div className="bg-white">
                    <LoginForm />
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-slate-400">Secure connection</span>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}