"use client";

import { useState } from "react";
import { Bell, Search, User, Sparkles, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="h-20 z-20 flex items-center justify-between px-6 lg:px-10 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-4 bg-slate-100 px-4 py-2.5 rounded-full w-80 shadow-sm focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all">
        <Search size={18} className="text-slate-400" />
        <input
          placeholder="Search transactions, assets..."
          className="bg-transparent outline-none text-sm w-full placeholder:text-slate-400 text-slate-700"
        />
      </div>

      <div className="flex items-center gap-6 relative">
        <div className="relative">
          <Bell
            className="text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
            size={22}
          />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-50"></span>
        </div>

        <div className="h-8 w-px bg-slate-200"></div>

        <div className="relative">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 group-hover:text-brand-primary transition-colors">
                John Carter
              </p>
              <p className="text-xs text-slate-500">merchent</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-primary to-brand-navy text-white flex items-center justify-center shadow-lg shadow-brand-primary/20 ring-2 ring-white">
              <User className="w-5 h-5" />
            </div>
          </div>

          {profileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border border-slate-100 z-50"
            >
              <ul className="flex flex-col text-sm text-slate-700">
                <li
                  className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 cursor-pointer"
                  onClick={() => alert("Go to profile settings")}
                >
                  <Settings size={16} /> Settings
                </li>
                <li
                  className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 cursor-pointer"
                  onClick={() => router.push("/")}
                >
                  <LogOut size={16} /> Log Out
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
