import LoginForm from '@/src/components /LoginForm';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-brand-light">
      
      {/* Left Section: Branding (Gradient) */}
      <div className="relative w-full lg:w-1/2 flex flex-col justify-between p-8 lg:p-16 bg-gradient-to-br from-brand-navy to-brand-primary text-white overflow-hidden">
        
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
            Secure Digital Banking for the Future
          </h1>
          <p className="text-lg text-blue-100 leading-relaxed mb-8">
            Experience the next generation of financial technology. 
            Real-time insights, zero-fee international transfers, 
            and iron-clad security.
          </p>
          
          {/* Feature List (Desktop only visual) */}
          <div className="hidden lg:flex flex-col gap-4 text-sm font-medium text-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-blue-300/50"></div>
              <span>End-to-end encryption</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-blue-300/50"></div>
              <span>Biometric verification ready</span>
            </div>
          </div>
        </div>

        {/* Footer / Copyright */}
        <div className="relative z-10 text-xs text-blue-200/60 mt-8 lg:mt-0">
          © 2024 Fincorp Technologies. All rights reserved.
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
        <LoginForm />
      </div>
    </div>
  );
}