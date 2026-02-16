"use client";

import { useRouter, usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import {
  ShieldCheck,
  LayoutDashboard,
  Link as LinkIcon,
  User,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  close: () => void;
}

export default function Sidebar({ isOpen, close }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
    close(); // Close sidebar on navigation (mobile UX)
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-brand-navy text-white flex flex-col p-6 overflow-hidden transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-50 pointer-events-none" />

      {/* Clickable Logo */}
      <div
        className="relative z-10 flex items-center gap-3 mb-12 pl-2 cursor-pointer"
        onClick={() => handleNavigation("/dashboard")}
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
          active={pathname === "/dashboard"}
          onClick={() => handleNavigation("/dashboard")}
        />
        <SidebarItem
          icon={<LinkIcon size={20} />}
          label="Payment Link"
          active={pathname === "/dashboard/payment-link"}
          onClick={() => handleNavigation("/dashboard/payment-link")}
        />
      </nav>

      {/* Profile Widget */}
      <div
        onClick={() => handleNavigation("/onboarding")}
        className="mt-auto relative z-10 p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg shadow-black/20 
                   cursor-pointer transition-all duration-300 ease-out group
                   hover:bg-white/20 hover:border-white/25 hover:shadow-xl hover:shadow-black/30 hover:scale-[1.02]"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 ring-2 ring-white/10 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
              <User className="w-4 h-4 text-slate-300" />
            </div>
            <div>
              <div className="text-sm font-bold text-white group-hover:text-blue-50 transition-colors">
                John Carter
              </div>
            </div>
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-white/20 transition-colors duration-300">
            <Sparkles className="w-3.5 h-3.5 text-white group-hover:text-yellow-200 transition-colors duration-300" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-light tracking-wider">
            <span className="text-slate-100 group-hover:text-white transition-colors duration-300">
              Setup Progress
            </span>
            <span className="text-white font-medium">40%</span>
          </div>

          <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
            <div className="h-full w-[40%] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-500 ease-out group-hover:w-[45%] group-hover:shadow-[0_0_12px_rgba(255,255,255,0.8)]"></div>
          </div>

          <div className="text-[10px] text-blue-200/60 text-right block group-hover:text-white transition-colors duration-300">
            Verify to unlock all features &rarr;
          </div>
        </div>
      </div>
    </aside>
  );
}