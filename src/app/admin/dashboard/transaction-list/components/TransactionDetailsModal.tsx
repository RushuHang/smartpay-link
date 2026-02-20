"use client";

import { X, User, Server, Wallet, Receipt } from "lucide-react";

// Replaced 'any' with a proper TypeScript interface based on your usage
export interface TransactionData {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  gateway: {
    provider: string;
    id: string;
    ip: string;
  };
  fees: {
    gross: number;
    net: number;
  };
}

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TransactionData;
}

export const TransactionDetailsModal = ({ isOpen, onClose, data }: DetailsModalProps) => {
  if (!isOpen) return null;

  // Formatting currency consistently with your analytics modal
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(amount).replace("NPR", "NPR ");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      {/* Container with matching animations and border-radius */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header matching bg-brand-navy */}
        <div className="flex justify-between items-center p-4 border-b bg-brand-navy border-slate-100">
          <div>
            <h3 className="text-lg font-semibold text-white">Transaction Details</h3>
            <p className="text-xs text-slate-200">Ref: {data.gateway.id}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 text-slate-300 rounded-md hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Highlighted Financials matching the 3-column stats style */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <Receipt className="w-4 h-4"/> Gross Amount
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {formatCurrency(data.fees.gross)}
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Wallet className="w-4 h-4"/> Net Settlement
              </div>
              <div className="text-2xl font-bold text-green-700">
                {formatCurrency(data.fees.net)}
              </div>
            </div>
          </div>

          {/* Detailed Information Cards */}
          <div className="grid grid-cols-1 gap-4">
            
            {/* Customer Card */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-3">
                <User className="w-4 h-4 text-slate-500" /> Customer
              </h4>
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong className="font-medium text-slate-900">Name:</strong> {data.customer.name}</p>
                <p><strong className="font-medium text-slate-900">Email:</strong> {data.customer.email}</p>
                <p><strong className="font-medium text-slate-900">Phone:</strong> {data.customer.phone}</p>
              </div>
            </div>

            {/* Gateway Card */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-3">
                <Server className="w-4 h-4 text-slate-500" /> Gateway Metadata
              </h4>
              <div className="space-y-2 text-sm text-slate-600">
                <p><strong className="font-medium text-slate-900">Provider:</strong> {data.gateway.provider}</p>
                <p>
                  <strong className="font-medium text-slate-900">Ref ID:</strong>{" "}
                  <span className="font-mono text-xs bg-slate-200 px-1 py-0.5 rounded">{data.gateway.id}</span>
                </p>
                <p><strong className="font-medium text-slate-900">IP Address:</strong> {data.gateway.ip}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};