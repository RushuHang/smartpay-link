"use client";

import { useRouter, usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { ShieldCheck, LayoutDashboard, Link, User, Sparkles } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname(); // 👈 get current path dynamically

  return (
    <aside className="hidden lg:flex w-72 bg-linear-to-b from-brand-navy to-brand-primary text-white flex-col p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-50 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary blur-3xl rounded-full opacity-40 mix-blend-overlay" />

      {/* Clickable Logo */}
      <div
        className="relative z-10 flex items-center gap-3 mb-12 pl-2 cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">Smart Link</span>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex flex-col gap-2">
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          active={pathname === "/dashboard"} // dynamically active
          onClick={() => router.push("/dashboard")}
        />
        <SidebarItem
          icon={<Link size={20} />}
          label="Payment Link"
          active={pathname === "/dashboard/payment-link"} // dynamically active
          onClick={() => router.push("/dashboard/payment-link")}
        />
      </nav>

      {/* Profile Widget */}
      <div className="mt-auto relative z-10 p-4 bg-gradient-to-b from-white/10 to-white/5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg shadow-black/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 ring-2 ring-white/10 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-300" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">John Carter</div>
            </div>
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
          </div>
        </div>
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-medium">
            <span className="text-slate-300">Setup Progress</span>
            <span className="text-white">40%</span>
          </div>
          <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
            <div className="h-full w-[40%] bg-gradient-to-r from-blue-400 to-brand-primary rounded-full"></div>
          </div>
          <div className="text-[10px] text-blue-200/60 text-right cursor-pointer hover:text-white transition-colors">
            Complete verification &rarr;
          </div>
        </div>
      </div>
    </aside>
  );
}
