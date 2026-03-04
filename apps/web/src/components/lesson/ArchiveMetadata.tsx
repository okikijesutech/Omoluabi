import React from "react";

interface ArchiveMetadataProps {
  dateAdded: string;
  revision: string;
  sourceType: string;
}

export function ArchiveMetadata({ dateAdded, revision, sourceType }: ArchiveMetadataProps) {
  return (
    <div className="pt-24 pb-12 mt-12 border-t border-text-primary/5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <MetadataItem label="Date Added" value={dateAdded} />
        <MetadataItem label="Revision" value={revision} />
        <MetadataItem label="Source Type" value={sourceType} />
        <MetadataItem label="Status" value="Archive Verified" />
      </div>
    </div>
  );
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-secondary/40 block">{label}</span>
      <span className="text-[11px] font-bold text-text-secondary/70 block uppercase tracking-widest">{value}</span>
    </div>
  );
}
