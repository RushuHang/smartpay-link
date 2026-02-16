"use client";

import { motion } from "framer-motion";
import { Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileMenuProps {
  onClose: () => void; // Function to close the menu
}

export default function ProfileMenu({ onClose }: ProfileMenuProps) {
  const router = useRouter();

  return (
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
            onClose();
          }}
        >
          <Settings size={16} /> Settings
        </li>
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 cursor-pointer"
          onClick={() => {
            router.push("/");
            onClose();
          }}
        >
          <LogOut size={16} /> Log Out
        </li>
      </ul>
    </motion.div>
  );
}
