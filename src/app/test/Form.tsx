// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import QRCode from "react-qr-code";
// import {
//   CreditCard,
//   Globe,
//   QrCode,
//   ShieldCheck,
//   User,
//   Building,
//   ChevronRight,
//   ChevronLeft,
//   Smartphone,
//   Wallet,
//   CheckCircle2,
//   Lock,
//   Clock,
//   HelpCircle,
//   AlertCircle,
//   ArrowRight,
//   Mail,
//   Phone,
//   FileText,
//   MapPin,
//   X,
//   MessageCircle,
// } from "lucide-react";

// // --- Types & Constants ---

// type PaymentMethod =
//   | "smartqr"
//   | "card"
//   | "esewa"
//   | "khalti"
//   | "imepay"
//   | "netbanking"
//   | null;

// interface PaymentData {
//   amount: string;
//   currency: string;
//   subtotal: string;
//   vat: string;
//   serviceCharge: string;
//   merchantName: string;
//   merchantLocation: string;
//   merchantPan: string;
//   merchantEmail: string;
//   merchantPhone: string;
//   customerName: string;
//   customerEmail: string;
//   invoiceNumber: string;
//   description: string;
//   expiryMinutes: number;
// }

// // --- Mock Data (Nepal Context) ---

// const MOCK_PAYMENT: PaymentData = {
//   amount: "4,500.00",
//   currency: "NPR",
//   subtotal: "4,000.00",
//   vat: "520.00",
//   serviceCharge: "-20.00",
//   merchantName: "Apex Tech Solutions Pvt. Ltd.",
//   merchantLocation: "Lalitpur-3, Bagmati, Nepal",
//   merchantPan: "601234567",
//   merchantEmail: "billing@apextech.com.np",
//   merchantPhone: "+977-9800000000",
//   customerName: "Aarav Sharma",
//   customerEmail: "aarav.sharma@example.com",
//   invoiceNumber: "INV-2026-8892",
//   description: "Web Hosting & Maintenance (Annual)",
//   expiryMinutes: 15,
// };

// // --- Main Component ---

// export default function SmartLinkPaymentPage() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
//   const [timeLeft, setTimeLeft] = useState(MOCK_PAYMENT.expiryMinutes * 60);
//   const [isExpired, setIsExpired] = useState(false);
//   const [showHelp, setShowHelp] = useState(false);

//   // Simulation of initial load security check
//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   // Timer Logic
//   useEffect(() => {
//     if (timeLeft <= 0) {
//       setIsExpired(true);
//       return;
//     }
//     const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//     return () => clearInterval(interval);
//   }, [timeLeft]);

//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//   if (isLoading) return <LoadingState />;

//   return (
//     <div className="min-h-screen flex flex-col bg-[#E6F2FF] font-sans text-slate-900 selection:bg-blue-200">
//       {/* Sticky Header */}
//       <Header onHelp={() => setShowHelp(true)} />

//       {/* Main Content Area */}
//       <main className="grow w-full max-w-7xl mx-auto px-4 py-6 md:py-12 flex flex-col justify-center items-center">
//         {/* Main Card Container */}
//         <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl shadow-blue-900/10 overflow-hidden border border-white/60 flex flex-col lg:flex-row min-h-170">
//           {/* LEFT PANEL: Merchant & Details */}
//           <section className="lg:w-105 bg-slate-50/80 border-r border-slate-100 p-6 md:p-8 flex flex-col relative">
//             {/* Domain Trust Indicator */}
//             <div className="absolute top-4 left-6 md:left-8 flex items-center gap-1.5 opacity-60">
//               <Lock size={10} className="text-green-600" />
//               <span className="text-[10px] font-mono text-green-700">
//                 https://pay.smartlink.com.np
//               </span>
//             </div>

//             <div className="mt-6">
//               <MerchantProfile data={MOCK_PAYMENT} />
//             </div>

//             <div className="mt-8 mb-6">
//               <PaymentBreakdown data={MOCK_PAYMENT} />
//             </div>

//             {/* Bottom Trust Badge in Left Panel */}
//             <div className="mt-auto pt-6 border-t border-slate-200/60">
//               <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-2">
//                 <span>Transaction ID</span>
//                 <span className="font-mono text-slate-600">TXN-998231</span>
//               </div>
//               <div className="flex items-center gap-2 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
//                 <ShieldCheck size={16} className="text-[#0066B3]" />
//                 <p className="text-[10px] text-[#003A66] leading-tight">
//                   Payments processed via <strong>Nepal Rastra Bank</strong>{" "}
//                   licensed operators. 256-bit SSL Encrypted.
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* RIGHT PANEL: Interaction Area */}
//           <section className="flex-1 flex flex-col bg-white relative">
//             {/* Right Panel Header */}
//             <div className="h-20 border-b border-slate-50 flex items-center justify-between px-6 md:px-10">
//               <div className="flex items-center gap-3">
//                 <AnimatePresence mode="wait">
//                   {selectedMethod && !isExpired && (
//                     <motion.button
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -10 }}
//                       onClick={() => setSelectedMethod(null)}
//                       className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors text-slate-500"
//                     >
//                       <ChevronLeft size={22} />
//                     </motion.button>
//                   )}
//                 </AnimatePresence>
//                 <div>
//                   <h2 className="font-bold text-[#003A66] text-lg">
//                     {isExpired
//                       ? "Session Expired"
//                       : selectedMethod
//                         ? "Complete Payment"
//                         : "Select Payment Method"}
//                   </h2>
//                   {!selectedMethod && !isExpired && (
//                     <p className="text-xs text-slate-400 hidden sm:block">
//                       Cards processed via SCT & Int'l gateways
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Timer Badge */}
//               <div
//                 className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
//                   isExpired
//                     ? "bg-slate-100 text-slate-400 border-slate-200"
//                     : timeLeft < 300
//                       ? "bg-red-50 text-red-600 border-red-100 animate-pulse ring-1 ring-red-200"
//                       : "bg-[#E6F2FF] text-[#0066B3] border-blue-100"
//                 }`}
//               >
//                 <Clock size={14} />
//                 <span>{isExpired ? "Expired" : formatTime(timeLeft)}</span>
//               </div>
//             </div>

//             {/* Scrollable Content Area */}
//             <div className="flex-1 p-6 md:p-10 overflow-y-auto">
//               {isExpired ? (
//                 <ExpiredState />
//               ) : (
//                 <AnimatePresence mode="wait">
//                   {!selectedMethod ? (
//                     <motion.div
//                       key="method-selection"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0, x: -20 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <SecurityNotice />
//                       <MethodList onSelect={setSelectedMethod} />
//                     </motion.div>
//                   ) : (
//                     <motion.div
//                       key="detail-view"
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       transition={{ duration: 0.3 }}
//                       className="h-full"
//                     >
//                       {selectedMethod === "smartqr" && <SmartQRView />}
//                       {selectedMethod === "card" && (
//                         <CardForm
//                           amount={MOCK_PAYMENT.amount}
//                           currency={MOCK_PAYMENT.currency}
//                         />
//                       )}
//                       {["esewa", "khalti", "imepay"].includes(
//                         selectedMethod,
//                       ) && <RedirectView method={selectedMethod} />}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               )}
//             </div>
//           </section>
//         </div>
//       </main>

//       {/* Actual Site Footer (Outside Body) */}
//       <Footer />

//       {/* Overlays */}
//       <AnimatePresence>
//         {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
//       </AnimatePresence>
//     </div>
//   );
// }

// // --- Sub-components ---

// function Header({ onHelp }: { onHelp: () => void }) {
//   return (
//     <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-6">
//       <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 bg-[#0066B3] rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
//             <ShieldCheck size={20} strokeWidth={2.5} />
//           </div>
//           <div>
//             <h1 className="font-black text-lg text-[#003A66] leading-none tracking-tight">
//               Smart<span className="text-[#0066B3]">Link</span>
//             </h1>
//             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">
//               Fintech Nepal
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-100">
//             <Lock size={12} className="text-green-600" />
//             <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">
//               Secure Checkout
//             </span>
//           </div>
//           <button
//             onClick={onHelp}
//             className="text-[#003A66] hover:bg-slate-100 p-2 rounded-full transition-colors"
//           >
//             <HelpCircle size={22} />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

// function MerchantProfile({ data }: { data: PaymentData }) {
//   return (
//     <div>
//       <div className="flex items-start gap-4">
//         <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-3xl font-black text-[#0066B3]">
//           {data.merchantName.charAt(0)}
//         </div>
//         <div>
//           <h3 className="font-bold text-[#003A66] text-lg leading-tight">
//             {data.merchantName}
//           </h3>
//           <div className="flex items-center gap-1.5 mt-1.5">
//             <CheckCircle2 size={12} className="text-[#0066B3] fill-blue-50" />
//             <span className="text-xs font-bold text-[#0066B3]">
//               Verified Merchant
//             </span>
//           </div>
//           <div className="flex items-center gap-1 mt-1 text-slate-400 text-xs">
//             <MapPin size={10} />
//             <span>{data.merchantLocation}</span>
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 space-y-2">
//         <div className="flex items-center gap-3 text-xs text-slate-600">
//           <Mail size={14} className="text-slate-400" />
//           <span>{data.merchantEmail}</span>
//         </div>
//         <div className="flex items-center gap-3 text-xs text-slate-600">
//           <Phone size={14} className="text-slate-400" />
//           <span>{data.merchantPhone}</span>
//         </div>
//         <div className="flex items-center gap-3 text-xs text-slate-600">
//           <FileText size={14} className="text-slate-400" />
//           <span className="font-mono">PAN: {data.merchantPan}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PaymentBreakdown({ data }: { data: PaymentData }) {
//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
//       <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">
//         Payment Details
//       </h4>

//       <div className="space-y-3 text-sm">
//         <div className="flex justify-between items-start">
//           <span className="text-slate-500 font-medium text-xs uppercase tracking-wide">
//             Customer
//           </span>
//           <span className="font-bold text-[#003A66] text-right">
//             {data.customerName}
//           </span>
//         </div>

//         <div className="border-t border-dashed border-slate-100 my-1" />

//         <div className="flex justify-between items-start">
//           <span className="text-slate-500 font-medium">Description</span>
//           <span className="font-medium text-slate-700 text-right max-w-37.5">
//             {data.description}
//           </span>
//         </div>

//         <div className="border-t border-dashed border-slate-200 my-2" />

//         <div className="flex justify-between text-slate-500">
//           <span>Subtotal</span>
//           <span className="font-mono">
//             {data.currency} {data.subtotal}
//           </span>
//         </div>
//         <div className="flex justify-between text-slate-500">
//           <span>VAT (13%)</span>
//           <span className="font-mono">
//             {data.currency} {data.vat}
//           </span>
//         </div>
//         {data.serviceCharge !== "0" && (
//           <div className="flex justify-between text-green-600">
//             <span>Discount</span>
//             <span className="font-mono">
//               {data.currency} {data.serviceCharge}
//             </span>
//           </div>
//         )}

//         <div className="border-t border-slate-100 pt-3 mt-2 flex justify-between items-center">
//           <span className="font-bold text-[#003A66]">Total Payable</span>
//           <span className="font-black text-2xl text-[#0066B3] tracking-tight">
//             <span className="text-sm text-slate-400 font-bold mr-1">
//               {data.currency}
//             </span>
//             {data.amount}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SecurityNotice() {
//   return (
//     <div className="mb-6 bg-[#E6F2FF] border border-blue-200 rounded-xl p-4 flex gap-3 items-start">
//       <AlertCircle className="text-[#0066B3] shrink-0 mt-0.5" size={18} />
//       <div className="space-y-1">
//         <h4 className="text-sm font-bold text-[#003A66]">Security Notice</h4>
//         <ul className="text-xs text-slate-600 space-y-1 list-disc pl-3">
//           <li>
//             We will <strong>never</strong> ask for your OTP or PIN.
//           </li>
//           <li>Please verify the merchant name before proceeding.</li>
//           <li>
//             Ensure the URL starts with <strong>https://pay.smartlink...</strong>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// function MethodList({ onSelect }: { onSelect: (m: PaymentMethod) => void }) {
//   const methods = [
//     {
//       id: "smartqr",
//       title: "Smart QR",
//       subtitle: "Fonepay, Mobile Banking",
//       icon: QrCode,
//       color: "bg-blue-600",
//     },
//     {
//       id: "card",
//       title: "Credit/Debit Card",
//       subtitle: "Visa, Mastercard, SCT",
//       icon: CreditCard,
//       color: "bg-slate-800",
//     },
//     {
//       id: "esewa",
//       title: "eSewa",
//       subtitle: "Mobile Wallet",
//       icon: "images/partnerlogo/esewa.jpg",
//       color: "bg-white",
//     },
//     {
//       id: "khalti",
//       title: "Khalti",
//       subtitle: "Digital Wallet",
//       icon: "images/partnerlogo/khalti.png",
//       color: "bg-white",
//     },
//     {
//       id: "imepay",
//       title: "IME Pay",
//       subtitle: "Mobile Wallet",
//       icon: "images/partnerlogo/imepay.png",
//       // Changed to bg-white
//       color: "bg-white",
//     },
//     {
//       id: "netbanking",
//       title: "Net Banking",
//       subtitle: "nBank, Retail Banking",
//       icon: Building,
//       color: "bg-teal-600",
//     },
//   ];

//   return (
//     <div className="grid md:grid-cols-2 gap-3">
//       {methods.map((method) => (
//         <motion.button
//           key={method.id}
//           whileHover={{ scale: 1.02, y: -2 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={() => onSelect(method.id as PaymentMethod)}
//           className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-xl text-left hover:border-[#0066B3] hover:shadow-lg hover:shadow-blue-900/5 transition-all group relative overflow-hidden"
//         >
//           {/* Box is fixed size, but image uses object-contain to fit rectangular logos */}
//           <div
//             className={`w-10 h-10 rounded-lg ${method.color} flex items-center justify-center text-white shrink-0 shadow-md overflow-hidden`}
//           >
//             {typeof method.icon === "string" ? (
//               <img
//                 src={method.icon}
//                 alt={method.title}
//                 // object-contain preserves rectangular logos within the square box
//                 className="w-full h-full object-contain"
//               />
//             ) : (
//               <method.icon size={20} />
//             )}
//           </div>
//           <div className="flex-1 min-w-0">
//             <h4 className="font-bold text-slate-700 text-sm group-hover:text-[#0066B3] truncate">
//               {method.title}
//             </h4>
//             <p className="text-[10px] text-slate-400 font-medium truncate">
//               {method.subtitle}
//             </p>
//           </div>
//           <ChevronRight
//             size={16}
//             className="text-slate-300 group-hover:text-[#0066B3] -ml-2"
//           />
//         </motion.button>
//       ))}
//     </div>
//   );
// }

// function SmartQRView() {
//   return (
//     <div className="flex flex-col items-center justify-center h-full space-y-6 py-2">
//       <div className="relative">
//         <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
//         <div className="relative bg-white p-4 rounded-2xl border border-slate-100 shadow-xl">
//           <QRCode
//             value="https://smartlink.fintech/pay/NPR/INV-8892"
//             size={180}
//             viewBox={`0 0 256 256`}
//             style={{ height: "auto", maxWidth: "100%", width: "100%" }}
//           />
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md border border-slate-50">
//             <span className="font-black text-[10px] text-[#0066B3]">PAY</span>
//           </div>
//         </div>
//       </div>

//       <div className="flex gap-4">
//         <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded border border-slate-100">
//           <img
//             src="/api/placeholder/20/20"
//             alt=""
//             className="w-4 h-4 bg-red-500 rounded-full"
//           />
//           <span className="text-[10px] font-bold text-slate-600">Fonepay</span>
//         </div>
//         <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded border border-slate-100">
//           <span className="text-[10px] font-bold text-slate-600">SmartQR</span>
//         </div>
//       </div>

//       <div className="text-center max-w-xs space-y-2">
//         <h4 className="text-[#003A66] font-bold text-sm">
//           Scan with any Mobile Banking App
//         </h4>
//         <p className="text-xs text-slate-500 leading-relaxed">
//           Open your bank app, select <strong>Scan to Pay</strong>, and verify
//           the merchant name <strong>Apex Tech Solutions</strong>.
//         </p>
//       </div>
//     </div>
//   );
// }

// function CardForm({ amount, currency }: { amount: string; currency: string }) {
//   return (
//     <div className="max-w-md mx-auto space-y-4 pt-2">
//       <div className="flex gap-2 justify-center mb-4 opacity-70 grayscale hover:grayscale-0 transition-all">
//         <div className="h-6 w-10 bg-slate-200 rounded animate-pulse"></div>
//         <div className="h-6 w-10 bg-slate-200 rounded animate-pulse"></div>
//         <div className="h-6 w-10 bg-slate-200 rounded animate-pulse"></div>
//       </div>

//       <div className="space-y-1">
//         <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
//           Card Number
//         </label>
//         <div className="relative">
//           <CreditCard
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
//             size={16}
//           />
//           <input
//             type="text"
//             placeholder="0000 0000 0000 0000"
//             className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0066B3] focus:ring-4 focus:ring-blue-50 transition-all font-mono text-sm"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-1">
//           <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
//             Expiry
//           </label>
//           <input
//             type="text"
//             placeholder="MM / YY"
//             className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0066B3] focus:ring-4 focus:ring-blue-50 transition-all text-center font-mono text-sm"
//           />
//         </div>
//         <div className="space-y-1">
//           <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
//             CVV / CVC
//           </label>
//           <div className="relative">
//             <Lock
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
//               size={14}
//             />
//             <input
//               type="password"
//               placeholder="•••"
//               maxLength={3}
//               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0066B3] focus:ring-4 focus:ring-blue-50 transition-all text-center font-mono text-sm"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="space-y-1">
//         <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
//           Name on Card
//         </label>
//         <div className="relative">
//           <User
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
//             size={16}
//           />
//           <input
//             type="text"
//             placeholder="FULL NAME"
//             className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0066B3] focus:ring-4 focus:ring-blue-50 transition-all text-sm font-semibold uppercase"
//           />
//         </div>
//       </div>

//       <button className="w-full bg-[#0066B3] hover:bg-[#003A66] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 transition-all active:scale-[0.98] mt-2">
//         <Lock size={16} />
//         PAY {currency} {amount}
//       </button>

//       <p className="text-[10px] text-center text-slate-400 font-medium">
//         Your card data is encrypted under PCI-DSS standards.
//       </p>
//     </div>
//   );
// }

// function RedirectView({ method }: { method: string }) {
//   const meta = {
//     esewa: {
//       title: "eSewa Wallet",
//       color: "bg-white",
//       icon: "images/partnerlogo/esewa.jpg",
//     },
//     khalti: {
//       title: "Khalti Wallet",
//       color: "bg-white",
//       icon: "images/partnerlogo/khalti.png",
//     },
//     // Updated IME Pay configuration
//     imepay: {
//       title: "IME Pay",
//       color: "bg-white",
//       icon: "images/partnerlogo/imepay.png",
//     },
//   }[method as any] || { title: "Wallet", color: "bg-blue-600", icon: Globe };

//   return (
//     <div className="flex flex-col items-center justify-center h-full text-center py-6">
//       <div
//         className={`w-16 h-16 ${meta.color} rounded-2xl flex items-center justify-center text-white shadow-xl mb-6 overflow-hidden`}
//       >
//         {typeof meta.icon === "string" ? (
//           <img
//             src={meta.icon}
//             alt={meta.title}
//             // Ensure object-contain is used here as well
//             className="w-full h-full object-contain"
//           />
//         ) : (
//           <meta.icon size={32} />
//         )}
//       </div>
//       <h3 className="text-lg font-bold text-slate-800 mb-2">
//         Continue to {meta.title}
//       </h3>
//       <p className="text-xs text-slate-500 max-w-xs mb-8 font-medium">
//         We'll redirect you to your {meta.title} portal to securely authorize
//         this payment.
//       </p>
//       <button
//         // Using a generic blue button for "Login & Pay" when bg is white to ensure visibility
//         className={`w-full max-w-xs ${meta.color === "bg-white" ? "bg-[#0066B3]" : meta.color} text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all hover:brightness-110`}
//       >
//         Login & Pay <ArrowRight size={16} />
//       </button>
//     </div>
//   );
// }

// function ExpiredState() {
//   return (
//     <div className="flex flex-col items-center justify-center h-full text-center py-10">
//       <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 ring-4 ring-red-50">
//         <AlertCircle size={32} />
//       </div>
//       <h3 className="text-lg font-bold text-slate-800 mb-2">Link Expired</h3>
//       <p className="text-slate-500 text-xs max-w-xs mb-6 leading-relaxed">
//         For security reasons, this payment session has ended. Please request a
//         new link from <strong>{MOCK_PAYMENT.merchantName}</strong>.
//       </p>
//       <button
//         onClick={() => window.location.reload()}
//         className="text-[#0066B3] font-bold text-sm hover:underline flex items-center gap-1"
//       >
//         Check Status
//       </button>
//     </div>
//   );
// }

// function HelpModal({ onClose }: { onClose: () => void }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6 relative"
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
//         >
//           <X size={20} />
//         </button>
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 bg-[#E6F2FF] rounded-full flex items-center justify-center text-[#0066B3]">
//             <HelpCircle size={20} />
//           </div>
//           <h3 className="font-bold text-[#003A66] text-lg">Need Help?</h3>
//         </div>

//         <div className="space-y-3">
//           <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-[#E6F2FF] hover:border-[#0066B3] transition-all group">
//             <MessageCircle size={20} className="text-green-600" />
//             <div className="text-left">
//               <h4 className="font-bold text-sm text-slate-700">
//                 WhatsApp Support
//               </h4>
//               <p className="text-[10px] text-slate-400">
//                 Average wait time: 5 mins
//               </p>
//             </div>
//           </button>
//           <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-[#E6F2FF] hover:border-[#0066B3] transition-all group">
//             <Phone size={20} className="text-blue-600" />
//             <div className="text-left">
//               <h4 className="font-bold text-sm text-slate-700">Call Support</h4>
//               <p className="text-[10px] text-slate-400">+977-1-4XXXXXX</p>
//             </div>
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// function Footer() {
//   return (
//     <footer className="w-full bg-slate-50 border-t border-slate-200 pt-10 pb-8 mt-auto">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
//           {/* Company Info */}
//           <div className="space-y-3">
//             <h5 className="text-xs font-bold text-[#003A66] uppercase tracking-wider mb-2">
//               Smart Link Pvt. Ltd.
//             </h5>
//             <p className="text-xs text-slate-500 leading-relaxed">
//               Kathmandu, Nepal
//               <br />
//               Reg No: 123456/079/080
//             </p>
//           </div>

//           {/* Compliance */}
//           <div className="space-y-3">
//             <h5 className="text-xs font-bold text-[#003A66] uppercase tracking-wider mb-2">
//               Compliance
//             </h5>
//             <ul className="space-y-2 text-xs text-slate-500">
//               <li className="flex items-center gap-2">
//                 <ShieldCheck size={14} className="text-green-600" /> PCI-DSS
//                 Compliant
//               </li>
//               <li className="flex items-center gap-2">
//                 <Globe size={14} className="text-blue-600" /> ISO 27001
//                 Certified
//               </li>
//             </ul>
//           </div>

//           {/* Policies */}
//           <div className="space-y-3">
//             <h5 className="text-xs font-bold text-[#003A66] uppercase tracking-wider mb-2">
//               Policies
//             </h5>
//             <ul className="space-y-2 text-xs text-slate-500">
//               <li>
//                 <a href="#" className="hover:text-[#0066B3] hover:underline">
//                   Privacy Policy
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-[#0066B3] hover:underline">
//                   Terms of Service
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-[#0066B3] hover:underline">
//                   Merchant Agreement
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div className="space-y-3">
//             <h5 className="text-xs font-bold text-[#003A66] uppercase tracking-wider mb-2">
//               Support
//             </h5>
//             <ul className="space-y-2 text-xs text-slate-500">
//               <li>
//                 <a href="#" className="hover:text-[#0066B3] hover:underline">
//                   Refund Policy
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-[#0066B3] hover:underline">
//                   Dispute Resolution
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-[#0066B3] hover:underline">
//                   Contact Us
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row justify-center items-center gap-2">
//           <p className="text-[10px] text-slate-400 text-center">
//             © 2026 Smart Link Payments. Licensed by Nepal Rastra Bank (PSO).
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// function LoadingState() {
//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center justify-center">
//       <div className="relative">
//         <div className="w-12 h-12 border-4 border-blue-50 rounded-full" />
//         <div className="w-12 h-12 border-4 border-[#0066B3] border-t-transparent rounded-full animate-spin absolute top-0" />
//       </div>
//       <div className="mt-6 flex flex-col items-center gap-1">
//         <h2 className="font-bold text-[#003A66] tracking-tight">SmartLink</h2>
//         <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
//           <Lock size={12} className="text-[#0066B3]" />
//           <span>Establishing Secure Connection...</span>
//         </div>
//       </div>
//     </div>
//   );
// }