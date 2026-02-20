"use client";

import { useRouter, usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import {
  ShieldCheck,
  LayoutDashboard,
  Users, // For Merchant/User Management
  Receipt, // For Transactions
  Link2, // For Payment Links
  Settings, // For Settings
  History, // For Logs
  ArrowLeftRight, // Alternative for Transactions
} from "lucide-react";

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
        className="relative z-10 flex items-center gap-3 mb-12 pl-2 cursor-pointer group"
        onClick={() => handleNavigation("/admin/dashboard")}
      >
        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 group-hover:bg-white/20 transition-all">
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
          icon={<Users size={20} />}
          label="Merchants"
          active={pathname === "/admin/dashboard/users-management"}
          onClick={() => handleNavigation("/admin/dashboard/users-management")}
        />

        <SidebarItem
          icon={<ArrowLeftRight size={20} />}
          label="Transactions"
          active={pathname === "/admin/dashboard/transaction-list"}
          onClick={() => handleNavigation("/admin/dashboard/transaction-list")}
        />

        <SidebarItem
          icon={<Link2 size={20} />}
          label="Payment Links"
          active={pathname === "/admin/dashboard/payment-links-list"}
          onClick={() => handleNavigation("/admin/dashboard/payment-links-list")}
        />

        <div className="my-4 h-px bg-white/10 mx-2" />

        <SidebarItem
          icon={<Settings size={20} />}
          label="Settings"
          active={pathname === "/admin/dashboard/settings"}
          onClick={() => handleNavigation("/admin/dashboard/settings")}
        />

        <SidebarItem
          icon={<History size={20} />}
          label="Audit Logs"
          active={pathname === "/admin/dashboard/logs"}
          onClick={() => handleNavigation("/admin/dashboard/logs")}
        />
      </nav>

      {/* Footer / Version (Optional) */}
    </aside>
  );
}