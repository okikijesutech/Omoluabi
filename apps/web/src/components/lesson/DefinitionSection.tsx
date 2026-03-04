import React from "react";
import { BodyText } from "@/components/typography";

interface DefinitionSectionProps {
  definition: string;
}

export function DefinitionSection({ definition }: DefinitionSectionProps) {
  return (
    <div className="space-y-4 py-8">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">
        Definition
      </h3>
      <BodyText size="lg" className="!text-text-primary underline decoration-brand-accent/10 decoration-2 underline-offset-8">
        {definition}
      </BodyText>
    </div>
  );
}
