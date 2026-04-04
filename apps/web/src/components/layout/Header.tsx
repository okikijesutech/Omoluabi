"use client";

import Link from "next/link";
import { OmoluabiLogo } from "@/components/ui/Logo";
import { PageContainer } from "./index";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User } from "lucide-react";
import NotificationDropdown from "../notifications/NotificationDropdown";

export function Header() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  
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

            <div className="flex items-center gap-6">
              {isAuthenticated && <NotificationDropdown />}
              <AuthNav />
            </div>
        </div>
      </PageContainer>
    </nav>
  );
}

function AuthNav() {
  const { user, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-6">
        <Link href="/login" className="text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-brand-primary transition-colors">
          Sign In
        </Link>
        <Link href="/register" className="px-5 py-2 bg-brand-indigo text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-indigo/90 transition-all shadow-sm">
          Join
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <Link href="/profile" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
          <User className="w-4 h-4" />
        </div>
        <div className="hidden sm:block">
          <div className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo leading-none">
             {user?.email ? user.email.split('@')[0] : 'User'}
          </div>
          <div className="text-[8px] font-bold uppercase tracking-widest text-brand-accent opacity-60">
            {user?.role}
          </div>
        </div>
      </Link>
      <button 
        onClick={logout}
        className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
