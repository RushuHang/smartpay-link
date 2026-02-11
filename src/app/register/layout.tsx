import CompanyPanel from "./components/CompanyPanel";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-brand-light">
      
      {/* Left Side - Branding (Persistent) */}
      <CompanyPanel />

      {/* Right Side - Flow */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        {children}
      </div>
    </div>
  );
}
