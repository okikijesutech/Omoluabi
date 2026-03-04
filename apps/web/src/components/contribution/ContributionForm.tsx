"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DialectSelector } from "./DialectSelector";
import { SourceSelector } from "./SourceSelector";
import { PreservationNotice, FieldLabel } from "./PreservationNotice";

interface ContributionData {
  word: string;
  dialect: string;
  context: string;
  source: string;
  intent: string;
}

export function ContributionForm() {
  const [formData, setFormData] = useState<ContributionData>({
    word: "",
    dialect: "",
    context: "",
    source: "",
    intent: "",
  });

  const handleChange = (field: keyof ContributionData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Preservation Request:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 pb-20">
      
      {/* KNOWLEDGE ENTRY */}
      <div className="space-y-4">
        <FieldLabel label="Knowledge Entry" required />
        <input 
          type="text"
          placeholder="Enter word or phrase (e.g. Ọmọlúàbí)"
          className="w-full text-4xl sm:text-5xl font-serif p-0 bg-transparent border-b border-text-primary/10 rounded-none focus:border-brand-primary outline-none transition-all placeholder:text-text-secondary/20 py-4"
          value={formData.word}
          onChange={(e) => handleChange("word", e.target.value)}
          required
        />
        <p className="text-xs text-text-secondary/40 italic font-medium">Please include tone marks for archival accuracy.</p>
      </div>

      {/* DIALECT SELECTOR */}
      <DialectSelector 
        value={formData.dialect} 
        onChange={(val) => handleChange("dialect", val)} 
      />

      {/* CULTURAL CONTEXT */}
      <div className="space-y-4">
        <FieldLabel label="Cultural Context" required />
        <textarea 
          rows={6}
          placeholder="Explain the cultural significance, history, and usage..."
          className="w-full p-6 bg-transparent border border-text-primary/10 rounded-md focus:border-brand-primary outline-none transition-all italic text-lg leading-relaxed text-text-primary min-h-[160px]"
          value={formData.context}
          onChange={(e) => handleChange("context", e.target.value)}
          required
        />
        <p className="text-xs text-text-secondary/60 italic font-medium">Cultural meaning is required for archival approval.</p>
      </div>

      {/* SOURCE SELECTOR */}
      <SourceSelector 
        value={formData.source} 
        onChange={(val) => handleChange("source", val)} 
      />

      {/* PRESERVATION INTENT */}
      <div className="space-y-4 pt-4 border-t border-text-primary/5">
        <FieldLabel label="Preservation Intent" required />
        <textarea 
          rows={3}
          placeholder="Why is it important to preserve this specific unit of knowledge?"
          className="w-full p-4 bg-transparent border border-text-primary/10 rounded-md focus:border-brand-primary outline-none transition-all italic text-base leading-relaxed text-text-primary"
          value={formData.intent}
          onChange={(e) => handleChange("intent", e.target.value)}
          required
        />
      </div>

      <div className="pt-8 space-y-8">
        <PreservationNotice />
        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          className="w-full rounded-md font-serif text-xl tracking-wide py-8 bg-brand-primary text-bg-primary hover:bg-brand-primary/95 transition-all shadow-lg hover:shadow-brand-primary/10"
        >
          Submit for Cultural Review
        </Button>
      </div>
    </form>
  );
}
