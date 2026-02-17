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
          active={pathname === "/admin/dashboard"}
          onClick={() => handleNavigation("/admin/dashboard")}
        />
        <SidebarItem
          icon={<LinkIcon size={20} />}
          label="User Management"
          active={pathname === "/admin/dashboard/user-management"}
          onClick={() => handleNavigation("/admin/dashboard/user-management")}
        />
      </nav>

      
    </aside>
  );
}