import React from "react";
import { Skeleton } from "@/components /ui/Skeleton";

export default function DashboardLoader() {
  return (
    <div className="flex h-screen w-full bg-[#F5F7FA] overflow-hidden">
 
     

      {/* --- Main Content Area (Matches MerchantDashboard) --- */}
      <main className="flex-1 flex flex-col relative overflow-auto">
        
        {/* Loading Progress Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-100 z-10">
          <div className="h-full bg-[#0066B3] animate-[progress_2s_ease-in-out_infinite] w-full origin-left scale-x-0" />
        </div>

        <div className="p-4 md:p-6 lg:p-8 max-w-400 w-full mx-auto space-y-6 md:space-y-8">
          
          {/* 1. Header Section */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-48 md:w-64 rounded-md" />
            <Skeleton className="h-4 w-32 md:w-48 opacity-60" />
          </div>

          {/* 2. Stats Grid (Matches 4-Column Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Standard Stat Cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-32" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full opacity-60" />
              </div>
            ))}

            {/* 4th Card (Plan Usage - Dark Card Simulation) */}
            <div className="rounded-xl bg-[#003A66]/5 border border-blue-100 p-6 shadow-sm h-full flex flex-col justify-center">
              <div className="space-y-3">
                <Skeleton className="h-4 w-24 bg-slate-300" />
                <div className="flex items-baseline gap-2">
                   <Skeleton className="h-8 w-16 bg-slate-300" />
                   <Skeleton className="h-4 w-12 bg-slate-300 opacity-60" />
                </div>
                <Skeleton className="h-3 w-32 bg-slate-300 mt-2" />
              </div>
            </div>
          </div>

          {/* 3. Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            
            {/* Revenue Trends (Matches Area Chart - 50% width on Desktop) */}
            <div className="col-span-1 md:col-span-12 lg:col-span-6 rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <Skeleton className="h-6 w-32" />
              </div>
              {/* Chart Area Simulation */}
              <div className="h-55 md:h-75 w-full flex items-end gap-2 pb-2 border-b border-l border-slate-100">
                 {/* Simulate area chart wave */}
                 <Skeleton className="h-[40%] w-[15%] rounded-t-sm opacity-40" />
                 <Skeleton className="h-[60%] w-[15%] rounded-t-sm opacity-50" />
                 <Skeleton className="h-[45%] w-[15%] rounded-t-sm opacity-40" />
                 <Skeleton className="h-[80%] w-[15%] rounded-t-sm opacity-60" />
                 <Skeleton className="h-[55%] w-[15%] rounded-t-sm opacity-50" />
                 <Skeleton className="h-[75%] w-[15%] rounded-t-sm opacity-60" />
                 <Skeleton className="h-[90%] w-[15%] rounded-t-sm opacity-70" />
              </div>
            </div>

            {/* Payment Methods (Matches Pie Chart - 25% width on Desktop) */}
            <div className="col-span-1 md:col-span-6 lg:col-span-3 rounded-xl border border-blue-100 bg-white p-6 shadow-sm flex flex-col">
              <Skeleton className="h-6 w-40 mb-6" />
              
              <div className="flex-1 flex items-center justify-center py-4">
                {/* Donut Chart Skeleton */}
                <div className="relative h-40 w-40 md:h-48 md:w-48 rounded-full border-16 border-slate-100 flex items-center justify-center">
                    <Skeleton className="h-full w-full rounded-full opacity-10" />
                </div>
              </div>
              
              {/* Legend Wrap */}
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {[1, 2, 3, 4, 5].map((i) => (
                   <Skeleton key={i} className="h-4 w-16 rounded" />
                ))}
              </div>
            </div>

            {/* Top Links (Matches List - 25% width on Desktop) */}
            <div className="col-span-1 md:col-span-6 lg:col-span-3 rounded-xl border border-blue-100 bg-white p-6 shadow-sm flex flex-col">
              <Skeleton className="h-6 w-40 mb-6" />
              
              <div className="space-y-6 flex-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-2 w-2 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4">
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}