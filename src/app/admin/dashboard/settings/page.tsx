"use client";

import { useState } from "react";
import { Settings, ShieldCheck, Mail, Percent, Save, Trash2, UserPlus, Check } from "lucide-react";
import { Button } from "@/components /ui/Button"; // Using your existing Button
import { adminUsers } from "./data";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [fee, setFee] = useState(2.5);
  const [refundsEnabled, setRefundsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 lg:p-12 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Platform Settings</h1>
          <p className="text-slate-500 text-sm">Configure global business rules and admin access.</p>
        </div>

        {/* 🔹 Custom Tailwind Tabs */}
        <div className="flex p-1 bg-slate-200/50 rounded-xl w-full max-w-md">
          {["general", "notifications", "admins"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === tab 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* 🔹 Tab Content: General */}
        {activeTab === "general" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <Percent className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold">Transaction Logic</h2>
              </div>
              <p className="text-sm text-slate-500">Define how much the platform earns from each payment link.</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold">Platform Fee (%)</label>
                  <p className="text-xs text-slate-500">Applied to every successful transaction.</p>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    className="w-20 p-2 text-right font-bold border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={fee} 
                    onChange={(e) => setFee(Number(e.target.value))} 
                  />
                  <span className="font-bold text-slate-400">%</span>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold">Allow Manual Refunds</label>
                  <p className="text-xs text-slate-500">Enable the refund button in the transaction list.</p>
                </div>
                {/* 🔹 Custom Switch Component */}
                <button 
                  onClick={() => setRefundsEnabled(!refundsEnabled)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    refundsEnabled ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    refundsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🔹 Tab Content: Admins */}
        {activeTab === "admins" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Team Access</h2>
                <p className="text-sm text-slate-500">People with access to this admin dashboard.</p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> Add Admin
              </Button>
            </div>
            <div className="divide-y divide-slate-100 px-6">
              {adminUsers.map((admin) => (
                <div key={admin.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs border border-blue-100">
                      {admin.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{admin.name}</p>
                      <p className="text-xs text-slate-500">{admin.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold border border-slate-200 uppercase tracking-tighter">
                      {admin.role}
                    </span>
                    <button className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Save Button */}
        <div className="flex justify-end">
          <Button>
            <Save className="w-4 h-4 mr-2" /> Save All Changes
          </Button>
        </div>

      </div>
    </div>
  );
}