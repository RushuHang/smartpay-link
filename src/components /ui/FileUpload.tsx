import React, { useCallback } from 'react';
import { UploadCloud, FileCheck, X } from 'lucide-react';
import { cn } from '@/lib/utils';


interface FileUploadProps {
  label: string;
  onChange: (file: File | null) => void;
  value?: File | null;
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ label, onChange, value, accept }) => {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onChange(file);
  }, [onChange]);

  return (
    <div className="space-y-1.5">
      <span className="text-sm font-medium text-brand-navy">{label}</span>
      
      {!value ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="relative group border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-brand-primary hover:bg-brand-light/50 transition-colors cursor-pointer text-center"
        >
          <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept={accept}
            onChange={(e) => onChange(e.target.files?.[0] || null)}
          />
          <div className="flex flex-col items-center gap-2 text-slate-500 group-hover:text-brand-primary">
            <UploadCloud size={24} />
            <p className="text-xs">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-[10px] text-slate-400">SVG, PNG, JPG or PDF (max. 5MB)</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-brand-light/50 border border-brand-primary/20 rounded-lg">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 bg-white rounded-md text-brand-primary">
              <FileCheck size={18} />
            </div>
            <div className="flex flex-col truncate">
              <span className="text-sm font-medium text-brand-navy truncate">{value.name}</span>
              <span className="text-xs text-slate-500">{(value.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => onChange(null)}
            className="p-1 hover:bg-red-100 text-slate-400 hover:text-red-500 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};