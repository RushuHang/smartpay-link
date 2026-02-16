import React from "react";
import { Skeleton } from "@/components /ui/Skeleton";

export default function DashboardLoader() {
  return (
    <div className="flex h-screen w-full bg-smart-bg text-smart-navy font-sans overflow-hidden">
      
      {/* --- Sidebar Skeleton --- */}
      <aside className="hidden w-64 flex-col border-r border-blue-200/60 bg-white/60 p-6 md:flex">
        {/* Brand Logo Anchor - Static for Trust */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-smart-navy shadow-sm">
            <div className="h-4 w-4 rounded-full border-2 border-white/90" />
          </div>
          <span className="text-xl font-bold tracking-tight text-smart-navy">
            Smart Link
          </span>
        </div>

        {/* Navigation Placeholders */}
        <div className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg opacity-60" />
            <Skeleton className="h-10 w-full rounded-lg opacity-60" />
            <Skeleton className="h-10 w-full rounded-lg opacity-60" />
          </div>
          
          <div className="pt-8">
            <div className="mb-4 h-3 w-20 rounded bg-smart-navy/10 text-xs font-semibold uppercase tracking-wider text-smart-navy/40">
              SETTINGS
            </div>
            <Skeleton className="h-8 w-3/4 opacity-50" />
            <Skeleton className="mt-3 h-8 w-2/3 opacity-50" />
          </div>
        </div>

        {/* User Profile Stub */}
        <div className="mt-auto flex items-center gap-3 pt-6 border-t border-blue-100">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2 w-16 opacity-70" />
          </div>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col relative">
        
        {/* Top Progress Line - The 'Speed' Indicator */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-100">
             <div className="h-full bg-smart-primary animate-[progress_2s_ease-in-out_infinite] w-full origin-left scale-x-0" />
        </div>

        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-blue-200/60 bg-white/40 px-8 backdrop-blur-sm">
          <Skeleton className="h-5 w-32" />
          <div className="flex gap-4">
             <Skeleton className="h-9 w-9 rounded-full" />
             <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="flex-1 overflow-auto p-8">
          <div className="mx-auto max-w-7xl space-y-8">
            
            {/* 1. Account Balance & Quick Stats (Top Row) */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Main Balance Card */}
              <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
                <Skeleton className="h-4 w-1/3 mb-4" />
                <Skeleton className="h-10 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/4 opacity-60" />
              </div>
              
              {/* Secondary Metric */}
              <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm flex flex-col justify-between">
                <Skeleton className="h-4 w-1/3" />
                <div className="space-y-2 mt-4">
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-2 w-5/6" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm flex items-center justify-center gap-4">
                 <Skeleton className="h-12 w-12 rounded-full" />
                 <Skeleton className="h-12 w-12 rounded-full" />
                 <Skeleton className="h-12 w-12 rounded-full" />
              </div>
            </div>

            {/* 2. Analytics Chart (Large Section) */}
            <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-8 w-24 rounded-md" />
              </div>
              
              {/* Chart Bars Simulation */}
              <div className="flex h-64 items-end justify-between gap-2 px-2 pb-2">
                {[40, 70, 45, 90, 60, 80, 50, 95, 65, 75, 55, 85].map((height, i) => (
                  <div 
                    key={i} 
                    className="w-full rounded-t bg-blue-50/80"
                    style={{ height: `${height}%` }}
                  >
                     {/* Inner shimmer for the bars themselves */}
                     <div className="h-full w-full opacity-30 animate-pulse bg-smart-primary/20" 
                          style={{ animationDelay: `${i * 0.1}s` }} 
                     />
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Recent Transactions (List View) */}
            <div className="rounded-xl border border-blue-100 bg-white shadow-sm">
              <div className="border-b border-blue-50 p-6">
                <Skeleton className="h-5 w-40" />
              </div>
              <div className="p-6 space-y-6">
                {[1, 2, 3].map((row) => (
                  <div key={row} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-2 w-20 opacity-60" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-16" />
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