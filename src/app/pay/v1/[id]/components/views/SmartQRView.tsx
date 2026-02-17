import React from "react";
import QRCode from "react-qr-code";

export default function SmartQRView() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 py-2">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="relative bg-white p-4 rounded-2xl border border-slate-100 shadow-xl">
          <QRCode
            value="https://smartlink.fintech/pay/NPR/INV-8892"
            size={180}
            viewBox={`0 0 256 256`}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md border border-slate-50">
            <span className="font-black text-[10px] text-[#0066B3]">PAY</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded border border-slate-100">
          <img
            src="/api/placeholder/20/20"
            alt=""
            className="w-4 h-4 bg-red-500 rounded-full"
          />
          <span className="text-[10px] font-bold text-slate-600">Fonepay</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded border border-slate-100">
          <span className="text-[10px] font-bold text-slate-600">SmartQR</span>
        </div>
      </div>

      <div className="text-center max-w-xs space-y-2">
        <h4 className="text-[#003A66] font-bold text-sm">
          Scan with any Mobile Banking App
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Open your bank app, select <strong>Scan to Pay</strong>, and verify
          the merchant name <strong>Apex Tech Solutions</strong>.
        </p>
      </div>
    </div>
  );
}