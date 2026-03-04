"use client";

import Link from "next/link";
import { OmoluabiLogo } from "@/components/ui/Logo";
import { PageContainer } from "./index";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  
  const navLinks = [
    { name: "Learn", href: "/learn" },
    { name: "Archive", href: "/archive" },
    { name: "Contribute", href: "/contribute" },
    { name: "Governance", href: "/governance" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="border-b border-text-primary/10 bg-white/70 backdrop-blur-xl sticky top-0 z-50 py-5">
      <PageContainer size="archive" className="flex items-center justify-between">
        <Link href="/" className="group outline-none">
          <OmoluabiLogo horizontal className="group-hover:opacity-80 transition-opacity" />
        </Link>
        <div className="flex items-center gap-10">
            <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary/50">
                {navLinks.map((link) => (
                    <Link 
                        key={link.href} 
                        href={link.href} 
                        className={`hover:text-brand-primary transition-colors ${pathname === link.href ? "text-brand-primary border-b border-brand-primary pb-1" : ""}`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
            {/* Quick Governance Badge */}
            <Link href="/governance" className="flex items-center gap-2 px-3 py-1 bg-brand-accent/5 rounded-full border border-brand-accent/10 group hover:border-brand-accent/30 transition-all">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(140,106,63,0.4)]" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-accent group-hover:text-brand-primary">Integrity: PASS</span>
            </Link>
        </div>
      </PageContainer>
    </nav>
  );
}
