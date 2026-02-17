
import { Skeleton } from "@/components /ui/Skeleton";

export default function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* 1. Header Skeleton */}
      <header className="h-16 bg-[#001529] border-b border-slate-200 sticky top-0 z-40 px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-9 h-9 rounded-lg bg-blue-400/20" />
            <Skeleton className="h-5 w-24 rounded-md bg-blue-400/20" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="hidden md:block h-7 w-32 rounded-full bg-blue-400/10" />
            <Skeleton className="h-8 w-8 rounded-full bg-blue-400/20" />
          </div>
        </div>
      </header>

      {/* 2. Main Content Skeleton */}
      <main className="grow w-full max-w-7xl mx-auto px-4 py-6 md:py-12 flex flex-col justify-center items-center">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
          
          {/* LEFT PANEL: Merchant Details */}
          <section className="lg:w-[400px] bg-slate-50/80 border-r border-slate-100 p-8 flex flex-col">
            <Skeleton className="h-3 w-32 mb-8 opacity-50" /> {/* URL bar */}
            
            {/* Merchant Profile */}
            <div className="flex items-start gap-4 mb-10">
              <Skeleton className="w-16 h-16 rounded-2xl shrink-0" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-3 w-1/2 rounded-md" />
              </div>
            </div>

            {/* Payment Breakdown Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
              <Skeleton className="h-3 w-20 mb-2" />
              <div className="space-y-3">
                <div className="flex justify-between"><Skeleton className="h-3 w-16" /><Skeleton className="h-3 w-24" /></div>
                <div className="flex justify-between"><Skeleton className="h-3 w-20" /><Skeleton className="h-3 w-12" /></div>
                <hr className="border-slate-50" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-28 rounded-lg" />
                </div>
              </div>
            </div>

            <Skeleton className="mt-auto h-12 w-full rounded-xl opacity-40" />
          </section>

          {/* RIGHT PANEL: Interaction Area */}
          <section className="flex-1 flex flex-col bg-white">
            {/* Right Panel Header */}
            <div className="h-20 border-b border-slate-50 flex items-center justify-between px-10">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48 rounded-md" />
                <Skeleton className="h-3 w-64 rounded-md" />
              </div>
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>

            {/* Content Area Grid */}
            <div className="p-10">
              <Skeleton className="h-20 w-full rounded-xl mb-8" /> {/* Security notice */}
              
              <div className="grid md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border border-slate-50 rounded-xl">
                    <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                    <div className="space-y-2 w-full">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-2 w-32 opacity-60" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="mt-auto border-t border-slate-100 p-4">
              <Skeleton className="h-2 w-40 mx-auto opacity-30" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};