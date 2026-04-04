import { SideNav } from "@/components/layout/SideNav";
import { TopBar } from "@/components/layout/TopBar";

export default function ContributorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-brand-cream/30 dark:bg-zinc-950 selection:bg-brand-primary/20">
      <SideNav />
      
      <div className="flex-1 flex flex-col">
        <TopBar />
        
        <main className="flex-1 p-10 lg:p-16 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
