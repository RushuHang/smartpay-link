"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 pb-20 scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}
