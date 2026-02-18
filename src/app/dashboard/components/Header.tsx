"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, User, Settings, LogOut, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const router = useRouter();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // 👇 Click outside logic
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="h-20 z-20 flex items-center justify-between px-6 lg:px-10 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-4 bg-slate-100 px-4 py-2.5 rounded-full w-full max-w-50 sm:max-w-xs lg:w-80 shadow-sm">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            placeholder="Search transactions..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 relative">
        <div className="relative">
          <Bell size={22} />
        </div>

        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

        {/* 👇 Wrap BOTH trigger + menu in same ref */}
        <div className="relative" ref={profileRef}>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setProfileMenuOpen((prev) => !prev)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">John Carter</p>
              <p className="text-xs text-slate-500">merchant</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center">
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
                  onClick={() => {
                    alert("Go to profile settings");
                    setProfileMenuOpen(false);
                  }}
                >
                  <Settings size={16} /> Settings
                </li>
                <li
                  className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 cursor-pointer"
                  onClick={() => {
                    router.push("/");
                    setProfileMenuOpen(false);
                  }}
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
