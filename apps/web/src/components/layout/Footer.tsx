"use client";

import Link from "next/link";
import { OmoluabiLogo } from "@/components/ui/Logo";
import { PageContainer, Divider } from "./index";

export function Footer() {
  return (
    <footer className="py-24 border-t border-text-primary/5 bg-bg-secondary/10">
        <PageContainer size="archive" className="space-y-24">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                <div className="md:col-span-2 space-y-8 text-center md:text-left">
                    <OmoluabiLogo className="grayscale opacity-40 scale-90 mx-auto md:mx-0 -ml-0 md:-ml-4" />
                    <p className="text-sm text-text-secondary font-serif leading-relaxed italic opacity-60 max-w-sm mx-auto md:mx-0">
                        An institutional record dedicated to the memory and longevity of the Yoruba linguistic soul.
                    </p>
                </div>
                <div className="space-y-6 text-center md:text-left">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary/40">Knowledge</h4>
                    <nav className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-text-secondary/60">
                        <Link href="/archive" className="hover:text-brand-primary transition-colors">Digital Archive</Link>
                        <Link href="/learn" className="hover:text-brand-primary transition-colors">Learning Path</Link>
                        <Link href="/contribute" className="hover:text-brand-primary transition-colors">Submit Entry</Link>
                    </nav>
                </div>
                <div className="space-y-6 text-center md:text-left">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary/40">Institutional</h4>
                    <nav className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-text-secondary/60">
                        <Link href="/principles" className="hover:text-brand-primary transition-colors">Cultural Principles</Link>
                        <Link href="/governance" className="hover:text-brand-primary transition-colors">Governance Model</Link>
                        <Link href="/transparency" className="hover:text-brand-primary transition-colors">Transparency Policy</Link>
                    </nav>
                </div>
            </div>

            <Divider className="opacity-10" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-text-secondary/20 text-center md:text-left">
                    Linguistic Preservation Protocol — LAG-01 (EST. 2026)
                </p>
                <div className="flex gap-8 text-[9px] font-bold uppercase tracking-[0.2em] text-text-secondary/30">
                    <Link href="/policy/revision" className="hover:text-brand-primary transition-colors">Revision Policy</Link>
                    <Link href="/policy/contribution" className="hover:text-brand-primary transition-colors">Contribution Guidelines</Link>
                </div>
            </div>
        </PageContainer>
    </footer>
  );
}
