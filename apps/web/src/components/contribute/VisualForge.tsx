'use client';

import React, { useState } from 'react';
import { Camera, Image, X, Sparkles, Upload } from 'lucide-react';

interface VisualForgeProps {
  onImageCapture: (base64: string | null) => void;
}

export function VisualForge({ onImageCapture }: VisualForgeProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onImageCapture(base64);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreview(null);
    onImageCapture(null);
  };

  return (
    <div className="bg-brand-indigo/[0.02] border border-brand-indigo/5 rounded-3xl p-8 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-indigo/40">
           <Camera className="w-4 h-4" />
           The Sight (Visual Context)
        </div>
        {preview && (
           <div className="flex items-center gap-1.5 text-brand-gold animate-in fade-in zoom-in">
              <Sparkles className="w-3 h-3" />
              <span className="text-[8px] font-bold uppercase tracking-widest">Asset Linked</span>
           </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center min-h-[160px] relative">
        {!preview ? (
           <label className="w-full h-full min-h-[160px] border-2 border-dashed border-brand-indigo/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-brand-indigo/[0.04] transition-all group">
              <Upload className="w-8 h-8 text-brand-indigo/20 group-hover:text-brand-indigo/40 mb-3" />
              <p className="text-xs text-brand-indigo/40 font-serif italic">Link a visual artifact</p>
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-brand-indigo/20 mt-2">JPG, PNG up to 2MB</p>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
           </label>
        ) : (
          <div className="w-full relative group animate-in fade-in zoom-in duration-300">
             <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl relative border border-brand-indigo/10">
                <img src={preview} alt="Visual Context" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button 
                     onClick={clearImage}
                     className="bg-white/90 backdrop-blur-md p-3 rounded-full text-red-500 hover:scale-110 transition-transform shadow-xl"
                   >
                      <X className="w-6 h-6" />
                   </button>
                </div>
             </div>
             <div className="mt-4 flex items-center gap-2 text-brand-earth/40">
                <Image className="w-3 h-3" />
                <p className="text-[10px] font-serif italic italic font-medium">Visual record established.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
