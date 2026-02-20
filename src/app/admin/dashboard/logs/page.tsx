"use client";

import { useState } from "react";
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  ShieldAlert, 
  User, 
  CreditCard, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components /ui/Button";
import { logData, LogActionType } from "./data";

export default function LogsPage() {
  const [filter, setFilter] = useState<LogActionType | "All">("All");

  const filteredLogs = filter === "All" 
    ? logData 
    : logData.filter(log => log.actionType === filter);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 lg:p-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
            <p className="text-slate-500 text-sm">Monitor all platform activity for security and debugging.</p>
          </div>
          <Button variant="outline" className="bg-white">
            <Download className="w-4 h-4 mr-2" /> Export Logs
          </Button>
        </div>

        {/* 🔹 Filter & Search Bar (Custom Tailwind) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="Search by User, Event, or ID..." 
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {["All", "Admin Action", "Merchant Action", "Transaction"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                  filter === type 
                  ? "bg-slate-900 text-white" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 🔹 Logs List Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-50/50 transition-colors group">
                <div className="flex items-start gap-4">
                  {/* Icon based on Type */}
                  <div className={`mt-1 p-2 rounded-lg ${
                    log.actionType === 'Admin Action' ? 'bg-amber-50 text-amber-600' :
                    log.actionType === 'Transaction' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {log.actionType === 'Admin Action' && <ShieldAlert className="w-4 h-4" />}
                    {log.actionType === 'Transaction' && <CreditCard className="w-4 h-4" />}
                    {log.actionType === 'Merchant Action' && <User className="w-4 h-4" />}
                  </div>

                  {/* Log Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{log.event}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          <span className="font-semibold text-slate-700">{log.performedBy}</span> ({log.performedByRole}) 
                          {log.targetId && <span> • Target: <span className="font-mono text-blue-600">{log.targetId}</span></span>}
                        </p>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider tabular-nums">
                        {log.timestamp}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-slate-600 bg-slate-50 p-2 rounded border border-slate-100/50">
                      {log.details}
                    </div>
                  </div>

                  <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-slate-900 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}