"use client"
import { ShieldCheck } from 'lucide-react';
import RegisterForm from '@/src/components /RegisterForm';
import LoginForm from '@/src/components /LoginForm';
import VerifyForm from '@/src/components /VerifyForm';
import StepIndicator from '@/src/components /StepIndicator';

import { useState } from 'react';
import KYCForm from '@/src/components /KYCForm';

export default function RegisterPage() {
  // Step: 1 = Login, 2 = Register, 3 = Verify
  const [step, setStep] = useState(1);

  // Helper to render the current form
  const renderForm = () => {
    switch (step) {
      case 1:
        return <RegisterForm onNext={() => setStep(2)} />;
      case 2:
        return <KYCForm onNext={()=> setStep(3)}/>;
      case 3:
        return <VerifyForm onNext={() => alert('Account created!')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-brand-light">
      
      {/* Left Section: Branding */}
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

      {/* Right Section: Forms */}
      <div className="w-full lg:w-1/2 flex items-center flex-col justify-center p-4 lg:p-12">
        <StepIndicator currentStep={step} />
        {renderForm()}
      </div>
    </div>
  );
}
