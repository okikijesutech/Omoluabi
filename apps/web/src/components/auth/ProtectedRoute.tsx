"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children, role }: { children: React.ReactNode, role?: string }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (role && user?.role !== role && user?.role !== 'ADMIN') {
        // If they have a role but it's not the required one (and they aren't an admin)
        router.push("/");
      }
    }
  }, [isLoading, isAuthenticated, user, role, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream text-brand-indigo">
        <Loader2 className="w-10 h-10 animate-spin opacity-20" />
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (role && user?.role !== role && user?.role !== 'ADMIN') return null;

  return <>{children}</>;
}
