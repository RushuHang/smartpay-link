import React from "react";
import { Skeleton } from "@/components /ui/Skeleton";

export default function AdminDashboardLoader() {
  return (
    <div className="flex h-screen w-full bg-[#F5F7FA] overflow-hidden">

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col relative overflow-auto">
        
        {/* Loading Progress Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-100 z-10">
          <div className="h-full bg-[#0066B3] animate-[progress_2s_ease-in-out_infinite] w-full origin-left scale-x-0" />
        </div>

        <div className="p-4 md:p-6 lg:p-8 max-w-400 w-full mx-auto space-y-6 md:space-y-8">
          
          {/* 1. Page Header */}
          <div className="flex flex-col gap-2 mb-2">
            <Skeleton className="h-8 w-56 rounded-md" />
            <Skeleton className="h-4 w-64 opacity-60" />
          </div>

          {/* 2. Top Stats Row (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-3 w-24 opacity-70" /> {/* Title */}
                    <Skeleton className="h-8 w-32" />            {/* Value */}
                  </div>
                  {/* Icon Circle */}
                  <Skeleton className="h-12 w-12 rounded-full shrink-0 bg-blue-50" />
                </div>
                {/* Trend Tag Area */}
                <div className="mt-auto flex items-center gap-2">
                   <Skeleton className="h-5 w-16 rounded-md" />
                   <Skeleton className="h-3 w-20 opacity-50" />
                </div>
              </div>
            ))}
          </div>

          {/* 3. Middle Row: Revenue Chart (Large) & Pie Chart (Small) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            
            {/* Revenue Trend Area (Takes up 2/3 space) */}
            <div className="lg:col-span-2 rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex justify-between items-center">
                <Skeleton className="h-5 w-48" />
              </div>
              {/* Chart Simulation */}
              <div className="h-62.5 w-full flex items-end gap-3 pb-2 border-b border-l border-slate-100 px-2">
                 {[30, 50, 45, 70, 60, 80, 65, 90].map((h, idx) => (
                    <div key={idx} className="w-full flex flex-col justify-end h-full group">
                        <Skeleton 
                            className="w-full rounded-t-sm opacity-40" 
                            style={{ height: `${h}%` }} 
                        />
                    </div>
                 ))}
              </div>
            </div>

            {/* Payment Distribution Pie (Takes up 1/3 space) */}
            <div className="lg:col-span-1 rounded-xl border border-blue-100 bg-white p-6 shadow-sm flex flex-col">
              <Skeleton className="h-5 w-40 mb-6" />
              
              <div className="flex-1 flex items-center justify-center py-2">
                {/* Pie Circle Skeleton */}
                <div className="relative h-44 w-44 rounded-full border-12 border-slate-100 flex items-center justify-center">
                    <Skeleton className="h-full w-full rounded-full opacity-5" />
                </div>
              </div>
              
              {/* Legend Items */}
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="flex items-center gap-2">
                       <Skeleton className="h-2 w-2 rounded-full" />
                       <Skeleton className="h-3 w-16" />
                   </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Bottom Row: Merchants Table & Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            
            {/* Top Merchants Table (Takes up 2/3 space) */}
            <div className="lg:col-span-2 rounded-xl border border-blue-100 bg-white shadow-sm overflow-hidden">
              <div className="p-6 pb-4 border-b border-slate-50 flex justify-between">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-16" />
              </div>
              
              <div className="p-0">
                {/* Table Header Sim */}
                <div className="bg-slate-50 px-6 py-3 mb-2 flex gap-4">
                    <Skeleton className="h-3 w-1/3 opacity-50" />
                    <Skeleton className="h-3 w-1/4 opacity-50" />
                    <Skeleton className="h-3 w-1/4 opacity-50" />
                </div>
                {/* Table Rows */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="px-6 py-4 flex items-center border-b border-slate-50 last:border-0">
                    <div className="w-1/3 flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar */}
                        <div className="space-y-1">
                             <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                    <div className="w-1/4">
                        <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="w-1/4 flex justify-end md:justify-start">
                        <Skeleton className="h-6 w-16 rounded-full" /> {/* Status Badge */}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Feed (Takes up 1/3 space) */}
            <div className="lg:col-span-1 rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex justify-between">
                 <Skeleton className="h-5 w-32" />
                 <Skeleton className="h-6 w-6 rounded" />
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4">
                    {/* Activity Icon */}
                    <Skeleton className="h-9 w-9 rounded-full shrink-0" />
                    <div className="space-y-2 w-full pt-1">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-2 w-16 opacity-60" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}