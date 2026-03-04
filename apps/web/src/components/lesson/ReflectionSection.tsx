"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ReflectionSectionProps {
  prompt: string;
}

export function ReflectionSection({ prompt }: ReflectionSectionProps) {
  const [reflection, setReflection] = useState("");

  return (
    <div className="space-y-8 py-12 border-t border-text-primary/5">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">
        Reflection
      </h3>

      <div className="space-y-6">
        <p className="text-2xl font-serif text-brand-primary italic leading-relaxed">
          {prompt}
        </p>
        
        <textarea 
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Enter your personal reflection for the internal archive..."
          className="w-full min-h-[120px] p-6 bg-transparent border border-text-primary/10 rounded-md focus:border-brand-primary outline-none transition-all italic text-lg text-text-primary"
        />

        <div className="flex justify-end">
          <Button variant="outline" className="text-[10px] font-bold tracking-widest uppercase rounded-full px-8 py-4 border-brand-primary/10 text-brand-primary hover:bg-brand-primary/5">
            Store Private Reflection
          </Button>
        </div>
      </div>
    </div>
  );
}
