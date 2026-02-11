import { ShieldCheck } from "lucide-react";

export default function CompanyPanel() {
  return (
    <div className="relative w-full lg:w-1/2 flex flex-col justify-between p-8 lg:p-16 bg-gradient-to-br from-brand-navy to-brand-primary text-white overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-white blur-3xl" />
      </div>

      {/* Left Section: Branding */}
        {/* Background decorative circles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-white blur-3xl" />
        </div>

        {/* Logo Area */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <span className="text-xl font-bold tracking-wide">FINCORP</span>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 mt-12 lg:mt-0 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Create Your Fincorp Account
          </h1>
          <p className="text-lg text-blue-100 leading-relaxed mb-8">
            Join Fincorp today and experience secure, next-generation digital banking. 
            Enjoy real-time insights, zero-fee international transfers, 
            and iron-clad security.
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-blue-200/60 mt-8 lg:mt-0">
          © 2024 Fincorp Technologies. All rights reserved.
        </div>

    
    </div>
  );
}
