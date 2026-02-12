"use client";

import { motion } from "framer-motion";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function SidebarItem({ icon, label, active, onClick }: SidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
        active
          ? "text-white shadow-lg shadow-brand-primary/20"
          : "text-blue-100/70 hover:text-white hover:bg-white/5"
      }`}
    >
      {active && (
        <motion.div
          layoutId="activeSidebar"
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 rounded-xl border border-white/10"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10">{icon}</span>
      <span className="relative z-10 font-medium">{label}</span>
    </div>
  );
}
